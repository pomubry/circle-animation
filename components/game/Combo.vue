<script setup lang="ts">
  interface PropType {
    combo: number;
  }

  defineProps<PropType>();
</script>

<template>
  <Transition name="modal">
    <div v-if="combo > 0" :key="Date.now()" class="absolute top-[35%] w-full">
      <p
        class="select-none text-center text-xl font-extrabold"
        :class="{
          'text-fuchsia-300': combo >= 0 && combo < 50,
          'text-yellow-200': combo >= 50 && combo < 100,
          'text-rose-400': combo >= 100 && combo < 150,
          'text-blue-300': combo >= 150 && combo < 200,
          'text-violet-400': combo >= 200 && combo < 250,
          'text-red-400': combo >= 250 && combo < 300,
          'text-pink-300': combo >= 300 && combo < 350,
          'text-green-200': combo >= 350 && combo < 400,
          'text-cyan-300': combo >= 400 && combo < 450,
          'text-orange-300': combo >= 450 && combo < 500,
          'text-purple-300': combo >= 500,
        }"
      >
        <span class="block">{{ combo }}</span
        >COMBO!
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
