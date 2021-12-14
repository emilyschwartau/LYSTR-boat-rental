const searchQuery = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SEARCH':
            return { ...state, location: action.payload.location, startDate: action.payload.startDate };
        case 'SET_SEARCH_VEHICLE_TYPE':
            return { ...state, vehicleType: action.payload };
        default:
            return state;
    }
}

export default searchQuery;