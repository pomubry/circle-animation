<script setup lang="ts">
  const url = ref("");

  const submit = (e: Event) => {
    e.preventDefault();
    $fetch(url.value, {
      method: "POST",
      body: {
        desc: "from the frontend",
      },
    })
      .then((res) => console.info("Success:", res))
      .catch((err) => console.error("Failed:", err));
  };
</script>

<template>
  <form
    class="grid place-content-center gap-5 bg-gray-100 p-5 duration-300 dark:bg-gray-900"
    @submit="submit"
  >
    <div class="grid place-content-center">
      <label for="url" class="font-semibold">Enter URL:</label>
      <input
        id="url"
        v-model="url"
        type="text"
        class="darl:border-green-300 mt-2 rounded-lg border border-green-600 p-3 text-gray-900"
      />
    </div>
    <button
      type="submit"
      class="rounded-lg bg-green-300 p-5 font-semibold duration-300 dark:bg-green-600"
    >
      Submit
    </button>
  </form>
</template>
