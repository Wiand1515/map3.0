import { MapContext } from "../context";
import React, { useContext, useEffect, useRef, useState } from "react";
import { createPopUp } from "../helpers";

function ListItem({
  title,
  id,
  distance,
  coords,
  address,
  district,
  region,
  index,
}) {
  const { mapCnC, setActiveItem } = useContext(MapContext);

  const myRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [distanceConverted, setDistanceConverted] = useState(null);
  // const [isFirstElement, setIsFirstElement] = useState(null);
  const conditionalClassName = isOpen ? "open" : "close";

  const distanceConverter = (distance) => {
    let roundedDistance = Math.round(distance * 1000);

    if (roundedDistance > 1000) {
      setDistanceConverted(`${Math.round(distance * 100) / 100} Km`);
    } else {
      setDistanceConverted(`${roundedDistance} m`);
    }
  };

  useEffect(() => {
    distanceConverter(distance);
  }, [distance]);

  const popUpOptions = {
    title,
    distance: distanceConverted,
  };

  const handleClick = () => {
    if (!myRef.current) return;
    setActiveItem();

    setIsOpen(!isOpen);

    mapCnC.flyTo({
      zoom: 15,
      center: coords,
    });

    createPopUp(coords, mapCnC, popUpOptions);
  };

  return (
    <div>
      <div
        className={`list-item py-1 ${isOpen && "active-item"}`}
        onClick={() => handleClick()}
        style={{ cursor: "pointer" }}
        id={id}
        ref={myRef}
      >
        <div className="d-flex justify-content-between my-1">
          <p className="h5 active-title">{title}</p>
          {isOpen && (
            <button className="btn btn-outline-primary btn-restrictions">
              {distanceConverted}
            </button>
          )}
        </div>
          {!isOpen && 
            <p className="text-muted">{district}, Chile</p>
          }

        <div id={`item-${id}`} className={`${conditionalClassName}`}>
          {isOpen && (
            <>
              <div>
                {address}, {district}
              </div>
              <div>{region}, Chile.</div>
              <div className="my-3">
                <div className="text-muted">
                  Lunes a Viernes - 07:00 a 16:00
                </div>
                <div className="text-muted">Sábado - 12:00 a 19:30</div>
                <div className="text-muted">Domingo - Cerrado</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListItem;
