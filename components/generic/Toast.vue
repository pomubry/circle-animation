<script setup lang="ts">
  import type { Toast } from "~/utils/types";

  interface PropType {
    toastProps: Toast | null;
  }
  interface EmitType {
    (e: "closeToast"): void;
  }

  defineProps<PropType>();
  defineEmits<EmitType>();
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="toastProps !== null"
        class="fixed bottom-5 left-5 z-10 flex min-w-[14rem] max-w-[18rem] flex-col gap-5 rounded-lg bg-gray-100 p-3 text-gray-900 transition duration-300 dark:bg-gray-900 dark:text-gray-100"
      >
        <div class="flex justify-between">
          <h2
            class="font-semibold"
            :class="{
              'text-red-500': toastProps.type === 'ERROR',
              'dark:text-red-300': toastProps.type === 'ERROR',
              'text-green-500': toastProps.type === 'SUCCESS',
              'dark:text-green-300': toastProps.type === 'SUCCESS',
            }"
          >
            {{ toastProps.title || "Oops! Please press the close button" }}
          </h2>
          <button class="grid items-center" @click="$emit('closeToast')">
            <Icon class="text-xl" name="mdi:close-box-outline" />
          </button>
        </div>
        <p class="text-sm md:text-base">{{ toastProps.description }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .modal-enter-from {
    opacity: 0;
    transform: translateX(-5px);
  }

  .modal-leave-to {
    opacity: 0;
    transform: translateX(-5px);
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1) translateX(0px);
  }
</style>
