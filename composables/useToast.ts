import GenericToast from "~/components/generic/Toast.vue";
import { Toast } from "~/utils/validation";

export function useToast() {
  const toastProps = ref<Toast | null>(null);
  const toastIndex = ref<NodeJS.Timeout>();

  const closeToast = () => {
    toastProps.value = null;
    clearTimeout(toastIndex.value);
    toastIndex.value = undefined;
  };

  const setToastProps = async (payload: Toast) => {
    toastProps.value = payload;
    clearTimeout(toastIndex.value);
    toastIndex.value = undefined;

    const index = setTimeout(() => {
      toastProps.value = null;
      toastIndex.value = undefined;
    }, 3000);
    toastIndex.value = index;
  };

  const ToastComponent = () => {
    return h(GenericToast, {
      toastProps: toastProps.value,
      onCloseToast: closeToast,
    });
  };

  onUnmounted(() => {
    clearTimeout(toastIndex.value);
  });

  return {
    ToastComponent,
    setToastProps,
  };
}
