import styled from "styled-components";
import React, { useEffect, useState } from "react";
import pinpointIcon from "../assets/map-icons/PinflagIcon.png";
import { distanceConverter } from "../helpers";

export const PopUp = ({ options }) => {
  const [distanceConverted, setDistanceConverted] = useState(null);

  useEffect(() => {
    distanceConverter(options.distance, setDistanceConverted);
  }, [options.distance]);

  return (
    <PopUpContainer>
      <div className="image-icon-container">
        <img src={pinpointIcon} alt="brand-icon" className="brand-icon-item" />
      </div>
      <div className="row-display">
        <div className="info-txt-container">
          <h2 className="pointName-info-txt">{options.title}</h2>
          <span className="distance-info-txt text-muted">
            {distanceConverted}
          </span>
        </div>
        <div className="pricing-delivery-container">
          <p className="pricing-txt">${options.price}</p>
        </div>
      </div>
    </PopUpContainer>
  );
};

const PopUpContainer = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;

  .image-icon-container {
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .image-icon-container img {
    width: 5rem;
    padding: 0.2rem 0;
  }
  .row-display {
    display: flex;
  }

  .info-txt-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .pointName-info-txt {
    font-size: 1rem;
    padding: 0.3rem;
    font-weight: bold;
    color: #0275d8;
    position: relative;
  }

  .distance-info-txt {
    font-size: 0.9rem;
    padding-left: 0.3rem;
  }

  .pricing-delivery-container {
    align-self: flex-end;
    display: inline;
  }

  .pricing-txt {
    color: "black";
    font-size: 1.5rem;
    font-weight: bold;
    position: relative;
  }
`;
