export type Products = {
  products: Product[];
};

export type Product = {
  id: number;
  images: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
};
