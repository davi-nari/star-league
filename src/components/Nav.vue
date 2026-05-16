<template>
  <nav
    class="bg-[#0E1201] py-4! shadow-[0_1px_69px_16px_rgba(209,37,44,0.9)] z-99 relative"
  >
    <div
      class="container mx-auto px-4 flex items-center justify-between"
    >
      <!-- LEFT -->
      <div
        class="flex items-center gap-3"
      >
        <!-- Logo -->
        <a href="/">
          <img
            src="@/assets/images/logonav.png"
            alt="logo"
          />
        </a>

        <!-- Partner -->
        <a
          href="https://www.instagram.com/butsi_uz?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          class="hidden md:block"
        >
          <img
            src="@/assets/images/partner.png"
            alt="partner"
            class="w-18"
          />
        </a>
      </div>

      <!-- DESKTOP NAV -->
      <ul
        class="hidden md:flex items-center gap-8 text-white"
      >
        <li>
          <a
            href="#standings"
            class="transition duration-300 hover:text-[#cd4020] font-semibold"
          >
            Таблица
          </a>
        </li>

        <li>
          <a
            href="#schedule"
            class="transition duration-300 hover:text-[#cd4020] font-semibold"
          >
            Расписание
          </a>
        </li>
      </ul>

      <!-- RIGHT -->
      <div
        class="hidden md:flex items-center gap-4"
      >
        <a
          href="https://www.instagram.com/starleague.uzb?igsh=MTZkZGg4dHZncG00Zw=="
          target="_blank"
        >
          <img
            src="@/assets/icons/ins_nav.svg"
            alt="instagram"
          />
        </a>

        <a
          href="https://m.youtube.com/@chelanoofficial"
          target="_blank"
        >
          <img
            src="@/assets/icons/yt_nav.svg"
            alt="youtube"
          />
        </a>
      </div>

      <!-- BURGER -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden flex flex-col gap-1.5"
      >
        <span
          class="w-6 h-0.5 bg-white"
        ></span>

        <span
          class="w-6 h-0.5 bg-white"
        ></span>

        <span
          class="w-6 h-0.5 bg-white"
        ></span>
      </button>
    </div>

    <!-- MOBILE MENU -->
    <transition
      enter-active-class="transition duration-300"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div
        v-if="isOpen"
        class="md:hidden absolute top-full p-4 left-0 w-full bg-[#0E1201] border-t border-[#242424] shadow-2xl"
      >
        <div
          class="container mx-auto px-4 py-6"
        >
          <!-- Links -->
          <ul
            class="flex flex-col gap-5 text-white mb-8"
          >
            <li>
              <a
                href="#standings"
                @click="closeMenu"
                class="text-lg font-semibold hover:text-[#cd4020] transition"
              >
                Таблица
              </a>
            </li>

            <li>
              <a
                href="#schedule"
                @click="closeMenu"
                class="text-lg font-semibold hover:text-[#cd4020] transition"
              >
                Расписание
              </a>
            </li>
          </ul>

          <!-- Socials -->
          <div
            class="flex items-center gap-5 mt-12"
          >
            <a
              href="https://www.instagram.com/starleague.uzb?igsh=MTZkZGg4dHZncG00Zw=="
              target="_blank"
            >
              <img
                src="@/assets/icons/ins_nav.svg"
                alt="instagram"
              />
            </a>

            <a
              href="https://m.youtube.com/@chelanoofficial"
              target="_blank"
            >
              <img
                src="@/assets/icons/yt_nav.svg"
                alt="youtube"
              />
            </a>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from "vue";

/*
  MENU
*/
const isOpen = ref(false);

/*
  CLOSE
*/
const closeMenu = () => {
  isOpen.value = false;
};
</script>