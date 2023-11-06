// const URL_HOST = "http://localhost:4000/";
export const URL_HOST = "https://p3-education.managestore.io.vn/";

export const mainURL = "#";

export const courseAPI = URL_HOST + "api/course";
export const moduleAPI = URL_HOST + "api/module";

export const classAPI = {
  adminClassAPI: URL_HOST + "api/class",
  editAttendanceClassAPI: URL_HOST + "api/class/attendance",
  editProgressClassAPI: URL_HOST + "api/class/progress",
};

export const userAPI = {
  adminUserApi: URL_HOST + "api/user",

  //
  getAllModAPI: URL_HOST + "api/user/mod",
  loginAPI: URL_HOST + "api/user/login",

  //update fee
  updateFeeOthersAPI: URL_HOST + "api/user/update-others",
};
export const waitListAPI = {
  registerAPI: URL_HOST + "api/waitlist/add",
  getAllWaitListAPI: URL_HOST + "api/waitlist/all",
  deleteWaitListAPI: URL_HOST + "api/waitlist/remove",
  putWaitListAPI: URL_HOST + "api/waitlist/edit",
};

export const adminAPI = {
  updatePasswordAPI: URL_HOST + "api/admin/edit-password",
  updateInfoAPI: URL_HOST + "api/admin/update/info",
  getInfoDashboard: URL_HOST + "api/admin/overview-dashboard",
};

export const roleAPI = {
  getAllRole: URL_HOST + "api/role",
};

export const toeicApi = {
  exam: URL_HOST + "api/toeic-exam",
  question: URL_HOST + "api/toeic-question",
};
