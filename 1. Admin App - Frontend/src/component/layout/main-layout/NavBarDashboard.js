import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

import styles from "./NavBar.module.scss";

const NavBarDashboard = (props) => {
  const [isShowCollapse, setIsShowCollapse] = useState(true);

  const showCollapseHandle = () => {
    setIsShowCollapse((prev) => !prev);
  };
  return (
    <>
      <div className={styles["menu-items"]} onClick={showCollapseHandle}>
        <div className={styles.flex}>
          <MdOutlineSpaceDashboard size={22} />
          <div>Dashboard</div>
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
            props.roleCurrent.includes("schedule")) && (
            <NavLink
              to="/schedule"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Schedule
            </NavLink>
          )}
          {(props.roleCurrent === "admin" ||
            props.roleCurrent.includes("myClass")) && (
            <NavLink
              to="/classes"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Classes
            </NavLink>
          )}
          {(props.roleCurrent === "admin" ||
            props.roleCurrent.includes("overview")) && (
            <NavLink
              to="/overview"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Overview
            </NavLink>
          )}
        </div>
      )}
    </>
  );
};

export default NavBarDashboard;
