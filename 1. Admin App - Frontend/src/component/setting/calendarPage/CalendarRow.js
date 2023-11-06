import { forwardRef, useEffect, useState } from "react";

import styles from "./CalendarTab.module.scss";

const MeetRow = ({ iscancel, title, content, data, onEdit }, ref) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditDefault, setIsEditDefault] = useState(false);

  const editHandle = () => {
    setIsEdit(true);
    onEdit();
  };
  const defaultEditHandle = () => {
    setIsEditDefault(true);
  };

  useEffect(() => {
    setIsEdit(false);
  }, [iscancel]);

  return (
    <div className={styles["info-row"]}>
      <div className={styles["info-row--title"]}>{title}</div>
      <div className={styles.defaultdata}>
        {data && data.split("").slice(0, 50).join("") + " ..."}
      </div>
      {
        <div className={styles["info-row--content"]}>
          {!isEdit ? (
            <div className={styles["info-row--action"]} onClick={editHandle}>
              {content}
            </div>
          ) : (
            <input ref={ref}></input>
          )}
        </div>
      }
    </div>
  );
};

export default forwardRef(MeetRow);
