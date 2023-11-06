import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Toast from "../../../toast/Toast";
import styles from "./MeetTab.module.scss";
import MeetRow from "./MeetRow";

import useHttp from "../../../hook/use-http";
import { adminAPI } from "../../../utils/API";
import { loginActions } from "../../../store";

const MeetTab = () => {
  const linkMeetRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  const [iscancel, setIscancel] = useState(false);

  const { isLoading, error, sendRequest } = useHttp();
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const editHandle = (e) => {
    // /
    setIsEdit(true);
  };

  const cancelHandle = () => {
    //
    setIscancel((prev) => !prev);
    setIsEdit(false);
  };

  const submitHandle = () => {
    const dataForm = {
      linkMeet: linkMeetRef.current.value,
    };

    if (!dataForm.linkMeet.trim()) {
      return Toast.message.error("Please Input Link Meet!", Toast.option);
    }

    //valid ok -> send data

    const option = {
      url: adminAPI.updateInfoAPI,
      body: dataForm,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + Cookies.get("jwt_token"),
      },
    };

    const messageHandle = (data) => {
      Toast.message.success(data.message, Toast.option);

      //thay đổi store
      dispatch(loginActions.UPDATE_USER(dataForm));
      //input về ""
      setIscancel((prev) => !prev);
      setIsEdit(false);
    };

    //
    sendRequest(option, messageHandle);
  };
  return (
    <div className={styles["info-container"]}>
      <div className={styles["info-groupe"]}>
        <MeetRow
          ref={linkMeetRef}
          iscancel={iscancel}
          title="Link Meet"
          data={user.linkMeet}
          content={
            user.linkMeet ? "+ Edit Your Link Meet" : "+ Add Your Link Meet"
          }
          onEdit={editHandle}
        />
      </div>

      {isEdit && (
        <div className={styles["info-groupe--button"]}>
          <button className="btn btn-primary" onClick={submitHandle}>
            {/* {isLoading ? "Sending..." : "Update"} */}
            Update
          </button>
          <button
            className="btn border-0 w-150px ms-5px"
            onClick={cancelHandle}
          >
            Cancel
          </button>
        </div>
      )}
      {/* {error && <div className={styles["message-err"]}>{error}</div>} */}
      {Toast.container}
    </div>
  );
};

export default MeetTab;
