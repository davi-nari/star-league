<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Импортируем картинки ПРАВИЛЬНО
import img1 from "@/assets/images/slider1.jpg";
import img2 from "@/assets/images/slider2.jpg";
import img3 from "@/assets/images/slider3.jpg";
import img4 from "@/assets/images/slider4.jpg";
import img5 from "@/assets/images/slider5.jpg";
import img6 from "@/assets/images/slider6.jpg";

// Теперь кладем их в массив
const images = [img1, img2, img3, img4, img5, img6];

// Стили
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/assets/styles/slider.scss";

const modules = [Pagination, Autoplay, Navigation];
</script>

<template>
  <swiper
    :slidesPerView="4"
    :spaceBetween="24"
    :pagination="{ clickable: true }"
    :autoplay="{ delay: 3000 }"
    :navigation="true"
    loop="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide
      v-for="(image, index) in images"
      :key="index"
      class="rounded-lg overflow-hidden"
    >
      <!-- Теперь image — это уже обработанная ссылка -->
      <img
        :src="image"
        :alt="`Slide ${index + 1}`"
        class="w-full h-full object-cover"
      />
    </swiper-slide>
  </swiper>
</template>
