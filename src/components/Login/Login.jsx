import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import LogInForm from "../LoginForm/LoginForm";
import Slider from "../Slider/Slider";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "../UserContextProvider";

function LogIn() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { user } = useContext(UserContext);

  const [loginError, setLoginError] = useState(false);

  const handleSetLoginError = useCallback((value) => {
    setLoginError(value);
  }, []);

  const handleLogIn = (login, pass) => {
    if (login === "admin" && pass === "admin") {
      console.log("logged in");
      userContext.onChange(login);
      navigate("/main");
      setLoginError(false); // Вход успешный
    } else {
      console.log("fail");
      setLoginError(true); // Вход не удался
      console.log(loginError + " insidelogin");
    }
  };

  // const handleLogIn = (login, pass) => {
  //   fetch("http://localhost:8080/testproject_war_exploded/api/controller", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       command: "LOGIN",
  //       username: login,
  //       pass: pass,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data === "User authenticated") {
  //         console.log("logged in");
  //         userContext.onChange(login);
  //         navigate("/main");
  //       } else {
  //         console.error(data);
  //       }
  //     })
  //     .catch((error) => {
  //       setLoginError(true);
  //       console.error("Ошибка при входе", error);
  //     });
  // };

  if (user) {
    return <Navigate to="/main" />;
  }
  return (
    <div className="log-in">
      <div className="log-in__container">
        <LogInForm
          loginError={loginError}
          onSetLoginError={handleSetLoginError}
          onLogIn={handleLogIn}
        />
      </div>
      <Slider />
    </div>
  );
}

export default LogIn;
