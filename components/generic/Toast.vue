<script setup lang="ts">
  import { Toast } from "~/utils/validation";

  interface PropType {
    toastProp: Toast | null;
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
        v-if="toastProp !== null"
        class="fixed bottom-5 left-5 flex min-w-[14rem] max-w-[18rem] flex-col gap-5 rounded-lg bg-gray-100 p-3 text-gray-900 transition duration-300 dark:bg-gray-900 dark:text-gray-100"
      >
        <div class="flex justify-between">
          <h2
            class="font-semibold"
            :class="{
              'text-red-500': toastProp.type === 'ERROR',
              'dark:text-red-300': toastProp.type === 'ERROR',
              'text-green-500': toastProp.type === 'SUCCESS',
              'dark:text-green-300': toastProp.type === 'SUCCESS',
            }"
          >
            {{ toastProp.title || "Oops! Please press the close button" }}
          </h2>
          <button class="grid items-center" @click="$emit('closeToast')">
            <Icon class="text-xl" name="mdi:close-box-outline" />
          </button>
        </div>
        <p class="text-sm md:text-base">{{ toastProp.description }}</p>
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
