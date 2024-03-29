<script setup lang="ts">
  import { DialogPanel, DialogTitle } from "@headlessui/vue";
  import type { Stats, Combo, ScoreData } from "~/utils/types";

  interface Props {
    stats: Stats;
    isGameDone: boolean;
    highestCombo: number;
    combos: Combo[];
    beatmapId: string;
    isAutoplay: boolean;
  }

  const props = defineProps<Props>();

  defineEmits<{
    (e: "toggleMenu"): void;
    (e: "toggleFullscreen"): void;
    (e: "reset"): void;
  }>();

  const config = useRuntimeConfig();
  const userStore = useUserStore();
  const { ToastComponent, setToastProps } = useToast();
  const isSending = ref(false);
  const isSent = ref(false);

  const filteredStats = computed(() => {
    const { "": emptyKey, ...rest } = props.stats;
    return rest;
  });

  const highestRank = computed(() => {
    const comboRange = props.combos.find((b) => {
      const isRankD = b.combo_min === 0;
      const isRankS = b.combo_max === 0;
      if (isRankD) {
        if (props.highestCombo <= b.combo_max) {
          return true;
        }
      }

      if (isRankS) {
        if (props.highestCombo === b.combo_min) {
          return true;
        }
      }

      if (
        props.highestCombo >= b.combo_min &&
        props.highestCombo <= b.combo_max
      ) {
        return true;
      }

      return false;
    });

    switch (comboRange?.combo) {
      case 5:
        return "D";
      case 4:
        return "C";
      case 3:
        return "B";
      case 2:
        return "A";

      default:
        return "S";
    }
  });

  const linkStyle =
    "flex items-center gap-2 text-sm font-semibold rounded-md p-3 duration-300 hover:text-purple-600 dark:hover:text-purple-300 bg-gray-100 dark:bg-gray-950";

  const iconStyle = "text-green-600 dark:text-green-300";

  const record = computed(
    () => userStore.user?.notes.find((n) => n.beatmap_id === props.beatmapId),
  );

  const isNewRecord = computed(() => {
    if (!record.value) return true;

    return props.highestCombo > record.value.highest_combo;
  });

  const isDisabled = computed(() => {
    return (
      !isNewRecord.value || props.isAutoplay || isSending.value || isSent.value
    );
  });

  const submit = async () => {
    const body: ScoreData = {
      beatmap_id: props.beatmapId,
      highest_combo: props.highestCombo,
    };

    try {
      isSending.value = true;
      isSent.value = false;
      const res = await fetch(config.public.CANI_BE_URL + "/api/scores", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await res.json();

      const score = scoreDataSchema.safeParse(data);

      if (!score.success) {
        console.error(score.error.format());
        isSent.value = false;

        setToastProps({
          title: "Invalid Data",
          description: "The return data was invalid.",
          type: "ERROR",
        });

        return;
      }

      isSent.value = true;

      if (record.value) {
        record.value.highest_combo = score.data.highest_combo;
      } else {
        userStore.user?.notes.push(body);
      }

      setToastProps({
        title: "Success!",
        description: "Your new score has been sent successfully.",
        type: "SUCCESS",
      });
    } catch (error) {
      console.error(error);
      isSent.value = false;

      if (error instanceof Error) {
        setToastProps({
          title: error.name,
          description: error.message,
          type: "ERROR",
        });
      } else {
        setToastProps({
          title: "Ooops!",
          description: "Something went wrong.",
          type: "ERROR",
        });
      }
    } finally {
      isSending.value = false;
    }
  };

  watchEffect(() => {
    if (props.isGameDone === false) {
      isSending.value = false;
      isSent.value = false;
    }
  });
</script>

<template>
  <GenericBaseModal :show="isGameDone">
    <DialogPanel
      class="min-w-[80vw] rounded-lg bg-gray-300 p-5 text-gray-900 dark:bg-gray-900 dark:text-gray-100 lg:min-w-[60vw]"
    >
      <DialogTitle
        class="text-2xl font-extrabold text-green-500 dark:text-green-300"
      >
        Results:
      </DialogTitle>

      <div class="grid grid-cols-[1fr_2fr] gap-10">
        <div>
          <div class="mt-3 flex justify-between">
            <p class="font-bold">Highest Combo:</p>
            <em class="font-extrabold">{{ highestCombo }}</em>
          </div>
          <div
            v-for="(val, key) in filteredStats"
            :key="key"
            class="mt-3 flex justify-between"
          >
            <p
              class="bg-clip-text text-xl font-extrabold text-transparent"
              :class="{
                rankS: key === 'PERFECT',
                rankA: key === 'GREAT',
                rankB: key === 'GOOD',
                rankC: key === 'BAD',
                rankD: key === 'EARLY' || key === 'LATE',
              }"
            >
              {{ key }}
            </p>
            <em class="font-extrabold">{{ val }}</em>
          </div>
        </div>
        <div class="mt-3 flex flex-col text-center">
          <div class="flex-1">
            <p class="text-2xl font-bold">Rank:</p>
            <p
              class="bg-clip-text text-9xl font-extrabold text-transparent"
              :class="{
                rankS: highestRank === 'S',
                rankA: highestRank === 'A',
                rankB: highestRank === 'B',
                rankC: highestRank === 'C',
                rankD: highestRank === 'D',
              }"
            >
              {{ highestRank }}
            </p>
          </div>
          <div class="flex justify-center">
            <button
              :class="[
                linkStyle,
                {
                  'opacity-50': isDisabled,
                  'cursor-not-allowed': isDisabled,
                },
              ]"
              :disabled="isDisabled"
              @click="submit"
            >
              <template v-if="isSending">
                <Icon
                  name="mingcute:loading-fill"
                  class="animate-spin"
                  :class="iconStyle"
                />
                Loading...
              </template>
              <template v-else>
                <Icon name="material-symbols:send" :class="iconStyle" />
                Send
              </template>
            </button>
          </div>

          <ul
            class="flex justify-center gap-3 rounded-md p-2 text-gray-900 dark:text-gray-100"
          >
            <li>
              <NuxtLink href="/beatmaps" :class="linkStyle">
                <Icon name="gg:list" :class="iconStyle" />Beatmaps</NuxtLink
              >
            </li>
            <li>
              <button :class="linkStyle" @click="$emit('toggleFullscreen')">
                <Icon name="ic:round-fit-screen" :class="iconStyle" />Toggle
                Fullscreen
              </button>
            </li>
            <li>
              <button :class="linkStyle" @click="$emit('reset')">
                <Icon
                  name="icon-park-outline:replay-music"
                  :class="iconStyle"
                />Reset
              </button>
            </li>
          </ul>
        </div>
      </div>
    </DialogPanel>
  </GenericBaseModal>
  <ToastComponent />
</template>

<style scoped>
  .rankS {
    background-image: linear-gradient(to right, #ff45b2, #c800ee, #00a3f4);
  }
  .rankA {
    background-image: linear-gradient(to right, #f84622, #ff9800);
  }
  .rankB {
    background-image: linear-gradient(to right, #178d1b, #00f174);
  }
  .rankC {
    background-image: linear-gradient(to right, #010ce6, #00a7dd);
  }
  .rankD {
    background-image: linear-gradient(to right, #343636, #b5bbba);
  }
</style>
