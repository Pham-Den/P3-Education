import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Toast from "../toast/Toast";
import LoaderIcon from "react-loader-icon";

import { waitListAPI } from "../utils/API";
import useHttp from "../hook/use-http";

import styles from "./WaitListPage.module.scss";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/isAuthi";

const WaitListPage = () => {
  const navigate = useNavigate();
  const [waitlist, setWaitlist] = useState([]);
  const jwt_token = Cookies.get("jwt_token");

  //hook custom http
  const { isLoading, error, sendRequest } = useHttp();

  //cb handle data

  //chạy hook
  useEffect(() => {
    const option = {
      url: waitListAPI.getAllWaitListAPI,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
    sendRequest(option, setWaitlist);
  }, [sendRequest]);

  //delete waitlist
  const deleteHandle = (id) => {
    //cb update state
    const updateState = (dataRes) => {
      //tìm class delete
      const index = waitlist.findIndex((d) => d._id === id);

      let waitlistListUpdate = waitlist;
      waitlistListUpdate.splice(index, 1);

      setWaitlist(waitlistListUpdate);

      if (error) {
        Toast.message.error(dataRes.message, Toast.option);
      }

      //thành công báo
      Toast.message.success(dataRes.message, Toast.option);
    };

    //hook delete
    sendRequest(
      {
        url: waitListAPI.deleteWaitListAPI + "/" + id,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + jwt_token,
        },
      },
      updateState
    );
  };
  //edit waitlist

  let content = <p>No data!</p>;
  if (waitlist.length > 0) {
    content = (
      <table className={"table caption-top align-middle table-bordered " + styles.table}>
        <caption className={styles.caption}>Wait List</caption>
        <thead>
          <tr className="table-dark">
            <th scope="col">Timestamp</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Courses</th>
            <th scope="col">Form</th>
            <th scope="col">Schedule</th>
            <th scope="col">Accept</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {waitlist.length > 0 &&
            waitlist.map((data) => {
              return (
                <tr key={data._id}>
                  <th scope="row">
                    {data.createdAt &&
                      data.createdAt.slice(8, 10) +
                        "-" +
                        data.createdAt.slice(5, 7) +
                        "-" +
                        data.createdAt.slice(2, 4)}
                  </th>
                  <td>{data.name}</td>
                  <td>{data.year}</td>
                  <td>{data.phone}</td>
                  <td>{data.address}</td>
                  <td>
                    {data.skill.map((d) => {
                      return d[0] + " ";
                    })}
                  </td>
                  <td>{data.typeStudy}</td>
                  <td>
                    {data.caseStudy.map((d) => {
                      return d + " ";
                    })}
                  </td>
                  {data.isCreateUser ? (
                    <td colSpan="2" className={styles["created-container"]}>
                      <button className={styles.created}>Created</button>
                    </td>
                  ) : (
                    <>
                      <td>
                        <button
                          onClick={() => acceptHandle(data.email)}
                          className={styles.accept}
                        >
                          Accept
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteHandle(data._id)}
                          className={styles.delete}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }

  if (error) {
    content = <p>{error}</p>;
  }
  const acceptHandle = (email) => {
    //
    navigate("/users/add/" + email);
  };
  return (
    <div className={styles.containers}>
      <div className={styles.container}>
        <div>
          {/* header bar */}
          <div className={styles.title}>WAITING LIST</div>
          <div className={styles["rows-containers"]}>
            <div className={styles["rows-container"]}>
              <input
                // onChange={filterHandle}
                // ref={searchRef}
                className={styles.search}
                placeholder="Tìm kiếm"
              ></input>
            </div>
            <div>
              {/* <button className="btn btn-info" onClick={addCourseHandle}>
              New Course
            </button> */}
            </div>
          </div>

          {/* table */}
          <div className={styles["table-container"] + " table-responsive"}>
            {isLoading ? <LoaderIcon color={"red"} /> : content}
          </div>
        </div>
        {Toast.container}
      </div>
    </div>
  );
};

export default WaitListPage;
