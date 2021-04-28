import { applyMiddleware, combineReducers, createStore } from "redux";
import axios from "axios";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
};

const testReducer = (state = initialState, action) => {
  switch(action.type) {
    case "FETCH_USERS_START":
      return {...state, fetching: true};
    case "FETCH_USERS_ERROR":
      return {...state, fetching: false, error: action.payload};
    case "RECEIVE_USERS":
      return {...state, fetching: false, fetched: true, users: action.payload};
  }
  return state;
}

const userReducer = (state = {}, action) => {
  switch(action.type) {
    case "CHANGE_NAME":
      state = { ...state, name: action.payload };
      break;
    case "CHANGE_AGE":
      state = { ...state, age: action.payload };
      break;
  }
  return state;
}

const tweetsReducer = (state = {}, action) => {
  switch(action.type) {
    case "ADD_TWEET":
      state = { ...state, id: Date.now(), text: action.payload };
      break;
    case "ERROR":
      throw new Error("It's error!!!!");
  }
  return state;
}

const reducers = combineReducers({
  test: testReducer,
  user: userReducer,
  tweets: tweetsReducer
});

const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch(e) {
    console.log("Error was occured", e);
  }
}

const middleware = applyMiddleware(thunk, createLogger(), error);
const store = createStore(reducers, {}, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch((dispatch) => {
  dispatch({ type: "FETCH_USERS_START" });
  axios.get("http://localhost:18080").then((response) => {
    dispatch({ type: "RECEIVE_USERS", payload: response.data });
  }).catch((err) => {
    dispatch({ type: "FETCH_USERS_ERROR", payload: err });
  });
});

