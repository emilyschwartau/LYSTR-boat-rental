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

const newVehicleInitial = {
  title: "",
  type: "",
  make: "",
  model: "",
  year: "",
  length: "",
  capacity: "",
  horsepower: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  instructions: "",
  cabins: "",
  heads: "",
  dailyRate: "",
  features: [],
  photos: [],
  availability: [],
};

const vehicleFormInputs = (state = newVehicleInitial, action) => {
  switch (action.type) {
    case "SET_VECHICLE_FORM_INPUTS":
      return action.payload;
    case "VEHICLE_FORM_ONCHANGE":
      return { ...state, [action.payload.property]: action.payload.value };
    case "ADD_FEATURE":
      state.features.push(action.payload);
      return { ...state };
    case "REMOVE_FEATURE":
      const filteredFeatures = state.features.filter(
        (feature) => feature !== action.payload
      );
      return { ...state, features: filteredFeatures };
    case "ADD_PHOTOS":
      return { ...state, photos: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  types,
  vehicleFormInputs,
  features,
});
