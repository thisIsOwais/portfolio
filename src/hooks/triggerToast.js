import { toast } from "react-toastify";
import CustomToast from "./customToast";

export const triggerToast = ({
  title = "Notification",
  message = "",
  linkText = "Learn More",
  linkUrl = "#",
  type = "info",
  autoClose = 3000,
  redirect = false
}) => {
  toast[type](
    <CustomToast
      title={title}
      message={message}
      linkText={linkText}
      linkUrl={linkUrl}
    />,
    {
      autoClose,
      closeOnClick: false,
      draggable: false,
      pauseOnHover: true
    }
  );

  if (redirect) {
    setTimeout(() => {
      // window.location.href = linkUrl;
      window.open(linkUrl, "_blank");
    }, autoClose);
  }
};
