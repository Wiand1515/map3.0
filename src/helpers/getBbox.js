export const getBbox = (sortedPoints, pointIdentifier, searchResult) => {
    const latitude = [
      sortedPoints.features[pointIdentifier].geometry.coordinates[1],
      searchResult.coordinates[1],
    ];
  
    const longitude = [
      sortedPoints.features[pointIdentifier].geometry.coordinates[0],
      searchResult.coordinates[0],
    ];
  
    const sortLongitude = longitude.sort((longitudeA, longitudeB) => {
      if (longitudeA > longitudeB) return 1;
  
      if (longitudeA.distance < longitudeB.distance) return -1;
  
      return 0;
    });
  
    const sortLatitude = latitude.sort((latitudeA, latitudeB) => {
      if (latitudeA > latitudeB) return 1;
  
      if (latitudeA.distance < latitudeB.distance) return -1;
  
      return 0;
    });
  
    return [
      [sortLongitude[0], sortLatitude[0]],
      [sortLongitude[1], sortLatitude[1]],
    ];
  };