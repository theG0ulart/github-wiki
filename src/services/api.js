import  axios from "axios";

export const api = axios.create({
    baseUrl: 'https://api.github.com'
})