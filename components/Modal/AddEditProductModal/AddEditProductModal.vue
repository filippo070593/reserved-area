<script setup lang="ts">
import { ref, watch } from "vue";
import type { Product } from "~/models/Products";

type AddEditProductModalProps = {
  formTitle: string;
  editedItem: Product;
  dialog: boolean;
};

const { formTitle, editedItem, dialog } =
  defineProps<AddEditProductModalProps>();

const emit = defineEmits(["save-product", "toggle-view", "close-modal"]);

const viewMode = ref(0);

const save = function (close: Function) {
  emit("save-product");
  close();
};

const closeModal = (close: Function) => {
  emit("close-modal");
  close();
};

const toggleView = () => {
  emit("toggle-view", viewMode.value);
};

watch([viewMode], () => {
  toggleView();
});
</script>

<template>
  <CustomModal :show-modal="dialog">
    <template #activator="{ props }">
      <div class="d-flex ga-5">
        <v-btn class="mb-2" color="primary" dark v-bind="props">
          <v-icon left>mdi-plus</v-icon> New Item
        </v-btn>
        <v-card> </v-card>
        <v-btn-toggle v-model="viewMode" class="mb-2 ms-auto">
          <v-btn color="primary">
            <v-icon>mdi-grid</v-icon>
          </v-btn>
          <v-btn color="primary">
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>
    </template>
    <template #default="{ close }">
      <v-card>
        <v-card-title class="text-h5">{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.title"
                  label="Title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="editedItem.category"
                  label="Category"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.images"
                  label="Url Image"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedItem.description"
                  label="Description"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="closeModal(close)">Cancel</v-btn>
          <v-btn color="primary" @click="save(close)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </CustomModal>
</template>

<style scoped></style>
