<!-- pages/admin/EditTourPage.vue -->

<template>
  <TourForm mode="edit" :tour-id="route.params.id" />
</template>

<script setup>
import { onMounted } from "vue";

import { useRoute } from "vue-router";

import TourForm from "@/components/admin/TourForm.vue";

import { useLeagueStore } from "@/stores/league";

const route = useRoute();

const leagueStore = useLeagueStore();

onMounted(async () => {
  /*
    IMPORTANT:
    сначала загрузить данные
  */
  await leagueStore.fetchLeagueData();
});
</script>
