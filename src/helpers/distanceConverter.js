export const distanceConverter = (distance, distanceConverterSetter) => {
  let roundedDistance = Math.round(distance * 1000);

  if (roundedDistance > 1000) {
    distanceConverterSetter(`${Math.round(distance * 100) / 100} Km`);
  } else {
    distanceConverterSetter(`${roundedDistance} m`);
  }
};
