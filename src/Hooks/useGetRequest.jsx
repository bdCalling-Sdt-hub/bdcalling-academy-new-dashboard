
import { useQuery } from 'react-query';
import useAxiosConfig from '../AxiosConfig/useAxiosConfig';
import toast from 'react-hot-toast';

const AxiosConfig = useAxiosConfig()
const useGetRequest = (key, url) => {
    const { isLoading, data, error, isError, refetch } = useQuery({
        enabled: !!url && !!localStorage.getItem('token'),
        queryKey: [key, url],
        queryFn: async () => {
            try {
                const res = await AxiosConfig.get(url, {
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                    }
                })
                return res.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || error.message || "something went wrong")
            }
        }
    })
    return [isLoading, data, error, refetch, isError]
}

export default useGetRequest
