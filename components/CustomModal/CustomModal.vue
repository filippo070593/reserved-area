<script setup lang="ts">
import { watchEffect } from "vue";
import { useModal } from "~/composables/useModal";

type CustomModalProps = {
  showModal?: boolean;
};
const { showModal } = defineProps<CustomModalProps>();

const { open, isOpen, close } = useModal();

watchEffect(() => {
  showModal ? open() : close();
});
</script>

<template>
  <v-dialog v-model="isOpen" max-width="500px">
    <template v-slot:activator="{ props }">
      <slot name="activator" :props="props" :open="open" />
    </template>
    <slot :open="open" :close="close" :isOpen="isOpen" />
  </v-dialog>
</template>

<style scoped></style>
