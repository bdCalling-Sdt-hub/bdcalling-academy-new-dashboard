import axios from 'axios'
const baseUrl = axios.create({
    baseURL: 'http://192.168.10.64:7000/api',
})
const useAxiosConfig = () => {
    return baseUrl
}

export default useAxiosConfig