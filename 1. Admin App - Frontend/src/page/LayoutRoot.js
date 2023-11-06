import { Outlet } from "react-router-dom";

import NavBar from "../component/layout/NavBar";

import styles from "./LayoutRoot.module.css";

const LayoutRoot = () => {
  return (
    <>
      <NavBar />
      <div className={styles.containers}>
        <Outlet />
      </div>
    </>
  );
};

export default LayoutRoot;
