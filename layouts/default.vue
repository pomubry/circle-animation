<script setup lang="ts">
  const userStore = useUserStore();
  const settingsStore = useSettingsStore();
  const { ToastComponent, setToastProps } = useToast();

  const handleLogout = async () => {
    const payload = await userStore.logout();
    settingsStore.resetSettings();
    if (payload) {
      setToastProps(payload);
    }
  };
</script>

<template>
  <header
    class="flex items-center justify-between p-5 text-lg font-extrabold underline-offset-8"
  >
    <nav class="flex flex-1 items-center justify-between">
      <p class="text-2xl hover:underline">
        <NuxtLink href="/">
          C<span class="text-green-500 duration-300 dark:text-green-300"
            >Ani</span
          >
        </NuxtLink>
      </p>
      <ul class="mr-5 flex gap-3">
        <ClientOnly>
          <template v-if="userStore.user">
            <li class="text-purple-500 duration-300 dark:text-purple-300">
              {{ userStore.user.username }}
            </li>
            <li class="hover:underline">
              <NuxtLink
                href="/beatmaps"
                exact-active-class="auth-link-exact-active"
                >Beatmaps</NuxtLink
              >
            </li>
            <li class="hover:underline">
              <button @click="handleLogout">Logout</button>
            </li>
          </template>

          <template v-else>
            <li class="hover:underline">
              <NuxtLink
                href="/login"
                exact-active-class="auth-link-exact-active"
                >Login</NuxtLink
              >
            </li>
            <li class="hover:underline">
              <NuxtLink
                href="/register"
                exact-active-class="auth-link-exact-active"
                >Register</NuxtLink
              >
            </li>
          </template>
        </ClientOnly>
      </ul>
    </nav>
    <GenericThemeSwitch />
    <ToastComponent />
  </header>

  <slot />

  <footer class="grid place-content-center p-5">
    <p class="font-extrabold hover:underline">
      <a href="https://pomubry.github.io" rel="noopener" target="_blank">
        Pomubry <Icon name="mdi:github" />
      </a>
    </p>
  </footer>
</template>

<style lang="postcss" scoped>
  .auth-link-exact-active {
    @apply text-green-500 duration-300 dark:text-green-300;
  }
</style>
