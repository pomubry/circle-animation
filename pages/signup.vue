<script setup lang="ts">
  definePageMeta({
    middleware: "cookie-auth",
  });

  useHead({
    title: "CAni | Sign Up",
    meta: [{ name: "description", content: "Sign Up to play!" }],
  });

  const { ToastComponent, setToastProps } = useToast();
</script>

<template>
  <div class="container mx-auto items-center justify-center gap-5 p-5 sm:flex">
    <div class="hidden flex-1 justify-center sm:flex">
      <GenericAppTitle />
    </div>
    <SignupForm @set-toast-props="setToastProps" />
  </div>
  <ToastComponent />
</template>
