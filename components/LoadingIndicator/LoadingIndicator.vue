<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isLoading = ref(true);

onMounted(() => {
  if (window.document.readyState.toUpperCase() === "COMPLETE") {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  } else {
    window.addEventListener("load", () => {
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    });
  }
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
