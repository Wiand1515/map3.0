export const userReducer = (state, action) => {
  switch (action.type) {
    case "setUserAddressData":
      return {
        ...state,
        userAddressData: action.payload,
      };

    case "cleanUserAddressData":
      return {
        ...state,
        userAddressData: {},
      };

    default:
      return state;
  }
};
