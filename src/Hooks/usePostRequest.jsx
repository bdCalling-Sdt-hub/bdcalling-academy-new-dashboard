import React from 'react'
import useAxiosConfig from '../AxiosConfig/useAxiosConfig'
import { toast } from 'react-hot-toast'
import { useQuery } from 'react-query'

const AxiosConfig = useAxiosConfig()

const usePostRequest = (key, url, data) => {
    const { isLoading, data: responseData, refetch } = useQuery({
        enabled: !!url && !!localStorage.getItem('token'),
        queryKey: [key, url],
        queryFn: async () => {
            const requestPromise = AxiosConfig.post(url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            return toast.promise(
                requestPromise,
                {
                    loading: 'Sending request...',
                    success: 'Request successful!',
                    error: (error) => error?.response?.data?.message || error.message || 'Something went wrong.',
                }
            );
        }
    })

    return [isLoading, responseData, refetch]
}

export default usePostRequest
