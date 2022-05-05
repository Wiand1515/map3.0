import React, { useContext, useEffect } from "react";
import { MapContext } from "../context";

function BtnAddressConfirm() {
  const { isShow } = useContext(MapContext);

  useEffect(() => {
    console.log(isShow)
  }, [isShow])
  

  return (
    <button
      className={`btn btn-primary ${isShow ? "" : "hidden"}`}
      style={{
        position: "relative",
        top: '-70px',
        left: '15px',
        width: "20rem",
        height: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Confirmar direccion
    </button>
  );
}

export default BtnAddressConfirm;
