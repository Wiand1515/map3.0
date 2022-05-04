import { MapContext } from "../context";
import React, { useContext, useEffect, useRef, useState } from "react";
import { createPopUp, distanceConverter } from "../helpers";

function ListItem({ coords, id, index, isActive, options, toggle }) {
  const { mapCnC } = useContext(MapContext);

  const myRef = useRef();
  const [distanceConverted, setDistanceConverted] = useState(null);
  const conditionalClassName = isActive ? "open" : "close";

  useEffect(() => {
    if (!mapCnC) return;

    distanceConverter(options.distance, setDistanceConverted);
  }, [options.distance, mapCnC]);

  const popUpOptions = {
    title: options.title,
    distance: options.distance,
    price: options.price,
  };

  const handleClick = () => {
    if (!myRef.current) return;

    toggle(id);

    mapCnC.flyTo({
      zoom: 15,
      center: coords,
    });

    if (!isActive) {
      createPopUp(coords, mapCnC, popUpOptions);
    }
  };

  return (
    <div>
      <div
        className={`list-item py-1 ${isActive && "active-item"}`}
        onClick={() => handleClick()}
        style={{ cursor: "pointer" }}
        id={id}
        ref={myRef}
      >
        <div className="container">
          <div className="d-flex justify-content-between my-1">
            <p className="h5 active-title">{options.title}</p>
            {isActive && (
              <button className="btn btn-outline-primary btn-restrictions">
                {distanceConverted}
              </button>
            )}
          </div>
          {!isActive && <p className="text-muted">{options.district}, Chile</p>}

          <div id={`item-${id}`} className={`${conditionalClassName}`}>
            {isActive && (
              <>
                <div>
                  {options.address}, {options.district}
                </div>
                <div>{options.region}, Chile.</div>
                <div className="my-3">
                  {options.schedules &&
                    options.schedules.map((schedule, index) => (
                      <div key={`schedule-${index}`} className="text-muted">
                        {schedule}
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListItem;
