import { combineReducers, createStore } from "redux";

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
  }
  return state;
}

const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer
});

const store = createStore(reducers);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch({ type: "CHANGE_NAME", payload: "Maturu" });
store.dispatch({ type: "CHANGE_AGE", payload: 35 });
store.dispatch({ type: "ADD_TWEET", payload: "OMG LIKE LOL" });
store.dispatch({ type: "ADD_TWEET", payload: "I am so like seriously like totally like right now" });
