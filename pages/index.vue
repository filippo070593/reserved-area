<template>
  <v-container fluid class="h-100">
    <AddEditProductModal
      :edited-item="editedItem"
      :form-title="formTitle"
      :dialog="dialog"
      @save-product="save"
      @toggle-view="toggleView"
      @close-modal="close"
    />
    <DeleteProductModal
      :dialog="dialogDelete"
      @close-modal="closeDelete"
      @delete-item="deleteItemConfirm"
    />
    <ProductList
      :delete-item="deleteItem"
      :edit-item="editItem"
      :load-product="load"
      :products="products"
      :show-list="!toggle_exclusive"
    />
    <ProductTable
      :edit-item="editItem"
      :delete-item="deleteItem"
      :show-table="!!toggle_exclusive"
      :products="products"
    />
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { ref, reactive, computed, nextTick } from "vue";
import type { Product } from "~/models/Products";
import { productService } from "~/service/productService";
import { useAlert } from "~/composables/useAlert";

const { showAlert } = useAlert();
const nItem = 10;
const page = ref(0);
const dialog = ref(false);
const dialogDelete = ref(false);
const toggle_exclusive = ref(0);
const products = ref<Product[]>([]);
const editedIndex = ref(-1);
const editedItem: Product = reactive<Product>({
  id: 0,
  title: "",
  description: "",
  images: "",
  thumbnail: "",
  category: "",
});
const defaultItem: Product = {
  id: 0,
  title: "",
  description: "",
  thumbnail: "",
  images: "",
  category: "",
};

const formTitle = computed(() =>
  editedIndex.value === -1 ? "New Item" : "Edit Item",
);

const load = async ({ done }: { done?: Function }, includeAll = false) => {
  try {
    const response = includeAll
      ? await productService.getAllProducts()
      : await productService.getPaginatedProducts({
          limit: nItem,
          skip: nItem * page.value,
        });
    products.value = [
      ...products.value,
      ...response.products.map((product: Product) => ({
        ...product,
        images: product.images[0],
      })),
    ];
    page.value += 1;
  } catch (e) {
    showAlert({
      message:
        "errore durante il caricamento dei prodotti si prega di riprovare",
      color: "error",
      icon: "mdi-close-circle",
    });
    console.error(e);
  } finally {
    done?.("ok");
  }
};

const editItem = (item: Product) => {
  editedIndex.value = products.value.indexOf(item);
  Object.assign(editedItem, item);
  dialog.value = true;
};

const deleteItem = (item: Product) => {
  editedIndex.value = products.value.indexOf(item);
  Object.assign(editedItem, item);
  dialogDelete.value = true;
};

const deleteItemConfirm = async () => {
  try {
    await productService.deleteProduct({
      idProduct: editedItem.id,
    });
    products.value.splice(editedIndex.value, 1);
    closeDelete();
  } catch (e) {
    showAlert({
      message: `errore durante la cancellazione del prodotto: ${editedItem.title}. prega di riprovare`,
      color: "error",
      icon: "mdi-close-circle",
    });
  }
};

const close = () => {
  dialog.value = false;
  nextTick(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  });
};

const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    Object.assign(editedItem, defaultItem);
    editedIndex.value = -1;
  });
};

const save = async () => {
  const payload = JSON.stringify({ ...editedItem, id: undefined });
  if (editedItem.id) {
    await productService.editProduct({
      body: payload,
      idProduct: editedItem.id,
    });
    Object.assign(products.value[editedIndex.value], editedItem);
  } else {
    await productService.addProduct({ body: payload });
    products.value.unshift({ ...editedItem });
  }
  close();
};

const toggleView = (value: number) => {
  toggle_exclusive.value = value;
};

watch([toggle_exclusive], () => {
  page.value = 0;
  products.value = [];
  toggle_exclusive.value && load({}, true);
});
</script>

<style scoped>
.v-data-table {
  border-radius: 8px;
  overflow: hidden;
}

.v-btn {
  font-weight: 600;
}

.v-icon {
  cursor: pointer;
}

.v-toolbar-title {
  font-size: 1.5rem;
}

.v-toolbar {
  background-color: white;
  border-bottom: thin solid lightgrey;
}

.v-dialog .v-card {
  border-radius: 12px;
}

.v-btn:hover {
  transform: scale(1.05);
  transition: 0.3s ease-in-out;
}

.v-infinite-scroll__side {
  padding: 0;
}
</style>
