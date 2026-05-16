<template>
  <div>
    <!-- SOCIALS -->
    <ul class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <!-- YOUTUBE -->
      <li>
        <a
          href="https://m.youtube.com/@chelanoofficial"
          target="_blank"
          class="group flex flex-col items-center transition-all duration-300"
        >
          <img src="@/assets/images/qr1.png" alt="qr" />

          <h3
            class="text-white text-4xl mt-8! transition-colors duration-300 group-hover:text-[#ce171a]"
          >
            CHELANO
          </h3>

          <p
            class="text-white text-4xl transition-colors duration-300 group-hover:text-[#ce171a]"
          >
            YouTube
          </p>
        </a>
      </li>

      <!-- INST -->
      <li>
        <a
          href="https://www.instagram.com/fc_chelano?igsh=MmUxMjc0b3pwa2Jx"
          target="_blank"
          class="group flex flex-col items-center transition-all duration-300"
        >
          <img src="@/assets/images/qr2.png" alt="qr" />

          <h3
            class="text-white text-4xl mt-8! transition-colors duration-300 group-hover:text-[#ce171a]"
          >
            CHELANO
          </h3>

          <p
            class="text-white text-4xl transition-colors duration-300 group-hover:text-[#ce171a]"
          >
            Instagram
          </p>
        </a>
      </li>

      <!-- STAR -->
      <li>
        <a
          href="https://www.instagram.com/starleague.uzb?igsh=MTZkZGg4dHZncG00Zw=="
          target="_blank"
          class="group flex flex-col items-center transition-all duration-300"
        >
          <img src="@/assets/images/qr3.png" alt="qr" />

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

    <!-- CONTACTS -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20! items-start">
      <!-- FORM -->
      <div
        class="bg-[#1e1f22]/50 p-8! rounded-3xl border border-gray-800 backdrop-blur-sm"
      >
        <!-- Top -->
        <div class="mb-8!">
          <h2 class="text-white text-4xl font-bold mb-3!">Свяжитесь с нами</h2>

          <p class="text-gray-400">Оставьте заявку и мы свяжемся с вами</p>
        </div>

        <!-- FORM -->
        <form @submit.prevent="submit" class="space-y-6">
          <!-- NAME -->
          <div>
            <label class="block text-gray-400 text-sm mb-3!"> Ваше имя </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="Введите имя"
              class="w-full bg-[#0E1201]! border border-gray-700 rounded-xl px-5! py-4! text-white focus:outline-none focus:border-[#ce171a]! transition-colors"
            />
          </div>

          <!-- PHONE -->
          <div>
            <label class="block text-gray-400 text-sm mb-3!">
              Номер телефона
            </label>

            <input
              v-model="form.phone"
              type="tel"
              placeholder="+998 90 123 45 67"
              class="w-full bg-[#0E1201]! border border-gray-700 rounded-xl px-5! py-4! text-white focus:outline-none focus:border-[#ce171a]! transition-colors"
            />
          </div>

          <!-- MESSAGE -->
          <div>
            <label class="block text-gray-400 text-sm mb-3!"> Сообщение </label>

            <textarea
              v-model="form.message"
              rows="5"
              placeholder="Введите сообщение"
              class="w-full bg-[#0E1201]! border border-gray-700 rounded-xl px-5! py-4! text-white focus:outline-none focus:border-[#ce171a]! transition-colors resize-none"
            ></textarea>
          </div>

          <!-- PHONE INFO -->
          <div class="flex flex-col space-y-2 pt-4!">
            <span class="text-gray-400 text-sm"> Или позвоните нам: </span>

            <a
              href="tel:+998880025252"
              class="text-2xl text-white font-bold hover:text-[#ce171a]! transition-colors"
            >
              +998 (88) 008-52-52
            </a>
          </div>

          <!-- BUTTON -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-[#ce171a]! hover:bg-[#a81215] text-white font-bold py-4! rounded-xl mt-8! transition-colors disabled:opacity-50"
          >
            {{ loading ? "Отправка..." : "Отправить запрос" }}
          </button>

          <!-- SUCCESS -->
          <p v-if="success" class="text-green-400 text-center text-sm">
            Заявка успешно отправлена
          </p>
        </form>
      </div>

      <!-- MAP -->
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

<script setup>
import { reactive, ref } from "vue";

/*
  TG
*/
const BOT_TOKEN = "8660956725:AAHhuz3uSsXrZcCRV_DYWsE4f38NU4r9ibQ";

const CHAT_ID = "971193945";

/*
  STATE
*/
const loading = ref(false);

const success = ref(false);

/*
  FORM
*/
const form = reactive({
  name: "",

  phone: "",

  message: "",
});

/*
  SUBMIT
*/
const submit = async () => {
  try {
    /*
      VALIDATION
    */
    if (!form.name || !form.phone) {
      alert("Заполните обязательные поля");

      return;
    }

    loading.value = true;

    success.value = false;

    /*
      TEXT
    */
    const text = `
Новая заявка STAR LEAGUE

 Имя: ${form.name}

 Телефон: ${form.phone}

 Сообщение:
${form.message || "Нет"}
`;

    /*
      SEND
    */
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        chat_id: CHAT_ID,

        text,
      }),
    });

    /*
      RESET
    */
    form.name = "";

    form.phone = "";

    form.message = "";

    success.value = true;
  } catch (error) {
    console.error(error);

    alert("Ошибка отправки");
  } finally {
    loading.value = false;
  }
};
</script>
