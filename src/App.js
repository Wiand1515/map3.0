import "./App.css";
import { MapProvider, PlacesProvider } from "./context";
// import MapPickUpScreen from "./screens/MapPickUpScreen";
import MapSelection from "./screens/MapSelection";

function App() {
  

  return (
    <PlacesProvider>
      <MapProvider>
        {/* <MapPickUpScreen /> */}
        <MapSelection />
      </MapProvider>
    </PlacesProvider>
  );
}

export default App;
