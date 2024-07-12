import client from "./client";

const endpoint = "api/reviews";

const getReviews = () => client.get(endpoint);

export default {getReviews}