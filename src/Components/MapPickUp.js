import mapboxGl, { Map, Marker } from "mapbox-gl";
import React, { useContext, useEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { createPopUp } from "../helpers";
import ClusterIcon from "../assets/map-icons/ClusterIcon.png";
import PinflagIcon from "../assets/map-icons/PinflagIcon.png";
import PinflagMallPlazaIcon from "../assets/map-icons/PinflagMallplazaIcon.png";
import { Loading } from "./Loading";
import { BtnMyLocation } from "./BtnMyLocation";

mapboxGl.accessToken =
  "pk.eyJ1IjoicGlubWFwdmV1cyIsImEiOiJjbDBsZ2IyaTMwcWJ3M2tuZXh1c3V3cjFsIn0.yuAEHzW6Ns9m5zBD5A5LtA";

function MapPickUp({ toggle }) {
  const { setMap } = useContext(MapContext);
  const { isLoading, userLocation, geojson } = useContext(PlacesContext);

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      map.current = new Map({
        container: mapContainer.current,
        style: "mapbox://styles/pinmapveus/cl0lgcto8000r15r0m5p6hpa6",
        center: userLocation,
        zoom: 15,
      });
      setMap(map.current);
      /* ---------------------------------- */
      /*    MAP ICONS AND ICON TRIGGERS     */
      /* ---------------------------------  */

      let marker = new Marker({
        draggable: false,
        color: "#33cccc",
      });

      marker.setLngLat(userLocation).addTo(map.current);

      // Load map icon at map
      map.current.loadImage(ClusterIcon, (error, image) => {
        if (error) throw error;
        map.current.addImage("cluster_icon", image);
      });
      // Load map icon at map
      map.current.loadImage(PinflagIcon, (error, image) => {
        if (error) throw error;
        map.current.addImage("pinpoint_icon", image);
      });
      // Load map icon at map
      map.current.loadImage(PinflagMallPlazaIcon, (error, image) => {
        if (error) throw error;
        map.current.addImage("mallplazaPoint_icon", image);
      });
      // Icon and Clusters Trigger
      map.current.on("load", () => {
        map.current.addSource("pinpoints", {
          type: "geojson",
          data: geojson,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        //Add number to cluster
        map.current.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "pinpoints",
          filter: ["has", "point_count"],
          layout: {
            "icon-image": "cluster_icon",
            "icon-size": 1,
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
        });

        // Add custom icon based on company
        map.current.addLayer({
          id: "unclustered-pinpoint",
          type: "symbol",
          source: "pinpoints",
          filter: ["!", ["has", "point_count"]],
          layout: {
            "icon-image": [
              "match",
              ["get", "company"],
              ["mallplaza"],
              "mallplazaPoint_icon",
              "pinpoint_icon",
            ],
            "icon-size": 1,
          },
          paint: {
            "icon-color": "#33cccc",
          },
        });

        // Unclusted Point Triggers
        map.current.on("click", "unclustered-pinpoint", (e) => {
          const feature = e.features[0];

          map.current.flyTo({
            zoom: 15,
            center: feature.geometry.coordinates,
          });

          toggle(feature.properties.id);

          createPopUp(feature.geometry.coordinates, map.current, {
            title: feature.properties.title,
            distance: feature.properties.distance,
            price: feature.properties.price,
          });
        });

        //Cluster explore on click
        map.current.on("click", "cluster-count", (event) => {
          const features = map.current.queryRenderedFeatures(event.point, {
            layers: ["cluster-count"],
          });

          const clusterId = features[0].properties.cluster_id;
          map.current
            .getSource("pinpoints")
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;

              map.current.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });

        //Cluster && pinpoint Pointer Behav
        map.current.on("mouseenter", "cluster-count", () => {
          map.current.getCanvas().style.cursor = "pointer";
        });
        map.current.on("mouseleave", "cluster-count", () => {
          map.current.getCanvas().style.cursor = "";
        });

        map.current.on("mouseenter", "unclustered-pinpoint", () => {
          map.current.getCanvas().style.cursor = "pointer";
        });
        map.current.on("mouseleave", "unclustered-pinpoint", () => {
          map.current.getCanvas().style.cursor = "";
        });
      });
      /* ---------------------------------- */
      /* END MAP ICONS AND ICON TRIGGERS    */
      /* ---------------------------------  */
    }
  }, [setMap, geojson, userLocation, isLoading, toggle]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        ref={mapContainer}
        style={{
          minHeight: "500px",
          position: "relative",
          height: "100%",
          width: "100%",
          borderRadius: "1rem",
        }}
      />
      <BtnMyLocation toggle={toggle} />
    </>
  );
}

export default MapPickUp;
