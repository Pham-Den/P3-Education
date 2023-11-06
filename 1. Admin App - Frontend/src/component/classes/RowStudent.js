import { useEffect, useState } from "react";
import { ImCheckboxChecked, ImCross } from "react-icons/im";
import { userAPI } from "../../utils/API";

import Toast from "../../toast/Toast";

import styles from "./RowStudent.module.css";
import Cookies from "js-cookie";
import { BsFillSendCheckFill } from "react-icons/bs";
import useHttp from "../../hook/use-http";

const RowStudent = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  //URL
  const URL = userAPI.updateFeeOthersAPI;
  const data = props.items;

  //xử lý data
  const classCode = props.classCode;
  const index = data.others.findIndex((d) => d.class === classCode);

  let dataCurrent = null;
  if (index !== -1) {
    dataCurrent = data.others[index];
  }

  let toggle = dataCurrent && dataCurrent.paid == "true" ? true : false;
  //paid
  const [togglePaid, setTogglePaid] = useState(toggle);

  const togglePaidHandle = () => {
    setTogglePaid((prev) => !prev);
  };
  //fee
  let fee = dataCurrent && dataCurrent.fee ? dataCurrent.fee : 0;
  const [toggleFee, setToggleFee] = useState(true);
  const [togglePaidInit, setTogglePaidInit] = useState(toggle);
  const [feeInput, setFeeInput] = useState(fee);
  const [feeInit, setFeeInit] = useState(fee);

  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    if (togglePaid == togglePaidInit && feeInput == feeInit) {
      setIsChange(false);
    } else {
      setIsChange(true);
    }
  }, [togglePaid, feeInput]);

  function toggleInput(e) {
    setToggleFee((prev) => !prev);
  }
  function feeChangeHandle(e) {
    setFeeInput(e.target.value);
  }

  //submit handle
  const {
    isLoading: isLoadingSubmit,
    error: isErrorSubmit,
    sendRequest: sendRequestSubmit,
  } = useHttp();
  const submitHandle = () => {
    //
    const dataUpdate = {
      class: classCode,
      fee: feeInput,
      paid: togglePaid,
    };
    const confirm = window.confirm("Confirm!");

    if (confirm) {
      const option = {
        url: URL + "/" + data._id,
        method: "POST",
        body: dataUpdate,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("jwt_token"),
        },
      };

      const messageHandle = (resData) => {
        Toast.message.success(resData.message, Toast.option);
        setFeeInit(feeInput);
        setTogglePaidInit(togglePaid);
        setIsChange(false);
      };

      sendRequestSubmit(option, messageHandle);
    }
  };

  return (
    <>
      <tr className={styles.row}>
        <th>{props.index + 1}</th>
        <th>{data.email}</th>
        <th>Progress</th>
        <th className={styles.fee}>
          {toggleFee ? (
            <span onDoubleClick={toggleInput} className={styles.hover}>
              {new Intl.NumberFormat().format(Number(feeInput))}
            </span>
          ) : (
            <input
              type="Number"
              min="0"
              value={Number(feeInput)}
              onChange={feeChangeHandle}
              disabled={toggleFee}
              autoFocus={!toggleFee}
              onBlur={toggleInput}
            />
          )}
        </th>
        <th>
          {togglePaid ? (
            <ImCheckboxChecked
              size={25}
              color={"green"}
              onDoubleClick={togglePaidHandle}
              className={styles.hover}
            />
          ) : (
            <ImCross
              size={25}
              color={"red"}
              onDoubleClick={togglePaidHandle}
              className={styles.hover}
            />
          )}
        </th>
        <th>
          {/* {isChange && (
            <button onClick={submitHandle}>
              {isLoading ? "Sending ..." : "UPDATE"}
            </button>
          )} */}
          {isChange ? (
            <div
              onClick={submitHandle}
              className={styles.icon}
              disabled={isLoadingSubmit}
            >
              {isLoadingSubmit ? (
                "Sending..."
              ) : (
                <BsFillSendCheckFill size={25} color="green" />
              )}
            </div>
          ) : (
            <div className={styles["icon-inactive"]}>
              <BsFillSendCheckFill size={25} color="grey" />
            </div>
          )}
        </th>
      </tr>
      {Toast.container}
    </>
  );
};

export default RowStudent;
