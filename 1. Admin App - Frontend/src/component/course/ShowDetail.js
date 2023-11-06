import { useState } from "react";
import styles from "./ShowDetail.module.scss";

const ShowDetail = (props) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      {showDetail ? (
        <td>
          {props.data.modules.map((d) => {
            return d.module + " ";
          })}
          <br />
          <span
            className={styles.viewmore}
            onClick={() => setShowDetail(false)}
          >
            {"< hide"}
          </span>
        </td>
      ) : (
        <td>
          {props.data.modules.map((d, index) => {
            if (index <= 2) {
              return d.module + " ";
            }
          })}
          <br />
          <span className={styles.viewmore} onClick={() => setShowDetail(true)}>
            {"> view more"}
          </span>
        </td>
      )}
    </>
  );
};

export default ShowDetail;
