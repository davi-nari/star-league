<!-- components/admin/TourForm.vue -->

<template>
  <div class="min-h-screen bg-[#111315] text-white flex">
    <!-- SIDEBAR -->
    <aside
      class="w-65 border-r border-[#23262b] bg-[#181a1d] px-5 py-8 flex flex-col"
    >
      <div class="mb-12">
        <h1 class="text-3xl font-black tracking-tight">STAR LEAGUE</h1>

        <p class="text-sm text-gray-500 mt-1">Admin Panel</p>
      </div>

      <nav class="flex flex-col gap-2">
        <router-link
          to="/admin/tours"
          class="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white text-black font-semibold"
        >
          Туры
        </router-link>
      </nav>
    </aside>

    <!-- CONTENT -->
    <main class="flex-1 overflow-y-auto">
      <!-- HEADER -->
      <header
        class="sticky top-0 z-20 backdrop-blur-xl bg-[#111315]/80 border-b border-[#23262b]"
      >
        <div class="px-10 h-22 flex items-center justify-between">
          <div>
            <h2 class="text-3xl font-bold">
              {{ mode === "edit" ? "Редактирование тура" : "Создание тура" }}
            </h2>

            <p class="text-gray-500 mt-1">Управление матчами</p>
          </div>

          <button
            @click="submitTour"
            class="h-12 px-6 rounded-2xl bg-white text-black font-semibold hover:opacity-90 transition"
          >
            {{ mode === "edit" ? "Сохранить изменения" : "Создать тур" }}
          </button>
        </div>
      </header>

      <!-- BODY -->
      <div class="p-10">
        <!-- TOUR -->
        <section class="mb-12">
          <div class="rounded-3xl border border-[#23262b] bg-[#181a1d] p-8">
            <div class="mb-8">
              <h3 class="text-2xl font-bold">Основная информация</h3>

              <p class="text-gray-500 mt-2">Настройка тура</p>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <!-- Number -->
              <div>
                <label class="block text-sm text-gray-400 mb-3">
                  Номер тура
                </label>

                <input
                  v-model="tour.number"
                  type="number"
                  placeholder="Например: 5"
                  class="w-full h-14 rounded-2xl bg-[#111315] border border-[#2b2f35] px-5 outline-none focus:border-white transition"
                />
              </div>

              <!-- Date -->
              <div>
                <label class="block text-sm text-gray-400 mb-3">
                  Дата тура
                </label>

                <input
                  v-model="tour.date"
                  type="date"
                  class="w-full h-14 rounded-2xl bg-[#111315] border border-[#2b2f35] px-5 outline-none focus:border-white transition"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- MATCHES -->
        <section>
          <!-- Header -->
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="text-2xl font-bold">Матчи</h3>

              <p class="text-gray-500 mt-2">Добавьте пары команд</p>
            </div>

            <button
              @click="addMatch"
              class="h-12 px-5 rounded-2xl bg-[#23262b] hover:bg-[#2b2f35] transition"
            >
              + Добавить матч
            </button>
          </div>

          <!-- Empty -->
          <div
            v-if="!matches.length"
            class="rounded-3xl border border-dashed border-[#2b2f35] h-65 flex flex-col items-center justify-center"
          >
            <h4 class="text-2xl font-bold mb-4">Пока нет матчей</h4>

            <button
              @click="addMatch"
              class="h-12 px-6 rounded-2xl bg-white text-black font-semibold"
            >
              Добавить матч
            </button>
          </div>

          <!-- Matches -->
          <div v-else class="flex flex-col gap-6">
            <div
              v-for="(match, index) in matches"
              :key="match.localId"
              class="rounded-3xl border border-[#23262b] bg-[#181a1d] p-8"
            >
              <!-- TOP -->
              <div class="flex items-center justify-between mb-8">
                <div>
                  <h4 class="text-xl font-bold">
                    Матч
                    {{ index + 1 }}
                  </h4>

                  <p class="text-gray-500 mt-1">Настройка матча</p>
                </div>

                <button
                  @click="removeMatch(index)"
                  class="text-red-400 hover:text-red-300 transition"
                >
                  Удалить
                </button>
              </div>

              <!-- Teams -->
              <div class="grid grid-cols-2 gap-6 mb-8">
                <!-- Home -->
                <div>
                  <label class="block text-sm text-gray-400 mb-3">
                    Хозяева
                  </label>

                  <select
                    v-model="match.homeTeamId"
                    class="w-full h-14 rounded-2xl bg-[#111315] border border-[#2b2f35] px-5 outline-none"
                  >
                    <option :value="null">Выберите команду</option>

                    <option
                      v-for="team in teams"
                      :key="team.id"
                      :value="team.id"
                      :disabled="isTeamDisabled(team.id, match.localId, 'home')"
                    >
                      {{ team.name }}
                    </option>
                  </select>
                </div>

                <!-- Away -->
                <div>
                  <label class="block text-sm text-gray-400 mb-3">
                    Гости
                  </label>

                  <select
                    v-model="match.awayTeamId"
                    class="w-full h-14 rounded-2xl bg-[#111315] border border-[#2b2f35] px-5 outline-none"
                  >
                    <option :value="null">Выберите команду</option>

                    <option
                      v-for="team in teams"
                      :key="team.id"
                      :value="team.id"
                      :disabled="isTeamDisabled(team.id, match.localId, 'away')"
                    >
                      {{ team.name }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- MEDIA -->
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <!-- Home goals -->
                <div>
                  <label class="block text-sm text-gray-400 mb-3">
                    Голы хозяев
                  </label>

                  <input
                    v-model.number="match.homeGoals"
                    type="number"
                    min="0"
                    placeholder="0"
                    class="w-full h-14 rounded-2xl bg-[#111315] border border-[#2b2f35] px-5 outline-none"
                  />
                </div>

                <!-- Away goals -->
                <div>
                  <label class="block text-sm text-gray-400 mb-3">
                    Голы гостей
                  </label>

                  <input
                    v-model.number="match.awayGoals"
                    type="number"
                    min="0"
                    placeholder="0"
                    class="w-full h-14 rounded-2xl bg-[#111315] border border-[#2b2f35] px-5 outline-none"
                  />
                </div>

                <!-- Time -->
                <div>
                  <label class="block text-sm text-gray-400 mb-3">
                    Время матча
                  </label>

                  <input
                    v-model="match.time"
                    type="time"
                    class="w-full h-14 rounded-2xl bg-[#111315] border border-[#2b2f35] px-5 outline-none"
                  />
                </div>

                <!-- Video -->
                <div>
                  <label class="block text-sm text-gray-400 mb-3">
                    Видео
                  </label>

                  <input
                    v-model="match.videoUrl"
                    type="text"
                    placeholder="https://youtube.com/..."
                    class="w-full h-14 rounded-2xl bg-[#111315] border border-[#2b2f35] px-5 outline-none"
                  />
                </div>

                <!-- Photos -->
                <div class="xl:col-span-3">
                  <div class="rounded-3xl border border-[#23262b] bg-[#111315] p-5">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div>
                        <label class="block text-sm text-gray-400 mb-3">Фото</label>
                        <p class="text-xs text-gray-500">Добавьте несколько ссылок на фото-галерею</p>
                      </div>

                      <button
                        type="button"
                        @click="addPhoto(match)"
                        class="h-12 px-4 rounded-2xl bg-[#23262b] hover:bg-[#2b2f35] transition"
                      >
                        + Добавить фото
                      </button>
                    </div>

                    <div class="space-y-3">
                      <div
                        v-for="(photo, photoIndex) in match.photos"
                        :key="photoIndex"
                        class="flex flex-col gap-3 sm:flex-row sm:items-center"
                      >
                        <input
                          v-model="match.photos[photoIndex]"
                          type="text"
                          placeholder="https://drive.google.com/..."
                          class="flex-1 h-14 rounded-2xl bg-[#111315] border border-[#2b2f35] px-5 outline-none"
                        />

                        <button
                          type="button"
                          @click="removePhoto(match, photoIndex)"
                          class="h-14 px-4 rounded-2xl bg-red-500/10 text-red-400 hover:text-red-300 transition"
                          v-if="match.photos.length > 1"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Interviews -->
                <div class="xl:col-span-3">
                  <div class="rounded-3xl border border-[#23262b] bg-[#111315] p-5">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div>
                        <label class="block text-sm text-gray-400 mb-3">Интервью</label>
                        <p class="text-xs text-gray-500">Добавьте несколько ссылок на интервью</p>
                      </div>

                      <button
                        type="button"
                        @click="addInterview(match)"
                        class="h-12 px-4 rounded-2xl bg-[#23262b] hover:bg-[#2b2f35] transition"
                      >
                        + Добавить интервью
                      </button>
                    </div>

                    <div class="space-y-3">
                      <div
                        v-for="(interview, interviewIndex) in match.interviews"
                        :key="interviewIndex"
                        class="flex flex-col gap-3 sm:flex-row sm:items-center"
                      >
                        <input
                          v-model="match.interviews[interviewIndex]"
                          type="text"
                          placeholder="https://youtube.com/..."
                          class="flex-1 h-14 rounded-2xl bg-[#111315] border border-[#2b2f35] px-5 outline-none"
                        />

                        <button
                          type="button"
                          @click="removeInterview(match, interviewIndex)"
                          class="h-14 px-4 rounded-2xl bg-red-500/10 text-red-400 hover:text-red-300 transition"
                          v-if="match.interviews.length > 1"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Status -->
              <div class="mt-8 pt-6 border-t border-[#23262b]">
                <div
                  v-if="isMatchPlayed(match)"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium"
                >
                  Матч считается сыгранным
                </div>

                <div
                  v-else
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-medium"
                >
                  Матч не сыгран
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
<script setup>
import { computed, reactive, watch } from "vue";

import { useRouter } from "vue-router";

import { useLeagueStore } from "@/stores/league";

const props = defineProps({
  mode: {
    type: String,
    default: "create",
  },

  tourId: {
    type: String,
    default: null,
  },
});

const router = useRouter();

const leagueStore = useLeagueStore();

/*
  TEAMS
*/
const teams = computed(() => leagueStore.teams);

/*
  TOUR
*/
const tour = reactive({
  number: "",
  date: "",
});

/*
  MATCHES
*/
const matches = reactive([]);

/*
  EDIT MODE INIT
*/
watch(
  () => ({
    mode: props.mode,

    tourId: props.tourId,

    toursLoaded: leagueStore.tours.length,

    matchesLoaded: leagueStore.matches.length,
  }),

  () => {
    /*
      ONLY EDIT
    */
    if (props.mode !== "edit" || !props.tourId) {
      return;
    }

    /*
      WAIT STORE
    */
    if (!leagueStore.tours.length || !leagueStore.matches.length) {
      return;
    }

    /*
      PREVENT DUPLICATES
    */
    if (matches.length) return;

    /*
      FIND TOUR
    */
    const existingTour = leagueStore.getTourById(props.tourId);

    if (!existingTour) {
      console.error("TOUR NOT FOUND");

      return;
    }

    /*
      SET TOUR
    */
    tour.number = existingTour.number;

    tour.date = existingTour.date;

    /*
      FIND MATCHES
    */
    const existingMatches = existingTour.matchIds
      .map((matchId) =>
        leagueStore.matches.find(
          (match) => String(match.id) === String(matchId),
        ),
      )
      .filter(Boolean);

    /*
      SET MATCHES
    */
    existingMatches.forEach((match) => {
      matches.push({
        localId: crypto.randomUUID(),

        /*
            REAL MATCH ID
          */
        id: match.id,

        homeTeamId: match.homeTeamId,

        awayTeamId: match.awayTeamId,

        homeGoals: match.homeGoals,

        awayGoals: match.awayGoals,

        /*
            MEDIA
          */
        time: match.time || "",

        videoUrl: match.videoUrl || "",

        /*
            MULTIPLE
          */
        photos: match.photos?.length
          ? match.photos
          : match.photosUrl
          ? [match.photosUrl]
          : [""],

        interviews: match.interviews?.length
          ? match.interviews
          : match.interviewUrl
          ? [match.interviewUrl]
          : [""],
      });
    });

    console.log("EDIT LOADED:", matches);
  },

  {
    immediate: true,
  },
);

/*
  ADD MATCH
*/
const addMatch = () => {
  matches.push({
    localId: crypto.randomUUID(),

    /*
      REAL ID
    */
    id: null,

    homeTeamId: null,
    awayTeamId: null,

    homeGoals: null,
    awayGoals: null,

    /*
      MEDIA
    */
    time: "",

    videoUrl: "",

    /*
      MULTIPLE
    */
    photos: [""],

    interviews: [""],
  });
};

/*
  REMOVE MATCH
*/
const removeMatch = (index) => {
  matches.splice(index, 1);
};

/*
  ADD PHOTO
*/
const addPhoto = (match) => {
  match.photos.push("");
};

/*
  REMOVE PHOTO
*/
const removePhoto = (match, index) => {
  match.photos.splice(index, 1);
};

/*
  ADD INTERVIEW
*/
const addInterview = (match) => {
  match.interviews.push("");
};

/*
  REMOVE INTERVIEW
*/
const removeInterview = (match, index) => {
  match.interviews.splice(index, 1);
};

/*
  DISABLED TEAM
*/
const isTeamDisabled = (teamId, currentMatchId, side) => {
  return matches.some((match) => {
    /*
        CURRENT MATCH
      */
    if (match.localId === currentMatchId) {
      /*
          HOME
        */
      if (side === "home") {
        return match.awayTeamId === teamId;
      }

      /*
          AWAY
        */
      if (side === "away") {
        return match.homeTeamId === teamId;
      }

      return false;
    }

    /*
        OTHER MATCHES
      */
    return match.homeTeamId === teamId || match.awayTeamId === teamId;
  });
};

/*
  MATCH PLAYED
*/
const isMatchPlayed = (match) => {
  return match.homeGoals !== null && match.awayGoals !== null;
};

/*
  SUBMIT
*/
const submitTour = async () => {
  /*
      VALIDATION
    */

  if (!tour.number || !tour.date) {
    alert("Заполните тур");

    return;
  }

  if (!matches.length) {
    alert("Добавьте матчи");

    return;
  }

  const invalidMatch = matches.some(
    (match) => !match.homeTeamId || !match.awayTeamId,
  );

  if (invalidMatch) {
    alert("Заполните команды");

    return;
  }

  try {
    /*
        CREATE
      */
    if (props.mode === "create") {
      await leagueStore.createTourWithMatches({
        number: tour.number,

        date: tour.date,

        matches,
      });

      alert("Тур успешно создан");
    } else {
      /*
          EDIT
        */
      await leagueStore.updateTourWithMatches(props.tourId, {
        number: tour.number,

        date: tour.date,

        matches,
      });

      alert("Тур успешно обновлен");
    }

    /*
        REDIRECT
      */
    router.push("/admin/tours");
  } catch (error) {
    console.error(error);

    alert("Ошибка");
  }
};
</script>
