import ProgressBar from "@ramonak/react-progress-bar";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsFillSendCheckFill,
  BsPencil,
} from "react-icons/bs";

import styles from "./ClassRow.module.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClassAtt = (props) => {
  const attRef = useRef();
  const navigate = useNavigate();
  const att = props.items.attendance ? Number(props.items.attendance) : 0;
  const [attInit, setAttInit] = useState(att);
  const [attendance, setAttendance] = useState(att);
  const [isChange, setIsChange] = useState(false);
  const [isShowInputAtt, setIsShowInputAtt] = useState(false);

  useEffect(() => {
    if (attInit !== attendance) {
      setIsChange(true);
    } else {
      setIsChange(false);
    }
  }, [attendance]);

  const du = attendance % 8 === 0 && attendance > 0 ? 8 : attendance % 8;
  const thang = Math.trunc((attendance - 1) / 8 + 1);

  const decHandle = () => {
    setAttendance((prev) => (prev > 0 ? (prev = prev - 1) : (prev = 0)));
  };

  const incHandle = () => {
    setAttendance((prev) => (prev = prev + 1));
  };
  const changeHandle = () => {
    setAttendance(Number(attRef.current.value));
  };

  //edit handle
  const editHandle = (id) => {
    const isConfirm = window.confirm("Confirm!");
    if (isConfirm) {
      props.edit(id, attendance);
    }
  };

  //chuyển trang detail class
  const classDetailHandle = (id) => {
    navigate("/progress/" + id);
  };

  return (
    <tr>
      <th>{props.index + 1}</th>
      <th
        className={styles.classcode}
        scope="row"
        onClick={() => classDetailHandle(props.items._id)}
      >
        {props.items.code}
      </th>
      <td>{props.items.users.length}</td>
      <td>
        {props.items.courses.length > 0 &&
          props.items.courses.map((data) => {
            return data.code + " ";
          })}
      </td>
      <td className={styles.cell}>
        <div className={styles.flex}>
          <BsFillArrowLeftCircleFill
            className={styles.btn}
            onClick={decHandle}
            size={22}
          />
          <ProgressBar
            completed={du.toString()}
            labelAlignment="center"
            labelColor="#fff"
            bgColor="#099268"
            maxCompleted={8}
            width="100px"
            // customLabel="aaa"
          />
          <BsFillArrowRightCircleFill
            className={styles.btn}
            onClick={incHandle}
            size={22}
          />
          <div>
            {!isShowInputAtt ? (
              <div
                onClick={() => setIsShowInputAtt(true)}
                className={styles["att-edit"]}
              >
                <BsPencil />
              </div>
            ) : (
              <input
                className={styles["input-att"]}
                ref={attRef}
                value={Number(attendance)}
                onChange={changeHandle}
              ></input>
            )}
          </div>
        </div>
      </td>
      <td className={styles.month}>{thang}</td>
      <td>
        {isChange ? (
          <div
            onClick={() => editHandle(props.items._id)}
            className={styles.icon}
          >
            <BsFillSendCheckFill size={25} color="green" />
          </div>
        ) : (
          <div className={styles["icon-inactive"]}>
            <BsFillSendCheckFill size={25} color="grey" />
          </div>
        )}
      </td>
    </tr>
  );
};

export default ClassAtt;
