import { useEffect, useState } from "react";
import { classAPI } from "../utils/API";
import ScheduleRow from "../component/schedule/ScheduleRow";
import { Link, NavLink } from "react-router-dom";
import LoaderIcon from "react-loader-icon";
import { SiGooglemeet } from "react-icons/si";

import { BsCalendarWeek } from "react-icons/bs";
import { MdSettingsSuggest } from "react-icons/md";
import useHttp from "../hook/use-http";

import styles from "./SchedulePage.module.scss";
import { useSelector } from "react-redux";
import { getToken } from "../utils/isAuthi";

const SchedulePage = () => {
  const user = useSelector((state) => state.login.user);
  const timeDefault = {
    ca1: "5:00-6:30",
    ca2: "7:00-8:30",
    ca3: "9:00-10:30",
    ca4: "10:30-12:00",
    ca5: "13:30-15:00",
    ca6: "15:00-16:30",
    ca7: "19:00-20:30",
    ca8: "21:00-22:31",
  };
  const time = user.case || timeDefault;
  const [dataClass, setDataClass] = useState([]);

  //hook custom http
  const { isLoading, error, sendRequest } = useHttp();

  /////////////////1.get Courses/////////////
  //cb handle data
  const getData = (data) => {
    setDataClass(data);
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

  return (
    <div className={styles.containers}>
      <div className={styles.container}>
        <div className={styles["header-container"]}>
          <div className={styles.title}>
            <div>YOUR SCHEDULE</div>
            {isLoading ? (
              <LoaderIcon color={"red"} />
            ) : (
              <div className={styles.setting}>
                <NavLink to="/info?tab=schedule">
                  <MdSettingsSuggest size={30} color="#0c8599" />
                </NavLink>
              </div>
            )}
          </div>

          <div className={styles["action-container"]}>
            {user.linkMeet ? (
              <a
                href={user.linkMeet}
                target="_blank"
                className={styles.linkmeet}
              >
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
                className={styles["calendar-hover"]}
              >
                <BsCalendarWeek size={30} className={styles.icon} />
              </a>
            ) : (
              <Link to="/info?tab=calendar" className={styles.linkCalendar}>
                +Add Link Calendar
              </Link>
            )}
          </div>
        </div>

        <div className={styles["body-container"]}>
          <div className={styles["table-container"]}>
            <div className={styles.header}>
              <div className={styles.dark}>Shift</div>
              <div className={styles.dark}>Time Slots</div>
              <div className={styles.dark}>Mon</div>
              <div className={styles.dark}>Tue</div>
              <div className={styles.dark}>Wed</div>
              <div className={styles.dark}>Thu</div>
              <div className={styles.dark}>Fri</div>
              <div className={styles.dark}>Sat</div>
              <div className={styles.dark}>Sun</div>
            </div>
            <ScheduleRow ca="1" time={time.ca1} row="1" dataClass={dataClass} />
            <ScheduleRow ca="2" time={time.ca2} row="2" dataClass={dataClass} />
            <ScheduleRow ca="3" time={time.ca3} row="3" dataClass={dataClass} />
            <ScheduleRow ca="4" time={time.ca4} row="4" dataClass={dataClass} />
            <ScheduleRow ca="5" time={time.ca5} row="5" dataClass={dataClass} />
            <ScheduleRow ca="6" time={time.ca6} row="6" dataClass={dataClass} />
            <ScheduleRow ca="7" time={time.ca7} row="7" dataClass={dataClass} />
            <ScheduleRow ca="8" time={time.ca8} row="8" dataClass={dataClass} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
