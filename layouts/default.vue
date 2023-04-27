<template>
  <header
    class="flex items-center justify-between p-5 text-lg font-extrabold underline-offset-8"
  >
    <nav class="flex flex-1 items-center justify-between">
      <p class="text-2xl hover:underline">
        <NuxtLink href="/">
          C<span class="text-green-500 duration-300 dark:text-green-300"
            >ani</span
          >
        </NuxtLink>
      </p>
      <ul class="mr-5 flex gap-3">
        <li class="hover:underline">
          <NuxtLink href="/login">Login</NuxtLink>
        </li>
        <li class="hover:underline">
          <NuxtLink href="/register">Register</NuxtLink>
        </li>
      </ul>
    </nav>
    <GenericThemeSwitch />
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
