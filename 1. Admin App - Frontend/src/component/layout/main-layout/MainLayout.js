import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "./Header";

import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className={styles["main-layout"]}>
        <NavBar />
        <div className={styles["main-content"]}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
