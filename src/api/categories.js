import client from "./client";

const endpoint = "/api/categories";

const getCategories = () => client.get(endpoint);

export default {getCategories} 