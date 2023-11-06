import { useState } from "react";
import { useSelector } from "react-redux";
import InfoTab from "../component/setting/infoPage/InfoTab";
import MeetTab from "../component/setting/meetPage/MeetTab";
import PasswordTab from "../component/setting/passwordPage/PasswordTab";

import styles from "./InfoPage.module.scss";
import CalendarTab from "../component/setting/calendarPage/CalendarTab";
import { useNavigate, useSearchParams } from "react-router-dom";
import ScheduleTab from "../component/setting/schedulePage/ScheduleTab";

const InfoPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const tab = query.get("tab");
  const user = useSelector((state) => state.login.user);

  const menuHandle = (item) => {
    //
    navigate(`/info?tab=${item}`);
  };

  return (
    <div className={styles.containers}>
      <div className={styles["cover-containers"]}>
        <div className={styles.image}>
          <img alt="avatar" src="/img/avatar-admin.jpg"></img>
        </div>
        <div className={styles["cover-content"]}>
          <div className={styles.name}>{user.name || "Name"}</div>
          <div className={styles.pros}>{user.nickname || "Nickname"}</div>
          <button className={styles.button}>Edit Profile</button>
        </div>
      </div>
      <div className={styles.menu}>
        <div
          className={tab === "info" ? styles["menu-active"] : ""}
          onClick={() => menuHandle("info")}
        >
          INFO
        </div>
        <div
          className={tab === "password" ? styles["menu-active"] : ""}
          onClick={() => menuHandle("password")}
        >
          PASSWORD
        </div>
        {/* <div
        //  onClick={() => menuHandle("photo")}
        >
          PHOTO
        </div>
        <div
        //  onClick={() => menuHandle("video")}
        >
          VIDEO
        </div>
        <div
        // onClick={() => menuHandle("schedule")}
        >
          SCHEDULE
        </div> */}
        <div
          className={tab === "meet" ? styles["menu-active"] : ""}
          onClick={() => menuHandle("meet")}
        >
          MEET
        </div>
        <div
          className={tab === "calendar" ? styles["menu-active"] : ""}
          onClick={() => menuHandle("calendar")}
        >
          CALENDAR
        </div>
        <div
          className={tab === "schedule" ? styles["menu-active"] : ""}
          onClick={() => menuHandle("schedule")}
        >
          SCHEDULE
        </div>
      </div>
      {(tab === "info" || tab == null) && <InfoTab />}
      {tab === "password" && <PasswordTab />}
      {tab === "meet" && <MeetTab />}
      {tab === "calendar" && <CalendarTab />}
      {tab === "schedule" && <ScheduleTab />}
    </div>
  );
};

export default InfoPage;
