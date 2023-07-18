<script setup lang="ts">
  definePageMeta({
    middleware: "beatmaps",
  });

  useHead({
    title: "CAni | Beatmaps",
    meta: [{ name: "description", content: "Choose the beatmap to play." }],
  });

  const runtimeConfig = useRuntimeConfig();
  const settingsStore = useSettingsStore();
  const { data, pending, error, refresh } = useFetch(
    `${runtimeConfig.public.CANI_BE_URL}/api/beatmaps`,
    {
      transform: (res) => beatmapsSchema.safeParse(res),
    }
  );

  const beatmaps = computed(() => {
    if (data.value?.success) {
      let filteredBeatmaps = data.value.data.filter((beatmap) => {
        const isDifficultyMatched =
          beatmap.difficulty === settingsStore.difficulty;
        const isGroupMatched = beatmap.member_category === settingsStore.group;
        const isAttributeMatched =
          settingsStore.attribute === 0
            ? true
            : beatmap.notes_attribute === settingsStore.attribute;

        return isDifficultyMatched && isGroupMatched && isAttributeMatched;
      });

      return filteredBeatmaps;
    } else {
      return null;
    }
  });
</script>

<template>
  <div class="container mx-auto grid gap-10 p-3">
    <h1 class="text-center text-2xl font-extrabold">Beatmaps</h1>

    <BeatmapsSettings />

    <div class="rounded-lg bg-gray-100 p-3 duration-300 dark:bg-gray-900">
      <div v-if="pending">
        <p class="flex items-center justify-center gap-1">
          <Icon name="eos-icons:loading" /> Loading...
        </p>
      </div>

      <div v-else-if="error" class="grid justify-center gap-3">
        <h2
          class="text-center text-2xl font-bold text-red-500 duration-300 dark:text-red-300"
        >
          Error!
        </h2>
        <p>Data for beatmap cannot be retrieved</p>
        <button
          class="rounded-lg bg-green-300 p-3 font-semibold duration-300 hover:bg-green-400 dark:bg-green-600 dark:hover:bg-green-700"
          @click="() => refresh()"
        >
          Try again
        </button>
      </div>

      <ul v-else-if="beatmaps" class="grid gap-3">
        <BeatmapsItem
          v-for="beatmap in beatmaps"
          :key="beatmap.beatmap_id"
          :beatmap="beatmap"
        />
      </ul>

      <div v-else class="grid justify-center gap-3">
        <h2
          class="text-center text-2xl font-bold text-red-500 duration-300 dark:text-red-300"
        >
          Error!
        </h2>
        <p>Received data is invalid</p>
      </div>
    </div>
  </div>
</template>
