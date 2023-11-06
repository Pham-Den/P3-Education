import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { moduleAPI } from "../../utils/API";
import useHttp from "../../hook/use-http";
import Toast from "../../toast/Toast";
import LoaderIcon from "react-loader-icon";

import styles from "./AddModuleForm.module.scss";
import { getToken } from "../../utils/isAuthi";

const AddModuleForm = () => {
  const navigate = useNavigate();
  //hook custom http
  const {
    isLoading: isLoadingGet,
    error: errorGet,
    sendRequest: sendRequestGet,
  } = useHttp();

  const params = useParams();
  //state cho update
  const [isUpdate, setIsUpdate] = useState(params.id);
  const [moduleCurrent, setModuleCurrent] = useState("");

  //tìm module current theo paramsID
  useEffect(() => {
    const option = {
      url: moduleAPI + "/" + params.id,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };

    const messageHandle = (dataRes) => {
      ///
      setModuleCurrent(dataRes);
    };

    if (params.id) {
      sendRequestGet(option, messageHandle);
    }
  }, [params.id]);

  const categoryRef = useRef();
  const moduleRef = useRef();
  const topicRef = useRef();
  const wpsRef = useRef();
  const flashcardsRef = useRef();
  const slidesRef = useRef();
  const textRef = useRef();
  const keyRef = useRef();
  const audioRef = useRef();
  const videoRef = useRef();
  const task1Ref = useRef();
  const task2Ref = useRef();

  // const imageUpdateHandle = (e) => {};
  const {
    isLoading: isLoadingPost,
    error: errorPost,
    sendRequest: sendRequestPost,
  } = useHttp();
  const submitHandle = (e) => {
    e.preventDefault();
    //validation data
    const data = {
      category: categoryRef.current.value.trim(),
      module: moduleRef.current.value.trim(),
      topic: topicRef.current.value.trim(),
      wps: wpsRef.current.value.trim(),
      flashcards: flashcardsRef.current.value.trim(),
      slides: slidesRef.current.value.trim(),
      text: textRef.current.value.trim(),
      key: keyRef.current.value.trim(),
      audio: audioRef.current.value.trim(),
      video: videoRef.current.value.trim(),
      task1: task1Ref.current.value.trim(),
      task2: task2Ref.current.value.trim(),
    };

    //validation data

    if (!data.category) {
      return Toast.message.error("Please enter Category!", Toast.option);
    }
    if (!data.module) {
      return Toast.message.error("Please enter Module!", Toast.option);
    }
    if (!data.topic) {
      return Toast.message.error("Please enter Topic!", Toast.option);
    }

    /////////////////valid ok////////////////////
    const option = {
      url: moduleAPI,
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: data,
    };
    const messageHandle = (resData) => {
      //thành công
      Toast.message.success(resData.message, Toast.option);

      categoryRef.current.value = "";
      moduleRef.current.value = "";
      topicRef.current.value = "";
      wpsRef.current.value = "";
      flashcardsRef.current.value = "";
      slidesRef.current.value = "";
      textRef.current.value = "";
      keyRef.current.value = "";
      audioRef.current.value = "";
      videoRef.current.value = "";
      task1Ref.current.value = "";
      task2Ref.current.value = "";
    };

    sendRequestPost(option, messageHandle);
  };

  //////////////////////////update//////////////////////
  const {
    isLoading: isLoadingUpdate,
    error: errorUpdate,
    sendRequest: sendRequestUpdate,
  } = useHttp();
  const updateHandle = (e) => {
    e.preventDefault();

    //validation data
    const data = {
      topic: topicRef.current.value.trim(),
      flashcards: flashcardsRef.current.value.trim(),
      wps: wpsRef.current.value.trim(),
      slides: slidesRef.current.value.trim(),
      text: textRef.current.value.trim(),
      key: keyRef.current.value.trim(),
      audio: audioRef.current.value.trim(),
      video: videoRef.current.value.trim(),
      task1: task1Ref.current.value.trim(),
      task2: task2Ref.current.value.trim(),
    };

    //  chỉ cho edit topic
    if (!data.topic) {
      return Toast.message.error("Please enter Topic!", Toast.option);
    }

    /////////////////valid ok////////////////////
    const option = {
      url: moduleAPI + "/" + params.id,
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: data,
    };

    const messageHandle = (resData) => {
      //thành công
      Toast.message.success(resData.message, Toast.option);
      navigate("/module");
    };

    sendRequestUpdate(option, messageHandle);
  };

  return (
    <div className={styles.containers}>
      <div className={styles.container}>
        <div className={styles.title}>
          {isUpdate ? "UPDATE MODULE" : "CREATE NEW MODULE"}
        </div>
        {isLoadingGet && <LoaderIcon color={"red"} />}
        {!isLoadingGet && errorGet && (
          <div className={styles["message-error"]}>{errorGet}</div>
        )}

        <form
          className={styles["form-containers"]}
          onSubmit={isUpdate ? updateHandle : submitHandle}
        >
          <div className={styles.row}>
            <label htmlFor="Category" className={styles.col1}>
              Category
            </label>
            <input
              className={styles.col2}
              name="Category"
              type="text"
              id="Category"
              defaultValue={isUpdate ? moduleCurrent.category : ""}
              disabled={isUpdate}
              placeholder="Enter Category"
              ref={categoryRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Module" className={styles.col1}>
              Module
            </label>
            <input
              name="Module"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? moduleCurrent.module : ""}
              disabled={isUpdate}
              id="Module"
              placeholder="Enter Module"
              ref={moduleRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Topic" className={styles.col1}>
              Topic
            </label>
            <input
              name="Topic"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? moduleCurrent.topic : ""}
              id="Topic"
              placeholder="Enter Topic"
              ref={topicRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="wps" className={styles.col1}>
              WPS
            </label>
            <input
              name="wps"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? moduleCurrent.wps : ""}
              id="wps"
              placeholder="Enter WPS"
              ref={wpsRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Flashcards" className={styles.col1}>
              Flashcards
            </label>
            <input
              name="Flashcards"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? moduleCurrent.slides : ""}
              id="Flashcards"
              placeholder="Enter Flashcards"
              ref={flashcardsRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Slides" className={styles.col1}>
              Slides
            </label>
            <input
              name="Slides"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? moduleCurrent.slides : ""}
              id="Slides"
              placeholder="Enter Slides"
              ref={slidesRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Audio" className={styles.col1}>
              Audio
            </label>
            <input
              name="Audio"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? moduleCurrent.audio : ""}
              id="Audio"
              placeholder="Enter Audio"
              ref={audioRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Video" className={styles.col1}>
              Video
            </label>
            <input
              name="Video"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? moduleCurrent.video : ""}
              id="Video"
              placeholder="Enter Video"
              ref={videoRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Text" className={styles.col1}>
              Text
            </label>
            <input
              name="Text"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? moduleCurrent.text : ""}
              id="Text"
              placeholder="Enter Text"
              ref={textRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Key" className={styles.col1}>
              Key
            </label>
            <input
              name="Key"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? moduleCurrent.key : ""}
              id="Key"
              placeholder="Enter Key"
              ref={keyRef}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Task1" className={styles.col1}>
              Task1
            </label>
            <input
              name="Task1"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? moduleCurrent.task1 : ""}
              id="Task1"
              placeholder="Enter Task1"
              ref={task1Ref}
            ></input>
          </div>
          <div className={styles.row}>
            <label htmlFor="Practice2" className={styles.col1}>
              Task2
            </label>
            <input
              name="Task2"
              className={styles.col2}
              type="text"
              defaultValue={isUpdate ? moduleCurrent.task2 : ""}
              id="Task2"
              placeholder="Enter Task2"
              ref={task2Ref}
            ></input>
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
        </form>
        {Toast.container}
      </div>
    </div>
  );
};
export default AddModuleForm;
