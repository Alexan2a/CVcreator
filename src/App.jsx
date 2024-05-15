import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main/Main";
import LogIn from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Redactor from "./pages/Redactor/Redactor";
import Download from "./pages/Download/Download";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/main/redactor",
    children: [
      {
        path: "new",
        element: <Redactor isNew={true} />,
      },
      {
        path: ":id",
        element: <Redactor isNew={false} />,
      },
    ],
  },
  {
    path: "/main/download/:id",
    element: <Download />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
