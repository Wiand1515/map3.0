import { Popup } from "mapbox-gl";
import ReactDOM from "react-dom";
import { PopUp } from "../Components/PopUp";

export const createPopUp = (currentPoint, map, options) => {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  /** Check if there is already a popup on the map and if so, remove it */
  if (popUps[0]) popUps[0].remove();

  const popUpNode = document.createElement("div");
  ReactDOM.render(<PopUp options={options} />, popUpNode);

  new Popup({ closeOnClick: true, offset: 15 })
    .setLngLat(currentPoint)
    .setDOMContent(popUpNode)
    .addTo(map);
};
