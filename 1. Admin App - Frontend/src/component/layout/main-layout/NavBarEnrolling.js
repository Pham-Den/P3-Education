import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdFactCheck } from "react-icons/md";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

import styles from "./NavBar.module.scss";

const NavBarEnrolling = (props) => {
  const [isShowCollapse, setIsShowCollapse] = useState(false);

  const showCollapseHandle = () => {
    setIsShowCollapse((prev) => !prev);
  };
  return (
    <>
      <div className={styles["menu-items"]} onClick={showCollapseHandle}>
        <div className={styles.flex}>
          <MdFactCheck size={22} />
          <div>Enrolling</div>
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
            props.roleCurrent.includes("waitingList")) && (
            <NavLink
              to="/waitlist"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Waiting List
            </NavLink>
          )}
          {(props.roleCurrent === "admin" ||
            props.roleCurrent.includes("roling")) && (
            <NavLink
              to="/roling"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Roling
            </NavLink>
          )}
        </div>
      )}
    </>
  );
};

export default NavBarEnrolling;
