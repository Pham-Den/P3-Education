import { useEffect, useState } from "react";
import styles from "./QuestionPage.module.scss";
import useHttp from "../../hook/use-http";
import { toeicApi } from "../../utils/API";
import Button from "../../component/utils/button/Button";
import { useNavigate } from "react-router-dom";
import Toast from "../../toast/Toast";

const QuestionPage = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [questionListFliter, setQuestionListFilter] = useState([]);

  const {
    isLoading: isLoadingGet,
    error: errorGet,
    sendRequest: sendRequestGet,
  } = useHttp();

  useEffect(() => {
    const option = {
      url: toeicApi.question,
    };

    const messageHandle = (resData) => {
      setQuestionList(resData);
      setQuestionListFilter(resData);
    };

    sendRequestGet(option, messageHandle);
  }, [sendRequestGet]);

  ///update state input
  const searchChangeHandle = (e) => {
    setSearchInput(e.target.value.trim());
  };

  //update filter
  useEffect(() => {
    if (!searchInput) {
      setQuestionListFilter(questionList);
    } else {
      setQuestionListFilter(
        questionList
          .filter((d) =>
            d.exam.toLowerCase().includes(searchInput.toLowerCase())
          )
          .sort((a, b) => a.number - b.number)
      );
    }
  }, [searchInput]);

  ///////////////////add question//////////////////
  const addQuestionHandle = () => {
    ///
    navigate("/question/add");
  };

  /////////////////edit question//////////////
  const editeModuleHandle = (id) => {
    navigate("/question/add/" + id);
  };

  ///////////////delete handle //////////////
  const {
    isLoading: isLoadingDelete,
    error: errorDelete,
    sendRequest: sendRequestDelete,
  } = useHttp();
  const deleteHandle = (data) => {
    //
    const isConfirm = window.confirm(
      "Confirm remove question" + data.number + " - " + data.exam + "!"
    );

    const option = {
      url: toeicApi.question + "/" + data._id,
      headers: {
        "Content-Type": "Application/json",
      },
      method: "DELETE",
    };

    const messageHandle = (resData) => {
      ////
      Toast.message.success(resData.message, Toast.option);

      setQuestionList((prev) => {
        const array = [...prev];
        setQuestionListFilter(array.filter((d) => d._id !== data._id));
        return array.filter((d) => d._id !== data._id);
      });
    };

    sendRequestDelete(option, messageHandle);
  };
  return (
    <div className={styles.containers}>
      <div className={styles["header-container"]}>
        <div className={styles.title}>QUESTION CREATING</div>
        <div className={styles["action-container"]}>
          <input
            onChange={searchChangeHandle}
            value={searchInput}
            className={styles.search}
            placeholder="Tìm kiếm"
          ></input>
          <Button action="add" onClick={addQuestionHandle}>
            Create
          </Button>
        </div>
      </div>

      <div className={styles["body-container"]}>
        <div className={styles["table-container"]}>
          <table
            className={
              styles.table + " table caption-top align-middle table-bordered"
            }
          >
            <thead>
              <tr className="align-middle table-dark">
                <th scope="col">Exam</th>
                <th scope="col">Part</th>
                <th scope="col">Number</th>
                <th scope="col">Question</th>
                <th scope="col">Answers</th>
                <th scope="col">Correct</th>
                <th scope="col">Note</th>
                <th scope="col">Image</th>
                <th scope="col">Time Start</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                <th scope="col">Created By</th>
              </tr>
            </thead>
            <tbody className={styles["table-body"]}>
              {questionListFliter.length > 0 &&
                questionListFliter.map((data) => {
                  return (
                    <tr key={data._id}>
                      <th>{data.exam}</th>
                      <td>{data.part}</td>
                      <td>{data.number}</td>
                      <td>{data.question}</td>
                      <td>
                        <div>A. {data.a}</div>
                        <div>B. {data.b}</div>
                        <div>C. {data.c}</div>
                        <div>D. {data.d}</div>
                      </td>
                      <td>{data.correct}</td>
                      <td>{data.note}</td>
                      <td>{data.image}</td>
                      <td>{data.timeStart}</td>
                      <td>
                        <Button
                          action="edit"
                          onClick={() => editeModuleHandle(data._id)}
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          action="delete"
                          onClick={() => deleteHandle(data)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td>{data.createdBy && data.createdBy.email}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {Toast.container}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
