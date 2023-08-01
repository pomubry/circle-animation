import { acceptHMRUpdate, defineStore } from "pinia";
import type { Beatmap } from "~/utils/types";

type Group = 1 | 2 | 3;
type Difficulty = 1 | 2 | 3 | 4;
type Attribute = 0 | 1 | 2 | 3;

export const speedValue = {
  1: 1.5,
  2: 1.4,
  3: 1.3,
  4: 1.2,
  5: 1.1,
  6: 1,
  7: 0.9,
  8: 0.8,
  9: 0.7,
  10: 0.6,
};

export const useSettingsStore = defineStore(
  "settings",
  () => {
    const group = ref<Group>(3);
    const difficulty = ref<Difficulty>(4);
    const attribute = ref<Attribute>(0);
    const isAutoplay = ref(false);
    const isLabeled = ref(false);
    const speed = ref(9);
    const musicVolume = ref(0.1);
    const tapVolume = ref(0.1);
    const chosenBeatmap = ref<Beatmap | null>(null);

    const resetSettings = () => {
      group.value = 3;
      difficulty.value = 4;
      attribute.value = 0;
      isAutoplay.value = false;
      isLabeled.value = false;
      speed.value = 9;
      musicVolume.value = 0.1;
      tapVolume.value = 0.1;
      chosenBeatmap.value = null;
    };

    return {
      group,
      difficulty,
      attribute,
      isAutoplay,
      isLabeled,
      speed,
      musicVolume,
      tapVolume,
      chosenBeatmap,
      resetSettings,
    };
  },
  {
    persist: {
      debug: true,
      storage: persistedState.localStorage,
    },
  }
);

// Hot Module Replacement
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
