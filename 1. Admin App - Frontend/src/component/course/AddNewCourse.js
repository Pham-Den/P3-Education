import { useEffect, useRef, useState } from "react";
import styles from "./AddNewCourse.module.scss";

import { MultiSelect } from "react-multi-select-component";

import Toast from "../../toast/Toast";

import { courseAPI, moduleAPI } from "../../utils/API";
import { useNavigate, useParams } from "react-router-dom";
import useHttp from "../../hook/use-http";
import LoaderIcon from "react-loader-icon";
import { getToken } from "../../utils/isAuthi";

const AddNewCourse = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [courseCurrent, setCourseCurrent] = useState("");

  const {
    isLoading: isLoadingGet,
    error: errorGet,
    sendRequest: sendRequestGet,
  } = useHttp();

  //get data course update
  useEffect(() => {
    if (params.id) {
      setIsUpdate(true);
      const option = {
        url: courseAPI + "/" + params.id,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      };
      const mesageHandle = (dataRes) => {
        //
        setCourseCurrent(dataRes);
        setSelected(
          dataRes.modules.map((data) => ({
            label: data.module,
            value: data._id,
          }))
        );
      };
      sendRequestGet(option, mesageHandle);
    }
  }, [params.id]);

  const codeRef = useRef();
  const descriptionRef = useRef();
  const syllabusRef = useRef();
  const tuitionRef = useRef();
  const imageRef = useRef();

  const [radioType, setRadioType] = useState("Online");

  //multichoise
  const [selected, setSelected] = useState([]);
  const [listModule, setListModule] = useState([]);

  //lấy data nut radio
  const radioHandle = (e) => {
    setRadioType(e.target.value);
  };

  useEffect(() => {
    fetch(moduleAPI, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then((res) => res.json())
      .then((data) => setListModule(data))
      .catch((err) => console.log(err));
  }, []);

  //multi choise
  const options = [];
  if (listModule.length > 0) {
    listModule.forEach((data) =>
      options.push({ label: data.module, value: data._id })
    );
  }

  //validation data
  ///////////////////////////// add new //////////////////
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
      desc: descriptionRef.current.value.trim(),
      routestudy: syllabusRef.current.value.trim(),
      price: tuitionRef.current.value.trim(),
      image: imageRef.current.value.trim(),
      type: radioType,
      modules: [],
    };

    if (!dataSubmit.code) {
      return Toast.message.error("Please Enter Code!", Toast.option);
    }

    if (!dataSubmit.desc) {
      return Toast.message.error("Please Enter Description!", Toast.option);
    }

    if (!dataSubmit.routestudy) {
      return Toast.message.error("Please Enter Routestudy!", Toast.option);
    }

    if (!dataSubmit.price) {
      return Toast.message.error("Please Enter Price!", Toast.option);
    }
    if (!dataSubmit.image) {
      return Toast.message.error("Please Enter Link Image!", Toast.option);
    }

    //thêm data module vào mảng
    selected.forEach((data) => dataSubmit.modules.push({ _id: data.value }));

    console.log(dataSubmit);
    ///////////////valid ok//////////
    ////post API
    const option = {
      url: courseAPI,
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: dataSubmit,
    };
    const mesageHandle = (resData) => {
      Toast.message.success(resData.message, Toast.option);

      codeRef.current.value = "";
      descriptionRef.current.value = "";
      syllabusRef.current.value = "";
      tuitionRef.current.value = "";
      imageRef.current.value = "";
    };

    sendRequestPost(option, mesageHandle);
  };

  /////////////////////////////////////update/////////////////////
  const {
    isLoading: isLoadingUpdate,
    error: errorUpdate,
    sendRequest: sendRequestUpdate,
  } = useHttp();
  const updateHandle = (e) => {
    e.preventDefault();
    //valid data
    const dataSubmit = {
      desc: descriptionRef.current.value.trim(),
      routestudy: syllabusRef.current.value.trim(),
      price: tuitionRef.current.value.trim(),
      image: imageRef.current.value.trim(),
      type: radioType,
      modules: [],
    };

    if (!dataSubmit.desc) {
      return Toast.message.error("Please Enter Description!", Toast.option);
    }

    if (!dataSubmit.routestudy) {
      return Toast.message.error("Please Enter Routestudy!", Toast.option);
    }

    if (!dataSubmit.price) {
      return Toast.message.error("Please Enter Price!", Toast.option);
    }
    if (!dataSubmit.image) {
      return Toast.message.error("Please Enter Link Image!", Toast.option);
    }

    //thêm data module vào mảng
    selected.forEach((data) => dataSubmit.modules.push({ _id: data.value }));

    ///////////////valid ok//////////
    ////put API
    const option = {
      url: courseAPI + "/" + params.id,
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: dataSubmit,
    };
    const mesageHandle = (resData) => {
      //
      navigate("/course");
    };
    sendRequestUpdate(option, mesageHandle);
  };
  return (
    <div className={styles.containers}>
      <div className={styles.container}>
        <div className={styles.title}>
          {isUpdate ? "UPDATE COURSE" : "CREATE NEW COURSE"}
        </div>
        {isLoadingGet && <LoaderIcon color={"red"} />}
        {!isLoadingGet && errorGet && (
          <div className={styles["message-error"]}>{errorGet}</div>
        )}
        <form
          className={styles["form-containers"]}
          onSubmit={isUpdate ? updateHandle : submitHandle}
        >
          <div onChange={radioHandle} className={styles["radio-container"]}>
            <div className={styles.radio}>
              <input
                name="type"
                value="Online"
                type="radio"
                id="Online"
                defaultChecked
              ></input>
              <label htmlFor="Online">Online</label>
            </div>
            <div className={styles.radio}>
              <input
                name="type"
                value="Mentor"
                type="radio"
                id="Mentor"
              ></input>
              <label htmlFor="Mentor">Mentor</label>
            </div>
          </div>
          <div className={styles.row}>
            <label htmlFor="code" className={styles.col1}>
              Code Course
            </label>
            <input
              name="code"
              className={styles.col2}
              type="text"
              disabled={isUpdate}
              defaultValue={isUpdate ? courseCurrent.code : ""}
              id="code"
              placeholder="Enter Code"
              ref={codeRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Description">Description</label>
            <input
              name="Description"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? courseCurrent.desc : ""}
              id="Description"
              placeholder="Enter Description"
              ref={descriptionRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Syllabus">Syllabus</label>
            <input
              name="Syllabus"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? courseCurrent.routestudy : ""}
              id="Syllabus"
              placeholder="Enter Syllabus"
              ref={syllabusRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Price">Tuition</label>
            <input
              name="Price"
              className={styles.col2}
              defaultValue={isUpdate ? courseCurrent.price : ""}
              type="number"
              id="Price"
              min="1"
              placeholder="Enter Tuition"
              ref={tuitionRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="bg">Image</label>
            <input
              name="bg"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? courseCurrent.image : ""}
              id="bg"
              placeholder="Enter link Image"
              ref={imageRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="choise">Select Modules</label>
            <MultiSelect
              id="choise"
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
              isLoading={isLoading}
            />
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoadingUpdate || isLoadingPost}
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
          {errorUpdate && (
            <div className={styles["error-message"]}>{errorUpdate}</div>
          )}
        </form>
        {Toast.container}
      </div>
    </div>
  );
};

export default AddNewCourse;
