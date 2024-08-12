import axios from 'axios'
const baseUrl = axios.create({
    // baseURL: 'http://192.168.10.64:7000/api',
    baseURL: 'http://115.127.156.13:7000/api',
})
const useAxiosConfig = () => {
    return baseUrl
}
export const imageUrl = 'http://115.127.156.13:7000'
// export const imageUrl = 'http://192.168.10.64:7000'
export default useAxiosConfig
