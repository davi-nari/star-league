import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/auth";

/*
  PAGES
*/
import Home from "@/pages/Home.vue";

import LoginPage from "@/pages/LoginPage.vue";

import MatchPage from "@/pages/MatchPage.vue";

import TeamPage from "@/pages/TeamPage.vue";

/*
  ADMIN
*/
import AdminToursPage from "@/pages/admin/AdminToursPage.vue";

import CreateTourPage from "@/pages/admin/CreateTourPage.vue";

import EditTourPage from "@/pages/admin/EditTourPage.vue";

/*
  ROUTER
*/
export const router = createRouter({
  history: createWebHistory(),

  routes: [
    /*
        HOME
      */
    {
      path: "/",

      name: "Home",

      component: Home,
    },

    /*
        LOGIN
      */
    {
      path: "/login",

      name: "Login",

      component: LoginPage,
    },

    /*
        MATCH
      */
    {
      path: "/match/:id",

      name: "Match",

      component: MatchPage,
    },

    /*
        TEAM
      */
    {
      path: "/team/:slug",

      name: "Team",

      component: TeamPage,
    },

    /*
        ADMIN TOURS
      */
    {
      path: "/admin/tours",

      name: "AdminTours",

      component: AdminToursPage,

      meta: {
        requiresAuth: true,
      },
    },

    /*
        CREATE TOUR
      */
    {
      path: "/admin/tours/create",

      name: "CreateTour",

      component: CreateTourPage,

      meta: {
        requiresAuth: true,
      },
    },

    /*
        EDIT TOUR
      */
    {
      path: "/admin/tours/:id/edit",

      name: "EditTour",

      component: EditTourPage,

      meta: {
        requiresAuth: true,
      },
    },

    /*
        404
      */
    {
      path: "/:pathMatch(.*)*",

      redirect: "/",
    },
  ],
});

/*
  ROUTE GUARD
*/
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  /*
      RESTORE SESSION
    */
  authStore.restoreSession();

  /*
      PROTECTED
    */
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next("/login");
  }

  /*
      LOGIN REDIRECT
    */
  if (to.path === "/login" && authStore.isAuthenticated) {
    return next("/admin/tours");
  }

  next();
});
