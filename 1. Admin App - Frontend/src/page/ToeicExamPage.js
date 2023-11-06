import {
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentMagnifyingGlass,
} from "react-icons/hi2";
import { BiSolidSend } from "react-icons/bi";

import React, { useEffect, useRef, useState } from "react";

import styles from "./ToeicExamPage.module.scss";

import useHttp from "../hook/use-http";
import { toeicApi } from "../utils/API";
import MenuPartToeic from "../component/toeic/MenuPartToeic";
import QuestionToeic from "../component/toeic/QuestionToeic";
import AudioToeic from "../component/toeic/AudioToeic";
import { useParams } from "react-router-dom";

const ToeicExamPage = () => {
  const params = useParams();
  const [reviewShow, setReviewShow] = useState(false);

  /////
  const [examCurrent, setExamCurrent] = useState({});
  const [numberCurrent, setNumberCurrent] = useState(1);
  const [partCurrent, setPartCurrent] = useState(1);
  const [sentenceCurrent, setSentenceCurrent] = useState({});
  const [seekCurrent, setSeekCurrent] = useState(0);
  const [count, setCount] = useState(0);

  //sentence current
  useEffect(() => {
    let sc = examCurrent.questions?.find((d) => d.number === numberCurrent);
    if (sc) {
      setPartCurrent(
        examCurrent.questions?.filter((da) => da?.part === sc?.part)
      );
      setSentenceCurrent(sc);
      if (sc.timeStart) {
        setSeekCurrent(sc.timeStart);
      }
      setCount((prev) => prev + 1);
    }
  }, [numberCurrent]);
  // const [time, setTime] = useState(0);
  // console.log(audioRef.current.audio.current);

  const reviewTabHandle = () => {
    //
    setReviewShow(true);
  };

  ////////////////////////get exam demo////////////////////////
  const {
    isLoading: isLoadingGetExam,
    error: errGetExam,
    sendRequest: sendRequestGetExam,
  } = useHttp();
  useEffect(() => {
    const option = {
      url: toeicApi.exam + "/" + params.id,
    };
    const messageHandle = (resData) => {
      ///
      setExamCurrent(resData);
      setSentenceCurrent(resData.questions[0]);
    };

    sendRequestGetExam(option, messageHandle);
  }, [sendRequestGetExam]);

  const seekChangeHandle = (n) => {
    setSeekCurrent(n);
    setCount((prev) => prev + 1);
  };

  return (
    <div className={styles.containers}>
      {/* header */}
      <div className={styles["header-container"]}>
        <div className={styles.title}>Toeic - {examCurrent.code}</div>
        <div className={styles["action-container"]}>
          <div className={styles.icon}>
            <HiOutlineClipboardDocumentList size={30} />
          </div>
          <div className={styles.review} onClick={reviewTabHandle}>
            <HiOutlineDocumentMagnifyingGlass size={28} />
            Review
          </div>
          <div className={styles.submit}>
            Submit <BiSolidSend size={28} />
          </div>
        </div>
      </div>
      {/* mp3 */}
      <AudioToeic src={examCurrent.audio} seekTo={seekCurrent} count={count} />

      {/* content */}
      <QuestionToeic
        examCurrent={examCurrent}
        sentenceCurrent={sentenceCurrent}
        numberCurrent={numberCurrent}
        onChangeNumber={(n) => setNumberCurrent(n)}
        onSeekTo={(n) => seekChangeHandle(n)}
      />

      {/* menu */}
      <MenuPartToeic
        items={examCurrent}
        numberCurrent={numberCurrent}
        onClickNumber={(n) => setNumberCurrent(n)}
      />

      {reviewShow && (
        <div className={styles["review_tab-containers"]}>
          <div
            className={styles.background}
            onClick={() => {
              setReviewShow(false);
            }}
          ></div>
          <div className={styles.tab}>
            <div>
              {examCurrent.questions.map((d) => {
                return <div>câu {d.number}:</div>;
              })}
            </div>
            <div>
              <button
                onClick={() => {
                  setReviewShow(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    // <div></div>
  );
};

export default ToeicExamPage;
