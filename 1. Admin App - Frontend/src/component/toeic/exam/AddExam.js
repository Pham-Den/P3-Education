import { useEffect, useRef, useState } from "react";
import styles from "./AddExam.module.scss";
import { toeicApi } from "../../../utils/API";
import useHttp from "../../../hook/use-http";
import Toast from "../../../toast/Toast";
import { useParams } from "react-router-dom";

import { MultiSelect } from "react-multi-select-component";

const AddExam = () => {
  const params = useParams();
  const [editMode, setEditMode] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [examCurrent, setExamCurrent] = useState("");

  const examRef = useRef();
  const part1Ref = useRef();
  const part2Ref = useRef();
  const part3Ref = useRef();
  const part4Ref = useRef();
  const audioRef = useRef();

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
      url: toeicApi.exam + "/" + params.id,
    };
    if (params.id) {
      sendRequestGet(option, setExamCurrent);
    }
  }, [params.id]);

  useEffect(() => {
    let array = [];
    if (
      examCurrent &&
      examCurrent.questions &&
      examCurrent.questions.length > 0
    ) {
      examCurrent.questions.forEach((d) => {
        const data = { label: d.exam + "-" + d.number, value: d._id };
        array.push(data);
      });
    }

    setSelected(array);
  }, [examCurrent]);

  ////////////////////select/////////////////////
  //
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);

  //get data question
  const {
    isLoading: isLoadingGetQ,
    error: errorGetQ,
    sendRequest: sendRequestGetQ,
  } = useHttp();
  useEffect(() => {
    const option = {
      url: toeicApi.question,
    };

    sendRequestGetQ(option, setQuestionList);
  }, [sendRequestGetQ]);

  useEffect(() => {
    console.log(questionList);
    let questionRange = [...questionList].sort((a, b) => a.number - b.number);
    console.log(questionRange);
    let array = [];
    questionRange.forEach((d) => {
      const data = { label: d.exam + "-" + d.number, value: d._id };
      array.push(data);
    });

    setOptions(array);
  }, [questionList]);

  /////////////////////add new exam///////////////

  const {
    isLoading: isLoadingPost,
    error: errorPost,
    sendRequest: sendRequestPost,
  } = useHttp();
  const sumbitHandle = (e) => {
    e.preventDefault();
    const dataForm = {
      code: examRef.current.value,
      struc: [
        {
          part: 1,
          sentences: part1Ref.current.value,
        },
        {
          part: 2,
          sentences: part2Ref.current.value,
        },
        {
          part: 3,
          sentences: part3Ref.current.value,
        },
        {
          part: 4,
          sentences: part4Ref.current.value,
        },
      ],

      audio: audioRef.current.value,
      questions: selected.map((d) => d.value),
    };

    //   //valid

    //   //ok

    const option = {
      url: toeicApi.exam,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataForm,
    };
    const messageHandle = (resData) => {
      ////
      Toast.message.success(resData.message, Toast.option);
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
      code: examRef.current.value,
      struc: [
        {
          part: 1,
          sentences: part1Ref.current.value,
        },
        {
          part: 2,
          sentences: part2Ref.current.value,
        },
        {
          part: 3,
          sentences: part3Ref.current.value,
        },
        {
          part: 4,
          sentences: part4Ref.current.value,
        },
      ],
      audio: audioRef.current.value,
      questions: selected.map((d) => d.value),
    };

    //   //valid

    //   //ok

    const option = {
      url: toeicApi.exam + "/" + params.id,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: dataForm,
    };
    const messageHandle = (resData) => {
      ////
      Toast.message.success(resData.message, Toast.option);
    };

    sendRequestPut(option, messageHandle);
  };
  return (
    <div className={styles.containers}>
      <div className={styles.container}>
        <div className={styles.title}>
          {editMode ? "UPDATE EXAM" : "ADD NEW EXAM"}
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
            <label htmlFor="exam">Exam Code</label>
            <input
              id="exam"
              defaultValue={examCurrent.code}
              ref={examRef}
              disabled={editMode}
            ></input>
          </div>
          <div className={styles.item1}>
            <label htmlFor="part1">Part 1</label>
            <input
              id="part1"
              placeholder="1-7"
              ref={part1Ref}
              defaultValue={examCurrent ? examCurrent.struc[0].sentences : ""}
            ></input>
          </div>
          <div className={styles.item1}>
            <label htmlFor="part2">Part 2</label>
            <input
              id="part2"
              placeholder="1-7"
              ref={part2Ref}
              defaultValue={examCurrent ? examCurrent.struc[1].sentences : ""}
            ></input>
          </div>
          <div className={styles.item1}>
            <label htmlFor="part3">Part 3</label>
            <input
              id="part3"
              placeholder="1-7"
              ref={part3Ref}
              defaultValue={examCurrent ? examCurrent.struc[2].sentences : ""}
            ></input>
          </div>
          <div className={styles.item1}>
            <label htmlFor="part4">Part 4</label>
            <input
              id="part4"
              placeholder="1-7"
              ref={part4Ref}
              defaultValue={examCurrent ? examCurrent.struc[3].sentences : ""}
            ></input>
          </div>
          <div className={styles.item}>
            <label htmlFor="Audio">Audio</label>
            <input
              type="text"
              id="Audio"
              ref={audioRef}
              defaultValue={examCurrent.audio}
            ></input>
          </div>

          <div className={styles.questions}>
            <label>Questions</label>
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
            {selected && (
              <div className={styles["select-message"]}>
                Select: {selected.length} questions
              </div>
            )}
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

export default AddExam;
