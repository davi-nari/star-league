import { defineStore } from "pinia";

import axios from "axios";

const API_URL = "https://e5d67ec257465ce4.mokky.dev";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,

    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,

    isAdmin: (state) => state.user?.role === "admin",
  },

  actions: {
    /*
        LOGIN
      */
    async login(payload) {
      try {
        this.loading = true;

        /*
            MOCK AUTH
          */
        const { data } = await axios.get(`${API_URL}/users`, {
          params: {
            email: payload.email,

            password: payload.password,
          },
        });

        /*
            NOT FOUND
          */
        if (!data.length) {
          throw new Error("INVALID_CREDENTIALS");
        }

        /*
            USER
          */
        this.user = data[0];

        /*
            SAVE
          */
        localStorage.setItem("user", JSON.stringify(data[0]));

        return data[0];
      } catch (error) {
        console.error("LOGIN ERROR:", error);

        throw error;
      } finally {
        this.loading = false;
      }
    },

    /*
        LOGOUT
      */
    logout() {
      this.user = null;

      localStorage.removeItem("user");
    },

    /*
        RESTORE
      */
    restoreSession() {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) return;

      this.user = JSON.parse(savedUser);
    },
  },
});
