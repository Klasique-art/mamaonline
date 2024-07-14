import client from "./client";

const endpoint = '/auth/logout'

const logout = ()=> client.post(endpoint)

export default {logout}