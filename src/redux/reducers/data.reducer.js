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

     
      const cities = [...state]
      console.log('in city reducer:', cities)
      const cityLabels = []

      function removeKeys(obj) {

        let keyArr = [];
        let concatArr = [];
        for (let k of obj) {
          if (typeof (k) === 'number') {
            // convert zip codes to string
            keyArr.push(Object.values(k).toString())
          } else {
            // add each item to a new array without keys
            keyArr.push(Object.values(k))
          }
        }
        // concat all new arrays with no keys to one array
        for (let i of keyArr) {
          concatArr = concatArr.concat(i)
        }

        // check all instances and remove duplicates
        const removeDuplicates = concatArr.reduce(function (a, b) {
          if (a.indexOf(b) === -1) {
            a.push(b)
          }
          return a
        }, [])


        for (let i of removeDuplicates) {
          cityLabels.push({ "label": i })
        }

        return cityLabels
      }
      removeKeys(cities)
      // console.log('cities reducer:', cityLabels)


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

