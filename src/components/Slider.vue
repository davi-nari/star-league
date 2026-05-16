<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

/*
  IMAGES
*/
import img1 from "@/assets/images/slider1.jpg";
import img2 from "@/assets/images/slider2.jpg";
import img3 from "@/assets/images/slider3.jpg";
import img4 from "@/assets/images/slider4.jpg";
import img5 from "@/assets/images/slider5.jpg";
import img6 from "@/assets/images/slider6.jpg";

/*
  ARRAY
*/
const images = [img1, img2, img3, img4, img5, img6];

/*
  MODULES
*/
const modules = [Pagination, Autoplay, Navigation];

/*
  STYLES
*/
import "swiper/css";

import "swiper/css/pagination";

import "swiper/css/navigation";

import "@/assets/styles/slider.scss";
</script>

<template>
  <swiper
    :spaceBetween="16"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 3000,
    }"
    :navigation="true"
    :loop="true"
    :modules="modules"
    :breakpoints="{
      0: {
        slidesPerView: 1.2,
      },

      640: {
        slidesPerView: 2,
      },

      768: {
        slidesPerView: 2.5,
      },

      1024: {
        slidesPerView: 4,
      },
    }"
    class="mySwiper"
  >
    <swiper-slide
      v-for="(image, index) in images"
      :key="index"
      class="rounded-2xl overflow-hidden"
    >
      <img
        :src="image"
        :alt="`Slide ${index + 1}`"
        class="w-full h-full object-cover"
      />
    </swiper-slide>
  </swiper>
</template>
