import { combineReducers } from 'redux';

const newVehicleInitial = {
  title: '',
  type: '',
  make: '',
  model: '',
  year: '',
  length: '',
  capacity: '',
  horsepower: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  description: '',
  cabins: '',
  heads: '',
  dailyRate: '',
  features: [],
  photos: [],
  availability: [],
};

const vehicleFormInputs = (state = newVehicleInitial, action) => {
  switch (action.type) {
    case 'SET_VEHICLE_FORM_INPUTS':
      if (action.payload.features === null) {
        action.payload.features = [];
      } else if (action.payload.availability === null) {
        action.payload.availability = [];
      }
      return action.payload;
    case 'VEHICLE_FORM_ONCHANGE':
      return { ...state, [action.payload.property]: action.payload.value };
    case 'ADD_FEATURE':
      state.features.push(action.payload);
      return { ...state };
    case 'REMOVE_FEATURE':
      const filteredFeatures = state.features.filter(
        (feature) => feature !== action.payload
      );
      return { ...state, features: filteredFeatures };
    case 'CLEAR_VEHICLE_FORM':
      return newVehicleInitial;
    default:
      return state;
  }
};

const photoGalleryInput = (state = { photos: [] }, action) => {
  switch (action.type) {
    case 'ADD_PHOTOS':
      return { photos: action.payload };
    case 'CLEAR_PHOTO_GALLERY_INPUT':
      return { photos: [] };
    default:
      return state;
  }
};

const photos = (state = [], action) => {
  switch (action.type) {
    case 'SET_PHOTOS':
      return action.payload;
    default:
      return state;
  }
};

const listedVehiclesByOwner = (state = [], action) => {
  switch (action.type) {
    case `SET_LISTED_VEHICLES_BY_OWNER`:
      return action.payload;
    default:
      return state;
  }
};

const vehicleInfo = (state = [], action) => {
  switch (action.type) {
    case 'SET_VEHICLE_INFO':
      return action.payload;
    default:
      return state;
  }
};

const allReservationsById = (state = [], action) => {
  switch (action.type) {
    case `SET_ALL_RESERVATIONS_BY_ID`:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  vehicleFormInputs,
  photos,
  listedVehiclesByOwner,
  photoGalleryInput,
  vehicleInfo,
  allReservationsById,
});
