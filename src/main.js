import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@/router";
import "@/assets/styles/main.scss";
import "@/assets/styles/main.css";
import { createPinia } from "pinia";

createApp(App).use(createPinia()).use(router).mount("#app");
