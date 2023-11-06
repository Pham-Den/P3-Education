import { useState } from "react";
import styles from "./ModuleRow.module.css";

const ModuleRow = (props) => {
  const [isShow, setIsShow] = useState(false);
  //show content course
  const showHandle = () => {
    setIsShow(!isShow);
  };
  return (
    <div className={styles.items}>
      <div
        onClick={showHandle}
        className={styles.subtitle + " " + styles.statusdone}
      >
        <div>
          Buổi {props.index + 1} ({props.data.module}): {props.data.topic}
        </div>
        <div>
          <button className={styles.done}>Status: Done</button>
        </div>
      </div>

      {isShow && (
        <>
          <div className={styles.content}>
            {props.data.slides && (
              <a
                className={styles.contentitem}
                href={props.data.slides}
                target="_blank"
              >
                Slides
              </a>
            )}
            {props.data.audio && (
              <a
                className={styles.contentitem}
                href={props.data.audio}
                target="_blank"
              >
                Audio
              </a>
            )}
            {props.data.video && (
              <a
                className={styles.contentitem}
                href={props.data.video}
                target="_blank"
              >
                Video
              </a>
            )}
            {props.data.text && (
              <a
                className={styles.contentitem}
                href={props.data.text}
                target="_blank"
              >
                Text
              </a>
            )}
            {props.data.key && (
              <a
                className={styles.contentitem}
                href={props.data.key}
                target="_blank"
              >
                Key
              </a>
            )}
            {props.data.task1 && (
              <a
                className={styles.contentitem}
                href={props.data.task1}
                target="_blank"
              >
                Task1
              </a>
            )}
            {props.data.task2 && (
              <a
                className={styles.contentitem}
                href={props.data.task2}
                target="_blank"
              >
                Task2
              </a>
            )}
          </div>
          {/* <div className={styles.rowinput}>
            <button className={styles.btn}>Mask as Done</button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default ModuleRow;
