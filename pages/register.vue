<script setup lang="ts">
  import type { Toast } from "~/utils/validation";

  definePageMeta({
    middleware: "auth",
  });

  const toastProps = ref<Toast | null>(null);
  const toastIndex = ref<NodeJS.Timeout>();

  const closeToast = () => {
    toastProps.value = null;
    clearTimeout(toastIndex.value);
    toastIndex.value = undefined;
  };

  const handleToast = async (payload: Toast) => {
    toastProps.value = payload;
    clearTimeout(toastIndex.value);
    toastIndex.value = undefined;

    const index = setTimeout(() => {
      toastProps.value = null;
      toastIndex.value = undefined;
    }, 3000);
    toastIndex.value = index;
  };

  onUnmounted(() => {
    clearTimeout(toastIndex.value);
  });
</script>

<template>
  <div class="container mx-auto items-center justify-center gap-5 p-5 sm:flex">
    <div class="hidden flex-1 justify-center sm:flex">
      <h1 class="w-min text-5xl font-black">
        Circle
        <span class="text-green-500 duration-300 dark:text-green-300">Ani</span
        >mation
      </h1>
    </div>
    <RegisterForm @toast="handleToast" />
  </div>
  <GenericToast :toast-prop="toastProps" @close-toast="closeToast" />
</template>
