<script setup lang="ts">
  import {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild,
  } from "@headlessui/vue";

  interface Props {
    serialId: number;
    imgSrc: string;
    alt: string;
    title: string;
    descriptions: string[];
  }

  const isOpen = ref(false);

  function setIsOpen(value: boolean) {
    isOpen.value = value;
  }

  defineProps<Props>();
</script>

<template>
  <div
    class="my-10 grid grid-cols-2 gap-5 rounded-xl bg-gray-100 p-5 shadow-2xl duration-300 dark:bg-gray-900"
  >
    <div class="grid place-content-center">
      <button :aria-label="`Open modal for ${title}`" @click="setIsOpen(true)">
        <img :src="imgSrc" :alt="alt" class="rounded-lg" />
      </button>
    </div>
    <div class="grid place-content-center justify-start">
      <h3
        class="mb-5 text-xl font-extrabold text-green-500 duration-300 dark:text-green-300 lg:text-2xl"
      >
        {{ title }}
      </h3>
      <div class="grid gap-5 text-sm lg:text-base">
        <p v-for="description in descriptions" :key="description">
          {{ description }}
        </p>
      </div>
    </div>
    <div>
      <ClientOnly>
        <TransitionRoot appear :show="isOpen" as="template">
          <Dialog class="relative" @close="setIsOpen">
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
                <DialogPanel
                  class="relative overflow-hidden rounded-lg text-gray-100 transition"
                >
                  <button
                    class="absolute right-2 top-2 text-3xl"
                    :aria-label="`Close modal for ${title}`"
                    @click="setIsOpen(false)"
                  >
                    <Icon name="mdi:close-box" />
                  </button>
                  <img :src="imgSrc" :alt="alt" class="max-h-[80vh]" />
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </TransitionRoot>
      </ClientOnly>
    </div>
  </div>
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
