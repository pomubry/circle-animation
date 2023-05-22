<script setup lang="ts">
  definePageMeta({
    middleware: "auth",
  });

  const { toastProps, closeToast, handleToast } = useToast();
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

    <LoginForm @toast="handleToast" />
  </div>
  <GenericToast :toast-prop="toastProps" @close-toast="closeToast" />
</template>
