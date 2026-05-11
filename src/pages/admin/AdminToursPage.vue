<!-- pages/admin/AdminToursPage.vue -->

<template>
  <div class="min-h-screen bg-[#111315] text-white flex">
    <!-- SIDEBAR -->
    <aside
      class="w-65 border-r border-[#23262b] bg-[#181a1d] px-5 py-8 flex flex-col"
    >
      <!-- Logo -->
      <div class="mb-12">
        <h1 class="text-3xl font-black tracking-tight">
          STAR LEAGUE
        </h1>

        <p class="text-sm text-gray-500 mt-1">
          Admin Panel
        </p>
      </div>

      <!-- Navigation -->
      <nav class="flex flex-col gap-2">
        <router-link
          to="/admin/tours"
          class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white text-black font-semibold"
        >
          Туры
        </router-link>

        <button
          class="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-300 hover:bg-[#23262b] transition"
        >
          Матчи
        </button>

        <button
          class="flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-300 hover:bg-[#23262b] transition"
        >
          Команды
        </button>
      </nav>
    </aside>

    <!-- CONTENT -->
    <main class="flex-1 p-10">
      <!-- Header -->
      <div
        class="flex items-center justify-between mb-10"
      >
        <div>
          <h2 class="text-4xl font-bold">
            Туры
          </h2>

          <p class="text-gray-500 mt-2">
            Управление турами лиги
          </p>
        </div>

        <router-link
          to="/admin/tours/create"
          class="h-12 px-6 rounded-2xl bg-white text-black font-semibold flex items-center"
        >
          + Создать тур
        </router-link>
      </div>

      <!-- Empty -->
      <div
        v-if="!tours.length"
        class="h-100 border border-dashed border-[#2b2f35] rounded-3xl flex flex-col items-center justify-center"
      >
        <h3 class="text-3xl font-bold mb-4">
          Пока нет туров
        </h3>

        <p class="text-gray-500 mb-8">
          Создайте первый тур
        </p>

        <router-link
          to="/admin/tours/create"
          class="h-12 px-6 rounded-2xl bg-white text-black font-semibold flex items-center"
        >
          Создать тур
        </router-link>
      </div>

      <!-- Tours -->
      <div
        v-else
        class="grid grid-cols-2 gap-6"
      >
        <div
          v-for="tour in tours"
          :key="tour.id"
          class="rounded-3xl border border-[#23262b] bg-[#181a1d] p-8"
        >
          <!-- Top -->
          <div
            class="flex items-start justify-between mb-8"
          >
            <div>
              <h3
                class="text-3xl font-bold mb-2"
              >
                {{ tour.number }} тур
              </h3>

              <p class="text-gray-500">
                {{ tour.date }}
              </p>
            </div>

            <div
              class="px-4 py-2 rounded-full bg-[#23262b] text-sm"
            >
              {{
                tour.matchIds?.length || 0
              }}
              матчей
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-4">
            <router-link
              :to="`/admin/tours/${tour.id}/edit`"
              class="flex-1 h-12 rounded-2xl bg-white text-black font-semibold flex items-center justify-center"
            >
              Редактировать
            </router-link>

            <button
              @click="
                deleteTour(tour.id)
              "
              class="h-12 px-5 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
} from "vue";

import { useLeagueStore } from "@/stores/league";

const leagueStore =
  useLeagueStore();

onMounted(() => {
  leagueStore.fetchTours();
});

const tours = computed(
  () =>
    [...leagueStore.tours].sort(
      (a, b) =>
        b.number - a.number,
    ),
);

const deleteTour = async (id) => {
  const confirmed = confirm(
    "Удалить тур?",
  );

  if (!confirmed) return;

  try {
    await leagueStore.deleteTour(
      id,
    );

    alert("Тур удален");
  }

  catch (error) {
    console.error(error);

    alert("Ошибка удаления");
  }
};
</script>