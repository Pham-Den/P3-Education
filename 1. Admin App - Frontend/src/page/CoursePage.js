import { useEffect, useRef, useState } from "react";
import { courseAPI } from "../utils/API";
import styles from "./CoursePage.module.scss";
import { useNavigate } from "react-router-dom";

import Toast from "../toast/Toast";
import LoaderIcon from "react-loader-icon";

import useHttp from "../hook/use-http";
import Button from "../component/utils/button/Button";
import ShowDetail from "../component/course/ShowDetail";
import { getToken } from "../utils/isAuthi";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [coursesFilter, setCoursesFilter] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const searchRef = useRef();
  // const categoryRef = useRef();
  // const typeRef = useRef();
  const [filterState, setFilterState] = useState({});

  const filterHandle = () => {
    setFilterState({
      search: searchRef.current.value,
    });
  };

  //hook custom http
  const { isLoading, error, sendRequest } = useHttp();

  /////////////////1.get Courses/////////////

  //chạy hook
  useEffect(() => {
    const option = {
      url: courseAPI,
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    };
    //cb handle data
    const getData = (data) => {
      setCourses(data);
      setCoursesFilter(data);
    };
    sendRequest(option, getData);
  }, [sendRequest]);

  //filter
  useEffect(() => {
    if (searchInput && courses.length > 0) {
      setCoursesFilter(
        courses.filter((d) =>
          d.code.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setCoursesFilter(courses);
    }
  }, [searchInput]);

  //add course
  const editHandle = (id) => {
    navigate("/course/add/" + id);
  };

  const addCourseHandle = () => {
    //chuyển sang trang addCourseHandle
    navigate("/course/add");
  };

  //delete
  const deleteHandle = (id) => {
    const isConfirm = window.confirm("Confirm!");
    if (isConfirm) {
      //option
      const option = {
        url: courseAPI + "/" + id,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      };
      //cb update state
      const updateState = (dataRes) => {
        //tìm class delete
        const index = courses.findIndex((d) => d._id === id);

        let coursesListUpdate = courses;
        coursesListUpdate.splice(index, 1);

        setCourses(coursesListUpdate);
        setCoursesFilter(coursesListUpdate);

        if (error) {
          Toast.message.error(dataRes.message, Toast.option);
        }

        //thành công báo
        Toast.message.success(dataRes.message, Toast.option);
      };

      //hook delete
      sendRequest(option, updateState);
    }
  };

  let content = <p>Please add data!</p>;

  if (courses.length > 0) {
    content = (
      <table
        className={
          styles.table + " table caption-top align-middle table-bordered"
        }
      >
        <thead>
          <tr className="align-middle table-dark">
            <th scope="col">STT</th>
            <th scope="col">Code</th>
            <th scope="col">Type</th>
            <th scope="col">Avatar</th>
            <th scope="col">Description</th>
            <th scope="col">No. of Sessions</th>
            <th scope="col">Tuition</th>
            <th scope="col">Modules</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            <th scope="col">Created By</th>
          </tr>
        </thead>
        <tbody>
          {coursesFilter.length > 0 &&
            coursesFilter.map((data, index) => {
              return (
                <tr key={data._id}>
                  <th scope="row">{index + 1}</th>
                  <th>{data.code}</th>
                  <td>{data.type}</td>
                  <td>
                    <img
                      className={styles.image}
                      src={data.image}
                      alt={data.code}
                    ></img>
                  </td>
                  <td>{data.desc}</td>
                  <td>{data.routestudy}</td>
                  <td>
                    {new Intl.NumberFormat("de-DE").format(data.price)} VND
                  </td>
                  <ShowDetail data={data} />
                  <td>
                    <Button action="edit" onClick={() => editHandle(data._id)}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      action="delete"
                      onClick={() => deleteHandle(data._id)}
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
        <div className={styles.title}>COURSE CREATING</div>
        <div className={styles["action-container"]}>
          <input
            onChange={(e) => setSearchInput(e.target.value.trim())}
            value={searchInput}
            className={styles.search}
            placeholder="Tìm kiếm"
          ></input>
          <Button action="add" onClick={addCourseHandle}>
            Create
          </Button>
        </div>
      </div>
      {/* header bar */}

      {/* table */}
      <div className={styles["body-container"]}>
        <div className={styles["table-container"] + " table-responsive"}>
          {isLoading ? <LoaderIcon color={"red"} /> : content}
        </div>

        {Toast.container}
      </div>
    </div>
  );
};

export default CoursePage;
