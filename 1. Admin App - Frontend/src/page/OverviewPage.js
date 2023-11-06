import { BiUser } from "react-icons/bi";
import { BsCoin } from "react-icons/bs";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { SiFuturelearn } from "react-icons/si";
import LoaderIcon from "react-loader-icon";

import styles from "./OverviewPage.module.scss";
import React, { useEffect, useState } from "react";
import useHttp from "../hook/use-http";
import { adminAPI, classAPI } from "../utils/API";
import { getToken } from "../utils/isAuthi";
import ClassAtt from "../component/classes/ClassAtt";
import Toast from "../toast/Toast";

const OverviewPage = () => {
  const [dataInfo, setDataInfo] = useState({});
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    const option = {
      url: adminAPI.getInfoDashboard,
      headers: {
        authorization: "Bearer " + getToken(),
      },
    };

    //get api
    sendRequest(option, setDataInfo);
  }, [sendRequest]);

  const [classList, setClassList] = useState([]);
  const {
    isLoading: isLoadingGet,
    error: errorGet,
    sendRequest: sendRequestGet,
  } = useHttp();

  useEffect(() => {
    const option = {
      url: classAPI.adminClassAPI,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };

    sendRequestGet(option, setClassList);
  }, [sendRequestGet]);

  ///////////////update handle/////////////////
  const {
    isLoading: isLoadingAtt,
    error: errorAtt,
    sendRequest: sendRequestAtt,
  } = useHttp();
  const updateAttHandle = (id, attendance) => {
    const option = {
      url: classAPI.editAttendanceClassAPI + "/" + id,
      method: "PUT",
      body: { attendance },
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + getToken(),
      },
    };
    //cb handle data
    const messageHandle = (resData) => {
      //báo success
      return Toast.message.success(resData.message, Toast.option);
    };
    //hàm put api
    sendRequestAtt(option, messageHandle);
  };

  return (
    <div className={styles.container}>
      <div className={styles["container-sumary"]}>
        <div className={styles.box + " " + styles.color1}>
          <div className={styles.title}>NUMBER OF STUDENTS</div>
          <div className={styles.cash}>
            {isLoading ? "Loading..." : dataInfo.totalUser || "0"}
          </div>
          <div className={styles.icon1}>
            <span>
              <BiUser size={12} color="#c2255c" />
            </span>
          </div>
        </div>
        <div className={styles.box + " " + styles.color2}>
          <div className={styles.title}>PREDICTED REVENUE</div>
          <div className={styles.cash}>
            {isLoading
              ? "Loading..."
              : `$ ${new Intl.NumberFormat("de-DE").format(
                  dataInfo.totalRevenue || "0"
                )}`}
          </div>
          <div className={styles.icon2}>
            <span>
              <SiFuturelearn size={12} color="#f08c00" />
            </span>
          </div>
        </div>
        <div className={styles.box + " " + styles.color3}>
          <div className={styles.title}>UPCOMING REVENUE</div>
          <div className={styles.cash}>
            {isLoading
              ? "Loading..."
              : `$ ${new Intl.NumberFormat("de-DE").format(
                  dataInfo.totalCurrentRevenue || "0"
                )}`}
          </div>
          <div className={styles.icon3}>
            <span>
              <BsCoin size={12} color="#2f9e44" />
            </span>
          </div>
        </div>
        <div className={styles.box + " " + styles.color4}>
          <div className={styles.title}>PRACTICAL REVENUE</div>
          <div className={styles.cash}>
            {isLoading
              ? "Loading..."
              : `$ ${new Intl.NumberFormat("de-DE").format(
                  dataInfo.CurrentRevenu || "0"
                )}`}
          </div>
          <div className={styles.icon4}>
            <span>
              <MdOutlineAccountBalanceWallet size={12} color="#6741d9" />
            </span>
          </div>
        </div>
      </div>
      {/* total class active */}
      <div className={styles["table-content"]}>
        <table
          className={
            styles.table + " table caption-top align-middle table-bordered"
          }
        >
          <caption className={styles.caption}>
            List of Student (Class Active)
          </caption>
          <thead className={"table-warning"}>
            <tr className="align-middle">
              <th scope="col">Class</th>
              <th scope="col">Att</th>
              <th scope="col">Email</th>
              <th scope="col">Fee</th>
              <th scope="col">Pay</th>
            </tr>
          </thead>
          <tbody>
            {!isLoadingGet && errorGet && <tr colSpan="4">{errorGet}</tr>}
            {isLoadingGet ? (
              <tr colSpan="5">
                <LoaderIcon color={"red"} />
              </tr>
            ) : classList.length > 0 ? (
              classList.map((data, index) => {
                return (
                  <tr key={data._id}>
                    <th>{data.code}</th>
                    <td className={styles["att-cell"]}>
                      <ClassAtt
                        key={data._id}
                        items={data}
                        index={data._id}
                        updateAtt={updateAttHandle}
                      />
                    </td>
                    <td>
                      {data.users.length > 0 &&
                        data.users.map((us) => {
                          return <div>{us.email}</div>;
                        })}
                    </td>
                    <td>
                      {data.users.length > 0 &&
                        data.users.map((us) => {
                          return (
                            <div>
                              {new Intl.NumberFormat("de-DE").format(
                                us.others[
                                  us.others.findIndex(
                                    (d) => d.class === data.code
                                  )
                                ]?.fee
                              )}
                            </div>
                          );
                        })}
                    </td>
                    <td>
                      {data.users.length > 0 &&
                        data.users.map((us) => {
                          return (
                            <div>
                              {
                                us.others[
                                  us.others.findIndex(
                                    (d) => d.class === data.code
                                  )
                                ]?.paid
                              }
                            </div>
                          );
                        })}
                      {/* {
                        us.others[
                          us.others.findIndex((d) => d.class === data.code)
                        ]?.paid
                      } */}
                    </td>
                  </tr>

                  // <React.Fragment key={data._id}>
                  //   {data.users.length > 0 &&
                  //     data.users.map((us) => {
                  //       return (
                  //         <tr key={data._id}>
                  //           <th>{data.code}</th>
                  //           <td className={styles['att-cell']}>
                  //             <ClassAtt
                  //               key={data._id}
                  //               items={data}
                  //               index={data._id}
                  //               // updateAtt={updateAttHandle}
                  //             />
                  //           </td>
                  //           <td>{us.email}</td>
                  //           <td>
                  //             {new Intl.NumberFormat("de-DE").format(
                  //               us.others[
                  //                 us.others.findIndex(
                  //                   (d) => d.class === data.code
                  //                 )
                  //               ]?.fee
                  //             )}
                  //           </td>
                  //           <td>
                  //             {
                  //               us.others[
                  //                 us.others.findIndex(
                  //                   (d) => d.class === data.code
                  //                 )
                  //               ]?.paid
                  //             }
                  //           </td>
                  //         </tr>
                  //       );
                  //     })}
                  // </React.Fragment>
                );
              })
            ) : (
              <tr colSpan="5">
                <div>No Class!</div>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {Toast.container}
    </div>
  );
};

export default OverviewPage;
