import axios from 'axios'
const baseUrl = axios.create({
    baseURL: 'http://165.232.137.110/api',
    // baseURL: 'https://mainserver.bdcallingacademy.com/api',
})
const useAxiosConfig = () => {
    return baseUrl
}
// export const imageUrl = 'https://mainserver.bdcallingacademy.com'
export const imageUrl = 'http://165.232.137.110'
export default useAxiosConfig
