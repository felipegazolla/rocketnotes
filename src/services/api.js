import axios from "axios"

export const api = axios.create({
  baseURL: "https://api-notes-h5yd.onrender.com"
})

