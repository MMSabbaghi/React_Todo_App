import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * @description: show notification message to user.
 * 
 * @param {type} 'success' | 'error' | 'warning' | 'info'
 * @param {message} string 
 */
export default function openNotification(type, message) {
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
      throw new Error("Unknown notification type");
  }
}
