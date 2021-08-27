import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function notification(type, message) {
  switch (type) {
    case "info":
      toast.info(message);
      break;
    case "success":
      toast.success(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      break;
  }
}
