# TeamPage.vue

```vue
<template>
  <div class="min-h-screen bg-[#111315] text-white">
    <!-- HERO -->
    <section
      class="border-b border-[#23262b] bg-[#181a1d]"
    >
      <div
        class="container mx-auto px-6 py-14"
      >
        <!-- Back -->
        <router-link
          to="/"
          class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition my-10"
        >
          ← Назад
        </router-link>

        <!-- Team -->
        <div
          class="flex flex-col lg:flex-row items-center lg:items-end mb-10 gap-10"
        >
          <!-- Logo -->
          <div
            class="w-52 h-52 rounded-4xl border border-[#23262b] bg-[#111315] flex items-center justify-center p-6"
          >
            <img
              :src="
                team.logo ||
                '/logo-default/team-logo-default.svg'
              "
              alt="logo"
              class="w-full h-full object-contain"
            />
          </div>

          <!-- Info -->
          <div class="flex-1">
            <div
              class="flex flex-wrap items-center gap-4 mb-6"
            >
              <div
                class="px-4 py-2 rounded-full bg-white text-black font-semibold"
              >
                {{ position }} место
              </div>

              <div
                class="px-4 py-2 rounded-full bg-[#23262b] text-white"
              >
                {{ teamStats.points }} очков
              </div>
            </div>

            <h1
              class="text-5xl lg:text-7xl font-black mb-6"
            >
              {{ team.name }}
            </h1>

            <!-- Stats -->
            <div
              class="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div
                class="rounded-3xl border border-[#23262b] bg-[#111315] p-5"
              >
                <div
                  class="text-gray-500 text-sm mb-2"
                >
                  Матчи
                </div>

                <div
                  class="text-3xl font-black"
                >
                  {{ teamStats.played }}
                </div>
              </div>

              <div
                class="rounded-3xl border border-[#23262b] bg-[#111315] p-5"
              >
                <div
                  class="text-gray-500 text-sm mb-2"
                >
                  Победы
                </div>

                <div
                  class="text-3xl font-black text-green-400"
                >
                  {{ teamStats.wins }}
                </div>
              </div>

              <div
                class="rounded-3xl border border-[#23262b] bg-[#111315] p-5"
              >
                <div
                  class="text-gray-500 text-sm mb-2"
                >
                  Разница
                </div>

                <div
                  class="text-3xl font-black"
                >
                  {{ teamStats.goalDiff }}
                </div>
              </div>

              <div
                class="rounded-3xl border border-[#23262b] bg-[#111315] p-5"
              >
                <div
                  class="text-gray-500 text-sm mb-2"
                >
                  Голы
                </div>

                <div
                  class="text-3xl font-black"
                >
                  {{ teamStats.goalsFor }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTENT -->
    <main class="container mx-auto px-6 py-12">
      <!-- MATCHES -->
      <section>
        <div class="my-10">
          <h2
            class="text-4xl font-bold mb-3"
          >
            Матчи команды
          </h2>

          <p class="text-gray-500">
            Последние и предстоящие игры
          </p>
        </div>

        <!-- Empty -->
        <div
          v-if="!teamMatches.length"
          class="h-80 rounded-4xl border border-dashed border-[#2b2f35] flex items-center justify-center text-gray-500 text-2xl"
        >
          У команды пока нет матчей
        </div>

        <!-- Matches -->
        <div
          v-else
          class="flex flex-col gap-5"
        >
          <router-link
            v-for="match in teamMatches"
            :key="match.id"
            :to="`/match/${match.id}`"
            class="rounded-4xl border border-[#23262b] bg-[#181a1d] p-8 hover:border-[#3b4048] transition"
          >
            <div
              class="flex flex-col lg:flex-row lg:items-center justify-between gap-8"
            >
              <!-- Teams -->
              <div
                class="flex-1 flex flex-col gap-5"
              >
                <!-- Home -->
                <div
                  class="flex items-center justify-between"
                >
                  <div
                    class="flex items-center gap-4"
                  >
                    <img
                      :src="
                        match.homeTeam
                          ?.logo ||
                        '/logo-default/team-logo-default.svg'
                      "
                      alt="logo"
                      class="w-12 h-12 object-contain"
                    />

                    <span
                      :class="[
                        'text-2xl font-bold',
                        isLoser(match, 'home')
                          ? 'text-gray-500'
                          : 'text-white',
                      ]"
                    >
                      {{
                        match.homeTeam?.name
                      }}
                    </span>
                  </div>

                  <span
                    class="text-4xl font-black"
                  >
                    {{
                      match.isPlayed
                        ? match.homeGoals
                        : '-'
                    }}
                  </span>
                </div>

                <!-- Away -->
                <div
                  class="flex items-center justify-between"
                >
                  <div
                    class="flex items-center gap-4"
                  >
                    <img
                      :src="
                        match.awayTeam
                          ?.logo ||
                        '/logo-default/team-logo-default.svg'
                      "
                      alt="logo"
                      class="w-12 h-12 object-contain"
                    />

                    <span
                      :class="[
                        'text-2xl font-bold',
                        isLoser(match, 'away')
                          ? 'text-gray-500'
                          : 'text-white',
                      ]"
                    >
                      {{
                        match.awayTeam?.name
                      }}
                    </span>
                  </div>

                  <span
                    class="text-4xl font-black"
                  >
                    {{
                      match.isPlayed
                        ? match.awayGoals
                        : '-'
                    }}
                  </span>
                </div>
              </div>

              <!-- Right -->
              <div
                class="lg:w-70 flex flex-col items-start lg:items-end gap-4"
              >
                <!-- Status -->
                <div
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-semibold',
                    match.isPlayed
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-yellow-500/10 text-yellow-400',
                  ]"
                >
                  {{
                    match.isPlayed
                      ? 'Матч завершен'
                      : 'Матч не сыгран'
                  }}
                </div>

                <!-- Date -->
                <div
                  class="text-gray-400"
                >
                  {{
                    formatDate(match.date)
                  }}
                </div>

                <!-- Video -->
                <div
                  v-if="match.videoUrl"
                  class="text-white font-semibold"
                >
                  Видео доступно
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
} from 'vue';

import { useRoute } from 'vue-router';

import { useLeagueStore } from '@/stores/league';

const route = useRoute();

const leagueStore =
  useLeagueStore();

onMounted(async () => {
  await leagueStore.fetchLeagueData();
});

/*
  TEAM
*/
const team = computed(() => {
  return (
    leagueStore.teams.find(
      (team) =>
        team.slug ===
        route.params.slug,
    ) || {}
  );
});

/*
  STATS
*/
const teamStats = computed(() => {
  const standing =
    leagueStore.standings.find(
      (standing) =>
        String(standing.id) ===
        String(team.value.id),
    );

  if (standing) return standing;

  return {
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDiff: 0,
    points: 0,
  };
});

/*
  POSITION
*/
const position = computed(() => {
  const index =
    leagueStore.standings.findIndex(
      (standing) =>
        String(standing.id) ===
        String(team.value.id),
    );

  if (index === -1) return '-';

  return index + 1;
});

/*
  MATCHES
*/
const teamMatches = computed(() => {
  return leagueStore.matches
    .filter(
      (match) =>
        String(
          match.homeTeamId,
        ) ===
          String(team.value.id) ||
        String(
          match.awayTeamId,
        ) ===
          String(team.value.id),
    )
    .map((match) => ({
      ...match,

      homeTeam:
        leagueStore.getTeamById(
          match.homeTeamId,
        ),

      awayTeam:
        leagueStore.getTeamById(
          match.awayTeamId,
        ),
    }))
    .sort(
      (a, b) =>
        new Date(b.date) -
        new Date(a.date),
    );
});

/*
  FORMAT DATE
*/
const formatDate = (date) => {
  if (!date)
    return 'Дата не указана';

  return new Date(
    date,
  ).toLocaleDateString(
    'ru-RU',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  );
};

/*
  LOSER
*/
const isLoser = (
  match,
  side,
) => {
  if (!match.isPlayed)
    return false;

  if (side === 'home') {
    return (
      match.homeGoals <
      match.awayGoals
    );
  }

  return (
    match.awayGoals <
    match.homeGoals
  );
};
</script>
```

# Route

```js
{
  path: '/team/:slug',
  component: TeamPage,
}
```
