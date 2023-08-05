<script setup lang="ts">
  import type { Timings } from "~/utils/types";

  interface PropType {
    timing: Timings;
    now: number;
  }

  defineProps<PropType>();
</script>

<template>
  <Transition name="modal">
    <div v-if="timing" :key="now" class="absolute top-[50%] w-full">
      <p
        class="select-none text-center text-3xl font-extrabold"
        :class="{
          'text-green-200': timing === 'PERFECT',
          'text-blue-300': timing === 'GREAT',
          'text-yellow-200': timing === 'GOOD',
          'text-orange-300': timing === 'BAD',
          'text-red-400': timing === 'EARLY' || timing === 'LATE',
        }"
      >
        {{ timing }}!
      </p>
    </div>
  </Transition>
</template>

<style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.25s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    transform: scale(0);
  }
</style>
