<script setup lang="ts">
  defineProps<{
    isPlaying: boolean;
    isFullyLoaded: boolean;
    isGameDone: boolean;
  }>();

  defineEmits<{
    (e: "toggleMenu"): void;
    (e: "toggleFullscreen"): void;
    (e: "reset"): void;
  }>();

  const isLandscape = useMediaQuery("(orientation: landscape)");
</script>

<template>
  <div
    class="absolute right-5 top-10 flex flex-col items-end"
    :class="{
      'z-[2]': !isGameDone,
      'z-[0]': isGameDone,
    }"
  >
    <button
      class="grid place-items-center rounded-md bg-gray-950 p-2 text-gray-50"
      :class="{ 'opacity-50': !isLandscape }"
      :disabled="!isLandscape || !isFullyLoaded || isGameDone"
      @click="$emit('toggleMenu')"
    >
      <Transition mode="out-in">
        <Icon
          v-if="!isFullyLoaded"
          name="line-md:loading-alt-loop"
          class="text-red-300"
        />
        <Icon
          v-else-if="isPlaying"
          name="ic:round-pause"
          class="text-red-300"
        />
        <Icon v-else name="solar:play-bold-duotone" class="text-green-300" />
      </Transition>
    </button>

    <Transition>
      <ul
        v-if="!isPlaying"
        class="popout relative flex translate-y-3 flex-col gap-3 rounded-md bg-gray-950 p-2 text-sm font-semibold text-gray-50"
      >
        <li>
          <NuxtLink
            href="/beatmaps"
            class="flex items-center gap-2 duration-300 hover:text-purple-300"
          >
            <Icon name="gg:list" class="text-green-300" />Beatmaps</NuxtLink
          >
        </li>
        <li>
          <button
            class="flex items-center gap-2 duration-300 hover:text-purple-300"
            @click="$emit('toggleFullscreen')"
          >
            <Icon name="ic:round-fit-screen" class="text-green-300" />Toggle
            Fullscreen
          </button>
        </li>
        <li>
          <button
            class="flex items-center gap-2 duration-300 hover:text-purple-300"
            @click="$emit('reset')"
          >
            <Icon
              name="icon-park-outline:replay-music"
              class="text-green-300"
            />Reset
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="postcss" scoped>
  .popout::after {
    content: " ";
    @apply absolute -top-2 right-2 h-4 w-4 rotate-45 rounded-tl-md bg-gray-950;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.1s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
