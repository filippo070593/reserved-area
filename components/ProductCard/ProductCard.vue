<script setup lang="ts">
import type { Product } from "~/models/Products";

type ProductCardProps = {
  product: Product;
  hover?: {
    props: Record<string, unknown>;
  };
};

const { product, hover } = defineProps<ProductCardProps>();
</script>

<template>
  <v-card elevated="3" hover v-bind="hover?.props" class="h-100">
    <v-img
      color="surface-variant"
      :src="product.images"
      style="aspect-ratio: 4/3"
      cover
    >
      <v-card-item>
        <v-card-title>{{ product.title }}</v-card-title>
        <v-card-subtitle>{{ product.category }}</v-card-subtitle>
      </v-card-item>
    </v-img>
    <v-card-text>
      {{ product.description }}
    </v-card-text>
    <slot :product="product" />
  </v-card>
</template>

<style scoped></style>
