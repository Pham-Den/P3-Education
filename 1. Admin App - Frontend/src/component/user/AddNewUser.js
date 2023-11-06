import { useEffect, useRef, useState } from "react";
import styles from "./AddNewUser.module.scss";

import { MultiSelect } from "react-multi-select-component";

import Toast from "../../toast/Toast";
import { courseAPI, userAPI } from "../../utils/API";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../hook/use-http";
import { getToken } from "../../utils/isAuthi";

const AddNewUser = () => {
  const navigate = useNavigate();

  const [isUpdate, setIsUpdate] = useState(false);
  const [userCurrent, setUserCurrent] = useState("");
  const params = useParams();

  //hook get data update
  const {
    isLoading: isLoadingGetUpdate,
    error: errorGetUpdate,
    sendRequest: sendRequestGetUpdate,
  } = useHttp();

  //nếu có id thì chuyển qua form update
  useEffect(() => {
    if (params.id && !params.id.includes("@")) {
      setIsUpdate(true);
      //fetch tìm userCurrent
      const option = {
        url: userAPI.adminUserApi + "/" + params.id,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      };

      //message handle
      const messageHandle = (dataRes) => {
        setUserCurrent(dataRes);
        //set select course
        setSelectedCourses(
          dataRes.courses.map((data) => ({
            label: data.code,
            value: data._id,
          }))
        );
      };

      sendRequestGetUpdate(option, messageHandle);
    }
  }, [sendRequestGetUpdate, params.id]);

  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();

  //multichoise
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [listCourses, setListCourses] = useState([]);

  //get data-update ban đầu
  useEffect(() => {
    fetch(courseAPI, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => setListCourses(data))
      .catch((err) => console.log(err));
  }, []);

  //multi choise
  const optionsCourses = [];
  if (listCourses.length > 0) {
    listCourses.forEach((data) =>
      optionsCourses.push({ label: data.code, value: data._id })
    );
  }

  ///////////////////////////////post data///////////////////////////////
  const {
    isLoading: isLoadingPost,
    error: errorPost,
    sendRequest: sendRequestPost,
  } = useHttp();
  const submitHandle = (e) => {
    e.preventDefault();

    //valid data
    const dataSubmit = {
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
      role: roleRef.current.value,
      courses: [],
    };

    if (!dataSubmit.email) {
      return Toast.message.error("Please Enter Email!", Toast.option);
    } else if (!dataSubmit.email.includes("@")) {
      return Toast.message.error("Email Must Include @!", Toast.option);
    }

    if (!dataSubmit.password) {
      return Toast.message.error("Please Enter Password!", Toast.option);
    } else if (dataSubmit.password.length < 8) {
      return Toast.message.error(
        "Password Must Be From 8 Words!",
        Toast.option
      );
    }
    if (!dataSubmit.role) {
      return Toast.message.error("Please Choose Role!", Toast.option);
    }

    //thêm data module vào mảng
    selectedCourses.forEach((data) =>
      dataSubmit.courses.push({ _id: data.value })
    );

    ///////////////valid ok//////////
    ////post API
    const option = {
      url: userAPI.adminUserApi,
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: dataSubmit,
    };

    const messageHandle = (dataRes) => {
      Toast.message.success(dataRes.message, Toast.option);

      emailRef.current.value = "";
      passwordRef.current.value = "";
      setSelectedCourses([]);
    };

    sendRequestPost(option, messageHandle);
  };

  ////////////////////////////////update data//////////////////////////////
  const {
    isLoading: isLoadingUpdate,
    error: errorUpdate,
    sendRequest: sendRequestUpdate,
  } = useHttp();

  const updateHandle = (e) => {
    e.preventDefault();

    //valid data - chỉ update role và courses
    const dataSubmit = {
      role: roleRef.current.value,
      courses: [],
    };

    if (!dataSubmit.role) {
      return Toast.message.error("Please Choose Role!", Toast.option);
    }

    //thêm data module vào mảng
    selectedCourses.forEach((data) =>
      dataSubmit.courses.push({ _id: data.value })
    );

    ///////////////valid ok//////////
    ////post API
    const option = {
      url: userAPI.adminUserApi + "/" + params.id,
      dataSubmit,
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: dataSubmit,
    };

    //message handle
    const messageHandle = (dataRes) => {
      Toast.message.success(dataRes.message, Toast.option);
      navigate("/user");
    };

    sendRequestUpdate(option, messageHandle);
  };
  return (
    <div className={styles.containers}>
      <div className={styles.container}>
        <div className={styles.title}>
          {isUpdate ? "UPDATE USER" : "CREATE NEW USER"}
        </div>
        <form
          className={styles["form-containers"]}
          onSubmit={isUpdate ? updateHandle : submitHandle}
        >
          <div className={styles.row}>
            <label htmlFor="Email" className={styles.col1}>
              Email
            </label>
            <input
              name="Email"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? userCurrent.email : ""}
              disabled={isUpdate}
              id="Email"
              placeholder="Enter Email"
              ref={emailRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Password">Password</label>
            <input
              name="Password"
              className={styles.col2}
              type="text"
              disabled={isUpdate}
              id="Password"
              placeholder="Enter Password"
              ref={passwordRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Password">Role</label>
            <select ref={roleRef} className={styles.col3}>
              <option disabled>Choose role</option>
              <option defaultChecked value="user">
                User
              </option>
              <option value="mod">Mod</option>
            </select>
          </div>
          <div className={styles.row}>
            <label htmlFor="choise">Select Courses</label>
            <MultiSelect
              id="choise"
              options={optionsCourses}
              value={selectedCourses}
              onChange={setSelectedCourses}
              labelledBy="Select"
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoadingPost || isLoadingUpdate}
            >
              {isUpdate
                ? isLoadingUpdate
                  ? "Sending..."
                  : "Update"
                : isLoadingPost
                ? "Sending..."
                : "Submit"}
            </button>
          </div>
          {errorPost && (
            <div className={styles["error-message"]}>{errorPost}</div>
          )}
        </form>
        {Toast.container}
      </div>
    </div>
  );
};

export default AddNewUser;
