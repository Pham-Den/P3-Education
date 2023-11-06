import { useEffect, useRef, useState } from "react";
import LoaderIcon from "react-loader-icon";
import { useSelector } from "react-redux";
import { SiGooglemeet } from "react-icons/si";
import { BsCalendarWeek } from "react-icons/bs";

import Toast from "../toast/Toast";
import ClassRow from "../component/progress/ClassRow";
import useHttp from "../hook/use-http";
import { classAPI } from "../utils/API";

import styles from "./ProgressPage.module.scss";
import { getToken } from "../utils/isAuthi";
import { Link } from "react-router-dom";

const ProgressPage = () => {
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
        url: classAPI.getAllClassAPI,
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      },
      getData
    );
  }, [sendRequest]);

  const editHandle = (id, attendance) => {
    //cb handle data
    const getData = (data) => {
      //update state
      const index = dataClass.findIndex((d) => d._id === id);

      let classListUpdate = dataClass;
      classListUpdate[index].attendance = attendance;

      setDataClass(classListUpdate);
      setDataClassFilter(classListUpdate);

      //báo success
      Toast.message.success("Successfully!", Toast.option);
    };
    //hàm put api
    sendRequest(
      {
        url: classAPI.editAttendanceClassAPI + "/" + id,
        method: "PUT",
        body: { attendance },
        headers: {
          "Content-Type": "Application/json",
          Authorization: "Bearer " + getToken(),
        },
      },
      getData
    );
  };

  let content = <p>Please add data!</p>;

  if (dataClass.length > 0) {
    content = (
      <table
        className={
          styles.table + " table caption-top align-middle table-bordered"
        }
      >
        <caption className={styles.caption}>List of classes</caption>
        <thead className={"table-warning"}>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Name</th>
            <th scope="col">No. of Ss</th>
            <th scope="col">Courses</th>
            <th scope="col">Session</th>
            <th scope="col">Month</th>
            <th scope="col">Confirm</th>
          </tr>
        </thead>
        <tbody>
          {dataClassFilter.length > 0 &&
            dataClassFilter.map((data, index) => {
              return (
                <ClassRow
                  key={data._id}
                  items={data}
                  index={index}
                  edit={editHandle}
                />
              );
            })}
        </tbody>
      </table>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <div className={styles.containers}>
      <div className={styles.title}>YOUR CLASSES</div>
      <div className={styles["rows-containers"]}>
        <div className={styles["rows-container"]}>
          {/* <div className={styles.search}> */}
          <input
            className={styles.search}
            placeholder="Tìm kiếm"
            ref={searchRef}
            onChange={searchHandle}
          ></input>
          {/* </div> */}
        </div>
        <div className={styles["icon-container"]}>
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

export default ProgressPage;
