import styles from "./ScheduleRow.module.css";

const ScheduleRow = (props) => {
  const arrayWeek = ["2", "3", "4", "5", "6", "7", "8"];

  return (
    <div className={styles.table}>
      <div className={styles.dark}>{props.ca}</div>
      <div className={styles.dark}>{props.time}</div>
      {arrayWeek.map((day) => {
        return (
          <div className={styles.cell} key={Math.random()}>
            {props.dataClass.length > 0 &&
              props.dataClass.map((data) => {
                if (data.note.includes(props.row + day)) {
                  return (
                    <div
                      key={Math.random()}
                      style={{ color: data.color, background: data.background }}
                    >
                      {data.code}{" "}
                    </div>
                  );
                }
              })}
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleRow;
