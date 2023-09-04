<script setup lang="ts">
  definePageMeta({
    middleware: "request-auth",
    layout: "game",
    pageTransition: false,
  });

  import * as PIXI from "pixi.js";
  import { LoadedCallback, Sound, sound } from "@pixi/sound";

  import BG from "~/assets/pictures/backgrounds/bg";
  import BGM from "~/assets/music/bgm";
  import { tapSFX, timings } from "~/assets/tap-sfx/tapSFX";
  import { useTimingToast } from "~/composables/useTimingToast";

  import {
    getNotePosition,
    digitKeys,
    createNoteCanvas,
    createNoteSprite,
    generateActiveNote,
    labelStyle,
    defaultStats,
  } from "~/utils/game";

  import type {
    ExtendedNoteType,
    ZeroToEight,
    OneToNine,
    Timings,
    Beatmap,
  } from "~/utils/types";

  // Store Settings
  const settingsStore = useSettingsStore();
  const beatmap = settingsStore.chosenBeatmap as NonNullable<Beatmap>; // checked by middleware
  const speed = speedValue[settingsStore.speed as keyof typeof speedValue];

  // game/canvas variables
  let notes = [...beatmap.notes];
  let activeNotes: ExtendedNoteType[] = [];
  let outerNotes: PIXI.Sprite[] = [];
  let initialLoad = true;
  let loadedSound = 0;
  let isBGMPlayed = false;
  let xOrigin: number;
  let yOrigin: number;
  let mainRadius: number;
  let noteTexture: PIXI.Texture<PIXI.Resource>;
  let bgmInstance: Sound;
  let app: PIXI.Application<HTMLCanvasElement>;

  const bgIndex = Math.floor(Math.random() * BG.length);

  const canvasParent = ref<HTMLDivElement>();
  const isPlaying = ref(true);
  const isFullyLoaded = ref(false);
  const isGameDone = ref(false);
  const combo = ref(0);
  const highestCombo = ref(0);
  const isOverlap = ref(false);
  const stats = ref({ ...defaultStats });
  const { TimingToastComponent, setTimingToastProps } = useTimingToast();
  const { toggle } = useFullscreen();

  const pause = async () => {
    await bgmInstance.context.audioContext.suspend();
    bgmInstance.pause();
    isPlaying.value = false;
    app.ticker.stop();
  };

  const resume = async () => {
    if (isBGMPlayed) {
      await bgmInstance.context.audioContext.resume();
      bgmInstance.resume();
    } else {
      await bgmInstance.play({
        start: 0,
        singleInstance: true,
      });
      isBGMPlayed = true;

      // There are random cases where the audio doesn't play so run both pause() and play() again as a workaround
      await pause();
      await resume();
      return;
    }
    isPlaying.value = true;
    app.ticker.start();
    (app.view as HTMLCanvasElement).focus();
  };

  const togglePlay = async () => {
    if (!isFullyLoaded.value || isGameDone.value) return;

    if (isPlaying.value) {
      await pause();
    } else {
      await resume();
    }
  };

  const handleGoodTiming = () => {
    combo.value += 1;
    if (combo.value > highestCombo.value) highestCombo.value = combo.value;
  };

  const handleTimings = (timing: Timings) => {
    sound.play(timing === "EARLY" ? "LATE" : timing);
    setTimingToastProps(timing);
    stats.value[timing] += 1;
  };

  const getCurrentBGMTime = () => {
    if (!bgmInstance.instances[0]) return 0;
    return bgmInstance.instances[0].progress * bgmInstance.duration + 0.15;
  };

  const handlePointer = (data: OneToNine) => {
    if (!isPlaying.value || settingsStore.isAutoplay) return;

    for (let i = 0; i < activeNotes.length; i++) {
      const note = activeNotes[i];
      if (!note || note.position !== data) continue;

      // Check if current time is within +-0.3s of timing_sec
      const timingDiff = note.timing_sec - getCurrentBGMTime();
      const absoluteTiming = Math.abs(timingDiff);
      const isWithinRange = absoluteTiming < 0.3;

      if (isWithinRange) {
        if (absoluteTiming < 0.1) {
          handleGoodTiming();
          handleTimings(timings.PERFECT);
        } else if (absoluteTiming < 0.15) {
          handleGoodTiming();
          handleTimings(timings.GREAT);
        } else if (absoluteTiming < 0.2) {
          combo.value = 0;
          handleTimings(timings.GOOD);
        } else if (absoluteTiming < 0.25) {
          combo.value = 0;
          handleTimings(timings.BAD);
        } else if (absoluteTiming < 0.3) {
          combo.value = 0;

          if (timingDiff > 0) {
            handleTimings(timings.EARLY);
          } else {
            handleTimings(timings.LATE);
          }
        }

        app.stage.removeChild(note.sprite);
        note.sprite.destroy();
        activeNotes.splice(i, 1);
        i--;
        break;
      }
    }
  };

  const handleKeyboard = (e: KeyboardEvent) => {
    if (e.code in digitKeys) {
      const code = e.code as keyof typeof digitKeys;
      const data = digitKeys[code];
      handlePointer(data);
    } else if (e.code === "Space") {
      togglePlay();
    } else {
      return;
    }
  };

  const drawActiveNotes = () => {
    for (let i = 0; i < activeNotes.length; i++) {
      const note = activeNotes[i];
      if (!note) continue;

      const timeDiff = Math.abs(note.timing_sec - speed - getCurrentBGMTime());
      let radius = (mainRadius / speed) * timeDiff;

      const { x, y } = getNotePosition({
        num: (note.position - 1) as ZeroToEight,
        mainRadius: radius,
        xOrigin,
        yOrigin,
      });
      const scale = radius / (mainRadius * 0.75);
      note.sprite.x = x;
      note.sprite.y = y;
      note.sprite.scale.set(scale > 1 ? 1 : scale);

      if (
        getCurrentBGMTime() >
        note.timing_sec + (settingsStore.isAutoplay ? 0 : 0.3)
      ) {
        app.stage.removeChild(note.sprite);
        note.sprite.destroy();
        activeNotes.splice(i, 1);
        i--;

        if (settingsStore.isAutoplay) {
          handleTimings(timings.PERFECT);
          combo.value += 1;
        } else {
          handleTimings(timings.LATE);
          combo.value = 0;
        }
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ticker: PIXI.TickerCallback<any> = async () => {
    if (initialLoad) {
      initialLoad = false;
      await pause();
      return;
    }

    if (notes.length < 1 && activeNotes.length < 1 && !bgmInstance.isPlaying) {
      isGameDone.value = true;
      await pause();
    }

    if (notes.length > 0 && notes[0].timing_sec - speed < getCurrentBGMTime()) {
      const note = notes.shift();
      if (note) {
        const activeNote = generateActiveNote(
          note,
          { mainRadius, xOrigin, yOrigin },
          noteTexture,
        );
        app.stage.addChild(activeNote.sprite);
        activeNotes.push(activeNote);
      }
    }

    drawActiveNotes();
  };

  const drawDefault = () => {
    const xInner = window.innerWidth;
    const yInner = window.innerHeight;

    const rad1 = 0.045 * yInner;
    const rad2 = 0.09 * yInner; // used as width-height of texture which will contain EACH button

    xOrigin = xInner / 2;
    yOrigin = 0.2 * yInner;
    const padding = 20;

    mainRadius = yInner - yOrigin - rad2 - padding;
    if (xOrigin - mainRadius * Math.cos(0) - rad2 < 0) {
      // if there is more y than x, base the main radius on x
      mainRadius = xInner - xOrigin - rad2 - padding;
    }

    const canvas = createNoteCanvas(rad1, rad2, beatmap.notes_attribute);
    noteTexture = PIXI.Texture.from(canvas);

    const middleNotePosition = getNotePosition({
      num: 8,
      mainRadius,
      xOrigin: xOrigin - mainRadius,
      yOrigin,
    });
    const middleNote = createNoteSprite(middleNotePosition, noteTexture);
    middleNote.eventMode = "none";
    app.stage.addChild(middleNote);

    new Array(9)
      .fill("")
      .map((_, i) => i)
      .forEach((num) => {
        // (x - h)^2 + (y - k)^2 = r^2
        // @origin center (h=0, k=0), equation becomes x^2 + y^2 = r^2
        // use pythagorean theorem or soh-cah-toa
        // origin is defined above

        const outerNotePosition = getNotePosition({
          num: num as ZeroToEight,
          mainRadius,
          xOrigin,
          yOrigin,
        });

        const outerNote = createNoteSprite(outerNotePosition, noteTexture);
        outerNote.on("pointerdown", () =>
          handlePointer((num + 1) as OneToNine),
        );
        outerNote.eventMode = "static";
        outerNote.hitArea = new PIXI.Circle(0, 0, rad2);
        app.stage.addChild(outerNote);

        if (settingsStore.isLabeled) {
          const label = new PIXI.Text(num + 1, labelStyle);
          label.eventMode = "none";
          label.anchor.set(0.5);
          label.x = outerNote.x;
          label.y = outerNote.y;
          app.stage.addChild(label);
        }

        outerNotes.push(outerNote);
      });
  };

  const create = () => {
    app = new PIXI.Application<HTMLCanvasElement>({
      backgroundAlpha: 0,
      resizeTo: window,
    });

    if (app && canvasParent.value) {
      canvasParent.value.appendChild(app.view);
      drawDefault();
      app.ticker.add(ticker);

      const view = app.view as HTMLCanvasElement;
      view.tabIndex = 0;
      view.addEventListener("keydown", handleKeyboard);
    } else {
      console.error(
        "Cannot properly initialize the app. Either PIXI app or canvasParent is undefined",
      );
      console.error("PIXI app:", app);
      console.error("canvasParent:", canvasParent.value);
    }
  };

  const resize = async () => {
    await pause();

    // Reset relevant canvas variables
    app.stage.removeChildren();
    noteTexture.destroy();
    outerNotes.forEach((note) => note.destroy());
    outerNotes = [];

    // Redraw default canvas
    drawDefault();

    // Set new active notes
    activeNotes = activeNotes.map((note) => {
      const { sprite, ...rest } = note;
      sprite.destroy();
      const activeNote = generateActiveNote(
        rest,
        { mainRadius, xOrigin, yOrigin },
        noteTexture,
      );
      app.stage.addChild(activeNote.sprite);
      return activeNote;
    });

    drawActiveNotes();

    const bounds1 = outerNotes[8].getBounds();
    const bounds2 = outerNotes[7].getBounds();

    const overlap =
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y;

    if (overlap) {
      isOverlap.value = true;
    } else {
      isOverlap.value = false;
    }

    app.render();
  };

  const reset = async () => {
    activeNotes.forEach((note) => {
      app.stage.removeChild(note.sprite);
      note.sprite.destroy();
    });
    activeNotes = [];
    notes = [...beatmap.notes];
    isBGMPlayed = false;
    isGameDone.value = false;
    combo.value = 0;
    highestCombo.value = 0;
    stats.value = { ...defaultStats };
    await resume();
  };

  const loaded: LoadedCallback = (err) => {
    if (err) {
      console.error(err);
    } else {
      loadedSound++;
      if (loadedSound >= 6) {
        isFullyLoaded.value = true;
      }
    }
  };

  const toggleFullscreen = async () => {
    await toggle();
    await resize();
  };

  onMounted(() => {
    bgmInstance = sound.add(beatmap.code, {
      url: BGM[beatmap.code as keyof typeof BGM],
      preload: true,
      loaded,
      volume: settingsStore.musicVolume,
    });

    for (const prop in tapSFX) {
      const timing = prop as keyof typeof tapSFX;
      sound.add(timings[timing], {
        url: tapSFX[timing],
        preload: true,
        loaded,
        volume: settingsStore.tapVolume,
      });
    }

    create();

    window.addEventListener("resize", resize);
  });

  onUnmounted(() => {
    const view = app.view as HTMLCanvasElement;
    view.removeEventListener("keydown", handleKeyboard);

    window.removeEventListener("resize", resize);
  });
</script>

<template>
  <div
    ref="canvasParent"
    :class="{
      'z-[1]': !isGameDone,
      'z-[0]': isGameDone,
    }"
  />
  <div
    class="absolute inset-0 min-h-[100dvh] w-full"
    :style="{
      backgroundImage: `linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.8)
  ), url('${BG[bgIndex]}')`,
    }"
  >
    <GameMenuButton
      :is-playing="isPlaying"
      :is-fully-loaded="isFullyLoaded"
      :is-game-done="isGameDone"
      @toggle-menu="togglePlay"
      @toggle-fullscreen="toggle"
      @reset="reset"
    />
    <GameCombo :combo="combo" />
    <TimingToastComponent />
    <GameResults
      :is-game-done="isGameDone"
      :stats="stats"
      :highest-combo="highestCombo"
      :combos="beatmap.combos"
      :beatmap-id="beatmap.beatmap_id"
      :is-autoplay="settingsStore.isAutoplay"
      @toggle-menu="togglePlay"
      @toggle-fullscreen="toggleFullscreen"
      @reset="reset"
    />
    <Icon
      name="fluent:music-note-2-24-regular"
      size="calc(100vh * 0.09)"
      class="absolute left-[50%] top-[20%] -translate-x-[50%] -translate-y-[50%] text-gray-100"
    />
  </div>

  <GenericOrientationModal :is-overlap="isOverlap" />
</template>
