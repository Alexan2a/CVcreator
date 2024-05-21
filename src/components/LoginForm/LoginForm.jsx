import "./LoginForm.css";
import { useEffect, useMemo, useReducer } from "react";
import { PASSWORD_LENGTH, USERNAME_VALID_SYMB } from "../../constants/form";
import { Link } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
  hasUsernameChanged: false,
  hasPasswordChanged: false,
  passwordState: "",
  usernameState: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "CHECK_USERNAME":
      if (
        (state.username.trim() === "" ||
          !USERNAME_VALID_SYMB.test(state.username)) &&
        state.hasUsernameChanged
      )
        return !state.usernameState
          ? {
              ...state,
              usernameState: true,
            }
          : state;
      else
        return state.usernameState
          ? {
              ...state,
              usernameState: false,
            }
          : state;
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "CHECK_PASSWORD":
      if (state.password.length < PASSWORD_LENGTH && state.hasPasswordChanged)
        return !state.passwordState
          ? {
              ...state,
              passwordState: true,
            }
          : state;
      else
        return state.passwordState
          ? {
              ...state,
              passwordState: false,
            }
          : state;
    case "LOGIN_FAIL":
      return {
        ...state,
        username: "",
        password: "",
        hasUsernameChanged: false,
        hasPasswordChanged: false,
      };
    case "SET_HAS_USERNAME_CHANGED":
      return { ...state, hasUsernameChanged: true };
    case "SET_HAS_PASSWORD_CHANGED":
      return { ...state, hasPasswordChanged: true };
    default:
      throw new Error();
  }
}

function LogInForm({ loginError, onSetLoginError, onLogIn }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (loginError) {
      let inputFields = document.querySelectorAll(".input-field");
      inputFields.forEach((field) => {
        field.style.borderColor = "red";
      });
      dispatch({ type: "LOGIN_FAIL" });
    }
  }, [loginError, onSetLoginError]);

  useEffect(() => {
    if (!state.hasUsernameChanged && state.username !== "") {
      let inputFields = document.querySelectorAll(".input-field");
      inputFields.forEach((field) => {
        field.style.borderColor = "#d4d3d2";
      });
      dispatch({ type: "SET_HAS_USERNAME_CHANGED" });
    }
    dispatch({ type: "CHECK_USERNAME" });
  }, [state.username, state.hasUsernameChanged]);

  useEffect(() => {
    if (!state.hasPasswordChanged && state.password !== "") {
      let inputFields = document.querySelectorAll(".input-field");
      inputFields.forEach((field) => {
        field.style.borderColor = "#d4d3d2";
      });
      dispatch({ type: "SET_HAS_PASSWORD_CHANGED" });
    }

    dispatch({ type: "CHECK_PASSWORD" });
  }, [state.password, state.hasPasswordChanged]);

  const handleSetUsername = (e) => {
    if (loginError) onSetLoginError(false);
    dispatch({ type: "SET_USERNAME", payload: e.target.value });
  };

  const handleSetPassword = (e) => {
    if (loginError) onSetLoginError(false);
    dispatch({ type: "SET_PASSWORD", payload: e.target.value });
  };

  const passwordError = useMemo(() => {
    if (loginError) return "Incorrect login or password";
    else return state.passwordState ? "Your password has incorrect length" : "";
  }, [state.passwordState, loginError]);

  const usernameError = useMemo(
    () => (state.usernameState ? "Your login has incorrect form" : ""),
    [state.usernameState]
  );

  const handleLogIn = () => {
    if (
      !state.passwordState &&
      !state.usernameState &&
      state.hasPasswordChanged &&
      state.hasUsernameChanged
    )
      onLogIn(state.username, state.password);
  };

  return (
    <div className="log-in-form">
      <p className="title-form">log in</p>
      <input
        type="text"
        className="input-field"
        placeholder="Login"
        value={state.username}
        onChange={handleSetUsername}
      />
      <label className="text text-type-error">{usernameError}</label>
      <input
        type="password"
        className="input-field"
        placeholder="Password"
        value={state.password}
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
