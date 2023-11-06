import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//toast message
const optsToast = {
  position: "bottom-left",
  autoClose: 1000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  theme: "light",
};
const Toast = {
  container: <ToastContainer />,
  message: toast,
  option: optsToast,
};

export default Toast;
