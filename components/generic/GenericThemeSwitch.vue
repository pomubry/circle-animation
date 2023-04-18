<script setup lang="ts">
import { Switch } from "@headlessui/vue";
const isDarkMode = ref<boolean | null>(null);

const toggle = () => {
  if (getAppTheme() === "dark") {
    setLightMode();
    isDarkMode.value = false;
  } else {
    setDarkMode();
    isDarkMode.value = true;
  }
};

onMounted(() => {
  if (getAppTheme() === "dark") {
    isDarkMode.value = true;
  } else {
    isDarkMode.value = false;
  }
});
</script>

<template>
  <Switch
    v-if="isDarkMode !== null"
    @click="toggle"
    class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-100 dark:bg-gray-900"
  >
    <span class="sr-only">Change Theme</span>
    <span
      :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"
      class="relative inline-block h-4 w-4 transform rounded-full bg-gray-900 text-gray-100 transition dark:bg-gray-100 dark:text-gray-900"
    >
      <Transition name="theme">
        <Icon
          v-if="isDarkMode"
          name="material-symbols:dark-mode"
          key="darkMode"
          class="absolute left-0 h-4 w-4"
        />
        <Icon
          v-else
          name="material-symbols:light-mode"
          key="lightMode"
          class="absolute left-0 h-4 w-4"
        />
      </Transition>
    </span>
  </Switch>
</template>

<style>
.theme-enter-active,
.theme-leave-active {
  transition: opacity 0.5s ease;
}

.theme-enter-from,
.theme-leave-to {
  opacity: 0;
}
</style>
