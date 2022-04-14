import "./App.css";
import { MapProvider, PlacesProvider } from "./context";
import MapPickUpScreen from "./screens/MapPickUpScreen";

function App() {
  return (
    <PlacesProvider>
      <MapProvider>
        <MapPickUpScreen />
      </MapProvider>
    </PlacesProvider>
  );
}

export default App;
