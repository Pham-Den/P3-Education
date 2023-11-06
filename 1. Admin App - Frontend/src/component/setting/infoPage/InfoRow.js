import { useEffect, useRef, useState, forwardRef } from "react";

import styles from "./InfoTab.module.scss";

const InfoRow = ({ iscancel, title, content, data, onEdit }, ref) => {
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

  ///
  const changeEnteredHandle = (e) => {
    //
  };
  return (
    <div className={styles["info-row"]}>
      <div className={styles["info-row--title"]}>{title}</div>
      <div className={styles.defaultdata}>{data}</div>
      {
        <div className={styles["info-row--content"]}>
          {!isEdit ? (
            <div className={styles["info-row--action"]} onClick={editHandle}>
              {content}
            </div>
          ) : (
            <input ref={ref} onChange={changeEnteredHandle}></input>
          )}
        </div>
      }
    </div>
  );
};

export default forwardRef(InfoRow);
