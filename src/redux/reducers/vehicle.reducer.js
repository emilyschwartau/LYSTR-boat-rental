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

const newVehicleInput = (state = { type: "" }, action) => {
  switch (action.type) {
    case "ADD_VEHICLE_ONCHANGE":
      return { ...state, [action.payload.property]: action.payload.value };
    default:
      return state;
  }
};

export default combineReducers({
  types,
  newVehicleInput,
  features,
});
