import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store";

import styles from "./NavBar.module.css";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userCurrent = useSelector((state) => state.login.user);

  const className =
    styles.item + " " + (userCurrent.role === "admin" ? styles.active : "");

  //classes
  const permisHandel = (permis) => {
    if (!permis) {
      navigate("/notpermission");
    }
  };

  //profile
  // const userProfileHandle = () => {
  //   navigate("/userprofile");
  // };
  //logout
  const logoutHandle = () => {
    dispatch(loginActions.ON_LOGOUT());
    navigate("/login");
  };

  return (
    <div className={styles.containes}>
      <div className={styles["title-page"]}>
        {userCurrent.role && userCurrent.role.toUpperCase()}
      </div>
      <div className={styles["navbar-container"]}>
        <div className={styles.container}>
          <div className={styles.categories}>DASHBOARD</div>
          <div className={styles.items}>
            <NavLink
              onClick={() => permisHandel(userCurrent.role === "admin")}
              to="/schedule"
              className={({ isActive }) =>
                isActive ? className + " " + styles["is-active"] : className
              }
              end
            >
              Schedule
            </NavLink>
          </div>
          <div className={styles.items}>
            <NavLink
              onClick={() => permisHandel(userCurrent.role === "admin")}
              to="/progess"
              className={({ isActive }) =>
                isActive ? className + " " + styles["is-active"] : className
              }
              end
            >
              Classes
            </NavLink>
          </div>
          <div className={styles.items}>
            <NavLink
              onClick={() => permisHandel(userCurrent.role === "admin")}
              to="/general"
              className={({ isActive }) =>
                isActive ? className + " " + styles["is-active"] : className
              }
              end
            >
              Overview
            </NavLink>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.categories}>CREATING</div>
          <div className={styles.items}>
            <NavLink
              onClick={() => permisHandel(userCurrent.role === "admin")}
              to="/modules"
              className={({ isActive }) =>
                isActive ? className + " " + styles["is-active"] : className
              }
              end
            >
              Module
            </NavLink>
          </div>
          <div className={styles.items}>
            <NavLink
              onClick={() => permisHandel(userCurrent.role === "admin")}
              to="/courses"
              className={({ isActive }) =>
                isActive ? className + " " + styles["is-active"] : className
              }
              end
            >
              Course
            </NavLink>
          </div>
          <div className={styles.items}>
            <NavLink
              onClick={() => permisHandel(userCurrent.role === "admin")}
              to="/classes"
              className={({ isActive }) =>
                isActive ? className + " " + styles["is-active"] : className
              }
              end
            >
              Classes
            </NavLink>
          </div>
          <div className={styles.items}>
            <NavLink
              onClick={() => permisHandel(userCurrent.role === "admin")}
              to="/users"
              className={({ isActive }) =>
                isActive ? className + " " + styles["is-active"] : className
              }
              end
            >
              User
            </NavLink>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.categories}>ENROLLING</div>
          <div className={styles.items}>
            <NavLink
              onClick={() => permisHandel(userCurrent.role === "admin")}
              to="/waitlist"
              className={({ isActive }) =>
                isActive ? className + " " + styles["is-active"] : className
              }
              end
            >
              Waiting List
            </NavLink>
            <div
              // onClick={() =>
              //   moduleListNavigateHandle(userCurrent.role === "admin")
              // }
              className={styles.item + " " + className}
            >
              Chatting
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.categories}>ACCOUNT</div>
          <div className={styles.items}>
            <NavLink
              onClick={() => permisHandel(userCurrent.role === "admin")}
              to="/profile"
              className={({ isActive }) =>
                isActive ? className + " " + styles["is-active"] : className
              }
              end
            >
              Profile
            </NavLink>
            <div
              onClick={logoutHandle}
              className={styles.item + " " + styles.active}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
