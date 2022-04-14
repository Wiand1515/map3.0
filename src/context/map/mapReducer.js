export const mapReducer = (state, action) => {
  switch (action.type) {
    case "setMap":
      return {
        ...state,
        mapCnC: action.payload,
      };

    case "setUnactiveItems":
      return {
        ...state,
        activeItem: false
      }

    default:
      return state;
  }
};
