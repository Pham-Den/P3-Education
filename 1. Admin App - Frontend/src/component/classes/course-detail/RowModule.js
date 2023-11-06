import { useEffect, useState } from "react";

import styles from "../ClassDetailCourse.module.scss";
import useHttp from "../../../hook/use-http";
import { classAPI } from "../../../utils/API";
import Cookies from "js-cookie";
import { ImCheckboxChecked, ImCross } from "react-icons/im";

const RowModule = ({ data, classID, progress, onUpdateTotal, onCheckAll }) => {
  //tìm module trong progress
  const indexIsDone = progress.findIndex((d) => d.module === data.module);
  let isDoneInit;
  if (indexIsDone === -1) {
    isDoneInit = false;
  } else {
    isDoneInit = progress[indexIsDone].isDone;
  }
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
    sendRequest({
      url: classAPI.editProgressClassAPI + "/" + classID,
      method: "PUT",
      body: data,
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + Cookies.get("jwt_token"),
      },
    });

    onUpdateTotal(data.isDone == true ? 1 : -1);
  };

  ////
  useEffect(() => {
    if (onCheckAll !== "no") {
      setIsActive(onCheckAll);
    }
  }, [onCheckAll]);

  return (
    <tr className={styles.row}>
      <th className={styles.middle}>
        {isActive ? (
          <ImCheckboxChecked
            size={25}
            color={"green"}
            onDoubleClick={() => checkDoneHandle(data.module)}
            className={styles.hover}
          />
        ) : (
          <ImCross
            size={25}
            color={"red"}
            onDoubleClick={() => checkDoneHandle(data.module)}
            className={styles.hover}
          />
        )}
      </th>
      <th>{data.module}</th>
      <th>{data.topic}</th>
      <th>
        {data.wps && (
          <a href={data.wps} target="_blank">
            WPS
          </a>
        )}
      </th>
      <th>
        {data.flashcards && (
          <a href={data.flashcards} target="_blank">
            Flashcards
          </a>
        )}
      </th>
      <th>
        {data.slides && (
          <a href={data.slides} target="_blank">
            Slides
          </a>
        )}
      </th>
      <th>
        {data.audio && (
          <a href={data.audio} target="_blank">
            Audio
          </a>
        )}
      </th>
      <th>
        {data.video && (
          <a href={data.video} target="_blank">
            Video
          </a>
        )}
      </th>
      <th>
        {data.text && (
          <a href={data.text} target="_blank">
            Text
          </a>
        )}
      </th>
      <th>
        {data.key && (
          <a href={data.key} target="_blank">
            Key
          </a>
        )}
      </th>
      <th>
        {data.task1 && (
          <a href={data.task1} target="_blank">
            Task1
          </a>
        )}
      </th>
      <th>
        {data.task2 && (
          <a href={data.task2} target="_blank">
            Task2
          </a>
        )}
      </th>
    </tr>
  );
};

export default RowModule;
