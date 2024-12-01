<script setup lang="ts">
import { computed } from "vue";
import type { Product } from "~/models/Products";

type ProductTableProps = {
  editItem: Function;
  deleteItem: Function;
  showTable: boolean;
  products: Product[];
};

const { products, showTable, editItem, deleteItem } =
  defineProps<ProductTableProps>();

type Header = {
  title: string;
  align?: "start" | "center" | "end"; // Aggiungi valori predefiniti per 'align'
  key: string;
  sortable?: boolean;
};

const headers = computed<Header[]>(() => [
  { title: "Titolo", align: "start", key: "title" },
  { title: "Icon", key: "thumbnail", sortable: false },
  { title: "Descrizione", key: "description", sortable: false },
  { title: "Actions", key: "actions", sortable: false },
]);
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="px-0">
        <v-data-table
          :headers="headers"
          :items="products"
          item-key="name"
          class="elevation-1"
          v-if="showTable"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title class="text-h5 font-weight-bold"
                >Lista Prodotti</v-toolbar-title
              >
            </v-toolbar>
          </template>
          <template v-slot:item.thumbnail="{ item }">
            <v-card class="my-2" elevation="2" rounded>
              <v-img
                :src="`${item.thumbnail}`"
                height="64"
                width="64"
                cover
              ></v-img>
            </v-card>
          </template>
          <template v-slot:item.description="{ item }">
            <div style="min-width: 500px">{{ item.description }}</div>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              class="me-2 cursor-pointer"
              @click="editItem(item)"
              color="primary"
              size="small"
              >mdi-pencil</v-icon
            >
            <v-icon
              class="cursor-pointer"
              @click="deleteItem(item)"
              color="error"
              size="small"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
