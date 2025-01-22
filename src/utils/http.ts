import axios from 'axios'

export const http = axios.create({
  baseURL:
    window.location.hostname === 'localhost'
      ? import.meta.env.VITE_LOCAL_URL
      : import.meta.env.VITE_PUBLIC_URL,
})
