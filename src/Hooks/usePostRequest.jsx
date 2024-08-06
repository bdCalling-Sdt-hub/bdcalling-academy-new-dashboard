import { useMutation } from 'react-query';
import useAxiosConfig from '../AxiosConfig/useAxiosConfig';
import { toast } from 'react-hot-toast';

const usePostRequest = (key, url) => {
    const AxiosConfig = useAxiosConfig();

    const mutation = useMutation(async (data) => {
    //   data.forEach(element => {
    //         console.log(element)
    //     });
        const res = await AxiosConfig.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        });
        return res.data;
        console.log(res)
    });

    const wrappedMutate = (data) => {
        toast.promise(
            mutation.mutateAsync(data),
            {
                loading: 'Sending request...',
                success: 'Request successful!',
                error: (error) => error?.response?.data?.message || error.message || 'Something went wrong.',
            }
        );
    };
    return {
        ...mutation,
        mutate: wrappedMutate,
    };
};

export default usePostRequest;
