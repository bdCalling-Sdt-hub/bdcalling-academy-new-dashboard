import axios from 'axios'
const baseUrl = axios.create({
    baseURL: 'https://api.bdcallingacademy.com/api',
    // baseURL: 'https://mainserver.bdcallingacademy.com/api',
})
const useAxiosConfig = () => {
    return baseUrl
}
// export const imageUrl = 'https://mainserver.bdcallingacademy.com'
export const imageUrl = 'https://api.bdcallingacademy.com'
export default useAxiosConfig
