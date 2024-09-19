import { toast } from "react-toastify";



const toastSuccess = (text) => {
  toast.success(text)
};

export default toastSuccess;

export const toastError = (text) => {
  toast.error(text)
};
