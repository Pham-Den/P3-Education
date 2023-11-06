import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useHttp from "../hook/use-http";
import { toeicApi } from "../utils/API";
import styles from "./ToeicPage.module.scss";

const ToeicPage = () => {
  const [examList, setExamList] = useState([]);

  ///////////////get data /////////////
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

  console.log(examList);

  return (
    <div className={styles.containers}>
      <div className={styles.title}>Toeic Exam Available</div>
      <div className={styles["exam-container"]}>
        {examList.length > 0 &&
          examList.map((data) => {
            return (
              <Link
                to={"/toeic/" + data._id}
                className={styles["exams-card"]}
                key={data._id}
              >
                {data.code}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default ToeicPage;
