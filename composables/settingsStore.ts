import { acceptHMRUpdate, defineStore } from "pinia";

type Group = 1 | 2 | 3;
type Difficulty = 1 | 2 | 3;
type Attribute = 0 | 1 | 2 | 3;

export const speedValue = {
  1: 2.2,
  2: 2,
  3: 1.8,
  4: 1.6,
  5: 1.4,
  6: 1.2,
  7: 1,
  8: 0.8,
  9: 0.6,
  10: 0.4,
};

export const useSettingsStore = defineStore(
  "settings",
  () => {
    const group = ref<Group>(3);
    const difficulty = ref<Difficulty>(3);
    const attribute = ref<Attribute>(0);
    const isAutoplay = ref(false);
    const isLabeled = ref(false);
    const speed = ref(4);
    const musicVolume = ref(0.1);
    const tapVolume = ref(0.1);

    return {
      group,
      difficulty,
      attribute,
      isAutoplay,
      isLabeled,
      speed,
      musicVolume,
      tapVolume,
    };
  },
  {
    persist: true,
  }
);

// Hot Module Replacement
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
