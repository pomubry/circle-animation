<script setup lang="ts">
  const settingsStore = useSettingsStore();
</script>

<template>
  <div class="rounded-lg bg-gray-100 p-5 text-sm duration-300 dark:bg-gray-900">
    <h2 class="mb-7 text-xl font-semibold">Settings</h2>
    <ul class="grid grid-cols-1 gap-10 md:grid-cols-3">
      <li>
        <ul class="grid min-h-full items-center gap-3">
          <li class="flex items-center justify-between">
            <label for="group">Group:</label>
            <select
              id="group"
              v-model="settingsStore.group"
              name="group"
              class="cursor-pointer rounded-lg p-2 duration-300 dark:bg-gray-950"
            >
              <option :value="1">Muse</option>
              <option :value="2">Aqours</option>
              <option :value="3">Nijigasaki</option>
            </select>
          </li>
          <li class="flex items-center justify-between">
            <label for="difficulty">Difficulty:</label>
            <select
              id="difficulty"
              v-model="settingsStore.difficulty"
              name="difficulty"
              class="cursor-pointer rounded-lg p-2 duration-300 dark:bg-gray-950"
            >
              <option :value="1">Easy</option>
              <option :value="2">Normal</option>
              <option :value="3">Hard</option>
            </select>
          </li>
          <li class="flex items-center justify-between">
            <label for="attribute">Attribute:</label>
            <select
              id="attribute"
              v-model="settingsStore.attribute"
              name="attribute"
              class="cursor-pointer rounded-lg p-2 duration-300 dark:bg-gray-950"
            >
              <option :value="0">All</option>
              <option :value="1">Smile</option>
              <option :value="2">Pure</option>
              <option :value="3">Cool</option>
            </select>
          </li>
        </ul>
      </li>
      <li>
        <ul class="grid min-h-full items-center gap-3">
          <li class="flex justify-between">
            <label for="isAutoplay">Autoplay:</label>
            <BeatmapsAutoplayToggle />
          </li>
          <li class="flex justify-between">
            <label for="isLabeled">Notes Label:</label>
            <BeatmapsLabelToggle />
          </li>
        </ul>
      </li>
      <li>
        <ul class="grid min-h-full items-center gap-3">
          <li class="flex flex-col">
            <label for="speed" class="flex justify-between">
              Note Speed: <span>{{ settingsStore.speed }}</span>
            </label>
            <input
              id="speed"
              v-model="settingsStore.speed"
              type="range"
              name="speed"
              min="1"
              max="10"
              step="1"
            />
          </li>
          <li class="flex flex-col">
            <label for="musicVolume" class="flex justify-between"
              >Music Volume:
              <span>{{ settingsStore.musicVolume * 10 }}</span></label
            >
            <input
              id="musicVolume"
              v-model="settingsStore.musicVolume"
              type="range"
              name="musicVolume"
              min="0"
              max="1"
              step="0.1"
            />
          </li>
          <li class="flex flex-col">
            <label for="tapVolume" class="flex justify-between"
              >Tap Volume:
              <span>{{ settingsStore.tapVolume * 10 }}</span></label
            >
            <input
              id="tapVolume"
              v-model="settingsStore.tapVolume"
              type="range"
              name="tapVolume"
              min="0"
              max="1"
              step="0.1"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
