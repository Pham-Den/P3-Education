import { FaHeadphones } from "react-icons/fa";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

import styles from "../../page/ToeicExamPage.module.scss";
import { useEffect, useState } from "react";

const QuestionToeic = ({
  examCurrent,
  sentenceCurrent,
  numberCurrent,
  onChangeNumber,
  onSeekTo,
}) => {
  ///tìm đang ở part mấy
  const [partCurrent, setPartCurrent] = useState(1);
  const [rangeCurrent, setRangeCurrent] = useState(1);
  const [seekCurrent, setSeekCurrent] = useState(0);

  useEffect(() => {
    setRangeCurrent(
      examCurrent && examCurrent.struc && examCurrent.struc[0].sentences
    );
    setSeekCurrent(sentenceCurrent?.timeStart || 0);
  }, [sentenceCurrent]);

  useEffect(() => {
    if (examCurrent.struc?.length > 0) {
      examCurrent.struc.forEach((d) => {
        const range = d.sentences.split("-");
        if (
          numberCurrent > Number(range[0]) &&
          numberCurrent <= Number(range[1])
        ) {
          setPartCurrent(d.part);
          setRangeCurrent(d.sentences);
        }
      });
    }
  }, [numberCurrent]);

  const setNumberCurrent = (n) => {
    onChangeNumber(n);
  };

  const listenHereHandle = (n) => {
    if (Number(n) <= 0 || !Number(n)) {
      // onSeekTo(0);
    } else {
      onSeekTo(Number(n));
    }
  };

  return (
    <div className={styles["question-container"]}>
      <div className={styles.questions}>
        <div className={styles.question}>
          PART {partCurrent} - Question: {rangeCurrent}
        </div>
        <div
          className={styles.listenhere}
          onClick={() => listenHereHandle(seekCurrent)}
        >
          <FaHeadphones />
          Listen from here
        </div>
      </div>
      <div className={styles.choose}>
        Choose the correct letter: <span>A</span>, <span>B</span>,{" "}
        <span>C</span> or <span>D</span>
      </div>
      {sentenceCurrent ? (
        <div className={styles.contents}>
          <div className={styles["content-question"]}>
            <div
              className={styles["icon-headphone"]}
              onClick={() => listenHereHandle(seekCurrent)}
            >
              <FaHeadphones color="#555" />
            </div>
            <div>
              Câu {sentenceCurrent?.number}: {sentenceCurrent?.question}
            </div>
          </div>
          <div className={styles["content-answers"]}>
            <div className={styles["content-answer"]}>
              <input type="radio" id="a" name="31"></input>
              <label>A. {sentenceCurrent?.a}</label>
            </div>
            <div className={styles["content-answer"]}>
              <input type="radio" id="b" name="31"></input>
              <label>B. {sentenceCurrent?.b}</label>
            </div>
            <div className={styles["content-answer"]}>
              <input type="radio" id="c" name="31"></input>
              <label>C. {sentenceCurrent?.c}</label>
            </div>
            <div className={styles["content-answer"]}>
              <input type="radio" id="d" name="31"></input>
              <label>D. {sentenceCurrent?.d}</label>
            </div>
          </div>
        </div>
      ) : (
        <div>Question {numberCurrent}: No data!</div>
      )}

      <div className={styles["action-next-prev"]}>
        <BsArrowLeftCircleFill
          size={30}
          color="#15aabf"
          className={styles.btn}
          onClick={() =>
            setNumberCurrent((prev) => {
              if (prev > 1) {
                return (prev = prev - 1);
              } else {
                return prev;
              }
            })
          }
        />
        <BsArrowRightCircleFill
          size={30}
          color="#15aabf"
          className={styles.btn}
          onClick={() =>
            setNumberCurrent((prev) => {
              if (prev < 100) {
                return (prev = prev + 1);
              } else {
                return prev;
              }
            })
          }
        />
      </div>
    </div>
  );
};

export default QuestionToeic;
