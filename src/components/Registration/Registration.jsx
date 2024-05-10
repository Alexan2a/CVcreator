import "./Registration.css";
import { useCallback, useContext, useEffect, useState } from "react";
import useInputValue from "../../hooks/use-input-value";
import { UserContext } from "../UserContextProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PASSWORD_LENGTH, PASSWORD_VALID_SYMB } from "../../constants/form";

function Registartion() {
  const [username, , handleSetUsername] = useInputValue("");
  const [password, , handleSetPassword] = useInputValue("");
  const [repeatPassword, , handleSetRepeatPassword] = useInputValue("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [hasUsernameChanged, setHasUsernameChanged] = useState(false);
  const [hasPasswordChanged, setHasPasswordChanged] = useState(false);
  const [hasRepeatPasswordChanged, setHasRepeatPasswordChanged] =
    useState(false);
  const [passwordState, setPasswordState] = useState("");
  const [repeatPasswordState, setRepeatPasswordState] = useState("");
  const [usernameState, setUsernameState] = useState("");

  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { user } = useContext(UserContext);

  const handleCheckPassword = useCallback(() => {
    if (password.length >= PASSWORD_LENGTH && passwordState) {
      console.log("password state changet to true");
      setPasswordError("");
      setPasswordState(false);
    } else if (
      password.length < PASSWORD_LENGTH &&
      !passwordState &&
      hasPasswordChanged
    ) {
      setPasswordError("Your password has incorrect length");
      setPasswordState(true);
    }
  }, [password, passwordState, hasPasswordChanged]);

  const handleCheckRepeatPassword = useCallback(() => {
    if (repeatPassword !== password) {
      setRepeatPasswordError("Passwords don't match");
      setRepeatPasswordState(true);
    } else {
      setRepeatPasswordError("");
      setRepeatPasswordState(false);
    }
  }, [repeatPassword, password]);

  const handleCheckUsername = useCallback(() => {
    let regexp = PASSWORD_VALID_SYMB;

    if (
      (username.trim() === "" || !regexp.test(username)) &&
      hasUsernameChanged
    ) {
      setUsernameError("Your name has incorrect form");
      setUsernameState(true);
    } else {
      setUsernameError("");
      setUsernameState(false);
    }
  }, [username, hasUsernameChanged]);

  useEffect(() => {
    if (!hasPasswordChanged && password !== "") {
      setHasPasswordChanged(true);
    }
    handleCheckPassword();
  }, [password, hasPasswordChanged, handleCheckPassword]);

  useEffect(() => {
    if (!hasRepeatPasswordChanged && password !== "") {
      setHasRepeatPasswordChanged(true);
    }
    handleCheckRepeatPassword();
  }, [
    password,
    repeatPassword,
    hasRepeatPasswordChanged,
    handleCheckRepeatPassword,
  ]);

  useEffect(() => {
    if (!hasUsernameChanged && username !== "") {
      console.log("Name has changed for the first time:", username);
      setHasUsernameChanged(true);
    }
    handleCheckUsername();
  }, [username, hasUsernameChanged, handleCheckUsername]);

  const handleRegister = () => {
    if (!passwordState && !usernameState && !repeatPasswordState) {
      fetch("http://localhost:8080/testproject_war_exploded/api/controller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "ADD_USER",
          username: username,
          pass: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === "User authenticated") {
            console.log("logged in");
            userContext.onChange(username);
            navigate("/main");
          } else {
            console.error(data);
          }
        })
        .catch((error) => {
          console.error("Ошибка при входе", error);
        });
    }
  };

  if (user) {
    return <Navigate to="/main" />;
  }
  return (
    <div className="registartion">
      <div className="registration__form">
        <p className="title">Registration</p>
        <input
          type="text"
          className="input-field"
          placeholder="Login"
          value={username}
          onChange={handleSetUsername}
        />
        <label className="text text-type-error">{usernameError}</label>
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={handleSetPassword}
        />
        <label className="text text-type-error">{passwordError}</label>
        <input
          type="password"
          className="input-field"
          placeholder="Repeat password"
          value={repeatPassword}
          onChange={handleSetRepeatPassword}
        />
        <label className="text text-type-error">{repeatPasswordError}</label>
        <button className="button button-size-l" onClick={handleRegister}>
          Register
        </button>
        <p className="text">
          Back to{" "}
          <Link to="/" className="text text-type-link">
            log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registartion;
