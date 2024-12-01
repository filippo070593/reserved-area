import {
  GetUrlProductAdd,
  GetUrlProductDelete,
  GetUrlProductEdit,
  GetUrlProductFilter,
} from "~/service/baseUrl";
import type { Product, Products } from "~/models/Products";

export const productService = {
  async getAllProducts(): Promise<Products> {
    const response = await fetch(GetUrlProductFilter());
    return await response.json();
  },
  async getPaginatedProducts({
    limit,
    skip,
  }: {
    limit: number;
    skip: number;
  }): Promise<Products> {
    const response = await fetch(GetUrlProductFilter(limit, skip));
    return await response.json();
  },
  async deleteProduct({ idProduct }: { idProduct: number }) {
    const response = await fetch(GetUrlProductDelete(idProduct), {
      method: "DELETE",
    });
    return await response.json();
  },
  async addProduct({ body }: { body: string }) {
    const response = await fetch(GetUrlProductAdd(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return await response.json();
  },
  async editProduct({ idProduct, body }: { idProduct: number; body: string }) {
    const response = await fetch(GetUrlProductEdit(idProduct), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return await response.json();
  },
};
