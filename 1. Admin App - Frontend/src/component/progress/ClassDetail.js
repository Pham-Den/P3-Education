import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoaderIcon from "react-loader-icon";
import { SiGoogleclassroom, SiGooglemeet } from "react-icons/si";
import { MdQuiz } from "react-icons/md";
import { BsCalendarWeek } from "react-icons/bs";

import Toast from "../../toast/Toast";
import { classAPI } from "../../utils/API";
import useHttp from "../../hook/use-http";

import styles from "./ClassDetail.module.scss";
import RowStudent from "./RowStudent";
import RowCourse from "./RowCourse";
import { useSelector } from "react-redux";
import { getToken } from "../../utils/isAuthi";

const ClassDetail = () => {
  const user = useSelector((state) => state.login.user);
  const params = useParams();
  const [dataClass, setDataClass] = useState("");

  //hook custom http
  const { isLoading, error, sendRequest } = useHttp();

  /////////////////Tổng tiền//////////////
  let total = 0;
  if (dataClass && dataClass.users.length > 0) {
    dataClass.users.forEach((e) => {
      if (e.others && e.others.length > 0) {
        e.others.forEach((data) => {
          if (data.class === dataClass.code) {
            total = total + Number(data.fee);
          }
        });
      }
    });
  }

  /////////////////1.get classes/////////////
  //cb handle data
  const getData = (data) => {
    setDataClass(data);
  };
  //chạy hook
  useEffect(() => {
    sendRequest(
      {
        url: classAPI.adminClassAPI + "/" + params.id,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      },
      getData
    );
  }, [sendRequest]);

  let content = <p>No data found!</p>;

  if (dataClass) {
    content = (
      <>
        <div className={styles.title}>WELCOME CLASS {dataClass.code}</div>
        <div className={styles["rows-containers"]}>
          <div className={styles["rows-container"]}>
            {/* <div className={styles.search}> */}
            <input className={styles.search} placeholder="Tìm kiếm"></input>
            {/* </div> */}
            <a href={dataClass.classroom} target="_blank">
              <SiGoogleclassroom size={30} className={styles.icon} />
            </a>
            <a href={dataClass.quiz} target="_blank">
              <MdQuiz size={30} className={styles.icon} />
            </a>
          </div>
          <div className={styles["meet-container"]}>
            {user.linkMeet ? (
              <a href={user.linkMeet} target="_blank">
                <SiGooglemeet size={30} className={styles.icon} />
              </a>
            ) : (
              <Link to="/info?tab=meet" className={styles.linkmeet}>
                +Add Link Meet
              </Link>
            )}
            {user.linkCalendar ? (
              <a href={user.linkCalendar} target="_blank">
                <BsCalendarWeek size={30} className={styles.icon} />
              </a>
            ) : (
              <Link to="/info?tab=calendar" className={styles.linkmeet}>
                +Add Link Calendar
              </Link>
            )}
          </div>
        </div>
        <div className={styles["rows-containers-bg"]}>
          {dataClass.courses &&
            dataClass.courses.length > 0 &&
            dataClass.courses.map((data) => {
              return (
                <RowCourse key={data._id} course={data} dataClass={dataClass} />
              );
            })}
        </div>
        <div className={styles["rows-containers"]}>
          <table className="table caption-top align-middle table-bordered">
            <caption className={styles.caption}>List of Student</caption>
            <thead className={"table-warning"}>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Name</th>
                <th scope="col">Progress</th>

                <th scope="col">Tuition</th>
                <th scope="col">Paid</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {dataClass.users.length > 0 ? (
                dataClass.users.map((data, index) => {
                  return (
                    <RowStudent
                      classCode={dataClass.code}
                      key={data._id}
                      items={data}
                      index={index}
                    />
                  );
                })
              ) : (
                <div>No Data!</div>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }
  return (
    <div className={styles.containers}>
      <div className={styles.container}>
        {isLoading ? <LoaderIcon color={"red"} /> : content}

        {Toast.container}
      </div>
    </div>
  );
};

export default ClassDetail;
