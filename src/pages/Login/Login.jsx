import "./Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import LogInForm from "../../components/LoginForm/LoginForm";
import Slider from "../../components/Slider/Slider";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "../../components/UserContextProvider";
import { useDispatch } from "react-redux";

function LogIn() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const dispatchRedux = useDispatch();
  const [loginError, setLoginError] = useState(false);

  const handleSetLoginError = useCallback((value) => {
    setLoginError(value);
  }, []);

  // const handleLogIn = (login, pass) => {
  //   if (login === "admin" && pass === "admin") {
  //     console.log("logged in");
  //     dispatchRedux({ type: "SET_USERNAME", payload: login });
  //     navigate("/main");
  //     setLoginError(false); // Вход успешный
  //   } else {
  //     console.log("fail");
  //     setLoginError(true); // Вход не удался
  //     console.log(loginError + " insidelogin");
  //   }
  // };

  const handleLogIn = (login, pass) => {
    fetch("http://localhost:8080/testproject_war_exploded/api/controller", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command: "LOGIN",
        username: login,
        pass: pass,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User authenticated") {
          console.log("logged in");
          localStorage.setItem("token", data.token);
          dispatchRedux({ type: "SET_USERNAME", payload: login });
          navigate("/main");
        } else {
          console.error(data);
        }
      })
      .catch((error) => {
        setLoginError(true);
        console.error("Ошибка при входе", error);
      });
  };

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
