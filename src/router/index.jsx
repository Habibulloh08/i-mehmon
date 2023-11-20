import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../page/Home";
import Meetings from "../page/Meetings.JSX";
import Employees from "../page/Employees";
import Visitors from "../page/Visitors";
import Support from "../page/Support";
// import Account from "../page/Account";
import Error from "../page/ErrorPage";
import ErrorPage from "../page/ErrorPage";
import Login from "../page/Auth/Login";
import Rooms from "../page/Rooms";
import Department from "../page/Department";
import ExitLogin from "../page/ExitLogin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "meetings",
        element: <Meetings />,
      },
      {
        path: "empolyees",
        element: <Employees />,
      },
      {
        path: "visitors",
        element: <Visitors />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "department",
        element: <Department />,
      },
      {
        path: "support",
        element: <Support />,
      },
    ],
  },
  // {
  //   path: "user",
  //   element: <Account />,
  // },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "exit-login",
    element: <ExitLogin />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
