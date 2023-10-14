"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import MarkerPoint from "./markerPoint";
import { useState } from "react";
import { FaAt, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";

const Adresses = (props) => {
  const [position, setPosition] = useState([
    props.profile.localization.lat === null
      ? 52.25490829401159
      : props.profile.localization.lat,
    props.profile.localization.lng === null
      ? 21.014514614981326
      : props.profile.localization.lng,
  ]);

  return (
    <div className="block md:flex">
      <div className="w-full md:w-[34%]">
        <h1 className="font-semibold text-center text-[20px] mb-8">Kontakt</h1>

        <div className="flex mb-11">
          <div className="text-[20px] w-[24px] h-[24px] grid items-center me-2">
            <FaMapMarkerAlt />
          </div>
          <div>
            <div>{props.profile.street}</div>
            <div>
              <span>{props.profile.post_code}</span>,{" "}
              <span>{props.profile.city}</span>
            </div>
          </div>
        </div>

        <div className="flex mb-11">
          <div className="text-[20px] w-[24px] h-[24px] grid items-center me-2">
            <FaPhoneAlt />
          </div>
          <div>
            <div>
              {props.profile.phone_number.charAt(0) +
                props.profile.phone_number.charAt(1) +
                props.profile.phone_number.charAt(2) +
                " " +
                props.profile.phone_number.charAt(3) +
                props.profile.phone_number.charAt(4) +
                props.profile.phone_number.charAt(5) +
                " " +
                props.profile.phone_number.charAt(6) +
                props.profile.phone_number.charAt(7) +
                props.profile.phone_number.charAt(8)}
            </div>
          </div>
        </div>

        <div className="flex mb-11">
          <div className="text-[20px] w-[24px] h-[24px] grid items-center me-2">
            <FaAt />
          </div>
          <div>
            <div>
              {props.profile.contact_email === null
                ? "-"
                : props.profile.contact_email}
            </div>
          </div>
        </div>

        <div className="flex mb-11">
          <div className="text-[20px] w-[24px] h-[24px] grid items-center me-2">
            <AiFillFileText />
          </div>
          <div className="block">
            <div>KRS: {props.profile.krs}</div>
            <div
              className="block text-left tooltip tooltip-bottom tooltip-base-100"
              data-tip="Edytuj NIP"
            >
              <div>NIP: {props.profile.nip}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[366px] overflow-hidden">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerPoint position={position} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Adresses;
