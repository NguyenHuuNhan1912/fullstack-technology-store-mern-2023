import { toast } from 'react-toastify';
const toastNotification = (type, msg, time) => {
    return (
        toast(msg, {
            type,
            position: "top-center",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        })
    )
}

export default toastNotification;