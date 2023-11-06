import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useHttp from "../../hook/use-http";

import Toast from "../../toast/Toast";

import { loginActions } from "../../store";

import { ApiUser, userAPI } from "../../utils/API";
import styles from "./FormLogin.module.css";

// import jwt_decode from "jwt-decode";

const FormLogin = () => {
  //dùng navidate chuyển route
  const navigate = useNavigate();

  //dùng dispatch để chuyển action đến redux
  const dispatch = useDispatch();

  //dùng useRef lấy value input
  const emailRef = useRef();
  const passwordRef = useRef();

  /////////////////////xử lý đăng nhập/////////////////
  const { isLoading, error, sendRequest } = useHttp();
  const submitHandle = (e) => {
    e.preventDefault();

    //valid input
    const dataLogin = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!dataLogin.email.trim()) {
      //không được để trống
      return Toast.message.error("Please Input Email!", Toast.option);
    }

    if (!dataLogin.password.trim()) {
      //pass không được bỏ trống
      return Toast.container.message.error(
        "Please Input Password!",
        Toast.option
      );
    } else if (dataLogin.password.trim().length < 8) {
      //bắt đăng nhập lại (xóa trường Password).
      passwordRef.current.value = "";
      return Toast.message.error(
        "Password must be from 8 words!",
        Toast.option
      );
    }

    ///////////////valid OK///////////
    //gửi API đến server

    const option = {
      url: userAPI.loginAPI,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: dataLogin,
    };

    const messageHandle = (dataRes) => {
      //gọi action redux
      dispatch(loginActions.ON_LOGIN(dataRes));

      //
      navigate("/");

      //lấy role nhận được khi login
      // const role = jwt_decode(dataRes.JWT_TOKEN).role;
      //chuyển trang sang dashboard ("Admin") - chat ("Mod") - err ("user")
      // if (role === "admin") {
      //   navigate("/");
      // } else {
      //   navigate("/profile");
      // }
    };

    sendRequest(option, messageHandle);
  };
  return (
    <form className={styles["form-container"]} onSubmit={submitHandle}>
      <div className={styles.title}>Sign In</div>
      <div className={styles.container}>
        <input ref={emailRef} type="email" placeholder="Email"></input>
        <input ref={passwordRef} type="password" placeholder="Password"></input>
      </div>
      {error && <div className={styles["error-message"]}>{error}</div>}
      <button type="submit" className={styles.btn} disabled={isLoading}>
        {isLoading ? "Sending..." : "SIGN IN"}
      </button>
      <div className={styles.action}></div>
      {Toast.container}
    </form>
  );
};

export default FormLogin;
