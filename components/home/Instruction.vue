<script setup lang="ts">
  interface Props {
    serialId: number;
    imgSrc: string;
    alt: string;
    title: string;
    descriptions: string[];
  }

  defineProps<Props>();
</script>

<template>
  <div
    class="my-10 grid grid-cols-2 gap-5 rounded-xl bg-gray-100 p-5 shadow-2xl duration-300 dark:bg-gray-900"
  >
    <div class="grid place-content-center">
      <img :src="imgSrc" :alt="alt" class="rounded-lg" />
    </div>
    <div>
      <h3
        class="mb-5 text-xl font-bold text-green-500 duration-300 dark:text-green-300"
      >
        {{ title }}
      </h3>
      <div class="grid gap-5 text-sm font-semibold">
        <p v-for="description in descriptions" :key="description">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
