import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export enum SnackTypes{'error', 'info', 'warn', 'success'}

export default function create_snackbar(msg:String, type:SnackTypes)
{
    switch (type)
    {
        case SnackTypes.error:


            toast.error(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;

        case SnackTypes.success:

            toast.success(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;

        case SnackTypes.warn:

            toast.warn(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;

        case SnackTypes.info:

            toast.info(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            break;
    }
}