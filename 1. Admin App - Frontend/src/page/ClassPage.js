import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Toast from "../toast/Toast";
import LoaderIcon from "react-loader-icon";

import { classAPI } from "../utils/API";
import styles from "./ClassPage.module.scss";

import useHttp from "../hook/use-http";
import Button from "../component/utils/button/Button";
import { getToken } from "../utils/isAuthi";

const ClassPage = () => {
  const navigate = useNavigate();

  const [dataClass, setDataClass] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [classesFilter, setClassesFilter] = useState([]);

  //hook custom http
  const { isLoading, error, sendRequest } = useHttp();

  /////////////////1.get classes/////////////
  //chạy hook
  useEffect(() => {
    const option = {
      url: classAPI.adminClassAPI,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
    //cb handle data
    const getData = (data) => {
      setDataClass(data);
      setClassesFilter(data);
    };
    sendRequest(option, getData);
  }, [sendRequest]);

  //Lọc data
  useEffect(() => {
    if (dataClass && searchInput) {
      setClassesFilter(
        dataClass.filter((data) =>
          data.code.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else if (!searchInput) {
      setClassesFilter(dataClass);
    }
  }, [searchInput, dataClass]);

  //search
  const searchHandle = (e) => {
    setSearchInput(e.target.value);
  };

  //new class
  const newClassHandle = () => {
    navigate("/class/add");
  };

  ////////////////////////////delete class////////////
  const deleteClassHandle = async (id) => {
    const isConfirm = window.confirm("Confirm!");
    if (isConfirm) {
      //cb update state
      const updateState = (dataRes) => {
        //tìm class delete
        const index = dataClass.findIndex((d) => d._id === id);

        let classListUpdate = dataClass;
        classListUpdate.splice(index, 1);

        setDataClass(classListUpdate);
        setClassesFilter(classListUpdate);

        if (error) {
          Toast.message.error(dataRes.message, Toast.option);
        }

        //thành công báo
        Toast.message.success(dataRes.message, Toast.option);
      };

      //hook delete
      sendRequest(
        {
          url: classAPI.adminClassAPI + "/" + id,
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        },
        updateState
      );
    }
  };

  //edit class
  const editHandle = (id) => {
    navigate("/class/add/" + id);
  };

  let content = <p>Please add data!</p>;

  if (dataClass.length > 0) {
    content = (
      <table
        className={
          styles.table + " table caption-top align-middle table-bordered"
        }
      >
        <thead>
          <tr className="align-middle table-dark">
            <th scope="col">Code</th>
            <th scope="col">Ss List</th>
            <th scope="col">Courses</th>
            <th scope="col">Quiz</th>
            <th scope="col">Classroom</th>
            <th scope="col">Start</th>
            <th scope="col">Tuition</th>
            <th scope="col">Schedule</th>
            <th scope="col">Color</th>
            <th scope="col">Actived</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            <th scope="col">Created By</th>
          </tr>
        </thead>
        <tbody>
          {classesFilter.length > 0 &&
            classesFilter.map((data) => {
              return (
                <tr
                  key={data._id}
                  className={
                    !data.isActived || data.isActived == false
                      ? styles.noactived
                      : ""
                  }
                >
                  <th scope="row">{data.code}</th>
                  <td>
                    {/* {data.users.length} */}
                    {data.users.length > 0 &&
                      data.users.map((d) => {
                        return d.email + " ";
                      })}
                  </td>
                  <td>
                    {data.courses.length > 0 &&
                      data.courses.map((d) => {
                        return d.code + " ";
                      })}
                  </td>
                  <td>
                    <a href={data.quiz} target="_blank">
                      quiz
                    </a>
                  </td>
                  <td>
                    <a href={data.classroom} target="_blank">
                      classroom
                    </a>
                  </td>
                  <td>{data.kickoff}</td>
                  <td>{new Intl.NumberFormat().format(data.fee)} VND</td>
                  <td>{data.note}</td>
                  <td>
                    <input type="color" value={data.color} disabled></input>
                    <input
                      type="color"
                      value={data.background}
                      disabled
                    ></input>
                  </td>
                  <td>{data.isActived ? "Yes" : "No"}</td>
                  <td>
                    <Button action="edit" onClick={() => editHandle(data._id)}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      action="delete"
                      onClick={() => deleteClassHandle(data._id)}
                    >
                      Delete
                    </Button>
                  </td>
                  <td>{data.createdBy && data.createdBy.email}</td>
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

  return (
    <div className={styles.containers}>
      <div className={styles["header-container"]}>
        <div className={styles.title}>CLASS CREATING</div>
        <div className={styles["action-container"]}>
          <input
            onChange={searchHandle}
            value={searchInput}
            className={styles.search}
            placeholder="Tìm kiếm"
          ></input>
          <Button action="add" onClick={newClassHandle}>
            Create
          </Button>
        </div>
      </div>

      {/* table */}
      <div className={styles["body-container"]}>
        <div className={styles["table-container"] + " table-responsive"}>
          {isLoading ? (
            <div className={styles["icon-loading"]}>
              {/* <FaSpinner size={50} /> */}
              <LoaderIcon color={"red"} />
            </div>
          ) : (
            content
          )}
        </div>
        {Toast.container}
      </div>
    </div>
  );
};

export default ClassPage;
