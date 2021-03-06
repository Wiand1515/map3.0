import React from "react";
import ComplementaryAddress from "../Components/ComplementaryAddress";
import MapDelivery from "../Components/MapDelivery";
import { SearchBar } from "../Components/SearchBar";
import { FaArrowLeft } from "react-icons/fa";

function MapDeliveryScreen() {
  return (
    <>
      <div
        className="container shadow p-2 my-5 bg-body "
        style={{ borderRadius: "2rem" }}
      >
        <div className="container mx-3 my-4 ">
          <div className="row mx-3 my-1 d-flex ">
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
                Ingresa tu dirección
              </span>
              <span className="fs-5 px-3 text-muted">
                Elije ayudar al medio ambiente 🌱
              </span>
            </div>
          </div>
        </div>

        <div className="row mx-3 my-3">
          <div className="col-lg-12 py-2">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-8" style={{ padding: 0 }}>
                  <SearchBar />
                </div>
                <div className="col-3 me-5" style={{ padding: 0 }}>
                  <ComplementaryAddress />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 py-2">
            <MapDelivery />
          </div>
        </div>
      </div>
    </>
  );
}

export default MapDeliveryScreen;
