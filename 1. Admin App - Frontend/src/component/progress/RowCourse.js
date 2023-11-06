import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RowCourse.module.css";

const RowCourse = (props) => {
  const courseCurrent = props.course;

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  //lấy thông tin lớp học
  // console.log(courseCurrent);

  //tìm tổng số module / courses
  const totalModules = courseCurrent.modules.length;
  //check tiến độ
  // tìm active của course này
  let total = 0;
  if (courseCurrent.modules && courseCurrent.modules.length > 0) {
    courseCurrent.modules.forEach((element) => {
      props.dataClass.progress.forEach((data) => {
        if (data.module === element.module && data.isDone == true) {
          return (total = total + 1);
        }
      });
    });
  }

  //courseDetailHandle
  const courseDetailHandle = (courseID) => {
    //dùng kiểu navigate, để có thể truy cập bằng link - còn truyền props thì không thể
    setIsLoading(true);
    navigate(`courses/${courseID}`);
  };

  return (
    <div className={styles.course} key={courseCurrent._id}>
      <img
        className={styles.image}
        src={courseCurrent.image}
        alt={courseCurrent.code}
      ></img>
      <div className={styles["content-course"]}>
        <div className={styles["course-title"]}>{courseCurrent.code}</div>
        <div>{courseCurrent.desc}</div>
        <button
          onClick={() => courseDetailHandle(courseCurrent._id)}
          className={styles.btn}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Study"}
        </button>
        <div>
          <ProgressBar
            completed={total}
            labelAlignment="center"
            labelColor="#fff"
            bgColor="#099268"
            maxCompleted={totalModules}
            // width="100%"
            customLabel={`${total}/${totalModules}`}
          />
        </div>
      </div>
    </div>
  );
};

export default RowCourse;
