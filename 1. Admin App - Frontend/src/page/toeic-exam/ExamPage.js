import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../component/utils/button/Button";
import useHttp from "../../hook/use-http";
import Toast from "../../toast/Toast";
import { toeicApi } from "../../utils/API";
import styles from "./ExamPage.module.scss";

const ExamPage = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [examList, setExamList] = useState([]);

  //////////////get data init//////////////
  const {
    isLoading: isLoadingGet,
    error: errorGet,
    sendRequest: sendRequestGet,
  } = useHttp();

  useEffect(() => {
    const option = {
      url: toeicApi.exam,
    };

    sendRequestGet(option, setExamList);
  }, [sendRequestGet]);

  const searchChangeHandle = () => {
    ///
  };

  const addExamHandle = () => {
    //
    navigate("/exam/add");
  };

  const editExamHandle = (id) => {
    //
    navigate("/exam/add/" + id);
  };
  return (
    <div className={styles.containers}>
      <div className={styles["header-container"]}>
        <div className={styles.title}>EXAM TOEIC CREATING</div>
        <div className={styles["action-container"]}>
          <input
            onChange={searchChangeHandle}
            value={searchInput}
            className={styles.search}
            placeholder="Tìm kiếm"
          ></input>
          <Button action="add" onClick={addExamHandle}>
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
                <th scope="col">Question</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                <th scope="col">Created By</th>
              </tr>
            </thead>
            <tbody className={styles["table-body"]}>
              {examList.length > 0 &&
                examList.map((data) => {
                  return (
                    <tr key={data._id}>
                      <th>{data.code}</th>
                      <td>
                        <ul>
                          {data.struc.map((d) => {
                            return (
                              <li>
                                Part {d.part}: {d.sentences}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                      <td>Question Current: {data.questions.length}</td>
                      <td>
                        <Button
                          action="edit"
                          onClick={() => editExamHandle(data._id)}
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          action="delete"
                          // onClick={() => deleteHandle(data)}
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

export default ExamPage;
