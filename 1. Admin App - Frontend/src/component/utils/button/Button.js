import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const Button = ({ type, action, children, to, id, onClick, disable }) => {
  let Component = "button";
  let className;
  let classLink = "";

  const passProps = {};

  if (type === "booked") {
    className = styles.booked;
  }
  if (type === "checkin") {
    className = styles.checkin;
  }
  if (type === "checkout") {
    className = styles.checkout;
  }

  /////
  if (action === "delete") {
    className = styles.delete;
  }
  if (action === "edit") {
    className = styles.edit;
  }
  if (action === "add") {
    className = styles.add;
  }

  ///nếu có href hoặc to, thì button chuyển sang Link hoặc thẻ a
  if (to) {
    Component = Link;
    classLink = styles.classLink;
  }

  //hàm chạy onclick
  const clickHandle = (_id) => {
    //chạy onclick ở comp cha
    onClick(_id);
  };
  //nếu có onclick - thì add vào passProps
  if (onClick) {
    passProps.onclick = () => clickHandle(id);
  }

  return (
    <Component
      className={className + " " + classLink}
      to={to}
      onClick={passProps.onclick}
    >
      {children}
    </Component>
  );
};

export default Button;
