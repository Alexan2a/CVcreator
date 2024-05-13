import { createStore } from "redux";

const initialState = {
  username: localStorage.getItem("username") ?? null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "DELETE_USERNAME":
      return { ...state, username: null };
    default:
      return state;
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());

store.subscribe(() => {
  localStorage.setItem("username", store.getState().username);
});

export default store;
