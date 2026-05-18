import axios from "axios"

const API = axios.create({
    // baseURL: "http://localhost:5000/api"
    baseURL: "https://music-instrument-tutoring-network.onrender.com/api"
})

export default API