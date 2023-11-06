import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useParams, useRouteLoaderData } from "react-router-dom";

import { SiGoogleclassroom, SiGooglemeet } from "react-icons/si";
import { MdQuiz, MdSwapCalls } from "react-icons/md";
import { GiProgression } from "react-icons/gi";

import { PiLockKeyOpenDuotone } from "react-icons/pi";
import { BiArrowBack } from "react-icons/bi";

import { classAPI } from "../../utils/API";

import styles from "./ClassDetailCourse.module.scss";
import RowModule from "./course-detail/RowModule";
import useHttp from "../../hook/use-http";
import { useSelector } from "react-redux";

const ClassDetailCourse = () => {
  const params = useParams();
  const classID = params.id;
  const courseID = params.course;
  const user = useSelector((state) => state.login.user);

  const dataClass = useRouteLoaderData("class-detail-course");
  // console.log(classID, courseID);
  const [courseCurrent, setCourseCurrent] = useState(null);
  const [moduleCurrent, setModuleCurrent] = useState([]);
  const [checkAll, setCheckAll] = useState("no");

  const [total, setTotal] = useState(0);

  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    let totalModules = 0;
    courseCurrent &&
      courseCurrent.modules.forEach((element) => {
        let index = dataClass.progress.findIndex(
          (d) => d.module === element.module
        );
        if (index !== -1) {
          let number = dataClass.progress[index].isDone == true ? 1 : 0;
          totalModules = totalModules + number;
        }
      });

    setTotal(totalModules);

    //
    if (courseCurrent && courseCurrent.modules) {
      const array = [...courseCurrent.modules];
      setModuleCurrent((prev) => array.reverse());
    }
  }, [courseCurrent]);

  useEffect(() => {
    //tìm course trong class
    const index = dataClass.courses.findIndex((d) => d._id === courseID);

    if (index !== -1) {
      setCourseCurrent(dataClass.courses[index]);
    }
  }, [courseID]);

  //updateTotalHandle
  const updateTotalHandle = (number) => {
    setTotal((prev) => prev + number);
  };

  //check all handle
  const checkAllHandle = (e) => {
    const isConfirm = window.confirm("Confirm Check All!");
    if (!isConfirm) {
      e.target.checked = !e.target.checked;
    } else {
      ///gọi api tới check all moduleCurrent (e.target.checked)
      const data = {
        module: moduleCurrent,
        isDone: e.target.checked,
        checkAll: true,
      };
      const option = {
        url: classAPI.editProgressClassAPI + "/" + classID,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + Cookies.get("jwt_token"),
        },
      };
      //hàm đón message
      const messageHandle = (data) => {
        //
        console.log(data);
      };
      sendRequest(option, messageHandle);

      //truyền state vào để update row
      setCheckAll(e.target.checked);
    }
  };

  return (
    <div className={styles.containers}>
      {/* Khung banner */}
      <div className={styles["banner-container"]}>
        <div>
          <Link to={-1} className={styles.back}>
            <BiArrowBack />
            <span>Back</span>
          </Link>
        </div>
        <div className={styles["banner-classname"]}>{dataClass.code}</div>
        <div className={styles["banner-foot"]}>
          <div className={styles.flexleft}>
            <GiProgression size={40} />
            <div className={styles.flexc}>
              <div className={styles.activehole}>
                <PiLockKeyOpenDuotone /> {total} modules
              </div>
              <div>
                <MdSwapCalls />{" "}
                {courseCurrent &&
                  courseCurrent.modules.length > 0 &&
                  courseCurrent.modules.length}{" "}
                modules
              </div>
            </div>
          </div>
          <div className={styles.flexright}>
            {user.linkMeet ? (
              <a
                href={user.linkMeet}
                target="_blank"
                className={styles["meet-hover"]}
              >
                <SiGooglemeet size={30} className={styles.icon} />
              </a>
            ) : (
              <Link to="/info?tab=meet" className={styles.linkmeet}>
                +Add Link Meet
              </Link>
            )}
            <a
              href={dataClass.classroom}
              target="_blank"
              className={styles["classroom-hover"]}
            >
              <SiGoogleclassroom size={30} />
            </a>
            <a
              href={dataClass.quiz}
              target="_blank"
              className={styles["quiz-hover"]}
            >
              <MdQuiz size={30} />
            </a>
          </div>
        </div>
      </div>

      {/* listcontent */}
      <div>
        <div className={styles["content-header"]}></div>
        <div className={styles["content-container"] + " table-responsive"}>
          <table className="table align-middle table-bordered">
            {/* <caption className={styles.caption}>List of Student</caption> */}
            <thead>
              <tr className={"table-dark"}>
                <th scope="col">
                  <input type="checkbox" onChange={checkAllHandle}></input>
                </th>
                <th scope="col">Modules</th>
                <th scope="col">Topics</th>
                <th scope="col">WPS</th>
                <th scope="col">Flashcards</th>
                <th scope="col">Slides</th>
                <th scope="col">Audio</th>
                <th scope="col">Video</th>
                <th scope="col">Text</th>
                <th scope="col">Key</th>
                <th scope="col">Task1</th>
                <th scope="col">Task2</th>
              </tr>
            </thead>
            <tbody>
              {courseCurrent &&
                moduleCurrent &&
                moduleCurrent.length > 0 &&
                moduleCurrent.map((data, index) => {
                  return (
                    <RowModule
                      classID={classID}
                      key={data._id}
                      data={data}
                      index={index}
                      progress={dataClass.progress}
                      onUpdateTotal={updateTotalHandle}
                      onCheckAll={checkAll}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailCourse;

export const authiClassIDLoader = async ({ params }) => {
  const classID = params.id;
  // const courseID = params.course;

  const response = await fetch(classAPI.adminClassAPI + "/" + classID, {
    headers: {
      authorization: "Bearer " + Cookies.get("jwt_token"),
    },
  });

  if (!response.ok) {
    throw new Error("Fetch fail!");
  }

  const dataResponse = await response.json();
  if (response.status !== 200) {
    return new Error(dataResponse);
  }

  return dataResponse;
};
