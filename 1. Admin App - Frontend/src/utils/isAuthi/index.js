import Cookies from "js-cookie";
import { redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const getToken = () => {
  const token = Cookies.get("jwt_token");
  return token;
};

const getExpired = () => {
  const expired = Cookies.get("expired");
  return expired;
};

///////check authi///////
////dùng trả lại message tình trạng của login///
export const loginState = () => {
  const token = getToken();
  const expired = getExpired();

  const now = new Date().getTime;

  if (!token) {
    return { message: "Please login!" };
  }
  if (now > expired) {
    return { message: "Token expired! Please login!" };
  }

  return { message: "islogin" };
};

//////bảo vệ tuyến/////
export const isAuthi = () => {
  const token = getToken();
  const expired = getExpired();

  const now = new Date();
  if (!token || now.getTime() > expired) {
    return redirect("/login");
  }

  return null;
};

///////check admin - mod role
export const isAdminMod = (role) => {
  const token = getToken();
  const user = jwtDecode(token);

  if (user.role === "admin") {
    return "admin";
  } else if (user.roles) {
    return user.roles.autho;
  }

  return null;
};
