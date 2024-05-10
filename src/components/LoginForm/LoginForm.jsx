import "./LoginForm.css";
import { useCallback, useEffect, useState } from "react";
import useInputValue from "../../hooks/use-input-value";
import { PASSWORD_LENGTH, PASSWORD_VALID_SYMB } from "../../constants/form";
import { Link } from "react-router-dom";

function LogInForm({ loginError, onSetLoginError, onLogIn }) {
  const [username, setUsername, handleSetUsername] = useInputValue("");
  const [password, setPassword, handleSetPassword] = useInputValue("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasUsernameChanged, setHasUsernameChanged] = useState(false);
  const [hasPasswordChanged, setHasPasswordChanged] = useState(false);
  const [passwordState, setPasswordState] = useState("");
  const [usernameState, setUsernameState] = useState("");

  useEffect(() => {
    if (loginError) {
      // Если вход не удался, очистите поля ввода
      setUsername("");
      setPassword("");
      setHasUsernameChanged(false);
      setHasPasswordChanged(false);
      setPasswordError("incorrect login or password");
      let inputFields = document.querySelectorAll(".log-in-form__input-field");
      inputFields.forEach((field) => {
        field.style.borderColor = "red";
      });
      onSetLoginError(false);
    }
    // onSetLoginError(false);
  }, [loginError, onSetLoginError, setPassword, setUsername]);

  const handleCheckPassword = useCallback(() => {
    if (password.length >= PASSWORD_LENGTH && passwordState) {
      setPasswordError("");
      setPasswordState(false);
    }
    if (
      password.length < PASSWORD_LENGTH &&
      !passwordState &&
      hasPasswordChanged
    ) {
      console.log("password state changet to false");
      setPasswordError("Your password has incorrect length");
      setPasswordState(true);
    }
  }, [password, passwordState, hasPasswordChanged]);

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
      let inputFields = document.querySelectorAll(".log-in-form__input-field");
      inputFields.forEach((field) => {
        field.style.borderColor = "#d4d3d2";
      });
      setPasswordError("");
      setHasPasswordChanged(true);
    }
    handleCheckPassword();
  }, [password, hasPasswordChanged, handleCheckPassword]);

  useEffect(() => {
    if (!hasUsernameChanged && username !== "") {
      let inputFields = document.querySelectorAll(".log-in-form__input-field");
      inputFields.forEach((field) => {
        field.style.borderColor = "#d4d3d2";
      });
      setPasswordError("");
      setHasUsernameChanged(true);
    }
    handleCheckUsername();
  }, [username, hasUsernameChanged, handleCheckUsername]);

  const handleLogIn = () => {
    if (
      !passwordState &&
      !usernameState &&
      hasPasswordChanged &&
      hasUsernameChanged
    )
      onLogIn(username, password);
  };

  return (
    <div className="log-in-form">
      <p className="title">log in</p>
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
      <button className="button button-size-l" onClick={handleLogIn}>
        log in
      </button>
      <p className="text">
        Don't have an account?
        <Link to="/register" className="text text-type-link">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LogInForm;
