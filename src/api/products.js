import client from "./client";

const endpoint = "api/products";

const getProducts = () => client.get(endpoint);

export default {getProducts}