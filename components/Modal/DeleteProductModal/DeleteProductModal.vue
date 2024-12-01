<script setup lang="ts">
type DeleteProductModalProps = {
  dialog: boolean;
};

const { dialog } = defineProps<DeleteProductModalProps>();
const emit = defineEmits(["close-modal", "delete-item"]);

const closeModal = (close: Function) => {
  emit("close-modal");
  close();
};

const deleteItem = (close: Function) => {
  emit("delete-item");
  close();
};
</script>

<template>
  <CustomModal :show-modal="dialog">
    <template #default="{ close }">
      <v-card>
        <v-card-title class="text-h5">
          Are you sure you want to delete this item?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="closeModal(close)">Cancel</v-btn>
          <v-btn color="error" @click="deleteItem(close)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </CustomModal>
</template>

<style scoped></style>
