# MatchPage.vue ```vue
<template>
  <div class="min-h-screen bg-[#111315] text-white pb-8">
    <!-- HEADER -->
    <section class="border-b border-[#23262b] bg-[#181a1d]">
      <div class="container mx-auto px-6 py-12">
        <!-- Back -->
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition my-10"
        >
          ← Назад
        </router-link>

        <!-- Match -->
        <div class="grid grid-cols-3 items-center gap-8 pb-4">
          <!-- HOME -->
          <div class="flex flex-col items-center text-center">
            <img
              :src="
                match.homeTeam?.logo || '/logo-default/team-logo-default.svg'
              "
              alt="logo"
              class="w-34 h-34 object-contain mb-5"
            />

            <h2 class="text-4xl font-black">
              {{ match.homeTeam?.name }}
            </h2>
          </div>

          <!-- SCORE -->
          <div class="text-center ">
            <!-- Played -->
            <template v-if="match.isPlayed" >
              <div
                class="flex items-center justify-center gap-5 text-7xl font-black mb-5 "
              >
                <span>
                  {{ match.homeGoals }}
                </span>

                <span class="text-gray-600"> : </span>

                <span>
                  {{ match.awayGoals }}
                </span>
              </div>

              <div
                class="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-semibold"
              >
                Матч завершен
              </div>
            </template>

            <!-- Upcoming -->
            <template v-else>
              <div class="text-5xl font-black text-gray-500 mb-5">VS</div>

              <div
                class="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-semibold"
              >
                Матч не сыгран
              </div>
            </template>

            <!-- Date -->
            <div class="mt-6 text-gray-400 text-lg">
              {{ formattedDate }}
            </div>
          </div>

          <!-- AWAY -->
          <div class="flex flex-col items-center text-center">
            <img
              :src="
                match.awayTeam?.logo || '/logo-default/team-logo-default.svg'
              "
              alt="logo"
              class="w-34 h-34 object-contain mb-5"
            />

            <h2 class="text-4xl font-black">
              {{ match.awayTeam?.name }}
            </h2>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <main class="container mx-auto px-6 py-12">
      <!-- VIDEO -->
      <section
        class="rounded-4xl border border-[#23262b] bg-[#181a1d] p-8 my-10"
      >
        <div class="mb-8">
          <h3 class="text-3xl font-bold mb-2">Видео матча</h3>

          <p class="text-gray-500">Полная запись встречи</p>
        </div>

        <!-- Video -->
        <div
          v-if="match.videoUrl"
          class="aspect-video overflow-hidden rounded-3xl border border-[#23262b]"
        >
          <iframe
            class="w-full h-full"
            :src="embedVideoUrl"
            title="YouTube video player"
            frameborder="0"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share;
            "
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Empty -->
        <div
          v-else
          class="h-80 rounded-3xl border border-dashed border-[#2b2f35] flex items-center justify-center text-gray-500 text-xl"
        >
          Видео пока отсутствует
        </div>
      </section>

      <!-- MATCH INFO -->
      <section class="grid grid-cols-2 gap-8">
        <!-- INFO -->
        <div class="rounded-4xl border border-[#23262b] bg-[#181a1d] p-8">
          <div class="mb-8">
            <h3 class="text-3xl font-bold mb-2">Информация</h3>

            <p class="text-gray-500">Данные о матче</p>
          </div>

          <div class="flex flex-col gap-5">
            <!-- Tour -->
            <div
              class="flex items-center justify-between border-b border-[#23262b] pb-4"
            >
              <span class="text-gray-500"> Тур </span>

              <span class="font-semibold"> {{ tour?.number }} тур </span>
            </div>

            <!-- Date -->
            <div
              class="flex items-center justify-between border-b border-[#23262b] pb-4"
            >
              <span class="text-gray-500"> Дата </span>

              <span class="font-semibold">
                {{ formattedDate }}
              </span>
            </div>

            <!-- Status -->
            <div class="flex items-center justify-between pb-2">
              <span class="text-gray-500"> Статус </span>

              <span
                :class="[
                  'font-semibold',
                  match.isPlayed ? 'text-green-400' : 'text-yellow-400',
                ]"
              >
                {{ match.isPlayed ? "Сыгран" : "Не сыгран" }}
              </span>
            </div>
          </div>
        </div>

        <!-- RESULT -->
        <div class="rounded-4xl border border-[#23262b] bg-[#181a1d] p-8">
          <div class="mb-8">
            <h3 class="text-3xl font-bold mb-2">Результат</h3>

            <p class="text-gray-500">Итог матча</p>
          </div>

          <div v-if="match.isPlayed" class="flex flex-col gap-6">
            <!-- Home -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <img
                  :src="
                    match.homeTeam?.logo ||
                    '/logo-default/team-logo-default.svg'
                  "
                  class="w-10 h-10 object-contain"
                  alt="logo"
                />

                <span class="text-xl font-semibold">
                  {{ match.homeTeam?.name }}
                </span>
              </div>

              <span class="text-3xl font-black">
                {{ match.homeGoals }}
              </span>
            </div>

            <!-- Away -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <img
                  :src="
                    match.awayTeam?.logo ||
                    '/logo-default/team-logo-default.svg'
                  "
                  class="w-10 h-10 object-contain"
                  alt="logo"
                />

                <span class="text-xl font-semibold">
                  {{ match.awayTeam?.name }}
                </span>
              </div>

              <span class="text-3xl font-black">
                {{ match.awayGoals }}
              </span>
            </div>
          </div>

          <!-- Upcoming -->
          <div
            v-else
            class="h-55 flex items-center justify-center text-gray-500 text-xl"
          >
            Ожидание матча
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";

import { useRoute } from "vue-router";

import { useLeagueStore } from "@/stores/league";

const route = useRoute();

const leagueStore = useLeagueStore();

onMounted(async () => {
  await leagueStore.fetchLeagueData();
});

/*
  MATCH
*/
const match = computed(() => {
  const currentMatch = leagueStore.matches.find(
    (match) => String(match.id) === String(route.params.id),
  );

  if (!currentMatch) return {};

  return {
    ...currentMatch,

    homeTeam: leagueStore.getTeamById(currentMatch.homeTeamId),

    awayTeam: leagueStore.getTeamById(currentMatch.awayTeamId),
  };
});

/*
  TOUR
*/
const tour = computed(() => {
  return leagueStore.tours.find((tour) =>
    tour.matchIds?.some(
      (matchId) => String(matchId) === String(route.params.id),
    ),
  );
});

/*
  DATE
*/
const formattedDate = computed(() => {
  if (!match.value?.date) return "Дата не указана";

  return new Date(match.value.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});

/*
  EMBED VIDEO
*/
const embedVideoUrl = computed(() => {
  if (!match.value.videoUrl) return "";

  const url = match.value.videoUrl;

  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  return url;
});
</script>
