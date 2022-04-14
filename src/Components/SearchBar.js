import { useContext, useRef } from "react";
import { PlacesContext } from "../context/places/PlacesContext";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
  const debounceRef = useRef();

  const { searchPlacesByTerm } = useContext(PlacesContext);

  const onQueryChanged = (event) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(event.target.value);
    }, 350);
  };

  return (
    <div className="search-container" style={{position: "relative"}}>
      <input
        type="text"
        className="form-control searchBar-container"
        placeholder="Buscar lugar..."
        onChange={(event) => onQueryChanged(event)}
      />

      <SearchResults />
    </div>
  );
};
