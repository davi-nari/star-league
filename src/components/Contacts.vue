<template>
  <div>
    <ul class="flex justify-between">
      <li>
        <a
          href="#"
          class="group flex flex-col items-center transition-all duration-300"
        >
          <img src="@/assets/images/qr1.png" alt="" />

          <!-- Добавляем group-hover:text-[#ce171a] для текста -->
          <h3
            class="text-white text-4xl mt-8! transition-colors duration-300 group-hover:text-[#ce171a]"
          >
            СHELANO
          </h3>

          <p
            class="text-white text-4xl transition-colors duration-300 group-hover:text-[#ce171a]"
          >
            YouTube
          </p>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="group flex flex-col items-center transition-all duration-300"
        >
          <img src="@/assets/images/qr2.png" alt="" />

          <!-- Добавляем group-hover:text-[#ce171a] для текста -->
          <h3
            class="text-white text-4xl mt-8! transition-colors duration-300 group-hover:text-[#ce171a]"
          >
            СHELANO
          </h3>

          <p
            class="text-white text-4xl transition-colors duration-300 group-hover:text-[#ce171a]"
          >
            Instagram
          </p>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="group flex flex-col items-center transition-all duration-300"
        >
          <img src="@/assets/images/qr3.png" alt="" />

          <!-- Добавляем group-hover:text-[#ce171a] для текста -->
          <h3
            class="text-white text-4xl mt-8! transition-colors duration-300 group-hover:text-[#ce171a]"
          >
            STAR LEAGUE
          </h3>

          <p
            class="text-white text-4xl transition-colors duration-300 group-hover:text-[#ce171a]"
          >
            Instagram
          </p>
        </a>
      </li>
    </ul>
    <!-- НОВАЯ СЕКЦИЯ: КОНТАКТЫ И КАРТА -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20! items-start">
      <!-- ФОРМА СВЯЗИ -->
      <div
        class="bg-[#1e1f22]/50 p-8! rounded-2xl border border-gray-800 backdrop-blur-sm"
      >
        <h2 class="text-white text-4xl font-bold mb-2!">Свяжитесь с нами</h2>
        <p class="text-gray-400 mb-8!">
          Есть вопросы? Оставьте заявку или позвоните нам.
        </p>

        <form class="space-y-6">
          <input
            type="text"
            placeholder="Ваше имя"
            class="w-full bg-[#0E1201]! border border-gray-700 rounded-xl px-5! py-4! text-white focus:outline-none focus:border-[#ce171a]! transition-colors"
          />

          <div class="flex flex-col space-y-2">
            <label class="text-gray-400 text-sm ml-1! mt-4!"
              >Наш номер телефона:</label
            >
            <a
              href="tel:+998880025252"
              class="text-2xl text-white font-bold hover:text-[#ce171a]! transition-colors"
            >
              +998 (88) 002-52-52
            </a>
          </div>

          <button
            type="submit"
            class="w-full bg-[#ce171a]! hover:bg-[#a81215] text-white font-bold py-4! rounded-xl mt-8! transition-colors"
          >
            Отправить запрос
          </button>
        </form>
      </div>

      <div
        class="h-full min-h-100 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.7002534129256!2d69.25387697055639!3d41.31538401094685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b5e67130a5b%3A0x876361718c9a2303!2z0KTRg9GC0LHQvtC70YzQvdGL0Lkg0JrQu9GD0LEgQ0hFTEFOTw!5e0!3m2!1sru!2s!4v1778511825404!5m2!1sru!2s"
          width="100%"
          height="100%"
          style="
            border: 0;
            filter: invert(90%) hue-rotate(180deg) brightness(95%);
          "
          allowfullscreen=""
          loading="lazy"
        >
        </iframe>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
