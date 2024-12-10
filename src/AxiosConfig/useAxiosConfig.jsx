import axios from 'axios'
const baseUrl = axios.create({
    baseURL: 'http://api.bdcallingacademy.com/api',
    // baseURL: 'https://mainserver.bdcallingacademy.com/api',
})
const useAxiosConfig = () => {
    return baseUrl
}
// export const imageUrl = 'https://mainserver.bdcallingacademy.com'
export const imageUrl = 'http://api.bdcallingacademy.com'
export default useAxiosConfig
