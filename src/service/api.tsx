import axios from 'axios'

const api = axios.create({
    baseURL: 'https://studio-ghibli-backend.herokuapp.com'
})

export default api