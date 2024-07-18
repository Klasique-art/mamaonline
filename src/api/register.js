import client from "./client";

const endpoint = "/auth/registration"

const resister = (username, email, password1, password2) => client.post(endpoint, {username,email, password1, password2}) 

export default {resister}