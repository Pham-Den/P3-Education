import styles from "../../page/ToeicExamPage.module.scss";

const MenuPartToeic = (props) => {
  const examCurrent = props.items;

  const changeNumberHandle = (n) => {
    props.onClickNumber(n);
  };
  return (
    <div className={styles["menu-container"]}>
      {examCurrent.struc?.length > 0 &&
        examCurrent.struc.map((data, ind) => {
          return (
            <div className={styles["menu-parts"]} key={ind}>
              <div>Part {data.part}: </div>
              {examCurrent.questions?.length > 0 &&
                examCurrent.questions
                  .filter((da) => da.part === data.part)
                  .map((d, index) => {
                    return (
                      <div className={styles.number} key={index}>
                        <div
                          onClick={() => changeNumberHandle(d.number)}
                          className={
                            props.numberCurrent === d.number
                              ? styles["menu-active"]
                              : ""
                          }
                        >
                          {d.number}
                        </div>
                      </div>
                    );
                  })}
            </div>
          );
        })}
    </div>
  );
};

export default MenuPartToeic;
