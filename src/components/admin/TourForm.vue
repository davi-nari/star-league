<!-- components/admin/TourForm.vue -->

<template>
  <div class="min-h-screen bg-[#111315] text-white flex">
    <!-- SIDEBAR -->
    <aside
      class="w-65 border-r border-[#23262b] bg-[#181a1d] px-5 py-8 flex flex-col"
    >
      <!-- Logo -->
      <div class="mb-12">
        <h1 class="text-3xl font-black tracking-tight">STAR LEAGUE</h1>

        <p class="text-sm text-gray-500 mt-1">Admin Panel</p>
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
    <main class="flex-1 overflow-y-auto">
      <!-- HEADER -->
      <header
        class="sticky top-0 z-20 backdrop-blur-xl bg-[#111315]/80 border-b border-[#23262b]"
      >
        <div class="px-10 h-22 flex items-center justify-between">
          <!-- Left -->
          <div>
            <h2 class="text-3xl font-bold">
              {{ mode === "edit" ? "Редактирование тура" : "Создание тура" }}
            </h2>

            <p class="text-gray-500 mt-1">Управление матчами и результатами</p>
          </div>

          <!-- Save -->
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

            <p class="text-gray-500 mb-8">Добавьте первый матч</p>

            <button
              @click="addMatch"
              class="h-12 px-6 rounded-2xl bg-white text-black font-semibold"
            >
              Добавить матч
            </button>
          </div>

          <!-- MATCHES -->
          <div v-else class="flex flex-col gap-6">
            <div
              v-for="(match, index) in matches"
              :key="match.localId"
              class="rounded-3xl border border-[#23262b] bg-[#181a1d] p-8"
            >
              <!-- Top -->
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

              <!-- SCORE -->
              <div class="grid grid-cols-3 gap-6">
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

        videoUrl: match.videoUrl || "",
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

    videoUrl: "",
  });
};

/*
  REMOVE MATCH
*/
const removeMatch = (index) => {
  matches.splice(index, 1);
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
      /*
        UPDATE LATER
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
