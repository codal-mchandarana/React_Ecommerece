import { Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const success = (msg: string) => {
    toast.success(`${msg}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Slide,
    });
}

export const error = (msg: string) => {
    toast.error(`${msg}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
    });
}