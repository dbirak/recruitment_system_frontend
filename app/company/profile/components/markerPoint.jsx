"useClient";

import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

const MarkerPoint = (props) => {
  const [position, setPosition] = useState([
    { lat: props.position[0], lng: props.position[1] },
  ]);

  useMapEvents({
    click: (e) => {
      setPosition([e.latlng]);
      props.editItem(e.latlng, "localization");
    },
  });

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
            click: (e) => {
              console.log(e.latlng);
            },
          }}
        ></Marker>
      ))}
    </div>
  );
};

export default MarkerPoint;
