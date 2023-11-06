import { useEffect, useRef, useState, forwardRef } from "react";

import styles from "./PasswordTab.module.scss";

const InfoRow = ({ title }, ref) => {
  return (
    <div className={styles["info-row"]}>
      <div className={styles["info-row--title"]}>{title}</div>
      <div className={styles["info-row--content"]}>
        <input type="password" ref={ref}></input>
      </div>
    </div>
  );
};

export default forwardRef(InfoRow);
