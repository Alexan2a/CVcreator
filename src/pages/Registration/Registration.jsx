import "./Registration.css";
import { useEffect, useMemo, useReducer } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PASSWORD_LENGTH, USERNAME_VALID_SYMB } from "../../constants/form";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  username: "",
  password: "",
  repeatPassword: "",
  hasUsernameChanged: false,
  hasPasswordChanged: false,
  hasRepeatPasswordChanged: false,
  usernameState: "",
  passwordState: "",
  repeatPasswordState: "",
  registerError: "",
};

function reducer(state = initialState, action) {
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
    case "SET_REPEAT_PASSWORD":
      return { ...state, repeatPassword: action.payload };
    case "CHECK_REPEAT_PASSWORD":
      if (
        state.password !== state.repeatPassword &&
        state.hasRepeatPasswordChanged
      )
        return !state.repeatPasswordState
          ? {
              ...state,
              repeatPasswordState: true,
            }
          : state;
      else
        return state.repeatPasswordState
          ? {
              ...state,
              repeatPasswordState: false,
            }
          : state;
    case "SET_REGISTER_ERROR":
      return { ...state, registerError: false };
    case "REGISTER_FAIL":
      return {
        ...state,
        username: "",
        password: "",
        repeatPassword: "",
        registerError: "true",
        hasUsernameChanged: false,
        hasPasswordChanged: false,
        hasRepeatPasswordChanged: false,
      };
    case "SET_HAS_USERNAME_CHANGED":
      return { ...state, hasUsernameChanged: true };
    case "SET_HAS_PASSWORD_CHANGED":
      return { ...state, hasPasswordChanged: true };
    case "SET_HAS_REPEAT_PASSWORD_CHANGED":
      return { ...state, hasRepeatPasswordChanged: true };
    default:
      throw new Error();
  }
}

function Registartion() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchRedux = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((store) => store.username);

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
      dispatch({ type: "SET_HAS_PASSWORD_CHANGED" });
    }
    dispatch({ type: "CHECK_PASSWORD" });
  }, [state.password, state.hasPasswordChanged]);

  useEffect(() => {
    if (!state.hasRepeatPasswordChanged && state.repeatPassword !== "") {
      dispatch({ type: "SET_HAS_REPEAT_PASSWORD_CHANGED" });
    }
    dispatch({ type: "CHECK_REPEAT_PASSWORD" });
  }, [state.repeatPassword, state.hasRepeatPasswordChanged]);

  const handleSetUsername = (e) => {
    dispatch({ type: "SET_USERNAME", payload: e.target.value });
  };

  const handleSetPassword = (e) => {
    dispatch({ type: "SET_PASSWORD", payload: e.target.value });
  };

  const handleSetRepeatPassword = (e) => {
    dispatch({ type: "SET_REPEAT_PASSWORD", payload: e.target.value });
  };

  const usernameError = useMemo(() => {
    if (state.registerError) return "This login already exists";
    else return state.usernameState ? "Your login has incorrect form" : "";
  }, [state.usernameState, state.registerError]);

  const passwordError = useMemo(
    () => (state.passwordState ? "Your password has incorrect length" : ""),
    [state.passwordState]
  );

  const repeatPasswordError = useMemo(
    () => (state.repeatPasswordState ? "Passwords don't match" : ""),
    [state.repeatPasswordState]
  );

  console.log("register");
  const handleRegister = () => {
    if (
      !state.passwordState &&
      !state.usernameState &&
      !state.repeatPasswordState &&
      state.hasUsernameChanged &&
      state.hasPasswordChanged &&
      state.hasRepeatPasswordChanged
    ) {
      fetch("http://localhost:8080/testproject_war_exploded/api/controller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "ADD_USER",
          username: state.username,
          pass: state.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "User authenticated") {
            console.log("logged in");
            localStorage.setItem("token", data.token);
            dispatchRedux({ type: "SET_USERNAME", payload: state.username });
            navigate("/main");
          } else {
            console.error(data);
          }
        })
        .catch((error) => {
          dispatch({ type: "REGISTER_FAIL" });
          document.querySelector(".input-field").style.borderColor = "red";
          console.error("Ошибка при входе", error);
        });
    }
  };

  if (username) {
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
        <input
          type="password"
          className="input-field"
          placeholder="Repeat password"
          value={state.repeatPassword}
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
