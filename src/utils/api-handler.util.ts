import axios from "axios";
import { toast } from "react-toastify";

export const handleApi = async <T>(
    apiCall: () => Promise<T>,
    successMessage: string,
    setSubmitting: (isSubmitting: boolean) => void
): Promise<T | null> => {
    setSubmitting(true)

    const toastId = toast.loading("Loading...")

    try {
        const result = await apiCall()

        toast.update(toastId, {
            render: successMessage,
            type: "success",
            closeOnClick: true,
            isLoading: false,
            closeButton: true,
            pauseOnHover: true,
            draggable: true,
            autoClose: 5000,
        })

        setSubmitting(false)

        return result

    } catch (err) {
        const errorMessage = axios.isAxiosError(err)
            ? err.response?.data?.detail || 'An error occurred'
            : 'An unexpected error occurred';

        toast.update(toastId, {
            render: errorMessage,
            type: "error",
            closeOnClick: true,
            isLoading: false,
            closeButton: true,
            pauseOnHover: true,
            draggable: true,
            autoClose: 5000,
        });
        
        setSubmitting(false)

        return null
    }
};