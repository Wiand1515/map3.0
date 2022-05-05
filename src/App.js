import "./App.css";
import { MapProvider, PlacesProvider, UserProvider } from "./context";
import MapDeliveryScreen from "./screens/MapDeliveryScreen";

function App() {
  return (
    <UserProvider>
      <PlacesProvider>
        <MapProvider>
          {/* <MapPickUpScreen /> */}

          <MapDeliveryScreen />
        </MapProvider>
      </PlacesProvider>
    </UserProvider>
  );
}

export default App;
