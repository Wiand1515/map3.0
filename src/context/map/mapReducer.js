export const mapReducer = (state, action) => {
  switch (action.type) {
    case "setMap":
      return {
        ...state,
        mapCnC: action.payload,
      };

    case "setMarkers":
      return {
        ...state,
        markers: action.payload
      }

    default:
      return state;
  }
};
