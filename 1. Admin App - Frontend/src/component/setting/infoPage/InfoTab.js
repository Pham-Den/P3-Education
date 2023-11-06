import { useRef, useState } from "react";
import styles from "./InfoTab.module.scss";
import InfoRow from "./InfoRow";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../../toast/Toast";
import { adminAPI } from "../../../utils/API";
import Cookies from "js-cookie";
import { loginActions } from "../../../store";

const InfoTab = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const [iscancel, setIsCancel] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef();
  const nicknameRef = useRef();
  const avatarRef = useRef();
  const backgroundNavbarRef = useRef();

  const cancelHandle = () => {
    setIsCancel((prev) => !prev);
    setIsEdit(false);
  };

  const submitHandel = () => {
    //dùng forwardRef
    const data = {};
    if (nameRef.current && nameRef.current.value) {
      data.name = nameRef.current.value.trim();
    }
    if (nicknameRef.current && nicknameRef.current.value) {
      data.nickname = nicknameRef.current.value.trim();
    }
    if (avatarRef.current && avatarRef.current.value) {
      data.avatar = avatarRef.current.value.trim();
    }
    if (backgroundNavbarRef.current && backgroundNavbarRef.current.value) {
      data.backgroundNavbar = backgroundNavbarRef.current.value.trim();
    }
    if (
      !data.name &&
      !data.nickname &&
      !data.backgroundNavbar &&
      !data.avatar
    ) {
      return Toast.message.error("Please Input Data!", Toast.option);
    }

    //VALID OK
    const sendData = async (url) => {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + Cookies.get("jwt_token"),
          },
          body: JSON.stringify(data),
        });

        const resData = await response.json();

        if (response.status !== 200) {
          setIsLoading(false);
          return Toast.message.error(resData.message, Toast.option);
        }
        //ok

        Toast.message.success(resData.message, Toast.option);
        setIsLoading(false);

        //thay đổi store
        dispatch(loginActions.UPDATE_USER(data));
        //input về ""
        setIsCancel((prev) => !prev);
        setIsEdit(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        return;
      }
    };

    //
    sendData(adminAPI.updateInfoAPI);
  };

  const editHandle = () => {
    //
    setIsEdit(true);
  };
  return (
    <div className={styles["info-container"]}>
      <div className={styles["info-groupe"]}>
        <InfoRow
          ref={nameRef}
          iscancel={iscancel}
          title="Name"
          data={user.name}
          content={user.name ? "+ Edit Your Name" : "+ Add Your Name"}
          onEdit={editHandle}
        />
      </div>
      <div className={styles["info-groupe"]}>
        <InfoRow
          ref={nicknameRef}
          iscancel={iscancel}
          title="Nickname"
          data={user.nickname}
          content={
            user.nickname ? "+ Edit Your Nickname" : "+ Add Your Nickname"
          }
          onEdit={editHandle}
        />
      </div>
      <div className={styles["info-groupe"]}>
        <InfoRow
          ref={avatarRef}
          iscancel={iscancel}
          title="Avatar"
          data={user.avatar}
          content={user.avatar ? "+ Edit Your Avatar" : "+ Add Your Avatar"}
          onEdit={editHandle}
        />
      </div>
      <div className={styles["info-groupe"]}>
        <InfoRow
          ref={backgroundNavbarRef}
          iscancel={iscancel}
          title="Background"
          data={user.backgroundNavbar}
          content={
            user.backgroundNavbar
              ? "+ Edit Your Background"
              : "+ Add Your Background"
          }
          onEdit={editHandle}
        />
      </div>
      {isEdit && (
        <div className={styles["info-groupe--button"]}>
          <button className="btn btn-primary" onClick={submitHandel}>
            {isLoading ? "Sending..." : "Update"}
          </button>
          <button
            className="btn border-0 w-150px ms-5px"
            onClick={cancelHandle}
          >
            Cancel
          </button>
        </div>
      )}
      {Toast.container}
    </div>
  );
};

export default InfoTab;
