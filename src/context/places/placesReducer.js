export const placesReducer = (state, action) => {
  switch (action.type) {
    case "setUserLocation":
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };

    case "setLoadingPlaces":
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      };

    case "setPlaces":
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      };

    case "setGeojson": {
      return {
        ...state,
        geojson: action.payload,
      };
    }

    case "isSortingPoints": {
      return {
        ...state,
        isSortingPoints: action.payload,
      };
    }

    case "setReverseGeocoderAddress": {
      return {
        ...state,
        isDelivery: true,
        reverseGeocodingAddress: action.payload,
      };
    }

    case "cleanReverseGeocoderAddress": {
      return {
        ...state,
        isDelivery: false,
        reverseGeocodingAddress: ''
      };
    }

    default:
      return state;
  }
};
