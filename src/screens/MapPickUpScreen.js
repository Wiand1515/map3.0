import React, { useContext } from "react";
import ListItem from "../Components/ListItem";
import MapPickUp from "../Components/MapPickUp";
import { SearchBar } from "../Components/SearchBar";
import { PlacesContext } from "../context";
import { FaSlidersH } from "react-icons/fa";

const MapPickUpScreen = () => {
  const { geojson } = useContext(PlacesContext);

  return (
    <>
      <div className="container shadow p-2 my-5 bg-body rounded">
        {geojson && (
          <>
            <div className="row mx-3 my-3">
              <div className="col-md-5 py-2">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10" style={{ padding: 0 }}>
                      <SearchBar />
                    </div>
                    <div
                      className="col-lg-2 d-flex justify-content-end"
                      style={{ paddingRight: 0 }}
                    >
                      <button className="btn filter-btn">
                        <FaSlidersH size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="container">
                  <div className="row">
                    <div
                      className="col-12 mt-3 shadow"
                      style={{
                        borderRadius: "1rem",
                        minHeight: "500px",
                        maxHeight: "500px",
                        overflowY: "scroll",
                      }}
                    >
                      {geojson.features.slice(0, 10).map((el, index) => {
                        return (
                          <ListItem
                            index={index}
                            id={el.properties.id}
                            key={el.properties.id}
                            geojson={geojson}
                            title={el.properties.title}
                            distance={el.properties.distance}
                            coords={el.geometry.coordinates}
                            address={el.properties.address}
                            district={el.properties.district}
                            region={el.properties.region}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-7 py-2">
                <MapPickUp />
              </div>
            </div>
          </>
        )}
      </div>
      <div id="geocoder" className="geocoder" />
    </>
  );
};

export default MapPickUpScreen;
