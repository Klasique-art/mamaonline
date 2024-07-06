import client from "./client";

const endpoint = "/reviews";

const getReviews = () => client.get(endpoint);

export default {getReviews}