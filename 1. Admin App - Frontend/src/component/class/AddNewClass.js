import { useEffect, useRef, useState } from "react";
import styles from "./AddNewClass.module.scss";

import { MultiSelect } from "react-multi-select-component";

import Toast from "../../toast/Toast";

import { classAPI, courseAPI, userAPI } from "../../utils/API";
import { useNavigate, useParams } from "react-router-dom";
import { getToken } from "../../utils/isAuthi";
import useHttp from "../../hook/use-http";

const AddNewClass = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);
  const [classCurrent, setClassCurrent] = useState("");
  const [colorCurrent, setColorCurrent] = useState("#000000");
  const [backgroundCurrent, setBackgroundCurrent] = useState("#ffffff");

  //multichoise
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [listCourses, setListCourses] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [listUsers, setListUsers] = useState([]);

  //nếu params id có thì xem như update
  const params = useParams();

  //update color
  const updateColor = (e) => {
    setColorCurrent(e.target.value);
  };
  const updateBackground = (e) => {
    setBackgroundCurrent(e.target.value);
  };

  useEffect(() => {
    if (params.id) {
      setIsUpdate(true);

      const getClassCurrent = async (url) => {
        try {
          const response = await fetch(url, {
            headers: {
              Authorization: "Bearer " + getToken(),
            },
          });
          const dataRes = await response.json();

          if (response.status !== 200) {
            return Toast.message.error(dataRes.message, Toast.option);
          }

          setClassCurrent(dataRes);
          setBackgroundCurrent(dataRes.background);
          setColorCurrent(dataRes.color);
          setSelectedCourses(
            dataRes.courses.map((data) => ({
              label: data.code,
              value: data._id,
            }))
          );
          setSelectedUsers(
            dataRes.users.map((data) => ({
              label: data.email,
              value: data._id,
            }))
          );
        } catch (err) {
          return Toast.message.error(err, Toast.option);
        }
      };

      //get data
      getClassCurrent(classAPI.adminClassAPI + "/" + params.id);
    }
  }, [params.id]);
  const codeRef = useRef();
  const quizRef = useRef();
  const classroomRef = useRef();
  const kickoffRef = useRef();
  const feeRef = useRef();
  const noteRef = useRef();
  const colorRef = useRef();
  const backgroundRef = useRef();
  const activedRef = useRef();

  //get data course
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

  //get data Users
  useEffect(() => {
    fetch(userAPI.adminUserApi, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => setListUsers(data))
      .catch((err) => console.log(err));
  }, []);

  //multi choise
  const optionsCourses = [];
  if (listCourses.length > 0) {
    listCourses.forEach((data) =>
      optionsCourses.push({ label: data.code, value: data._id })
    );
  }

  const optionsUsers = [];
  if (listUsers.length > 0) {
    listUsers.forEach((data) =>
      optionsUsers.push({ label: data.email, value: data._id })
    );
  }

  //validation data
  ////////////////////////////add new//////////////////////
  //post new
  const {
    isLoading: isLoadingPost,
    error: errorPost,
    sendRequest: sendRequestPost,
  } = useHttp();
  const submitHandle = (e) => {
    e.preventDefault();

    //valid data
    const dataSubmit = {
      code: codeRef.current.value.trim(),
      quiz: quizRef.current.value.trim(),
      classroom: classroomRef.current.value.trim(),
      kickoff: kickoffRef.current.value.trim(),
      fee: feeRef.current.value.trim(),
      note: noteRef.current.value.trim(),
      isActived: activedRef.current.checked,
      color: colorRef.current.value.trim(),
      background: backgroundRef.current.value.trim(),
      courses: [],
      users: [],
    };

    if (!dataSubmit.code) {
      return Toast.message.error("Please Enter Code!", Toast.option);
    }

    if (!dataSubmit.quiz) {
      return Toast.message.error("Please Enter Quiz!", Toast.option);
    }
    if (!dataSubmit.classroom) {
      return Toast.message.error("Please Enter Classroom!", Toast.option);
    }
    if (!dataSubmit.kickoff) {
      return Toast.message.error("Please Enter date Kick Off!", Toast.option);
    }
    if (!dataSubmit.fee) {
      return Toast.message.error("Please Enter Fee!", Toast.option);
    }
    if (!dataSubmit.note) {
      return Toast.message.error("Please Enter Note!", Toast.option);
    }

    //thêm data courses vào mảng
    selectedCourses.forEach((data) =>
      dataSubmit.courses.push({ _id: data.value })
    );

    //thêm data users vào mảng
    selectedUsers.forEach((data) => dataSubmit.users.push({ _id: data.value }));

    ///////////////valid ok//////////
    //post API
    const option = {
      url: classAPI.adminClassAPI,
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: dataSubmit,
    };

    const mesageHandle = (resData) => {
      ///
      Toast.message.success(resData.message, Toast.option);

      codeRef.current.value = "";
      quizRef.current.value = "";
      classroomRef.current.value = "";
      kickoffRef.current.value = "";
      feeRef.current.value = "";
      noteRef.current.value = "";
      setSelectedCourses([]);
      setSelectedUsers([]);
    };
    sendRequestPost(option, mesageHandle);
  };

  //////////////////////////// edit //////////////////
  const {
    isLoading: isLoadingUpdate,
    error: errorUpdate,
    sendRequest: sendRequestUpdate,
  } = useHttp();
  const editHandle = (e) => {
    e.preventDefault();

    //valid data
    const dataSubmit = {
      quiz: quizRef.current.value.trim(),
      classroom: classroomRef.current.value.trim(),
      kickoff: kickoffRef.current.value.trim(),
      fee: feeRef.current.value.trim(),
      note: noteRef.current.value.trim(),
      isActived: activedRef.current.checked,
      color: colorRef.current.value.trim(),
      background: backgroundRef.current.value.trim(),
      courses: [],
      users: [],
    };

    if (!dataSubmit.quiz) {
      return Toast.message.error("Please Enter Quiz!", Toast.option);
    }
    if (!dataSubmit.classroom) {
      return Toast.message.error("Please Enter Classroom!", Toast.option);
    }
    if (!dataSubmit.kickoff) {
      return Toast.message.error("Please Enter date Kick Off!", Toast.option);
    }
    if (!dataSubmit.fee) {
      return Toast.message.error("Please Enter Fee!", Toast.option);
    }
    if (!dataSubmit.note) {
      return Toast.message.error("Please Enter Note!", Toast.option);
    }

    //thêm data courses vào mảng
    selectedCourses.forEach((data) =>
      dataSubmit.courses.push({ _id: data.value })
    );

    //thêm data users vào mảng
    selectedUsers.forEach((data) => dataSubmit.users.push({ _id: data.value }));

    ///////////////valid ok//////////
    ////post API
    const option = {
      url: classAPI.adminClassAPI + "/" + params.id,
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: dataSubmit,
    };
    const messageHandle = (resData) => {
      Toast.message.success(resData.message, Toast.option);
      navigate("/class");
    };

    sendRequestUpdate(option, messageHandle);
  };
  return (
    <div className={styles.containers}>
      <div className={styles.container}>
        <div className={styles.title}>
          {isUpdate ? "UPDATE CLASS" : "CREATE NEW CLASS"}
        </div>
        <form
          className={styles["form-containers"]}
          onSubmit={isUpdate ? editHandle : submitHandle}
        >
          <div className={styles.row}>
            <label htmlFor="Code" className={styles.col1}>
              Code
            </label>
            <input
              name="Code"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? classCurrent.code : ""}
              disabled={isUpdate}
              id="Code"
              placeholder="Enter Code"
              ref={codeRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Quiz" className={styles.col1}>
              Quiz
            </label>
            <input
              name="Quiz"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? classCurrent.quiz : ""}
              id="Quiz"
              placeholder="Enter Quiz"
              ref={quizRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Classroom" className={styles.col1}>
              G.Classroom
            </label>
            <input
              name="Classroom"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? classCurrent.classroom : ""}
              id="Classroom"
              placeholder="Enter G.Classroom"
              ref={classroomRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="kickoff" className={styles.col1}>
              Kick Off
            </label>
            <input
              name="kickoff"
              className={styles.col2}
              defaultValue={isUpdate ? classCurrent.kickoff : ""}
              type="date"
              id="kickoff"
              ref={kickoffRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Fee" className={styles.col1}>
              Fee
            </label>
            <input
              name="Fee"
              className={styles.col2}
              type="number"
              defaultValue={isUpdate ? classCurrent.fee : ""}
              id="Fee"
              min="1"
              placeholder="Enter Fee"
              ref={feeRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Note" className={styles.col1}>
              Note
            </label>
            <input
              name="Note"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? classCurrent.note : ""}
              id="Note"
              placeholder="Enter Case: 14 16"
              ref={noteRef}
            ></input>
          </div>
          <div className={styles["active-row"]}>
            <div class="form-check form-switch">
              <label for="Actived" className={styles.col1}>
                Actived
              </label>
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="Actived"
                ref={activedRef}
                defaultChecked={classCurrent.isActived}
              ></input>
            </div>
          </div>
          <div className={styles["color-row"]}>
            <label htmlFor="Color" className={styles.col1}>
              Color
            </label>
            <input
              name="Color"
              className={styles.col2}
              type="color"
              value={colorCurrent}
              onChange={updateColor}
              id="Note"
              placeholder="Enter Case: 14 16"
              ref={colorRef}
            ></input>
            <label htmlFor="Background" className={styles.col1}>
              Background
            </label>
            <input
              name="Background"
              className={styles.col2}
              type="color"
              value={backgroundCurrent}
              onChange={updateBackground}
              id="Background"
              placeholder="Enter Case: 14 16"
              ref={backgroundRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="choise" className={styles.col1}>
              Select Courses
            </label>
            <MultiSelect
              id="choise"
              options={optionsCourses}
              value={selectedCourses}
              onChange={setSelectedCourses}
              labelledBy="Select Courses"
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="choise" className={styles.col1}>
              Select Users
            </label>
            <MultiSelect
              id="choise"
              options={optionsUsers}
              value={selectedUsers}
              onChange={setSelectedUsers}
              labelledBy="Select Users"
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
                  ? "Sending"
                  : "Update"
                : isLoadingPost
                ? "Sending"
                : "Submit"}
            </button>
          </div>
          {errorPost && (
            <div className={styles["error-message"]}>{errorPost}</div>
          )}
          {errorUpdate && (
            <div className={styles["error-message"]}>{errorUpdate}</div>
          )}
        </form>
        {Toast.container}
      </div>
    </div>
  );
};

export default AddNewClass;
