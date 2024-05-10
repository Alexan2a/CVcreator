import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Login from './components/Login';
//import Registration from './components/Registration';
import Main from "./components/Main/Main";
import LogIn from "./components/Login/Login";
import UserContextProvider from "./components/UserContextProvider";
import Registration from "./components/Registration/Registration";
//import Redactor from './components/Redactor';

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
]);

function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
