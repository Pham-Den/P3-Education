import { useRef, useState } from "react";
import Cookies from "js-cookie";
import Toast from "../../../toast/Toast";
import { adminAPI } from "../../../utils/API";
import styles from "./PasswordTab.module.scss";
import PassRow from "./PassRow";

const PasswordTab = () => {
  const passwordCurrentRef = useRef();
  const passwordNewRef = useRef();
  const passwordNewRepeatRef = useRef();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cancelHandle = () => {
    //
    passwordCurrentRef.current.value = "";
    passwordNewRef.current.value = "";
    passwordNewRepeatRef.current.value = "";
    setError("");
  };

  const submitHandel = () => {
    //dùng forwardRef
    const data = {
      passwordCurrent: passwordCurrentRef.current.value
        ? passwordCurrentRef.current.value
        : "",
      passwordNew: passwordNewRef.current.value
        ? passwordNewRef.current.value
        : "",
    };

    //valid
    if (!data.passwordCurrent.trim()) {
      setError("Please Input Password Current!");
      return;
    }
    if (!data.passwordNew.trim() || data.passwordNew.length < 8) {
      setError("Please Input New Password Correct!");
      return;
    }
    if (data.passwordNew !== passwordNewRepeatRef.current.value) {
      setError("Repeat New Password correct!");
      return;
    } else {
      setError("");
    }

    //VALID OK
    const sendData = async (url) => {
      console.log("ok");
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

        //input về ""
        passwordCurrentRef.current.value = "";
        passwordNewRef.current.value = "";
        passwordNewRepeatRef.current.value = "";
        setError("");
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        return;
      }
    };

    //
    sendData(adminAPI.updatePasswordAPI);
  };
  return (
    <div className={styles["info-container"]}>
      <div className={styles["info-groupe"]}>
        <PassRow ref={passwordCurrentRef} title="Password Current" />
      </div>
      <div className={styles["info-groupe"]}>
        <PassRow ref={passwordNewRef} title="New Pass" />
      </div>
      <div className={styles["info-groupe"]}>
        <PassRow ref={passwordNewRepeatRef} title="New Pass Repeat" />
      </div>
      <div className={styles["info-groupe--button"]}>
        <button className="btn btn-primary" onClick={submitHandel}>
          {isLoading ? "Sending..." : "Update"}
        </button>
        <button className="btn border-0 w-150px ms-5px" onClick={cancelHandle}>
          Cancel
        </button>
      </div>
      {error && <div className={styles["message-err"]}>{error}</div>}
      {Toast.container}
    </div>
  );
};

export default PasswordTab;
