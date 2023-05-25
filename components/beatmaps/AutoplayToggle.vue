<script setup lang="ts">
  import { Switch } from "@headlessui/vue";

  const settingsStore = useSettingsStore();
</script>

<template>
  <Switch
    id="isAutoplay"
    v-model="settingsStore.isAutoplay"
    name="isAutoplay"
    class="relative inline-flex h-6 w-11 items-center rounded-full duration-300"
    :class="{
      'bg-green-500 dark:bg-green-500': settingsStore.isAutoplay,
      'bg-gray-400 dark:bg-gray-950': !settingsStore.isAutoplay,
    }"
  >
    <span class="sr-only">Toggle Autoplay</span>
    <span
      :class="settingsStore.isAutoplay ? 'translate-x-6' : 'translate-x-1'"
      class="relative inline-block h-4 w-4 transform rounded-full bg-gray-900 text-gray-100 transition duration-300 dark:bg-gray-100 dark:text-gray-900"
    >
    </span>
  </Switch>
</template>
