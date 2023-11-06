import { BsArrowBarLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

import styles from "./NavBar.module.scss";
import NavBarContainer1 from "./NavBarContainer1";
import NavBarCreating from "./NavBarCreating";
import NavBarDashboard from "./NavBarDashboard";
import NavBarEnrolling from "./NavBarEnrolling";
import { isAdminMod } from "../../../utils/isAuthi";

const NavBar = () => {
  const roleCurrent = isAdminMod();
  return (
    <div className={styles["container-navbar"]}>
      {/* khung 1: avatar */}
      <NavBarContainer1 />

      <div className={styles["menu-container-items"]}>
        {/* khung 2: dashboard */}
        <NavBarDashboard roleCurrent={roleCurrent} />
        <NavBarCreating roleCurrent={roleCurrent} />
        <NavBarEnrolling roleCurrent={roleCurrent} />
      </div>
      {/* <div className={styles["hidden-menu"]}>
        <BsArrowBarLeft size={30} color="#fff" />
      </div> */}
    </div>
  );
};

export default NavBar;
