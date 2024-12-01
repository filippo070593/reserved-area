const DOMAIN_HOST = "https://dummyjson.com";
const AUTH_CONTROLLER = "auth";
const USER_CONTROLLER = "users";
const PRODUCT_CONTROLLER = "products";
export const GetUrlLogin = () => `${DOMAIN_HOST}/${AUTH_CONTROLLER}/login`;

export const GetUrlAddUser = () => `${DOMAIN_HOST}/${USER_CONTROLLER}/add`;

export const GetUrlProductFilter = (limit = 0, skip = 0) =>
  `${DOMAIN_HOST}/${PRODUCT_CONTROLLER}?limit=${limit}&skip=${skip}`;

export const GetUrlProductDelete = (idProduct: number) =>
  `${DOMAIN_HOST}/${PRODUCT_CONTROLLER}/${idProduct}`;

export const GetUrlProductAdd = () =>
  `${DOMAIN_HOST}/${PRODUCT_CONTROLLER}/add`;

export const GetUrlProductEdit = (idProduct: number) =>
  `${DOMAIN_HOST}/${PRODUCT_CONTROLLER}/${idProduct}`;
