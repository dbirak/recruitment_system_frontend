"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import MarkerPoint from "./markerPoint";
import L from "leaflet";
import { useState } from "react";

import "leaflet/dist/leaflet.css";
import { FaAt, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { AiFillFileText } from "react-icons/ai";
import { adressItemEdit } from "./adressItemEdit";

const Adresses = (props) => {
  const [position, setPosition] = useState([
    props.profile.localization.lat === null
      ? 52.25490829401159
      : props.profile.localization.lat,
    props.profile.localization.lng === null
      ? 21.014514614981326
      : props.profile.localization.lng,
  ]);

  const editItem = (value, place) => {
    if (place === "localization") props.editItem(value, place);
    else props.showEditItemModal(adressItemEdit(value, place));
  };

  return (
    <div className="block md:flex">
      <div className="w-full md:w-[34%]">
        <h1 className="font-semibold text-center text-[20px] mb-8">Kontakt</h1>

        <div className="flex mb-10">
          <div className="text-[20px] w-[24px] h-[24px] grid items-center me-2">
            <FaMapMarkerAlt />
          </div>
          <div>
            <div
              className="tooltip tooltip-bottom tooltip-base-100"
              data-tip="Edytuj ulicę"
            >
              <div
                onClick={() => editItem(props.profile.street, "street")}
                className="hover:brightness-[0.25] hover:cursor-pointer duration-150 ease-in-out"
              >
                {props.profile.street}
              </div>
            </div>
            <div>
              <div
                className="tooltip tooltip-bottom tooltip-base-100"
                data-tip="Edytuj kod pocztowy"
              >
                <span
                  onClick={() => editItem(props.profile.post_code, "post_code")}
                  className="hover:brightness-[0.25] hover:cursor-pointer duration-150 ease-in-out"
                >
                  {props.profile.post_code}
                </span>
              </div>
              ,{" "}
              <div
                className="tooltip tooltip-bottom tooltip-base-100"
                data-tip="Edytuj miasto"
              >
                <span
                  onClick={() => editItem(props.profile.city, "city")}
                  className="hover:brightness-[0.25] hover:cursor-pointer duration-150 ease-in-out"
                >
                  {props.profile.city}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-10">
          <div className="text-[20px] w-[24px] h-[24px] grid items-center me-2">
            <FaPhoneAlt />
          </div>
          <div>
            <div
              className="tooltip tooltip-bottom tooltip-base-100"
              data-tip="Edytuj numer telefonu"
            >
              <div
                onClick={() =>
                  editItem(props.profile.phone_number, "phone_number")
                }
                className="hover:brightness-[0.25] hover:cursor-pointer duration-150 ease-in-out"
              >
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
        </div>

        <div className="flex mb-10">
          <div className="text-[20px] w-[24px] h-[24px] grid items-center me-2">
            <FaAt />
          </div>
          <div>
            <div
              className="tooltip tooltip-bottom tooltip-base-100"
              data-tip="Edytuj e-mail kontaktowy"
            >
              <div
                onClick={() =>
                  editItem(props.profile.contact_email, "contact_email")
                }
                className="hover:brightness-[0.25] hover:cursor-pointer duration-150 ease-in-out"
              >
                {props.profile.contact_email === null
                  ? "-"
                  : props.profile.contact_email}
              </div>
            </div>
          </div>
        </div>

        <div className="flex mb-10">
          <div className="text-[20px] w-[24px] h-[24px] grid items-center me-2">
            <AiFillFileText />
          </div>
          <div className="block">
            <div
              className="block tooltip tooltip-bottom tooltip-base-100"
              data-tip="Edytuj KRS"
            >
              <div
                onClick={() => editItem(props.profile.krs, "krs")}
                className="hover:brightness-[0.25] hover:cursor-pointer duration-150 ease-in-out text-left"
              >
                KRS:{" "}
                {props.profile.krs === null || props.profile.krs === ""
                  ? "-"
                  : props.profile.krs}
              </div>
            </div>
            <div
              className="block text-left tooltip tooltip-bottom tooltip-base-100"
              data-tip="Edytuj NIP"
            >
              <div
                onClick={() => editItem(props.profile.nip, "nip")}
                className="hover:brightness-[0.25] hover:cursor-pointer duration-150 ease-in-out text-left"
              >
                NIP: {props.profile.nip}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[366px] overflow-hidden bg-red-500">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerPoint position={position} editItem={editItem} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Adresses;
