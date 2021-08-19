import { NotificationManager } from "react-notifications";

export default function notification(type, message) {
  switch (type) {
    case "info":
      NotificationManager.info(message, null, 2500);
      break;
    case "success":
      NotificationManager.success(message, null, 2500);
      break;
    case "warning":
      NotificationManager.warning(message, null, 2500);
      break;
    case "error":
      NotificationManager.error(message, null, 2500);
      break;
    default:
      break;
  }
}
