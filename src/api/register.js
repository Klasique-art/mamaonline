import client from "./client";

const endpoint = "/auth/registration"

const resister = (username, email, password) => client.post(endpoint, {username,email, password}) 

export default {resister}