"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import Navbar from "../components/navbar";
import CompanyContainer from "@/components/layouts/companyContainer";
import Title from "../components/title";
import { useState } from "react";
import CompanyName from "./components/companyName";
import EditItemModal from "./components/editItemModal";
import EditorToolbar, {
  modules,
  formats,
} from "./../modules/components/editorToolbar";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Adresses from "./components/adresses";
import { AiTwotoneSave } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Loading from "@/components/loadings/loading";
import { useMutation, useQuery } from "react-query";
import {
  axiosWithBearer,
  axiosWithBearerFormData,
  baseApiUrl,
} from "@/utils/api/axios";
import { useRouter } from "next/navigation";
import ConfirmModal from "./components/confirmModal";
import Loading2 from "@/components/loadings/loading2";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import ChangeDescryptionModal from "./components/changeDescryptionModal";

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [images, setImages] = useState({
    background_image: null,
    avatar: null,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSaveProfile, setIsLoadingSaveProfile] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [isShowChangeDescryptionModal, setIsShowChangeDescryptionModal] =
    useState(false);

  const [isShowEditItemModal, setIsShowEditItemModal] = useState(false);
  const [editItemInfo, setEditItemInfo] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
    control,
  } = useForm();

  const setBackgroundImage = () => {
    document.getElementById("backgroundImageInput").click();
  };

  const setAvatar = () => {
    document.getElementById("avatarInput").click();
  };

  const showEditItemModal = (itemInfo) => {
    setEditItemInfo(itemInfo);
    if (!itemInfo.lat && !itemInfo.lng) setIsShowEditItemModal(true);
  };

  const closeEditItemModal = () => {
    setIsShowEditItemModal(false);
  };

  const editItem = (value, place) => {
    console.log(value + " " + place);
    setProfile((prevState) => ({
      ...prevState,
      [place]: value,
    }));
    setIsShowEditItemModal(false);
    setIsShowChangeDescryptionModal(false);
  };

  const showConfrimModal = () => {
    setIsShowConfirmModal(true);
  };

  const closeConfrimModal = () => {
    setIsShowConfirmModal(false);
  };

  const editDescryption = () => {
    setIsShowChangeDescryptionModal(true);
  };

  const getApplicationfromStep = useQuery("getCompanyProfile", () => {
    axiosWithBearer
      .get("/company/profile")
      .then((res) => {
        setProfile(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          localStorage.clear();
          router.push("/");
        } else if (error.response.status == 404) {
          router.push("/");
        }
      })
      .finally(() => {});
  });

  const saveProfile = () => {
    setIsLoadingSaveProfile(true);
    setIsShowConfirmModal(false);

    const formData = new FormData();

    formData.append("name", profile.name);
    formData.append("localization", JSON.stringify(profile.localization));
    formData.append("description", profile.description);
    formData.append("street", profile.street);
    formData.append("post_code", profile.post_code);
    formData.append("city", profile.city);
    formData.append("phone_number", profile.phone_number);
    formData.append("contact_email", profile.contact_email);
    formData.append("krs", profile.krs);
    formData.append("nip", profile.nip);

    console.log(getValues("avatar"));
    if (getValues("avatar") && getValues("avatar")[0]) {
      formData.append("avatar", getValues("avatar")[0]);
    }

    if (getValues("background_image") && getValues("background_image")[0]) {
      formData.append("background_image", getValues("background_image")[0]);
    }

    updateCompanyProfile.mutate(formData);
  };

  const updateCompanyProfile = useMutation({
    mutationFn: (data) => {
      axiosWithBearerFormData
        .post("/company/profile", data)
        .then((res) => {
          Swal.fire({
            title: "Sukces",
            text: "Twój profil został zaaktualizowany!",
            icon: "success",
            color: "hsl(var(--n))",
            background: "hsl(var(--b1))",
            confirmButtonColor: "hsl(var(--su))",
            allowOutsideClick: false,
            backdrop: "#000000a6",
            confirmButtonText: "Zamknij",
          }).then((result) => {
            location.reload();
          });
        })
        .catch((error) => {
          if (error.response.status == 401 || error.response.status == 403) {
            localStorage.clear();
            router.push("/");
          } else if (error.response.status == 422) {
            let validateMessage;

            for (const validateField in error.response.data.errors) {
              validateMessage = error.response.data.errors[validateField][0];
              break;
            }

            Swal.fire({
              title: "Błąd",
              text: validateMessage,
              icon: "error",
              color: "hsl(var(--n))",
              background: "hsl(var(--b1))",
              confirmButtonColor: "hsl(var(--er))",
              allowOutsideClick: false,
              backdrop: "#000000a6",
              confirmButtonText: "Zamknij",
            }).then((result) => {});
          } else
            Swal.fire({
              title: "Błąd",
              text: "Wystąpił problem podczas zapisywania zmian!",
              icon: "error",
              color: "hsl(var(--n))",
              background: "hsl(var(--b1))",
              confirmButtonColor: "hsl(var(--er))",
              allowOutsideClick: false,
              backdrop: "#000000a6",
              confirmButtonText: "Zamknij",
            }).then((result) => {});
        })
        .finally(() => {
          setIsLoadingSaveProfile(false);
        });
    },
  });

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="profile">
          <CompanyContainer>
            <Title name="Twój profil" />
            {isLoading ? (
              <Loading />
            ) : (
              <div>
                <form onSubmit={handleSubmit(saveProfile)}>
                  <div
                    onClick={setBackgroundImage}
                    className="relative h-[200px] z-10 mx-auto"
                  >
                    <input
                      {...register("background_image", {
                        onChange: (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImages((prevState) => ({
                              ...prevState,
                              background_image: URL.createObjectURL(file),
                            }));
                          } else {
                            setImages((prevState) => ({
                              ...prevState,
                              background_image: null,
                            }));
                          }
                          return e.target.files;
                        },
                      })}
                      type="file"
                      id="backgroundImageInput"
                      accept="image/jpeg, image/png, image/gif, image/bmp, image/jpg"
                      style={{ display: "none" }}
                    />
                    <img
                      src={
                        images.background_image === null
                          ? profile.background_image === null
                            ? "/assets/image3.jpg"
                            : baseApiUrl +
                              "/storage/backgroundImage/" +
                              profile.background_image
                          : images.background_image
                      }
                      alt=""
                      className="object-cover w-full h-[360px] block hover:brightness-[0.25] hover:cursor-pointer duration-150 ease-in-out"
                    />
                  </div>
                </form>

                <div className="relative bg-base-100 rounded-lg z-20 mt-[100px] max-w-[1100px] mx-auto">
                  <div className="shadow-lg rounded-lg pt-7 pb-3 px-5">
                    <div
                      onClick={setAvatar}
                      className="w-[180px] h-[180px] bg-base-100 p-3 rounded-lg relative mt-[-100px] shadow-lg mx-auto hover:brightness-[0.25] hover:cursor-pointer duration-150 ease-in-out overflow-hidden"
                    >
                      <input
                        type="file"
                        id="avatarInput"
                        accept="image/jpeg, image/png, image/gif, image/bmp, image/jpg"
                        style={{ display: "none" }}
                        {...register("avatar", {
                          onChange: (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setImages((prevState) => ({
                                ...prevState,
                                avatar: URL.createObjectURL(file),
                              }));
                            } else {
                              setImages((prevState) => ({
                                ...prevState,
                                avatar: null,
                              }));
                            }
                            return e.target.files;
                          },
                        })}
                      />
                      <img
                        className="object-cover w-full h-full"
                        src={
                          images.avatar === null
                            ? profile.avatar === null
                              ? "/avatars/company.png"
                              : baseApiUrl +
                                "/storage/avatarImage/" +
                                profile.avatar
                            : images.avatar
                        }
                        alt=""
                      />
                    </div>

                    <CompanyName
                      profile={profile}
                      showEditItemModal={showEditItemModal}
                    />

                    <button
                      onClick={editDescryption}
                      type="button"
                      className="btn btn-base-100 w-full mt-8 mb-4"
                    >
                      <FaEdit /> Edytuj opis
                    </button>
                    <div className="my-5 ">
                      <ReactQuill
                        theme="bubble"
                        value={
                          profile.description === null
                            ? ""
                            : profile.description
                        }
                        readOnly
                      />
                    </div>

                    <Adresses
                      showEditItemModal={showEditItemModal}
                      editItem={editItem}
                      profile={profile}
                    />

                    <button
                      onClick={showConfrimModal}
                      type="button"
                      className="btn btn-neutral w-full mt-8 mb-4"
                    >
                      <AiTwotoneSave /> Zapisz
                    </button>
                  </div>
                </div>
              </div>
            )}
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

      {isShowConfirmModal && (
        <ConfirmModal
          closeConfrimModal={closeConfrimModal}
          saveProfile={saveProfile}
        />
      )}

      {isShowChangeDescryptionModal && (
        <ChangeDescryptionModal editItem={editItem} profile={profile} />
      )}

      {isLoadingSaveProfile && <Loading2 />}
    </div>
  );
};

export default ProfilePage;
