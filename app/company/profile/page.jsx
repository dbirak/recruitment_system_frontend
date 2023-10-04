"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import Navbar from "../components/navbar";
import CompanyContainer from "@/components/layouts/companyContainer";
import Title from "../components/title";
import { BsCameraFill } from "react-icons/bs";
import { useState } from "react";
import CompanyName from "./components/companyName";
import EditItemModal from "./components/editItemModal";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    backgroundImage: null,
    avatar: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isShowEditItemModal, setIsShowEditItemModal] = useState(false);
  const [editItemInfo, setEditItemInfo] = useState(null);

  const setBackgroundImage = () => {
    document.getElementById("backgroundImageInput").click();
  };

  const setAvatar = () => {
    document.getElementById("avatarInput").click();
  };

  const showEditItemModal = (itemInfo) => {
    setEditItemInfo(itemInfo);
    setIsShowEditItemModal(true);
  };

  const closeEditItemModal = () => {
    setIsShowEditItemModal(false);
  };

  const editItem = (value, place) => {
    setProfile((prevState) => ({
      ...prevState,
      place: value,
    }));
    setIsShowEditItemModal(false);
  };

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="profile">
          <CompanyContainer>
            <Title name="Twój profil" />
            <div
              onClick={setBackgroundImage}
              className="relative h-[200px] z-10 mx-auto"
            >
              <input
                type="file"
                id="backgroundImageInput"
                accept="image/*" // Akceptuj tylko pliki graficzne
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file)
                    setProfile((prevState) => ({
                      ...prevState,
                      backgroundImage: URL.createObjectURL(file),
                    }));

                  console.log(profile);
                }}
              />
              <img
                src={profile.backgroundImage || "/assets/image3.jpg"}
                alt=""
                className="object-cover w-full h-[360px] block hover:brightness-[0.25] hover:cursor-pointer duration-150 ease-in-out"
              />
            </div>
            <div className="relative bg-base-100 rounded-lg z-20 mt-[100px] max-w-[1100px] mx-auto">
              <div className="shadow-lg rounded-lg pt-7 pb-3 px-5">
                <div
                  onClick={setAvatar}
                  className="w-[180px] h-[180px] bg-base-100 p-3 rounded-lg relative mt-[-100px] shadow-lg mx-auto hover:brightness-[0.25] hover:cursor-pointer duration-150 ease-in-out overflow-hidden"
                >
                  <input
                    type="file"
                    id="avatarInput"
                    accept="image/*" // Akceptuj tylko pliki graficzne
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file)
                        setProfile((prevState) => ({
                          ...prevState,
                          avatar: URL.createObjectURL(file),
                        }));

                      console.log(profile);
                    }}
                  />
                  <img
                    className="object-cover w-full h-full"
                    src={profile.avatar || "/avatars/company.png"}
                    alt=""
                  />
                </div>

                <CompanyName
                  name={"jakieś tam przedsiębiorstwo"}
                  showEditItemModal={showEditItemModal}
                />
              </div>
            </div>
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>

      {isShowEditItemModal && (
        <EditItemModal
          editItemInfo={editItemInfo}
          closeEditItemModal={closeEditItemModal}
          editItem={editItem}
        />
      )}
    </div>
  );
};

export default ProfilePage;
