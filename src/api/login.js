import client from "./client";

const endpoint = '/auth/login'

const login = (username, password) => client.post(endpoint, {
    username,
    password
})

export default {login}