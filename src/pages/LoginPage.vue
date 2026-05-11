<template>
  <div class="min-h-screen bg-[#111315] flex items-center justify-center px-6">
    <div
      class="w-full max-w-md rounded-4xl border border-[#23262b] bg-[#181a1d] p-10"
    >
      <!-- Title -->
      <div class="mb-10 text-center">
        <h1 class="text-4xl font-black text-white mb-3">Admin Login</h1>

        <p class="text-gray-500">Вход в панель управления</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="flex flex-col gap-6">
        <!-- Email -->
        <div>
          <label class="block text-sm text-gray-400 mb-3"> Email </label>

          <input
            v-model="form.email"
            type="email"
            placeholder="admin@mail.com"
            class="w-full h-14 rounded-2xl bg-[#111315] border border-[#2b2f35] px-5 outline-none text-white focus:border-white transition"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm text-gray-400 mb-3"> Пароль </label>

          <input
            v-model="form.password"
            type="password"
            placeholder="******"
            class="w-full h-14 rounded-2xl bg-[#111315] border border-[#2b2f35] px-5 outline-none text-white focus:border-white transition"
          />
        </div>

        <!-- Button -->
        <button
          :disabled="authStore.loading"
          class="h-14 rounded-2xl bg-white text-black font-bold hover:opacity-90 transition disabled:opacity-50"
        >
          {{ authStore.loading ? "Вход..." : "Войти" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth";

const router = useRouter();

const authStore = useAuthStore();

const form = reactive({
  email: "",

  password: "",
});

const submit = async () => {
  try {
    await authStore.login(form);

    router.push("/admin/tours");
  } catch (error) {
    alert("Неверный логин или пароль");
  }
};
</script>
