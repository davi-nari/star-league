// stores/league.js

import { defineStore } from "pinia";
import axios from "axios";

import { teams } from "@/utils/teams";

const API_URL = "https://e5d67ec257465ce4.mokky.dev";

export const useLeagueStore = defineStore("league", {
  state: () => ({
    /*
        STATIC
      */
    teams,

    /*
        API
      */
    tours: [],

    matches: [],

    /*
        UI
      */
    loading: false,
  }),

  /*
      GETTERS
    */
  getters: {
    /*
        STANDINGS
      */
    standings: (state) => {
      const table = {};

      /*
          INIT TABLE
        */
      state.teams.forEach((team) => {
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

      /*
          CALCULATE
        */
      state.matches.forEach((match) => {
        if (!match.isPlayed) return;

        const home = table[match.homeTeamId];

        const away = table[match.awayTeamId];

        if (!home || !away) return;

        /*
            PLAYED
          */
        home.played++;
        away.played++;

        /*
            GOALS
          */
        home.goalsFor += match.homeGoals;
        home.goalsAgainst += match.awayGoals;

        away.goalsFor += match.awayGoals;
        away.goalsAgainst += match.homeGoals;

        /*
            GOAL DIFF
          */
        home.goalDiff = home.goalsFor - home.goalsAgainst;

        away.goalDiff = away.goalsFor - away.goalsAgainst;

        /*
            RESULT
          */
        if (match.homeGoals > match.awayGoals) {
          home.wins++;
          away.losses++;

          home.points += 3;
        } else if (match.homeGoals < match.awayGoals) {
          away.wins++;
          home.losses++;

          away.points += 3;
        } else {
          home.draws++;
          away.draws++;

          home.points += 1;
          away.points += 1;
        }
      });

      /*
          SORT
        */
      return Object.values(table).sort((a, b) => {
        /*
              POINTS
            */
        if (b.points !== a.points) {
          return b.points - a.points;
        }

        /*
              GOAL DIFF
            */
        if (b.goalDiff !== a.goalDiff) {
          return b.goalDiff - a.goalDiff;
        }

        /*
              GOALS FOR
            */
        return b.goalsFor - a.goalsFor;
      });
    },

    /*
        TOURS WITH MATCHES
      */
    toursWithMatches: (state) => {
      return [...state.tours]
        .map((tour) => {
          const tourMatches = tour.matchIds
            .map((matchId) => {
              const match = state.matches.find((m) => m.id === matchId);

              if (!match) return null;

              const homeTeam = state.teams.find(
                (team) => team.id === match.homeTeamId,
              );

              const awayTeam = state.teams.find(
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
    },
  },

  /*
      ACTIONS
    */
  actions: {
    /*
        FETCH TOURS
      */
    async fetchTours() {
      try {
        this.loading = true;

        const { data } = await axios.get(`${API_URL}/tours`);

        this.tours = data;
      } catch (error) {
        console.error("FETCH TOURS ERROR:", error);
      } finally {
        this.loading = false;
      }
    },

    /*
  DELETE TOUR
*/
    async deleteTour(tourId) {
      try {
        /*
      FIND TOUR
    */
        const tour = this.tours.find((t) => t.id === tourId);

        if (!tour) return;

        /*
      DELETE MATCHES
    */
        for (const matchId of tour.matchIds) {
          await axios.delete(`${API_URL}/matches/${matchId}`);

          this.matches = this.matches.filter((match) => match.id !== matchId);
        }

        /*
      DELETE TOUR
    */
        await axios.delete(`${API_URL}/tours/${tourId}`);

        this.tours = this.tours.filter((tour) => tour.id !== tourId);
      } catch (error) {
        console.error("DELETE TOUR ERROR:", error);

        throw error;
      }
    },

    /*
        FETCH MATCHES
      */
    async fetchMatches() {
      try {
        this.loading = true;

        const { data } = await axios.get(`${API_URL}/matches`);

        this.matches = data;
      } catch (error) {
        console.error("FETCH MATCHES ERROR:", error);
      } finally {
        this.loading = false;
      }
    },

    /*
  GET TOUR BY ID
*/
    getTourById(tourId) {
      return this.tours.find((tour) => String(tour.id) === String(tourId));
    },
    /*
  UPDATE TOUR FLOW
*/
    async updateTourWithMatches(tourId, payload) {
      try {
        /*
      FIND EXISTING TOUR
    */
        const existingTour = this.getTourById(tourId);

        if (!existingTour) {
          throw new Error("TOUR NOT FOUND");
        }

        /*
      OLD MATCH IDS
    */
        const oldMatchIds = existingTour.matchIds || [];

        /*
      NEW IDS
    */
        const updatedMatchIds = [];

        /*
      PROCESS MATCHES
    */
        for (const match of payload.matches) {
          const isPlayed = match.homeGoals !== null && match.awayGoals !== null;

          const formattedMatch = {
            homeTeamId: match.homeTeamId,

            awayTeamId: match.awayTeamId,

            homeGoals: isPlayed ? match.homeGoals : null,

            awayGoals: isPlayed ? match.awayGoals : null,

            isPlayed,

            videoUrl: match.videoUrl || "",

            time: match.time || "",

            photos: Array.isArray(match.photos)
              ? match.photos.filter(Boolean)
              : match.photos
              ? [match.photos]
              : [],

            interviews: Array.isArray(match.interviews)
              ? match.interviews.filter(Boolean)
              : match.interviews
              ? [match.interviews]
              : [],

            date: payload.date,
          };

          /*
        UPDATE EXISTING
      */
          if (match.id) {
            const { data } = await axios.patch(
              `${API_URL}/matches/${match.id}`,
              formattedMatch,
            );

            /*
          UPDATE STORE
        */
            const index = this.matches.findIndex(
              (m) => String(m.id) === String(match.id),
            );

            if (index !== -1) {
              this.matches[index] = data;
            }

            updatedMatchIds.push(data.id);
          } else {

          /*
        CREATE NEW
      */
            const { data } = await axios.post(
              `${API_URL}/matches`,
              formattedMatch,
            );

            this.matches.push(data);

            updatedMatchIds.push(data.id);
          }
        }

        /*
      FIND REMOVED MATCHES
    */
        const removedMatchIds = oldMatchIds.filter(
          (oldId) =>
            !updatedMatchIds.some((newId) => String(newId) === String(oldId)),
        );

        /*
      DELETE REMOVED
    */
        for (const matchId of removedMatchIds) {
          await axios.delete(`${API_URL}/matches/${matchId}`);

          this.matches = this.matches.filter(
            (match) => String(match.id) !== String(matchId),
          );
        }

        /*
      UPDATE TOUR
    */
        const updatedTour = {
          number: Number(payload.number),

          date: payload.date,

          matchIds: updatedMatchIds,
        };

        const { data } = await axios.patch(
          `${API_URL}/tours/${tourId}`,
          updatedTour,
        );

        /*
      UPDATE STORE
    */
        const tourIndex = this.tours.findIndex(
          (tour) => String(tour.id) === String(tourId),
        );

        if (tourIndex !== -1) {
          this.tours[tourIndex] = data;
        }

        return data;
      } catch (error) {
        console.error("UPDATE TOUR ERROR:", error);

        throw error;
      }
    },

    /*
        FETCH ALL
      */
    async fetchLeagueData() {
      await Promise.all([this.fetchTours(), this.fetchMatches()]);
    },

    /*
        CREATE TOUR
      */
    async createTour(formattedTour) {
      try {
        const { data } = await axios.post(`${API_URL}/tours`, formattedTour);

        this.tours.push(data);

        return data;
      } catch (error) {
        console.error("CREATE TOUR ERROR:", error);

        throw error;
      }
    },

    /*
        CREATE MATCH
      */
    async createMatch(formattedMatch) {
      try {
        const { data } = await axios.post(`${API_URL}/matches`, formattedMatch);

        this.matches.push(data);

        return data;
      } catch (error) {
        console.error("CREATE MATCH ERROR:", error);

        throw error;
      }
    },

    /*
        CREATE FULL TOUR FLOW
      */
    async createTourWithMatches(payload) {
      try {
        /*
            payload:
            {
              number,
              date,
              matches
            }
          */

        const matchIds = [];

        /*
            CREATE MATCHES
          */
        for (const match of payload.matches) {
          const played = match.homeGoals !== null && match.awayGoals !== null;

          const formattedMatch = {
            homeTeamId: match.homeTeamId,

            awayTeamId: match.awayTeamId,

            homeGoals: played ? match.homeGoals : null,

            awayGoals: played ? match.awayGoals : null,

            isPlayed: played,

            videoUrl: match.videoUrl || "",

            time: match.time || "",

            photos: Array.isArray(match.photos)
              ? match.photos.filter(Boolean)
              : match.photos
              ? [match.photos]
              : [],

            interviews: Array.isArray(match.interviews)
              ? match.interviews.filter(Boolean)
              : match.interviews
              ? [match.interviews]
              : [],

            date: payload.date,
          };

          const createdMatch = await this.createMatch(formattedMatch);

          matchIds.push(createdMatch.id);
        }

        /*
            CREATE TOUR
          */
        const formattedTour = {
          number: Number(payload.number),

          date: payload.date,

          matchIds,
        };

        await this.createTour(formattedTour);
      } catch (error) {
        console.error("CREATE TOUR FLOW ERROR:", error);
      }
    },

    /*
        GET MATCH BY ID
      */
    getMatchById(matchId) {
      return this.matches.find((match) => match.id === matchId);
    },

    /*
        GET TEAM BY ID
      */
    getTeamById(teamId) {
      return this.teams.find((team) => team.id === teamId);
    },
  },
});
