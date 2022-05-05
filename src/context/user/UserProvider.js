import { useReducer } from "react";
import { UserContext } from "./UserContext";
import { userReducer } from "./userReducer";

const INITIAL_STATE = {
  userAddressData: null,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setUserAddress = (address) => {
    dispatch({ type: "setUserAddressData", payload: address  });
  };

  const cleanUserAddress = () => {
    dispatch({ type: "cleanUserAddressData" });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,

        // Methods
        setUserAddress,
        cleanUserAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
