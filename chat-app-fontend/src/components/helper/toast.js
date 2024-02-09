import { Bounce, ToastContainer, toast } from 'react-toastify';

export const showToast = (text, type,time = 2000) => {

    toast[type](text, {
        position: "top-right",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    })
}