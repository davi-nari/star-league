<template>
  <div class="overflow-x-auto rounded-lg border border-gray-200">
    <table class="w-full border-collapse bg-white text-left text-sm">
      <!-- Header -->
      <thead class="bg-gray-50 text-xs font-semibold uppercase text-gray-700">
        <tr>
          <!-- Position -->
          <th class="w-12 px-4 py-3 text-center">#</th>

          <!-- Team -->
          <th class="min-w-50 px-4 py-3">Команда</th>

          <!-- Stats -->
          <th
            v-for="header in statsHeaders"
            :key="header.key"
            class="px-4 py-3 text-center"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(team, index) in standings"
          :key="team.id"
          class="transition-colors hover:bg-gray-50"
        >
          <!-- Position -->
          <td class="px-4 py-4 text-center font-medium text-gray-500">
            {{ index + 1 }}
          </td>

          <!-- Team -->
          <td class="px-4 py-4">
            <router-link
              :to="`/team/${team.slug}`"
              class="group flex items-center gap-3"
            >
              <!-- Logo -->
              <img
                :src="team.logo || '/logo-default/team-logo-default.svg'"
                class="h-8 w-8 object-contain"
                alt="logo"
              />

              <!-- Name -->
              <span
                class="font-bold text-gray-900 transition-colors group-hover:text-blue-600"
              >
                {{ team.name }}
              </span>
            </router-link>
          </td>

          <!-- Stats -->
          <td
            v-for="header in statsHeaders"
            :key="header.key"
            class="px-4 py-4 text-center font-semibold"
          >
            {{ team[header.key] ?? 0 }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from "vue";

import { useLeagueStore } from "@/stores/league";

const leagueStore = useLeagueStore();

/*
  HEADERS
*/
const statsHeaders = [
  /*
    Played
  */
  {
    key: "played",
    label: "И",
  },

  /*
    Wins
  */
  {
    key: "wins",
    label: "В",
  },

  /*
    Draws
  */
  {
    key: "draws",
    label: "Н",
  },

  /*
    Losses
  */
  {
    key: "losses",
    label: "П",
  },

  /*
    Goals For
  */
  {
    key: "goalsFor",
    label: "ЗГ",
  },

  /*
    Goals Against
  */
  {
    key: "goalsAgainst",
    label: "ПГ",
  },

  /*
    Goal Difference
  */
  {
    key: "goalDiff",
    label: "РГ",
  },

  /*
    Points
  */
  {
    key: "points",
    label: "О",
  },
];

/*
  STANDINGS
*/
const standings = computed(() => {
  /*
    Если матчей нет —
    показываем команды с нулями
  */
  if (!leagueStore.standings.length) {
    return leagueStore.teams.map((team) => ({
      ...team,

      played: 0,

      wins: 0,
      draws: 0,
      losses: 0,

      goalsFor: 0,
      goalsAgainst: 0,

      goalDiff: 0,

      points: 0,
    }));
  }

  return leagueStore.standings;
});
</script>
