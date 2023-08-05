import TimingToast from "~/components/game/Timing.vue";
import type { Timings } from "~/utils/types";

export function useTimingToast() {
  const timing = ref<Timings>("");
  const now = ref(Date.now());
  const toastIndex = ref<NodeJS.Timeout>();

  const setTimingToastProps = async (payload: Timings) => {
    timing.value = payload;
    now.value = Date.now();
    clearTimeout(toastIndex.value);
    toastIndex.value = undefined;

    const index = setTimeout(() => {
      timing.value = "";
      toastIndex.value = undefined;
    }, 2000);
    toastIndex.value = index;
  };

  const TimingToastComponent = () => {
    return h(TimingToast, {
      timing: timing.value,
      now: now.value,
    });
  };

  onUnmounted(() => {
    clearTimeout(toastIndex.value);
  });

  return {
    TimingToastComponent,
    setTimingToastProps,
  };
}
