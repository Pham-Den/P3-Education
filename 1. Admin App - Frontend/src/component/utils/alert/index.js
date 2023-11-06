import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const confirmHandle = (title, message, id, fn) => {
  confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "Yes",
        onClick: () => fn(id),
      },
      {
        label: "No",
      },
    ],
  });
};
export default confirmHandle;
