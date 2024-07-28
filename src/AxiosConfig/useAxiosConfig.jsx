import axios from 'axios'
const baseUrl = axios.create({
    // baseURL: 'http://192.168.10.64:7000/api',
    baseURL: 'http://103.43.151.135:7000/api',
    timeout: 5000
})
const useAxiosConfig = () => {
    return baseUrl
}
export const imageUrl = 'http://103.43.151.135:7000'
// export const imageUrl = 'http://192.168.10.64:7000'
export default useAxiosConfig
