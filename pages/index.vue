<script setup lang="ts">
  import instructions from "~/lib/instructions.json";

  const isLoading = ref(false);
  const userStore = useUserStore();
  const { ToastComponent, setToastProps } = useToast();

  const handleLogin = async () => {
    isLoading.value = true;

    try {
      const res = await userStore.login({
        username: "sample",
        password: "sample",
      });

      if (res) {
        if ("details" in res) {
          console.error(res);
        } else {
          setToastProps(res);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };
</script>

<template>
  <header
    class="grid place-content-center gap-5 bg-gray-100 p-14 duration-300 dark:bg-gray-900"
  >
    <div class="mx-auto flex items-center gap-5">
      <GenericAppTitle />
      <div class="header-ring"></div>
    </div>
    <p class="text-xl font-bold">
      Just a bootleg rhythm game I ported to the web
    </p>

    <ClientOnly>
      <div
        v-if="!userStore.user"
        class="mt-5 flex justify-center gap-5 font-bold"
      >
        <button
          class="rounded-lg bg-green-500 p-3 text-gray-900 duration-300 hover:bg-green-600 dark:bg-green-300 hover:dark:bg-green-400"
          :disabled="isLoading"
          @click="handleLogin"
        >
          Demo
        </button>
        <NuxtLink
          href="/signup"
          class="rounded-lg bg-gray-300 p-3 duration-300 hover:bg-gray-400 dark:bg-gray-800 hover:dark:bg-gray-950"
          >Sign Up</NuxtLink
        >
      </div>
    </ClientOnly>
  </header>

  <section class="container mx-auto my-20">
    <h2 class="text-3xl font-bold">How to play</h2>
    <div>
      <HomeInstruction
        v-for="instruction in instructions"
        :key="instruction.serialID"
        :serial-id="instruction.serialID"
        :img-src="instruction.imgSrc"
        :alt="instruction.alt"
        :title="instruction.title"
        :descriptions="instruction.descriptions"
      />
    </div>
  </section>

  <ToastComponent />
</template>

<style scoped>
  .header-ring {
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    animation: ringFlip 6s linear infinite;
  }

  @keyframes ringFlip {
    0% {
      transform: rotateY(0deg);
      background-image: radial-gradient(transparent, pink);
    }
    16.666666667% {
      transform: rotateY(90deg);
    }
    33.333333333% {
      transform: rotateY(180deg);
      background-image: radial-gradient(transparent, lightgreen);
    }
    50% {
      transform: rotateY(270deg);
    }
    66.666666667% {
      transform: rotateY(360deg);
      background-image: radial-gradient(transparent, lightblue);
    }
    83.333333333% {
      transform: rotateY(450deg);
    }
    100% {
      transform: rotateY(540deg);
      background-image: radial-gradient(transparent, pink);
    }
  }
</style>
