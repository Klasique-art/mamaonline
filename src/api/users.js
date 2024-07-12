import client from "./client";

const endpoint = "api/users";

const getUsers = () => client.get(endpoint);

export default {getUsers}