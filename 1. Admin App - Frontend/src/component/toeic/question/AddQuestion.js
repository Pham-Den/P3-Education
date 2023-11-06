import { useEffect, useRef, useState } from "react";
import styles from "./AddQuestion.module.scss";
import { toeicApi } from "../../../utils/API";
import useHttp from "../../../hook/use-http";
import Toast from "../../../toast/Toast";
import { useParams } from "react-router-dom";

const AddQuestion = () => {
  const params = useParams();
  const [editMode, setEditMode] = useState(false);
  const [questionCurrent, setQuestionCurrent] = useState("");
  const {
    isLoading: isLoadingGet,
    error: errorGet,
    sendRequest: sendRequestGet,
  } = useHttp();
  useEffect(() => {
    if (params.id) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
    const option = {
      url: toeicApi.question + "/" + params.id,
    };

    sendRequestGet(option, setQuestionCurrent);
  }, [params.id]);
  const examRef = useRef();
  const partRef = useRef();
  const numberRef = useRef();
  const questionRef = useRef();
  const aRef = useRef();
  const bRef = useRef();
  const cRef = useRef();
  const dRef = useRef();
  const correctRef = useRef();
  const imgRef = useRef();
  const noteRef = useRef();
  const timeStartRef = useRef();

  /////////////////////add new question///////////////
  const {
    isLoading: isLoadingPost,
    error: errorPost,
    sendRequest: sendRequestPost,
  } = useHttp();
  const sumbitHandle = (e) => {
    e.preventDefault();
    const dataForm = {
      exam: examRef.current.value?.trim(),
      part: partRef.current.value?.trim(),
      number: numberRef.current.value?.trim(),
      question: questionRef.current.value?.trim(),
      a: aRef.current.value?.trim(),
      b: bRef.current.value?.trim(),
      c: cRef.current.value?.trim(),
      d: dRef.current.value?.trim(),
      img: imgRef.current.value?.trim(),
      correct: correctRef.current.value?.trim(),
      note: noteRef.current.value?.trim(),
      timeStart: timeStartRef.current.value?.trim(),
    };

    //valid

    //ok

    const option = {
      url: toeicApi.question,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataForm,
    };
    const messageHandle = (resData) => {
      ////
      Toast.message.success(resData.message, Toast.option);

      questionRef.current.value = "";
      aRef.current.value = "";
      bRef.current.value = "";
      cRef.current.value = "";
      dRef.current.value = "";
      imgRef.current.value = "";
      correctRef.current.value = "";
      noteRef.current.value = "";
      timeStartRef.current.value = "";
    };

    sendRequestPost(option, messageHandle);
  };

  /////////////////////update handel///////////////////////
  const {
    isLoading: isLoadingPut,
    error: errorPut,
    sendRequest: sendRequestPut,
  } = useHttp();
  const updateHandle = (e) => {
    e.preventDefault();
    const dataForm = {
      exam: examRef.current.value?.trim(),
      part: partRef.current.value?.trim(),
      number: numberRef.current.value?.trim(),
      question: questionRef.current.value?.trim(),
      a: aRef.current.value?.trim(),
      b: bRef.current.value?.trim(),
      c: cRef.current.value?.trim(),
      d: dRef.current.value?.trim(),
      img: imgRef.current.value?.trim(),
      correct: correctRef.current.value?.trim(),
      note: noteRef.current.value?.trim(),
      timeStart: timeStartRef.current.value?.trim(),
    };

    //valid

    //ok

    const option = {
      url: toeicApi.question + "/" + params.id,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataForm,
    };
    const messageHandle = (resData) => {
      ////
      Toast.message.success(resData.message, Toast.option);

      questionRef.current.value = "";
      aRef.current.value = "";
      bRef.current.value = "";
      cRef.current.value = "";
      dRef.current.value = "";
      imgRef.current.value = "";
      correctRef.current.value = "";
      noteRef.current.value = "";
      timeStartRef.current.value = "";
    };

    sendRequestPut(option, messageHandle);
  };
  return (
    <div className={styles.containers}>
      <div className={styles.container}>
        <div className={styles.title}>
          {editMode ? "UPDATE QUESTION" : "ADD NEW QUESTION"}
        </div>
        {!editMode && errorPost && (
          <div className={styles["message-error"]}>{errorPost}</div>
        )}
        {editMode && errorPut && (
          <div className={styles["message-error"]}>{errorPut}</div>
        )}
        <form
          className={styles["form-containers"]}
          onSubmit={editMode ? updateHandle : sumbitHandle}
        >
          <div className={styles.item}>
            <label htmlFor="exam">Exam</label>
            <input
              id="exam"
              ref={examRef}
              defaultValue={editMode ? questionCurrent.exam : ""}
              disabled={editMode}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="part">Part</label>
            <input
              id="part"
              ref={partRef}
              defaultValue={editMode ? questionCurrent.part : ""}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="number">Number</label>
            <input
              id="number"
              ref={numberRef}
              defaultValue={editMode ? questionCurrent.number : ""}
            ></input>
          </div>

          <div className={styles.item}>
            <label htmlFor="question">Question</label>
            <input
              id="question"
              ref={questionRef}
              defaultValue={editMode ? questionCurrent.question : ""}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="a">Answer A</label>
            <input
              id="a"
              ref={aRef}
              defaultValue={editMode ? questionCurrent.a : ""}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="b">Answer B</label>
            <input
              id="b"
              ref={bRef}
              defaultValue={editMode ? questionCurrent.b : ""}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="c">Answer C</label>
            <input
              id="c"
              ref={cRef}
              defaultValue={editMode ? questionCurrent.c : ""}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="d">Answer D</label>
            <input
              id="d"
              ref={dRef}
              defaultValue={editMode ? questionCurrent.d : ""}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="correct">Answer Correct</label>
            <input
              id="correct"
              ref={correctRef}
              defaultValue={editMode ? questionCurrent.correct : ""}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="image">Image</label>
            <input
              id="image"
              ref={imgRef}
              defaultValue={editMode ? questionCurrent.img : ""}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="note">Note</label>
            <input
              id="note"
              ref={noteRef}
              defaultValue={editMode ? questionCurrent.note : ""}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="timestart">Time Audio (s)</label>
            <input
              id="timestart"
              ref={timeStartRef}
              defaultValue={editMode ? questionCurrent.timeStart : ""}
            ></input>
          </div>
          <div className={styles.btn}>
            <button type="submit">{editMode ? "Update" : "Submit"}</button>
          </div>
        </form>
      </div>
      {Toast.container}
    </div>
  );
};

export default AddQuestion;
