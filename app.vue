<template>
  <LoadingIndicator />
  <v-app class="gradient-background">
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </v-app>
  <NuxtRouteAnnouncer />
</template>

<style scoped>
.gradient-background {
  background: linear-gradient(
    135deg,
    rgba(24, 103, 192, 1),
    rgba(231, 152, 63, 1) 50%,
    rgba(24, 103, 192, 0.8) 75%,
    rgba(231, 152, 63, 0.8) 100%
  );
  background-size: 200% 200%;
  animation: gradient-animation 6s ease infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
<script setup lang="ts">
import LoadingIndicator from "~/components/LoadingIndicator/LoadingIndicator.vue";
</script>
