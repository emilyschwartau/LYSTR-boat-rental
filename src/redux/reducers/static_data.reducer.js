import { combineReducers } from 'redux';

const types = (state = [], action) => {
  switch (action.type) {
    case 'SET_TYPES':
      return action.payload;
    default:
      return state;
  }
};

const features = (state = [], action) => {
  switch (action.type) {
    case 'SET_FEATURES':
      return action.payload;
    default:
      return state;
  }
};

const cities = (state = [], action) => {
  switch (action.type) {
    case 'SET_CITIES':
      // formats data from cities table to list of labels as strings
      // to use in auto complete
      const cityData = action.payload;
      const cityLabels = [];
      const cityZips = [];

      function removeKeys(obj) {
        let keyArr = [];
        let concatArr = [];
        for (let k of obj) {
          // remove keys from object
          keyArr.push(Object.values(k));
        }
        // concat all new arrays with no keys to one array
        for (let i of keyArr) {
          concatArr = concatArr.concat(i);
        }
        // check all instances and remove duplicates
        const removeDuplicates = concatArr.reduce(function (a, b) {
          if (a.indexOf(b) === -1) {
            a.push(b);
          }
          return a.sort();
        }, []);

        for (let i of removeDuplicates) {
          if (typeof i === 'number') {
            // checks for number adds to array of zip codes with key of label
            cityZips.push({ label: i.toString() });
          } else {
            // checks for string adds to array of city names with key of label
            // Updates all capitalized city name to only first uppercase
            cityLabels.push({ label: i[0] + i.slice(1).toLowerCase() });
          }
        }
      }

      removeKeys(cityData);
      // add back in array of zip codes at end of array
      // this sorts zips to bottom for auto complete
      return [...cityLabels.concat(cityZips)];
    default:
      return state;
  }
};

export default combineReducers({
  cities,
  types,
  features,
});
