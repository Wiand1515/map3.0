import React, { useContext, useState } from "react";
import ListItem from "../Components/ListItem";
import MapPickUp from "../Components/MapPickUp";
import { SearchBar } from "../Components/SearchBar";
import { PlacesContext } from "../context";
import { FaSlidersH, FaArrowLeft } from "react-icons/fa";

const MapPickUpScreen = () => {
  const { geojson } = useContext(PlacesContext);
  const [activeId, setActiveId] = useState();

  return (
    <>
      <div
        className="container shadow p-2 my-5 bg-body "
        style={{ borderRadius: "2rem" }}
      >
        <div className="container mx-3 my-4">
          <div className="row mx-3 my-1">
            <div className="col-md-1 col-6 d-flex justify-content-start align-items-center">
              <div
                style={{
                  padding: "1.2rem",
                  borderRadius: "100%",
                  cursor: "pointer",
                  boxShadow: "2px 0px 10px rgba(0,0,0,0.2",
                }}
              >
                <FaArrowLeft size={30} />
              </div>
            </div>
            <div className="col-md-5 col-6 d-flex flex-column">
              <span className="fw-bold px-3" style={{ fontSize: "1.6rem" }}>
                Busca el mejor punto para ti
              </span>
              <span className="fs-5 px-3 text-muted">
                Elije ayudar al medio ambiente 🌱
              </span>
            </div>
          </div>
        </div>

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
                      className="col-12 mt-3 shadow p-0"
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
                            coords={el.geometry.coordinates}
                            options={el.properties}
                            geojson={geojson}
                            id={el.properties.id}
                            index={index}
                            isActive={el.properties.id === activeId}
                            key={el.properties.id}
                            toggle={setActiveId}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-7 py-2">
                <MapPickUp toggle={setActiveId} />
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
