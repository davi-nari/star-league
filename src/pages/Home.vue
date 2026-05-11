<template>
  <Nav />
  <div v-if="leagueStore.loading" class="text-white text-center py-20">
    Загрузка...
  </div>
  <div class="h-[calc(100vh-83px)] w-full overflow-hidden">
    <img
      src="@/assets/images/banner.jpg"
      alt="Banner"
      class="w-full h-full object-cover"
    />
  </div>
  <main class="main pb-10!">
    <section class="py-12!">
      <div class="container mx-auto">
        <Slider />
      </div>
    </section>
    <section>
      <div class="container" id="standings">
        <h2 class="text-white text-4xl mb-6!">Таблица</h2>
        <Standings />
      </div>
    </section>
    <section class="mt-8!">
      <div class="container" id="schedule">
        <h2 class="text-white text-4xl mb-6!">Расписание</h2>
        <Schedule />
      </div>
    </section>
    <section
      class="mt-8! relative flex items-center justify-center min-h-193.75"
    >
      <div
        class="sect__bg bg-black! absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      ></div>
      <div class="z-1 container text-center translate-y-54">
        <h3 class="text-white text-4xl mb-8!">UAFA</h3>
        <p class="text-white">
          Uzbekistan Amateurs Football Association — это платформа для развития
          любительского футбола в Узбекистане, объединяющая игроков, команды и
          футбольные сообщества. Ассоциация способствует популяризации массового
          футбола, организации турниров и развитию современной спортивной
          культуры.
        </p>
      </div>
    </section>
    <section class="container">
      <h2 class="text-white text-4xl my-6! text-center">Контакты</h2>

      <Contacts />
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted } from "vue";

import Nav from "@/components/Nav.vue";
import Slider from "@/components/Slider.vue";
import Standings from "@/components/Standings.vue";
import Schedule from "@/components/Schedule.vue";
import Contacts from "@/components/Contacts.vue";

import { useLeagueStore } from "@/stores/league";

const leagueStore = useLeagueStore();

/*
  FETCH
*/
onMounted(() => {
  leagueStore.fetchLeagueData();
});

/*
  STORE DATA
*/
const standings = computed(() => leagueStore.standings);

const toursWithMatches = computed(() => leagueStore.toursWithMatches);

onMounted(() => {
  leagueStore.fetchLeagueData();
});
</script>

<style lang="scss" scoped>
.main {
  background-color: #1e1f22;
  .sect__bg {
    background: url("../assets//images/uafa.png") no-repeat center;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
}
</style>
