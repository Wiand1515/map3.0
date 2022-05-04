import { useContext, useRef, useState } from "react";
import { PlacesContext, MapContext } from "../context";
import { SearchResults } from "./SearchResults";
import { FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

export const SearchBar = () => {
  const debounceRef = useRef();
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const { searchPlacesByTerm, cleanPlaces, places, geojson, sortGeojson } =
    useContext(PlacesContext);
  const { mapCnC, createPlaceMarker } = useContext(MapContext);

  const onQueryChanged = (event) => {
    setValue(event.target.value);
    setShow(true);

    if (event.target.value === "") {
      cleanPlaces();
      setShow(false);
      setValue("");
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(event.target.value);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (places.length < 1) return;

    console.log(places[0]);


    mapCnC.flyTo({
      zoom: 16,
      center: places[0].geometry.coordinates,
    });

    console.log(places[0].geometry.coordinates)

    createPlaceMarker(places[0], mapCnC);

    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    sortGeojson(geojson, places[0].geometry.coordinates);

    cleanPlaces();
  };

  const handleEraseValue = () => {
    setValue("");
    cleanPlaces();
    setShow(false);
  };

  return (
    <div className="search-container" style={{ position: "relative" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control searchBar-container shadow-none"
          placeholder="Buscar lugar..."
          onChange={(event) => onQueryChanged(event)}
          value={value}
        />
      </form>

      <span
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          top: 0,
          height: "100%",
          right: 10,
          zIndex: 99999,
          cursor: "pointer",
        }}
        className={`${show ? "active" : "unactive"}`}
        onClick={handleEraseValue}
      >
        <GrClose />
      </span>

      <span
        className="searchItem"
        style={{
          position: "absolute",
          top: 0,
          left: 10,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <FaSearch />
      </span>

      <SearchResults />
    </div>
  );
};
