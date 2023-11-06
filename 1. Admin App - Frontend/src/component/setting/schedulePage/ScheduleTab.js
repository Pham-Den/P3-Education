import { useRef, useState, useEffect } from "react";
import Toast from "../../../toast/Toast";
import ScheduleRow from "./ScheduleRow";
import styles from "./ScheduleTab.module.scss";
import useHttp from "../../../hook/use-http";
import { getToken } from "../../../utils/isAuthi";
import { adminAPI } from "../../../utils/API";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../../store";

const ScheduleTab = () => {
  const userCurrent = useSelector((state) => state.login.user);

  const dispatch = useDispatch();
  const ca1Ref = useRef();
  const ca2Ref = useRef();
  const ca3Ref = useRef();
  const ca4Ref = useRef();
  const ca5Ref = useRef();
  const ca6Ref = useRef();
  const ca7Ref = useRef();
  const ca8Ref = useRef();

  const { isLoading, error, sendRequest } = useHttp();
  //submit handle
  const submitHandel = () => {
    //
    const data = {
      ca1: ca1Ref.current.value ? ca1Ref.current.value.trim() : "",
      ca2: ca2Ref.current.value ? ca2Ref.current.value.trim() : "",
      ca3: ca3Ref.current.value ? ca3Ref.current.value.trim() : "",
      ca4: ca4Ref.current.value ? ca4Ref.current.value.trim() : "",
      ca5: ca5Ref.current.value ? ca5Ref.current.value.trim() : "",
      ca6: ca6Ref.current.value ? ca6Ref.current.value.trim() : "",
      ca7: ca7Ref.current.value ? ca7Ref.current.value.trim() : "",
      ca8: ca8Ref.current.value ? ca8Ref.current.value.trim() : "",
    };

    console.log(data);
    //valid data
    if (!data.ca1) {
      return Toast.message.error("Please Input Case 1", Toast.option);
    }
    if (!data.ca2) {
      return Toast.message.error("Please Input Case 2", Toast.option);
    }
    if (!data.ca3) {
      return Toast.message.error("Please Input Case 3", Toast.option);
    }
    if (!data.ca4) {
      return Toast.message.error("Please Input Case 4", Toast.option);
    }
    if (!data.ca5) {
      return Toast.message.error("Please Input Case 5", Toast.option);
    }
    if (!data.ca6) {
      return Toast.message.error("Please Input Case 6", Toast.option);
    }
    if (!data.ca7) {
      return Toast.message.error("Please Input Case 7", Toast.option);
    }
    if (!data.ca8) {
      return Toast.message.error("Please Input Case 8", Toast.option);
    }
    //valid ok

    const option = {
      url: adminAPI.updateInfoAPI,
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "Application/json",
        authorization: "Bearer " + getToken(),
      },
    };

    //messageHandle
    const messageHandle = (resData) => {
      Toast.message.success(resData.message, Toast.option);

      dispatch(loginActions.UPDATE_CASE({ case: data }));
    };
    //send api
    sendRequest(option, messageHandle);
  };
  return (
    <div className={styles["info-container"]}>
      <div className={styles["info-groupe"]}>
        <ScheduleRow
          ref={ca1Ref}
          type="7:30-9:00"
          title="Ca 1"
          defaultValue={userCurrent.case && userCurrent.case.ca1}
        />
      </div>
      <div className={styles["info-groupe"]}>
        <ScheduleRow
          ref={ca2Ref}
          title="Ca 2"
          defaultValue={userCurrent.case && userCurrent.case.ca2}
        />
      </div>
      <div className={styles["info-groupe"]}>
        <ScheduleRow
          ref={ca3Ref}
          title="Ca 3"
          defaultValue={userCurrent.case && userCurrent.case.ca3}
        />
      </div>
      <div className={styles["info-groupe"]}>
        <ScheduleRow
          ref={ca4Ref}
          title="Ca 4"
          defaultValue={userCurrent.case && userCurrent.case.ca4}
        />
      </div>
      <div className={styles["info-groupe"]}>
        <ScheduleRow
          ref={ca5Ref}
          title="Ca 5"
          defaultValue={userCurrent.case && userCurrent.case.ca5}
        />
      </div>
      <div className={styles["info-groupe"]}>
        <ScheduleRow
          ref={ca6Ref}
          title="Ca 6"
          defaultValue={userCurrent.case && userCurrent.case.ca6}
        />
      </div>
      <div className={styles["info-groupe"]}>
        <ScheduleRow
          ref={ca7Ref}
          title="Ca 7"
          defaultValue={userCurrent.case && userCurrent.case.ca7}
        />
      </div>
      <div className={styles["info-groupe"]}>
        <ScheduleRow
          ref={ca8Ref}
          title="Ca 8"
          defaultValue={userCurrent.case && userCurrent.case.ca8}
        />
      </div>

      <div className={styles["info-groupe--button"]}>
        <button className="btn btn-primary" onClick={submitHandel}>
          {/* {isLoading ? "Sending..." : "Update"} */}
          Update
        </button>
        <button
          className="btn border-0 w-150px ms-5px"
          // onClick={cancelHandle}
        >
          Cancel
        </button>
      </div>
      {/* {error && <div className={styles["message-err"]}>{error}</div>} */}
      {Toast.container}
    </div>
  );
};

export default ScheduleTab;
