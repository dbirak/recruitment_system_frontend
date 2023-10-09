"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import Navbar from "../../components/navbar";
import { axiosBase, baseApiUrl } from "@/utils/api/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Adresses from "./components/adresses";

const CompanyProfilePage = (props) => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const id = props.params.id;

  const getCompany = useQuery("getCompany", () => {
    axiosBase
      .get("/company-profile/" + id)
      .then((res) => {
        setProfile(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          location.reload;
        } else if (error.response.status == 404) {
          //router.push("/");
        }
      })
      .finally(() => {});
  });

  return (
    <div className="relative">
      <div>
        <ProtectRoute role="user null">
          <Navbar />

          {isLoading ? (
            <div>
              <div className="h-[500px] z-10 mx-auto"></div>
              <div className="relative bg-base-100 rounded-lg z-20 mt-[-100px] max-w-[1200px] mx-auto">
                <div className="shadow-lg h-[300px] rounded-lg pt-7 pb-3 px-5">
                  <div className="w-[200px] h-[200px] bg-base-100 p-3 rounded-lg relative mt-[-100px] shadow-lg mx-auto"></div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="h-[500px] z-10 mx-auto">
                <img
                  src={
                    profile.background_image === null
                      ? "/assets/image3.jpg"
                      : baseApiUrl +
                        "/storage/backgroundImage/" +
                        profile.background_image
                  }
                  alt=""
                  className="object-cover w-full h-[500px]"
                />
              </div>
              <div className="relative bg-base-100 rounded-lg z-20 mt-[-100px] max-w-[1200px] mx-auto">
                <div className="shadow-lg rounded-lg pt-7 pb-3 px-5">
                  <div className="w-[200px] h-[200px] bg-base-100 p-3 rounded-lg relative mt-[-100px] shadow-lg mx-auto">
                    <img
                      className="object-cover w-full h-full"
                      src={
                        profile.avatar === null
                          ? "/avatars/company.png"
                          : baseApiUrl +
                            "/storage/avatarImage/" +
                            profile.avatar
                      }
                      alt=""
                    />
                  </div>
                  <div className="text-[33px] font-bold text-center mt-5 w-full">
                    {profile.name}
                  </div>
                  <div className="my-5 ">
                    <ReactQuill
                      theme="bubble"
                      value={
                        profile.description === null ? "" : profile.description
                      }
                      readOnly
                    />
                  </div>
                  <Adresses profile={profile} />
                </div>
              </div>
            </div>
          )}
        </ProtectRoute>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
