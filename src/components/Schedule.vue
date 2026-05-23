<template>
  <div class="matches-section">
    <!-- EMPTY -->
    <div v-if="!tours.length" class="empty-state text-white">
      <h3>Пока нет матчей</h3>

      <p>Администратор еще не добавил туры</p>
    </div>

    <!-- CONTENT -->
    <template v-else>
      <!-- Tabs -->
      <div class="matchdays-tabs overflow-x-auto scrollbar-hide">
        <div class="flex gap-3 min-w-max">
          <button
            v-for="tour in tours"
            :key="tour.id"
            :class="{
              active: activeTour === tour.id,
            }"
            @click="activeTour = tour.id"
            class="shrink-0"
          >
            {{ tour.number }} тур
          </button>
        </div>
      </div>

      <!-- Tour -->
      <div v-for="tour in activeTourData" :key="tour.id">
        <!-- Tour Info -->
        <div class="matchday__tourInfo">
          <h4>#{{ tour.number }} тур</h4>

          <h4>
            {{ getTourDate(tour.matches) }}
          </h4>
        </div>

        <!-- Matches -->
        <div class="match-grid">
          <router-link
            v-for="match in tour.matches"
            :key="match.id"
            :to="`/match/${match.id}`"
            class="matchday"
          >
            <div class="match__info">
              <!-- Teams -->
              <div class="match__info-teams">
                <!-- Home -->
                <span
                  :class="{
                    loser: match.isPlayed && match.homeGoals < match.awayGoals,
                  }"
                >
                  <img
                    class="team__logo"
                    :src="
                      match.homeTeam?.logo ||
                      '/logo-default/team-logo-default.svg'
                    "
                    alt="team-logo"
                  />

                  {{ match.homeTeam?.name }}
                </span>

                <!-- Away -->
                <span
                  :class="{
                    loser: match.isPlayed && match.awayGoals < match.homeGoals,
                  }"
                >
                  <img
                    class="team__logo"
                    :src="
                      match.awayTeam?.logo ||
                      '/logo-default/team-logo-default.svg'
                    "
                    alt="team-logo"
                  />

                  {{ match.awayTeam?.name }}
                </span>
              </div>
              <!-- Time -->
              <div class="match__info-time">
                <span v-if="match.time" class="time-text">
                  {{ match.time }}
                </span>
              </div>

              <!-- Score -->
              <div class="match__info-score">
                <template v-if="match.isPlayed">
                  <span>
                    {{ match.homeGoals }}
                  </span>

                  <span>
                    {{ match.awayGoals }}
                  </span>
                </template>

                <template v-else>
                  <span>-</span>
                  <span>-</span>
                </template>
              </div>

              <!-- Line -->
              <div class="line"></div>

              <!-- Video / Status -->
              <div>
                <!-- Played -->
                <template v-if="match.isPlayed">
                  <iframe
                    v-if="match.videoUrl"
                    width="560"
                    height="315"
                    :src="match.videoUrl"
                    title="YouTube video player"
                    frameborder="0"
                    allow="
                      accelerometer;
                      autoplay;
                      clipboard-write;
                      encrypted-media;
                      gyroscope;
                      picture-in-picture;
                      web-share;
                    "
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>

                  <div v-else class="match-not-played">Видео отсутствует</div>
                </template>

                <!-- Upcoming -->
                <template v-else>
                  <div class="match-not-played">Матч не сыгран</div>
                </template>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";

import { useLeagueStore } from "@/stores/league";

const leagueStore = useLeagueStore();

/*
  TOURS
*/
const tours = computed(() => {
  return [...leagueStore.toursWithMatches].sort(
    (a, b) => Number(a.number) - Number(b.number),
  );
});

/*
  ACTIVE TOUR
*/
const activeTour = ref(null);

/*
  LAST TOUR ACTIVE
*/
watchEffect(() => {
  if (tours.value.length && !activeTour.value) {
    activeTour.value = tours.value[0].id;
  }
});

/*
  ACTIVE TOUR DATA
*/
const activeTourData = computed(() => {
  return tours.value.filter((tour) => tour.id === activeTour.value);
});

/*
  TOUR DATE
*/
const getTourDate = (matches) => {
  if (!matches?.length) return "";

  return matches[0]?.date || "";
};
</script>

<style lang="scss" scoped>
.matchdays-tabs {
  display: flex;
  gap: 10px;
  margin: 48px 0 32px;

  button {
    font-weight: 500;
    font-size: 20px;
    background: #cfe38e;
    padding: 8px 24px;
    border-radius: 16px;
    color: #011f2c;

    transition: 0.25s;

    &.active {
      background: #ce171a;
      color: #fff;

      &:hover {
        background: #b11417;
      }
    }

    &:hover {
      filter: brightness(0.95);
    }
  }
}

.match-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding-left: 4px;

  @media (max-width: 1224px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.matchday {
  display: flex;
  align-items: center;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #d6d6d6;
  background: white;
  box-shadow: 0 1px 4px 0 rgba(25, 33, 61, 0.08);

  @media (max-width: 475px) {
    padding: 8px 12px;
  }
  &-tabs {
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.matchday__tourInfo {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;

  h4 {
    font-weight: 500;
    font-size: 18px;
    line-height: 120%;
    color: #616161;
  }
}

.match__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;

  span {
    color: #000f16;
    font-weight: 500;
    font-size: 20px;
    display: flex;
    align-items: center;
    gap: 8px;

    @media (max-width: 475px) {
      font-size: 16px;
    }

    img {
      width: 24px;
      height: 24px;
    }
  }

  iframe {
    width: 109px;
    height: 56px;
    border-radius: 4px;
  }

  .loser {
    color: #818181;
  }

  .line {
    width: 1px;
    height: 63px;
    background: #d6d6d6;
  }

  &-score {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &-teams {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  &-time {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;

    .time-text {
      font-size: 14px;
      color: #818181;
      font-weight: 500;
      white-space: nowrap;
    }
  }
}

.match-not-played {
  width: 109px;
  font-size: 14px;
  color: #818181;
  text-align: center;
}
</style>
