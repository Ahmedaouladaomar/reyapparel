export const LOGIN = "/login";
export const REGISTER = "/register";
export const LOGOUT = "/logout";
export const IS_AUTHENTICATED = "/auth";
export const ADMIN = "/admin/*";
export const HOME = "/home";
export const STRIPE = "/payment/checkout";
export const CHECKOUT = "/checkout";
export const ABOUT = "/about";
export const CONTACT = "/contact";
export const PROFILE = "/profile/:username";
export const DASHBOARD = "/admin";
export const USERS = "/users";
export const USER = "/users/profile/:username";
export const ADD_USER = "/users/add";
export const USER_UPDATE = "/users/:id";
export const COLLECTIONS = "/collections";
export const ADD_COLLECTION = "/collections/add";
export const COLLECTION = "/collections/:id";
export const COLLECTION_PLP = "/collections/:name";
export const COLLECTION_PRODUCTS = "/collections/name/:name";
export const PRODUCTS_LIST = "/products/plp";
export const PRODUCTS = "/products";
export const PRODUCT = "/products/:id";
export const ADD_PRODUCT = "/products/add";
export const PRODUCT_BY_NAME = "/products/name/:name";
export const PDP_PATH = "/products/:name";
export const USER_CART = "/cart/user/:id";
export const PRODUCT_CART = "/cart/:userId/product/:productId";
export const ADD_TO_CART = "/cart/add";
export const REMOVE_FROM_CART = "/cart/remove";
export const ORDERS = "/orders";
export const ORDER_PATCH = "/orders/status/:id";
export const PAYMENTS = "/payment";
export const PAYMENT = "/payment/:id";
export const SHIPPING = "/shipping";
export const REPORTS = "/reports";
export const REPORT = "/reports/:id";
