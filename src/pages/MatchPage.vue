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
        <div
          class="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 lg:gap-8 pb-4"
        >
          <!-- HOME -->
          <div class="flex flex-col items-center text-center order-1">
            <!-- Logo -->
            <img
              :src="
                match.homeTeam?.logo || '/logo-default/team-logo-default.svg'
              "
              alt="logo"
              class="w-24 h-24 lg:w-34 lg:h-34 object-contain mb-4 lg:mb-5"
            />

            <!-- Name -->
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight"
            >
              {{ match.homeTeam?.name }}
            </h2>
          </div>

          <!-- SCORE -->
          <div class="text-center order-2">
            <!-- Played -->
            <template v-if="match.isPlayed">
              <div
                class="flex items-center justify-center gap-3 lg:gap-5 text-5xl sm:text-6xl lg:text-7xl font-black mb-5"
              >
                <span>
                  {{ match.homeGoals }}
                </span>

                <span class="text-gray-600"> : </span>

                <span>
                  {{ match.awayGoals }}
                </span>
              </div>

              <!-- Status -->
              <div
                class="inline-flex items-center px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-xs sm:text-sm font-semibold"
              >
                Матч завершен
              </div>
            </template>

            <!-- Upcoming -->
            <template v-else>
              <div class="text-4xl sm:text-5xl font-black text-gray-500 mb-5">
                VS
              </div>

              <div
                class="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-xs sm:text-sm font-semibold"
              >
                Матч не сыгран
              </div>
            </template>

            <!-- Date -->
            <div
              class="mt-5 lg:mt-6 text-gray-400 text-sm sm:text-base lg:text-lg"
            >
              {{ formattedDate }}
            </div>

            <div
              v-if="match.time"
              class="mt-2 text-gray-400 text-sm sm:text-base lg:text-lg"
            >
              Время: {{ match.time }}
            </div>
          </div>

          <!-- AWAY -->
          <div class="flex flex-col items-center text-center order-3">
            <!-- Logo -->
            <img
              :src="
                match.awayTeam?.logo || '/logo-default/team-logo-default.svg'
              "
              alt="logo"
              class="w-24 h-24 lg:w-34 lg:h-34 object-contain mb-4 lg:mb-5"
            />

            <!-- Name -->
            <h2
              class="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight"
            >
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
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <!-- INFO -->
        <div
          class="rounded-3xl lg:rounded-4xl border border-[#23262b] bg-[#181a1d] p-5 lg:p-8"
        >
          <!-- Top -->
          <div class="mb-6 lg:mb-8">
            <h3 class="text-2xl lg:text-3xl font-bold mb-2">Информация</h3>

            <p class="text-sm lg:text-base text-gray-500">Данные о матче</p>
          </div>

          <!-- Content -->
          <div class="flex flex-col gap-5">
            <!-- Tour -->
            <div
              class="flex items-center justify-between border-b border-[#23262b] pb-4 gap-4"
            >
              <span class="text-gray-500 text-sm lg:text-base"> Тур </span>

              <span class="font-semibold text-sm lg:text-base text-right">
                {{ tour?.number }} тур
              </span>
            </div>

            <!-- Date -->
            <div
              class="flex items-center justify-between border-b border-[#23262b] pb-4 gap-4"
            >
              <span class="text-gray-500 text-sm lg:text-base"> Дата </span>

              <span class="font-semibold text-sm lg:text-base text-right">
                {{ formattedDate }}
              </span>
            </div>

            <!-- Time -->
            <div
              v-if="match.time"
              class="flex items-center justify-between border-b border-[#23262b] pb-4 gap-4"
            >
              <span class="text-gray-500 text-sm lg:text-base"> Время </span>

              <span class="font-semibold text-sm lg:text-base text-right">
                {{ match.time }}
              </span>
            </div>

            <!-- Status -->
            <div class="flex items-center justify-between gap-4">
              <span class="text-gray-500 text-sm lg:text-base"> Статус </span>

              <span
                :class="[
                  'font-semibold text-sm lg:text-base text-right',
                  match.isPlayed ? 'text-green-400' : 'text-yellow-400',
                ]"
              >
                {{ match.isPlayed ? "Сыгран" : "Не сыгран" }}
              </span>
            </div>
          </div>
        </div>

        <!-- RESULT -->
        <div
          class="rounded-3xl lg:rounded-4xl border border-[#23262b] bg-[#181a1d] p-5 lg:p-8"
        >
          <!-- Top -->
          <div class="mb-6 lg:mb-8">
            <h3 class="text-2xl lg:text-3xl font-bold mb-2">Результат</h3>

            <p class="text-sm lg:text-base text-gray-500">Итог матча</p>
          </div>

          <!-- Played -->
          <div v-if="match.isPlayed" class="flex flex-col gap-5 lg:gap-6">
            <!-- Home -->
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3 lg:gap-4 min-w-0">
                <img
                  :src="
                    match.homeTeam?.logo ||
                    '/logo-default/team-logo-default.svg'
                  "
                  class="w-9 h-9 lg:w-10 lg:h-10 object-contain shrink-0"
                  alt="logo"
                />

                <span class="text-base lg:text-xl font-semibold truncate">
                  {{ match.homeTeam?.name }}
                </span>
              </div>

              <span class="text-2xl lg:text-3xl font-black shrink-0">
                {{ match.homeGoals }}
              </span>
            </div>

            <!-- Away -->
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3 lg:gap-4 min-w-0">
                <img
                  :src="
                    match.awayTeam?.logo ||
                    '/logo-default/team-logo-default.svg'
                  "
                  class="w-9 h-9 lg:w-10 lg:h-10 object-contain shrink-0"
                  alt="logo"
                />

                <span class="text-base lg:text-xl font-semibold truncate">
                  {{ match.awayTeam?.name }}
                </span>
              </div>

              <span class="text-2xl lg:text-3xl font-black shrink-0">
                {{ match.awayGoals }}
              </span>
            </div>
          </div>

          <!-- Upcoming -->
          <div
            v-else
            class="h-40 lg:h-55 flex items-center justify-center text-gray-500 text-lg lg:text-xl text-center"
          >
            Ожидание матча
          </div>
        </div>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8">
        <div class="rounded-3xl lg:rounded-4xl border border-[#23262b] bg-[#181a1d] p-5 lg:p-8">
          <div class="mb-6 lg:mb-8">
            <h3 class="text-2xl lg:text-3xl font-bold mb-2">Фото</h3>
            <p class="text-sm lg:text-base text-gray-500">Ссылки на фото-галерею</p>
          </div>

          <div class="flex flex-col gap-3">
            <template v-if="match.photos?.filter(Boolean).length">
              <a
                v-for="(photo, index) in match.photos.filter(Boolean)"
                :key="index"
                :href="photo"
                target="_blank"
                rel="noreferrer noopener"
                class="flex items-center justify-between rounded-2xl border border-[#23262b] bg-[#111315] px-5 py-4 text-sm text-white hover:bg-[#1f2226] hover:border-[#4f9dff] transition shadow-sm"
                :title="`Открыть фото ${index + 1}`"
              >
                <span class="font-semibold">Фото {{ index + 1 }}</span>
                <span class="text-[#4f9dff]">Открыть ↗</span>
              </a>
            </template>

            <div v-else class="text-gray-500 text-base">Фото пока отсутствуют</div>
          </div>
        </div>

        <div class="rounded-3xl lg:rounded-4xl border border-[#23262b] bg-[#181a1d] p-5 lg:p-8">
          <div class="mb-6 lg:mb-8">
            <h3 class="text-2xl lg:text-3xl font-bold mb-2">Интервью</h3>
            <p class="text-sm lg:text-base text-gray-500">Ссылки на интервью</p>
          </div>

          <div class="flex flex-col gap-3">
            <template v-if="match.interviews?.filter(Boolean).length">
              <a
                v-for="(interview, index) in match.interviews.filter(Boolean)"
                :key="index"
                :href="interview"
                target="_blank"
                rel="noreferrer noopener"
                class="rounded-2xl border border-[#23262b] bg-[#111315] px-5 py-4 text-sm text-white hover:bg-[#1f2226] transition"
              >
                Интервью {{ index + 1 }}
              </a>
            </template>

            <div v-else class="text-gray-500 text-base">Интервью пока отсутствует</div>
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

    photos: currentMatch.photos?.length
      ? currentMatch.photos
      : currentMatch.photosUrl
      ? [currentMatch.photosUrl]
      : [],

    interviews: currentMatch.interviews?.length
      ? currentMatch.interviews
      : currentMatch.interviewUrl
      ? [currentMatch.interviewUrl]
      : [],
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
