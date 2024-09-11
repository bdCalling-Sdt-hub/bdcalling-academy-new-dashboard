import axios from 'axios'
const baseUrl = axios.create({
    // baseURL: 'http://192.168.10.64:7000/api',
    baseURL: 'https://mainserver.bdcallingacademy.com/api',
})
const useAxiosConfig = () => {
    return baseUrl
}
export const imageUrl = 'https://mainserver.bdcallingacademy.com'
// export const imageUrl = 'http://192.168.10.64:7000'
export default useAxiosConfig
