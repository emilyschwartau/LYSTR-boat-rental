import { combineReducers } from "redux";

const types = (state = [], action) => {
  switch (action.type) {
    case "SET_TYPES":
      return action.payload;
    default:
      return state;
  }
};

const features = (state = [], action) => {
  switch (action.type) {
    case "SET_FEATURES":
      return action.payload;
    default:
      return state;
  }
};

const cities = (state = [], action) => {
  switch (action.type) {
    case "SET_CITIES":
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  cities,
  types,
  features,
});
