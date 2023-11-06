import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import {
  BsFillArrowRightSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";

import styles from "./NavBar.module.scss";

const NavBarCreating = (props) => {
  const [isShowCollapse, setIsShowCollapse] = useState(false);

  const showCollapseHandle = () => {
    setIsShowCollapse((prev) => !prev);
  };
  return (
    <>
      <div className={styles["menu-items"]} onClick={showCollapseHandle}>
        <div className={styles.flex}>
          <MdOutlineCreateNewFolder size={22} />
          <div>Creating</div>
        </div>
        {isShowCollapse ? (
          <BsFillArrowDownSquareFill />
        ) : (
          <BsFillArrowRightSquareFill />
        )}
      </div>
      {isShowCollapse && (
        <div className={styles["menu-items-item"]}>
          {(props.roleCurrent === "admin" ||
            props.roleCurrent.includes("module")) && (
            <NavLink
              to="/module"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Module
            </NavLink>
          )}
          {(props.roleCurrent === "admin" ||
            props.roleCurrent.includes("course")) && (
            <NavLink
              to="/course"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Course
            </NavLink>
          )}
          {(props.roleCurrent === "admin" ||
            props.roleCurrent.includes("class")) && (
            <NavLink
              to="/class"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Class
            </NavLink>
          )}
          {(props.roleCurrent === "admin" ||
            props.roleCurrent.includes("user")) && (
            <NavLink
              to="/user"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              User
            </NavLink>
          )}
          {(props.roleCurrent === "admin" ||
            props.roleCurrent.includes("question")) && (
            <NavLink
              to="/question"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Question
            </NavLink>
          )}
          {(props.roleCurrent === "admin" ||
            props.roleCurrent.includes("exam")) && (
            <NavLink
              to="/exam"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Exam
            </NavLink>
          )}
          {(props.roleCurrent === "admin" ||
            props.roleCurrent.includes("toeic")) && (
            <NavLink
              to="/toeic"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Test Toeic
            </NavLink>
          )}
        </div>
      )}
    </>
  );
};

export default NavBarCreating;
