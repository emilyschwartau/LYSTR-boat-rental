const searchQuery = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SEARCH_LOCATION':
            return { ...state, location: action.payload };
        case 'SET_SEARCH_DATE':
            return { ...state, startDate: action.payload};
        case 'SET_SEARCH_VEHICLE_TYPE':
            return { ...state, vehicleType: action.payload };
        default:
            return state;
    }
}

export default searchQuery;