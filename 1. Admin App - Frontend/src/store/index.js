import { createSlice, configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

////////////////login///////////////

//set init state
//lấy từ cookies
const jwt_token = Cookies.get("jwt_token");
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";
const userData = jwt_token ? jwtDecode(jwt_token) : "";

const initialStateLogin = {
  isLogin: jwt_token ? true : false,
  user: user ? user : "",
  userData: userData ? userData : "",
};

//set Slice

const loginSlice = createSlice({
  name: "login",
  initialState: initialStateLogin,
  reducers: {
    ON_LOGIN: (state, actions) => {
      //payload là JWT_TOKEN
      //lưu state
      const user = actions.payload.user;
      state.isLogin = true;
      state.user = user;
      state.userData = jwtDecode(actions.payload.jwt_token);

      //lưu vào cookies - hiệu lực 2h
      Cookies.set("jwt_token", actions.payload.jwt_token);
      const now = new Date();
      Cookies.set("expired", now.getTime() + 60 * 60 * 2 * 1000);
      localStorage.setItem("user", JSON.stringify(user));
    },
    ON_LOGOUT: (state, actions) => {
      //lưu state
      state.isLogin = false;
      state.user = "";
      state.userData = "";

      //remove cookies
      Cookies.remove("jwt_token");
      Cookies.remove("expired");
      localStorage.removeItem("user");
    },

    UPDATE_USER: (state, actions) => {
      //
      const payload = actions.payload;
      const user = { ...state.user, ...payload };
      state.user = user;

      localStorage.setItem("user", JSON.stringify(user));
    },
    UPDATE_CASE: (state, actions) => {
      //
      const payload = actions.payload;

      const user = { ...state.user, case: payload.case };
      state.user = user;

      localStorage.setItem("user", JSON.stringify(user));
    },
  },
});

/////////////POPUP///////////////
const initialStatePopup = {
  isShow: false,
  roleData: null,
};

const popupSlice = createSlice({
  name: "popup",
  initialState: initialStatePopup,
  reducers: {
    SHOW_POPUP: (state, actions) => {
      //lưu state
      state.isShow = true;
      state.roleData = actions.payload;
    },
    CLOSE_POPUP: (state, actions) => {
      state.isShow = false;
      state.roleData = null;
    },
  },
});

//dùng configureStore thay cho createStore
const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    popup: popupSlice.reducer,
  },
});

/////xuất action
export const loginActions = loginSlice.actions;
export const popupActions = popupSlice.actions;

export default store;
