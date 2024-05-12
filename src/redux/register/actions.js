export const registerUser = (username, password) => {
  return (dispatch) => {
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
        if (data.message === "User authenticated") {
          dispatch({ type: "SET_USERNAME_SUCCESS", payload: username });
        } else if (data.message === "Login exists") {
          dispatch({ type: "REGISTER_FAIL" }); // Это действие обрабатывается редуктором Redux
          dispatch({ type: "REGISTER_FAIL_LOCAL" }); // Это действие обрабатывается вашим локальным редуктором
        }
      })
      .catch((error) => {
        dispatch({ type: "REGISTER_FAIL" });
        dispatch({ type: "REGISTER_FAIL_LOCAL" });
      });
  };
};
