import { Link } from "react-router-dom";
import { MdNotificationsActive } from "react-icons/md";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import Avatar from "../Avatar";

import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { mainURL } from "../../../utils/API";

const Header = () => {
  const user = useSelector((state) => state.login.user);
  const userData = useSelector((state) => state.login.userData);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <a href={mainURL}>
          <img src="/img/logo-nonslogan.png"></img>
        </a>

        <div className={styles.word}>
          <span className={styles["logo-title"]}>Welcome</span>
          <span className={styles["logo-title2"]}>{user.name || "Name"}</span>
        </div>
      </div>
      <div className={styles["account-right"]}>
        {/* <div className={styles.search}>
          <input placeholder="Search ... "></input>
          <Tippy content="Tìm kiếm">
            <button>
              <BiSearch />
            </button>
          </Tippy>
        </div> */}

        <div className={styles.notification}>
          <Tippy content="Thông báo mới">
            <button>
              <MdNotificationsActive size={22} color="#fff" />
            </button>
          </Tippy>
        </div>
        <Link className={styles.account} to="">
          <Avatar />
          <span>{userData.role || "User"}</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
