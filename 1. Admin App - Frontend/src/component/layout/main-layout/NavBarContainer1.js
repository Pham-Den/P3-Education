import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginActions } from "../../../store";

import { BsArrowRightSquare, BsArrowDownSquare } from "react-icons/bs";

import styles from "./NavBar.module.scss";
import confirmHandle from "../../utils/alert";
import Avatar from "../Avatar";

const NavBarContainer1 = () => {
  const user = useSelector((state) => state.login.user);
  const userData = useSelector((state) => state.login.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowCollapse, setIsShowCollapse] = useState(false);

  const showCollapseHandle = () => {
    setIsShowCollapse((prev) => !prev);
  };

  //logout
  const logoutHandle = () => {
    const isConfirm = window.confirm("confirm");
    if (isConfirm) {
      dispatch(loginActions.ON_LOGOUT());
      navigate("/login");
    }
  };
  return (
    <>
      <div
        className={styles["menu-profile"]}
        style={{ backgroundImage: "url(img/avatar-class.jpg)" }}
      >
        <div
          className={styles["menu-profile-link"]}
          onClick={showCollapseHandle}
        >
          <div className={styles["flex-b"]}>
            <Avatar />
            {!isShowCollapse ? (
              <BsArrowRightSquare fill="#ced4da" size={25} />
            ) : (
              <BsArrowDownSquare fill="#ced4da" size={25} />
            )}
          </div>
          <div className={styles["menu-profile-info"]}>
            <div className={styles["menu-profile-info-name"]}>
              {user.name || "Name"}
            </div>
            <div className={styles["menu-profile-info-prof"]}>
              {userData.email}
            </div>
          </div>
        </div>
      </div>
      {isShowCollapse && (
        <div className={styles["menu-profile-collapse"]}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? styles["menu-profile-collapse-item"] + " " + styles.active
                : styles["menu-profile-collapse-item"]
            }
            to="info"
          >
            <div className={styles.flex}>
              <AiFillSetting size={22} />
              <div>Settings</div>
            </div>
          </NavLink>
          {/* <div className={styles["menu-profile-collapse-item"]}>
            <div className={styles.flex}>
              <BsFillPencilFill size={22} />
              <div>Send Feedback</div>
            </div>
          </div> */}
          <div className={styles["menu-profile-collapse-item"]}>
            <div className={styles.flex} onClick={() => logoutHandle()}>
              <MdOutlineLogout size={22} />
              <div>Log Out</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBarContainer1;
