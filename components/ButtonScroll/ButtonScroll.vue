<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const showScrollToTop = ref(false);

function scrollToTop() {
  if (!process.client) return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleScroll() {
  if (!process.client) return;
  showScrollToTop.value = window.scrollY > 200;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <v-btn
    v-show="showScrollToTop"
    fab
    color="primary"
    class="scroll-to-top"
    @click="scrollToTop"
    icon="mdi-arrow-up"
  >
  </v-btn>
</template>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 16px;
  right: 16px;
  z-index: 1000;
}
</style>
