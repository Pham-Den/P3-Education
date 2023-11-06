import { useEffect, useRef, useState } from "react";
import LoaderIcon from "react-loader-icon";
import { useSelector } from "react-redux";
import { SiGooglemeet } from "react-icons/si";
import { BsCalendarWeek } from "react-icons/bs";

import Toast from "../toast/Toast";
import ClassRow from "../component/progress/ClassRow";
import useHttp from "../hook/use-http";
import { classAPI } from "../utils/API";

import styles from "./ClassesPage.module.scss";
import { getToken } from "../utils/isAuthi";
import { Link } from "react-router-dom";
import ClassCard from "../component/classes/ClassCard";
import ClassAtt from "../component/progress/ClassRow";

const ClassesPage = () => {
  const user = useSelector((state) => state.login.user);

  const [dataClass, setDataClass] = useState([]);
  const [dataClassFilter, setDataClassFilter] = useState([]);

  //search
  const searchRef = useRef();

  const searchHandle = (e) => {
    // console.log(searchRef.current.value);
    setDataClassFilter(
      dataClass.filter((data) =>
        data.code
          .toLowerCase()
          .includes(searchRef.current.value.toLowerCase().trim())
      )
    );
  };
  //hook custom http
  const { isLoading, error, sendRequest } = useHttp();

  /////////////////1.get Module/////////////
  //cb handle data
  const getData = (data) => {
    setDataClass(data);
    setDataClassFilter(data);
  };
  //chạy hook
  useEffect(() => {
    sendRequest(
      {
        url: classAPI.adminClassAPI,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      },
      getData
    );
  }, [sendRequest]);

  let content = <div className={styles.nodata}>No Class Data!</div>;
  if (dataClass.length > 0) {
    content = (
      <div className={styles["card-containers"]}>
        {dataClass.map((data) => {
          return <ClassCard data={data} key={data._id} />;
        })}
      </div>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <div className={styles.containers}>
      <div className={styles["header-container"]}>
        <div className={styles.title}>YOUR CLASSES</div>
        <div className={styles["action-container"]}>
          {user.linkMeet ? (
            <a href={user.linkMeet} target="_blank" className={styles.linkmeet}>
              <SiGooglemeet size={30} />
            </a>
          ) : (
            <Link to="/info?tab=meet" className={styles.linkmeet}>
              +Add Link Meet
            </Link>
          )}
          {user.linkCalendar ? (
            <a
              href={user.linkCalendar}
              target="_blank"
              className={styles.linkcalendar}
            >
              <BsCalendarWeek size={30} />
            </a>
          ) : (
            <Link to="/info?tab=calendar" className={styles.linkcalendar}>
              +Add Link Calendar
            </Link>
          )}
        </div>
      </div>

      {/* table */}
      <div className={styles["table-container"] + " table-responsive"}>
        {isLoading ? <LoaderIcon color={"red"} /> : content}
      </div>
      {Toast.container}
    </div>
  );
};

export default ClassesPage;
