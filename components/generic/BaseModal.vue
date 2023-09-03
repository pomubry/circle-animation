<script setup lang="ts">
  import {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild,
  } from "@headlessui/vue";

  interface Props {
    show: boolean;
    onDialogClose?: (_close: boolean) => void;
  }

  defineProps<Props>();
</script>

<template>
  <ClientOnly>
    <TransitionRoot :show="show" as="template">
      <Dialog class="relative" @close="onDialogClose">
        <TransitionChild
          enter="duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/90 transition" />
        </TransitionChild>
        <div class="fixed inset-0 grid place-content-center p-5">
          <TransitionChild
            enter="duration-300"
            enter-from="opacity-0 scale-0"
            enter-to="opacity-100 scale-100"
            leave="duration-300"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-0"
          >
            <slot>
              <DialogPanel
                class="container rounded-lg bg-gray-100 p-5 text-center text-gray-900 dark:bg-gray-900 dark:text-gray-100"
              >
                Please put a DialogPanel component
              </DialogPanel>
            </slot>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </ClientOnly>
</template>
