import client from "./client";

const endpoint = "/api/orders";

const getOrders = () => client.get(endpoint);

export default {getOrders}