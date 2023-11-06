import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import MainLayout from "./component/layout/main-layout/MainLayout";
import LoginPage from "./page/LoginPage";
import ModulePage from "./page/ModulePage";
import CoursePage from "./page/CoursePage";
import AddModuleForm from "./component/modules/AddModuleForm";
import AddNewCourse from "./component/course/AddNewCourse";
import ClassPage from "./page/ClassPage";
import SchedulePage from "./page/SchedulePage";
import UserPage from "./page/UserPage";
import AddNewUser from "./component/user/AddNewUser";
import AddNewClass from "./component/class/AddNewClass";
import NotPermission from "./page/NotPermission";
import ClassDetail from "./component/classes/ClassDetail";
import WaitListPage from "./page/WaitListPage";
import Page404 from "./page/Page404";
import ClassDetailCourse, {
  authiClassIDLoader,
} from "./component/classes/ClassDetailCourse";
import InfoPage from "./page/InfoPage";
import { isAuthi } from "./utils/isAuthi";
import OverviewPage from "./page/OverviewPage";
import RolingPage from "./page/RolingPage";
import ClassesPage from "./page/ClassesPage";
import ToeicExamPage from "./page/ToeicExamPage";
import QuestionPage from "./page/toeic-question/QuestionPage";
import AddQuestion from "./component/toeic/question/AddQuestion";
import AddExam from "./component/toeic/exam/AddExam";
import ExamPage from "./page/toeic-exam/ExamPage";
import ToeicPage from "./page/ToeicPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Page404 />,
      loader: isAuthi,
      children: [
        { index: true, element: <SchedulePage /> },
        { path: "schedule", element: <SchedulePage /> },
        { path: "overview", element: <OverviewPage /> },
        { path: "classes", element: <ClassesPage /> },
        // { path: "progress", element: <ProgressPage /> },
        // id của 1 class
        { path: "classes/:id", element: <ClassDetail /> },
        {
          id: "class-detail-course",
          path: "classes/:id/courses/:course",
          element: <ClassDetailCourse />,
          loader: authiClassIDLoader,
        },
        { path: "module", element: <ModulePage /> },
        { path: "module/add", element: <AddModuleForm /> },
        { path: "module/add/:id", element: <AddModuleForm /> },
        { path: "course", element: <CoursePage /> },
        { path: "course/add", element: <AddNewCourse /> },
        { path: "course/add/:id", element: <AddNewCourse /> },
        { path: "class", element: <ClassPage /> },
        { path: "class/add", element: <AddNewClass /> },
        { path: "class/add/:id", element: <AddNewClass /> },
        { path: "user", element: <UserPage /> },
        { path: "user/add", element: <AddNewUser /> },
        { path: "user/add/:id", element: <AddNewUser /> },

        { path: "question", element: <QuestionPage /> },
        { path: "question/add", element: <AddQuestion /> },
        { path: "question/add/:id", element: <AddQuestion /> },

        { path: "waitlist", element: <WaitListPage /> },
        { path: "roling", element: <RolingPage /> },
        { path: "info", element: <InfoPage /> },

        { path: "exam", element: <ExamPage /> },
        { path: "exam/add", element: <AddExam /> },
        { path: "exam/add/:id", element: <AddExam /> },

        { path: "toeic", element: <ToeicPage /> },
        { path: "toeic/:id", element: <ToeicExamPage /> },

        { path: "notpermission", element: <NotPermission /> },
      ],
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/test", element: <MainLayout /> },
    // { path: "*", element: <Page404 /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
