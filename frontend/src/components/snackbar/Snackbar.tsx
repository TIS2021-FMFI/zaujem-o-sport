import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export{}
export default function create_snackbar(msg:String)
{
    toast(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}