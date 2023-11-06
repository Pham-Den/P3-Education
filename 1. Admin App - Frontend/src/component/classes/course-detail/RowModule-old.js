import { useState } from "react";
import { RiKeyFill } from "react-icons/ri";
import { TbHandClick } from "react-icons/tb";
import confirmHandle from "../../utils/alert";

import styles from "../ClassDetailCourse.module.scss";
import useHttp from "../../../hook/use-http";
import { classAPI } from "../../../utils/API";
import Cookies from "js-cookie";

const RowModule = ({ data, index, classID, progress, onUpdateTotal }) => {
  //tìm module trong progress
  console.log(progress);
  const indexIsDone = progress.findIndex((d) => d.module === data.module);
  let isDoneInit;
  if (indexIsDone === -1) {
    isDoneInit = false;
  } else {
    isDoneInit = progress[indexIsDone].isDone;
  }
  const [isShow, setIsShow] = useState(false);
  const [isActive, setIsActive] = useState(isDoneInit);

  const { isLoading, error, sendRequest } = useHttp();

  //check done - active
  const checkDoneHandle = (module) => {
    setIsActive((prev) => !prev);

    //xác nhận
    const data = {
      module: module,
      isDone: !isActive,
    };

    //fetch api change data
    sendRequest(
      {
        url: classAPI.editProgressClassAPI + "/" + classID,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwt_token"),
        },
      },
      console.log
    );
    console.log(error);

    onUpdateTotal(data.isDone == true ? 1 : -1);
  };

  //show module
  const showModuleHandle = () => {
    //
    setIsShow((prev) => !prev);
  };
  return (
    <div
      className={
        isShow ? styles["container-active"] : styles["container-nonactive"]
      }
    >
      <div className={styles["content-row"]}>
        <div className={styles["content-row--left"]}>
          <div
            onDoubleClick={() =>
              confirmHandle(
                "Change",
                "Are You Sure!",
                data.module,
                checkDoneHandle(data.module)
              )
            }
            className={
              styles["content-row--left--icon"] +
              " " +
              (isActive ? "" : styles["left-inactive"])
            }
          >
            {isActive ? index + 1 : <RiKeyFill size={30} color="#fff" />}
          </div>
          <div className={styles["content-row--topics"]}>
            <div className={styles["content-row--topic"]}>{data.topic}</div>
            <div className={styles["content-row--module"]}>{data.module}</div>
          </div>
        </div>
        <div
          onClick={showModuleHandle}
          className={
            styles["content-row--right"] +
            " " +
            (isActive ? styles["btn-active"] : "")
          }
        >
          <TbHandClick />
          <span>Study</span>
        </div>
      </div>
      {isShow && (
        <div className={styles["module-icon-list"]}>
          {data.slides && (
            <div>
              <a href={data.slides} target="_blank">
                Slides
              </a>
            </div>
          )}
          {data.flashcards && (
            <div>
              <a href={data.flashcards} target="_blank">
                Flashcards
              </a>
            </div>
          )}
          {data.key && (
            <div>
              <a href={data.key} target="_blank">
                Key
              </a>
            </div>
          )}
          {data.task1 && (
            <div>
              <a href={data.task1} target="_blank">
                Task1
              </a>
            </div>
          )}
          {data.task2 && (
            <div>
              <a href={data.task2} target="_blank">
                Task2
              </a>
            </div>
          )}
          {data.text && (
            <div>
              <a href={data.text} target="_blank">
                Text
              </a>
            </div>
          )}
          {data.video && (
            <div>
              <a href={data.video} target="_blank">
                Video
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RowModule;
