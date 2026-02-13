import Axios from "axios";

export const axios = Axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://localhost:8080',
    headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    // withCredentials: true // Removed for json-server compatibility
})