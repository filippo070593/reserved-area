<script setup lang="ts">
import ButtonScroll from "~/components/ButtonScroll/ButtonScroll";
import type { Product } from "~/models/Products";

type ProductListProps = {
  showList: boolean;
  products: Product[];
  loadProduct: Function;
  editItem: Function;
  deleteItem: Function;
};

const { products, loadProduct, showList, editItem, deleteItem } =
  defineProps<ProductListProps>();
</script>

<template>
  <v-infinite-scroll class="h-100" v-if="showList" @load="loadProduct">
    <v-row>
      <template v-for="product in products" :key="product.id">
        <v-col cols="12" sm="6" md="4" lg="3" xxl="2">
          <v-hover v-slot="{ isHovering, props }">
            <ProductCard :product="product" :hover="{ props }">
              <template #default="{ product }">
                <v-overlay
                  :model-value="isHovering"
                  class="align-center justify-center gap-5"
                  scrim="primary"
                  contained
                >
                  <v-icon
                    class="me-2 cursor-pointer"
                    @click="editItem(product)"
                    color="white"
                    size="x-large"
                  >
                    mdi-pencil-circle
                  </v-icon>
                  <v-icon
                    class="cursor-pointer"
                    @click="deleteItem(product)"
                    color="white"
                    size="x-large"
                  >
                    mdi-delete-circle
                  </v-icon>
                </v-overlay>
              </template>
            </ProductCard>
          </v-hover>
        </v-col>
      </template>
    </v-row>
    <ButtonScroll />
  </v-infinite-scroll>
</template>

<style scoped></style>
