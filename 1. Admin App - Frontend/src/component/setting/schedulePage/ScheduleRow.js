import { useEffect, useRef, useState, forwardRef } from "react";

import styles from "./ScheduleTab.module.scss";

const ScheduleRow = ({ title, type, defaultValue }, ref) => {
  return (
    <div className={styles["info-row"]}>
      <div className={styles["info-row--title"]}>{title}</div>
      <div className={styles["info-row--content"]}>
        <input placeholder={type} ref={ref} defaultValue={defaultValue}></input>
      </div>
    </div>
  );
};

export default forwardRef(ScheduleRow);
