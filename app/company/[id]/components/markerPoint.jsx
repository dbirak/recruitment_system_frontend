"use client";

import { useState } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";

const MarkerPoint = (props) => {
  const [position, setPosition] = useState([
    { lat: props.position[0], lng: props.position[1] },
  ]);

  var icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
  });

  return (
    <div>
      {position.map((pos, id) => (
        <Marker
          key={`marker-${id}`}
          position={pos}
          draggable={false}
          icon={icon}
          eventHandlers={{
            click: (e) => {},
          }}
        ></Marker>
      ))}
    </div>
  );
};

export default MarkerPoint;
