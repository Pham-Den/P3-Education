import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hook/use-http";
import { popupActions } from "../../store";
import Toast from "../../toast/Toast";
import styles from "./RolingPopup.module.scss";
import { getToken } from "../../utils/isAuthi";
import { roleAPI } from "../../utils/API";

const RolingPopup = (props) => {
  const roleData = useSelector((state) => state.popup.roleData);
  const dispatch = useDispatch();
  const nameRef = useRef();
  const scheduleRef = useRef();
  const myClassRef = useRef();
  const overviewRef = useRef();
  const moduleRef = useRef();
  const courseRef = useRef();
  const classRef = useRef();
  const userRef = useRef();
  const waitingListRef = useRef();
  const rolingRef = useRef();
  const closePopupHandel = () => {
    //
    dispatch(popupActions.CLOSE_POPUP());
  };

  ///////submit handle////////
  const {
    isLoading: isLoadingPost,
    error: errorPost,
    sendRequest: sendRequestPost,
  } = useHttp();
  const submitHandle = () => {
    //
    console.log("submitHandle");
    if (!nameRef.current.value.trim()) {
      return Toast.message.error("Please Input Name Role!", Toast.option);
    }
    const dataForm = {
      name: nameRef.current.value.trim(),
      autho: [],
    };
    if (scheduleRef.current.checked) {
      dataForm.autho.push("schedule");
    }
    if (myClassRef.current.checked) {
      dataForm.autho.push("myClass");
    }
    if (overviewRef.current.checked) {
      dataForm.autho.push("overview");
    }
    if (moduleRef.current.checked) {
      dataForm.autho.push("module");
    }
    if (courseRef.current.checked) {
      dataForm.autho.push("course");
    }
    if (classRef.current.checked) {
      dataForm.autho.push("class");
    }
    if (userRef.current.checked) {
      dataForm.autho.push("user");
    }
    if (waitingListRef.current.checked) {
      dataForm.autho.push("waitingList");
    }
    if (rolingRef.current.checked) {
      dataForm.autho.push("roling");
    }
    console.log(dataForm);

    const option = {
      url: roleAPI.getAllRole,
      method: "POST",
      headers: {
        authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: dataForm,
    };

    //message handle
    const messageHandle = (resData) => {
      //////
      console.log(resData);
      dataForm._id = resData._id;
      props.onUpdateRole(dataForm);
      dispatch(popupActions.CLOSE_POPUP());
    };

    sendRequestPost(option, messageHandle);
  };

  ///////////////// edit Handle ///////////////
  const {
    isLoading: isLoadingEdit,
    error: errorEdit,
    sendRequest: sendRequestEdit,
  } = useHttp();
  const editHandle = () => {
    console.log("editHandle");
    const dataForm = {
      name: nameRef.current.value,
      autho: [],
    };
    if (scheduleRef.current.checked) {
      dataForm.autho.push("schedule");
    }
    if (myClassRef.current.checked) {
      dataForm.autho.push("myClass");
    }
    if (overviewRef.current.checked) {
      dataForm.autho.push("overview");
    }
    if (moduleRef.current.checked) {
      dataForm.autho.push("module");
    }
    if (courseRef.current.checked) {
      dataForm.autho.push("course");
    }
    if (classRef.current.checked) {
      dataForm.autho.push("class");
    }
    if (userRef.current.checked) {
      dataForm.autho.push("user");
    }
    if (waitingListRef.current.checked) {
      dataForm.autho.push("waitingList");
    }
    if (rolingRef.current.checked) {
      dataForm.autho.push("roling");
    }

    const option = {
      url: roleAPI.getAllRole + "/" + roleData._id,
      method: "PUT",
      headers: {
        authorization: "Bearer " + getToken(),
        "Content-Type": "application/json",
      },
      body: dataForm,
    };

    //message handle
    const messageHandle = (resData) => {
      //////
      dataForm._id = resData._id;
      props.onUpdateRole(dataForm);
      dispatch(popupActions.CLOSE_POPUP());
    };

    sendRequestEdit(option, messageHandle);
  };
  return (
    <div className={styles.containers}>
      <div className={styles.background} onClick={closePopupHandel}></div>
      <div className={styles.container}>
        <div className={styles.title}>
          {roleData ? "EDIT ROLE" : "ADD ROLE"}
          <span className={styles["btn-close"]} onClick={closePopupHandel}>
            x
          </span>
        </div>
        <div className={styles["role-row"]}>
          <label>Role</label>
          <input
            placeholder="role"
            defaultValue={roleData && roleData.name}
            ref={nameRef}
          ></input>
        </div>
        <div className={styles["list-role"]}>
          {/* col 1 */}
          <div className={styles.col}>
            <div className={styles.subtitle}>Dashboard</div>
            <div className={styles.items}>
              <input
                type="checkbox"
                id="Schedule"
                defaultChecked={
                  roleData &&
                  roleData.autho &&
                  roleData.autho.includes("schedule")
                }
                ref={scheduleRef}
              ></input>
              <label htmlFor="Schedule">Schedule</label>
            </div>
            <div className={styles.items}>
              <input
                type="checkbox"
                id="myClass"
                defaultChecked={
                  roleData &&
                  roleData.autho &&
                  roleData.autho.includes("myClass")
                }
                ref={myClassRef}
              ></input>
              <label htmlFor="myClass">My Class</label>
            </div>
            <div className={styles.items}>
              <input
                type="checkbox"
                id="Overview"
                defaultChecked={
                  roleData &&
                  roleData.autho &&
                  roleData.autho.includes("overview")
                }
                ref={overviewRef}
              ></input>
              <label htmlFor="Overview">Overview</label>
            </div>
          </div>
          {/* col 2 */}
          <div className={styles.col}>
            <div className={styles.subtitle}>Creating</div>
            <div className={styles.items}>
              <input
                type="checkbox"
                id="Module"
                defaultChecked={
                  roleData &&
                  roleData.autho &&
                  roleData.autho.includes("module")
                }
                ref={moduleRef}
              ></input>
              <label htmlFor="Module">Module</label>
            </div>
            <div className={styles.items}>
              <input
                type="checkbox"
                id="Course"
                defaultChecked={
                  roleData && roleData.autho && roleData.autho.includes("class")
                }
                ref={courseRef}
              ></input>
              <label htmlFor="Course">Course</label>
            </div>
            <div className={styles.items}>
              <input
                type="checkbox"
                id="Class"
                defaultChecked={
                  roleData &&
                  roleData.autho &&
                  roleData.autho.includes("course")
                }
                ref={classRef}
              ></input>
              <label htmlFor="Class">Class</label>
            </div>
            <div className={styles.items}>
              <input
                type="checkbox"
                id="User"
                defaultChecked={
                  roleData && roleData.autho && roleData.autho.includes("user")
                }
                ref={userRef}
              ></input>
              <label htmlFor="User">User</label>
            </div>
          </div>
          {/* col 3 */}
          <div className={styles.col}>
            <div className={styles.subtitle}>Enrolling</div>
            <div className={styles.items}>
              <input
                type="checkbox"
                id="WaitingList"
                defaultChecked={
                  roleData &&
                  roleData.autho &&
                  roleData.autho.includes("waitingList")
                }
                ref={waitingListRef}
              ></input>
              <label htmlFor="WaitingList">Waiting List</label>
            </div>
            <div className={styles.items}>
              <input
                type="checkbox"
                id="Roling"
                defaultChecked={
                  roleData &&
                  roleData.autho &&
                  roleData.autho.includes("roling")
                }
                ref={rolingRef}
              ></input>
              <label htmlFor="Roling">Roling</label>
            </div>
          </div>
        </div>
        <div className={styles["action-row"]}>
          <button
            className={styles.btn}
            onClick={roleData ? editHandle : submitHandle}
            disabled={isLoadingPost}
          >
            {roleData ? "Edit Role" : isLoadingPost ? "Sending..." : "Add Role"}
          </button>
        </div>
        {errorPost && (
          <div className={styles["message-error"]}>{errorPost}</div>
        )}
      </div>
    </div>
  );
};

export default RolingPopup;
