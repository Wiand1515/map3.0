import { useContext, useRef, useState } from "react";
import { PlacesContext } from "../context/places/PlacesContext";
import { SearchResults } from "./SearchResults";
import { FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

export const SearchBar = () => {
  const debounceRef = useRef();
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const { searchPlacesByTerm, cleanPlaces } = useContext(PlacesContext);

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
      searchPlacesByTerm(value);
    }, 300);
  };

  const handleEraseValue = () => {
    setValue("");
    cleanPlaces();
    setShow(false);
  };

  return (
    <div className="search-container" style={{ position: "relative" }}>
      <input
        type="text"
        className="form-control searchBar-container shadow-none"
        placeholder="Buscar lugar..."
        onChange={(event) => onQueryChanged(event)}
        value={value}
      />

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
