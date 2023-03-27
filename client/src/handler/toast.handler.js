import { toast } from 'react-toastify';
// toast.error('Sản phẩm đã bán hết', {
//     position: "top-center",
//     autoClose: 1000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   });
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