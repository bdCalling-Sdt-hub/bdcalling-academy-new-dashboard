import { useMutation } from 'react-query';
import useAxiosConfig from '../AxiosConfig/useAxiosConfig';
import { toast } from 'react-hot-toast';

const useDeleteRequest = (key, url) => {
    console.log(url)
    const AxiosConfig = useAxiosConfig();
    const mutation = useMutation(async () => {
        const res = await AxiosConfig.delete(url, {
            headers: {
                'Content-Type': 'application/json', // Adjust content type as per your API requirement
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        });
        console.log(res)
        return res.data;
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

export default useDeleteRequest;
