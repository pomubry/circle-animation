<script setup lang="ts">
  import attribImages from "~/assets/pictures/attribute/attributes";
  import groupLogos from "~/assets/pictures/group-logo/groupLogo";
  import { Beatmap } from "~/utils/validation";

  const props = defineProps<{ beatmap: Beatmap }>();

  const userStore = useUserStore();
  const settingsStore = useSettingsStore();

  const beforeContent = computed(() => {
    const group = props.beatmap.member_category;
    return {
      "before:bg-red-400": group === 1,
      "before:bg-blue-400": group === 2,
      "before:bg-yellow-400": group === 3,
    };
  });

  const afterContent = computed(() => {
    const attribute = props.beatmap.notes_attribute;
    return {
      "bg-red-400": attribute === 1,
      "bg-green-400": attribute === 2,
      "bg-blue-400": attribute === 3,
    };
  });

  const attribImage = computed(() => {
    const attribute = props.beatmap.notes_attribute;
    switch (attribute) {
      case 0:
        return attribImages[0];
      case 1:
        return attribImages[1];
      case 2:
        return attribImages[2];
      default:
        return attribImages[3];
    }
  });

  const groupImage = computed(() => {
    const group = props.beatmap.member_category;
    switch (group) {
      case 1:
        return groupLogos[1];
      case 2:
        return groupLogos[2];
      default:
        return groupLogos[3];
    }
  });

  const difficulty = computed(() =>
    settingsStore.difficulty === 1
      ? "easy"
      : settingsStore.difficulty === 2
      ? "normal"
      : "hard"
  );

  const difficultyStyling = computed(() => ({
    "text-green-500 dark:text-green-300": difficulty.value === "easy",
    "text-yellow-500 dark:text-yellow-300": difficulty.value === "normal",
    "text-red-500 dark:text-red-300": difficulty.value === "hard",
  }));

  const highestCombo = computed(() => {
    const song = userStore.user?.notes.find(
      (beatmap) => beatmap.beatmap_id === props.beatmap.beatmap_id
    );
    return song?.highest_combo || 0;
  });

  const setChosenBeatmap = (beatmap: Beatmap) => {
    settingsStore.chosenBeatmap = beatmap;
    return navigateTo("/game");
  };
</script>

<template>
  <li
    :key="beatmap.beatmap_id"
    class="attrib relative flex justify-between overflow-hidden rounded-lg bg-gray-200 p-3 duration-300 dark:bg-gray-800"
    :class="beforeContent"
  >
    <div class="ml-3">
      <p class="font-extrabold">
        <button @click="setChosenBeatmap(beatmap)">
          {{ beatmap.song_name }}
        </button>
      </p>
      <p class="text-xs font-semibold" :class="difficultyStyling">
        {{ difficulty[0].toUpperCase() + difficulty.slice(1) }}
      </p>
      <p class="text-xs">
        Highest Combo: {{ highestCombo }}/{{ beatmap.notes.length }}
      </p>
    </div>
    <div class="relative h-14 p-2">
      <img :src="groupImage" alt="group logo" class="h-full" />
    </div>
    <div
      class="absolute -right-0.5 -top-7 grid h-full -rotate-45 items-center"
      :class="afterContent"
    >
      <img
        :src="attribImage"
        alt="note attribute"
        width="25"
        height="25"
        class="-translate-x-[50%] rotate-45"
      />
    </div>
  </li>
</template>

<style lang="postcss" scoped>
  .attrib::before {
    content: " ";
    width: 7px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
