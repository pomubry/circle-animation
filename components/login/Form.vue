<script setup lang="ts">
  import { Toast } from "~/utils/validation";

  const emit = defineEmits<{
    (emit: "setToastProps", payload: Toast): void;
  }>();

  const username = ref("");
  const password = ref("");
  const isLoading = ref(false);
  const usernameError = ref("");
  const passwordError = ref("");
  const userStore = useUserStore();

  const body = computed(() => ({
    username: username.value,
    password: password.value,
  }));

  const handleLogin = async (e: Event) => {
    e.preventDefault();

    const bodyValidated = userCredentialsSchema.safeParse(body.value);

    if (!bodyValidated.success) {
      usernameError.value =
        bodyValidated.error.formErrors.fieldErrors.username?.join(", ") || "";

      passwordError.value =
        bodyValidated.error.formErrors.fieldErrors.password?.join(", ") || "";

      return;
    }

    isLoading.value = true;
    const res = await userStore.login(body.value);
    isLoading.value = false;

    if (res) {
      if ("details" in res) {
        console.error(res.message);
        usernameError.value = res.details?.username?.__errors.join(" ") || "";
        passwordError.value = res.details?.password?.__errors.join(" ") || "";
      } else {
        emit("setToastProps", res);
      }
    }
  };
</script>

<template>
  <form
    class="flex flex-1 flex-col gap-10 rounded-lg bg-gray-100 p-5 duration-300 dark:bg-gray-900 md:flex-[2]"
    @submit="handleLogin"
  >
    <p class="text-xl font-extrabold">Login</p>

    <div class="flex flex-col gap-2">
      <label class="font-bold" for="username">Username:</label>
      <input
        id="username"
        v-model="username"
        class="input-form"
        type="text"
        name="username"
        placeholder="Please enter your username"
        required
      />
      <span
        v-if="usernameError"
        class="font-bold text-red-500 duration-300 dark:text-red-400"
        >{{ usernameError }}</span
      >
    </div>

    <div class="flex flex-col gap-2">
      <label class="font-bold" for="password">Password:</label>
      <input
        id="password"
        v-model="password"
        class="input-form"
        type="password"
        name="password"
        placeholder="Please enter your password"
        required
        :min="6"
      />
      <span
        v-if="passwordError"
        class="font-bold text-red-500 duration-300 dark:text-red-400"
        >{{ passwordError }}</span
      >
    </div>
    <div>
      <button
        type="submit"
        class="rounded-lg bg-green-400 p-3 font-bold duration-300 hover:bg-green-500 dark:bg-green-600 dark:hover:bg-green-700"
        :class="{ 'opacity-50': isLoading }"
        :disabled="isLoading"
      >
        <span v-if="isLoading">Loading...</span>
        <span v-else>Submit</span>
      </button>
    </div>
  </form>
</template>

<style lang="postcss" scoped>
  .input-form {
    @apply rounded-md border-2 border-gray-400 bg-gray-200 p-2 text-gray-900 duration-300 focus:border-transparent dark:border-transparent;
  }
</style>
