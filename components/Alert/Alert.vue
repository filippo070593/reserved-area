<template>
  <v-container class="d-flex justify-center align-center">
    <v-snackbar v-model="showToast" timeout="3000" :color="color">
      <v-icon start color="white">{{ icon }}</v-icon>
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useAlert } from "~/composables/useAlert.ts";

const { alertState } = useAlert();

const showToast = computed(() => alertState.visible);
const color = computed(() => alertState.color);
const message = computed(() => alertState.message);
const icon = computed(() => alertState.icon);
</script>

<style scoped>
.alert {
  z-index: 1009;
}
</style>
