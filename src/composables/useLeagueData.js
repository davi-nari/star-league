// composables/useLeagueData.js

import { computed } from "vue";

import { teams } from "@/utils/teams";
import { matches } from "@/utils/matches";
import { tours } from "@/utils/tours";

export function useLeagueData() {
  /*
    =========================
    STANDINGS
    =========================
  */

  const standings = computed(() => {
    const table = {};

    // Инициализация таблицы
    teams.forEach((team) => {
      table[team.id] = {
        ...team,

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

    // Подсчет статистики
    matches.forEach((match) => {
      if (!match.isPlayed) return;

      const homeTeam = table[match.homeTeamId];
      const awayTeam = table[match.awayTeamId];

      if (!homeTeam || !awayTeam) return;

      // Сыграно
      homeTeam.played++;
      awayTeam.played++;

      // Голы
      homeTeam.goalsFor += match.homeGoals;
      homeTeam.goalsAgainst += match.awayGoals;

      awayTeam.goalsFor += match.awayGoals;
      awayTeam.goalsAgainst += match.homeGoals;

      // Разница
      homeTeam.goalDiff =
        homeTeam.goalsFor - homeTeam.goalsAgainst;

      awayTeam.goalDiff =
        awayTeam.goalsFor - awayTeam.goalsAgainst;

      // Победа хозяев
      if (match.homeGoals > match.awayGoals) {
        homeTeam.wins++;
        awayTeam.losses++;

        homeTeam.points += 3;
      }

      // Победа гостей
      else if (match.homeGoals < match.awayGoals) {
        awayTeam.wins++;
        homeTeam.losses++;

        awayTeam.points += 3;
      }

      // Ничья
      else {
        homeTeam.draws++;
        awayTeam.draws++;

        homeTeam.points += 1;
        awayTeam.points += 1;
      }
    });

    // Сортировка таблицы
    return Object.values(table).sort((a, b) => {
      // Очки
      if (b.points !== a.points) {
        return b.points - a.points;
      }

      // Разница голов
      if (b.goalDiff !== a.goalDiff) {
        return b.goalDiff - a.goalDiff;
      }

      // Забитые
      return b.goalsFor - a.goalsFor;
    });
  });

  /*
    =========================
    TOURS WITH MATCHES
    =========================
  */

  const toursWithMatches = computed(() => {
    return tours
      .map((tour) => {
        const tourMatches = tour.matchIds
          .map((matchId) => {
            const match = matches.find(
              (m) => m.id === matchId,
            );

            if (!match) return null;

            const homeTeam = teams.find(
              (team) => team.id === match.homeTeamId,
            );

            const awayTeam = teams.find(
              (team) => team.id === match.awayTeamId,
            );

            return {
              ...match,

              homeTeam,
              awayTeam,
            };
          })
          .filter(Boolean);

        return {
          ...tour,

          matches: tourMatches,
        };
      })
      .sort((a, b) => b.number - a.number);
  });

  /*
    =========================
    HELPERS
    =========================
  */

  const getTeamById = (teamId) => {
    return teams.find((team) => team.id === teamId);
  };

  const getMatchById = (matchId) => {
    return matches.find((match) => match.id === matchId);
  };

  const getTourById = (tourId) => {
    return tours.find((tour) => tour.id === tourId);
  };

  const getMatchesByTeam = (teamId) => {
    return matches.filter(
      (match) =>
        match.homeTeamId === teamId ||
        match.awayTeamId === teamId,
    );
  };

  return {
    teams,

    matches,

    tours,

    standings,

    toursWithMatches,

    getTeamById,

    getMatchById,

    getTourById,

    getMatchesByTeam,
  };
}