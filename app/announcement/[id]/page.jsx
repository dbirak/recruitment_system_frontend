"use client";

import Navbar from "@/app/components/navbar";
import { axiosWithBearerOrBase } from "@/utils/api/axios";
import ProtectRoute from "@/utils/middleware/protectRoute";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";
import moment from "moment";
import AdditionalInformatio from "./components/AdditionalInformation";
import AnnouncementInformation from "./components/AnnouncementInformation";
import ApplicationModule from "./components/ApplicationModule";

function AnnouncementPage(props) {
  const [announcement, setAnnouncement] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [leftDaysNumber, setLeftDaysNumber] = useState(0);

  const router = useRouter();
  const id = props.params.id;

  const getAnnouncement = useQuery("getAnnouncement", () => {
    axiosWithBearerOrBase
      .get(
        localStorage.getItem("token") || sessionStorage.getItem("token")
          ? "/user/announcement/" + id
          : "/announcement/" + id
      )
      .then((res) => {
        setAnnouncement(res.data);
        console.log(res.data);
        var a = moment(res.data.expiry_date);
        var b = moment();

        setLeftDaysNumber(a.diff(b, "days") + 1);

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
                  src="/assets/image3.jpg"
                  alt=""
                  className="object-cover w-full h-[500px]"
                />
              </div>
              <div className="relative bg-base-100 rounded-lg z-20 mt-[-100px] max-w-[1200px] mx-auto">
                <div className="shadow-lg rounded-lg pt-7 pb-3 px-5">
                  <div className="w-[200px] h-[200px] bg-base-100 p-3 rounded-lg relative mt-[-100px] shadow-lg mx-auto">
                    <img
                      className="object-cover w-full h-full"
                      src="/avatars/company.png"
                      alt=""
                    />
                  </div>
                  <div className="text-[33px] font-bold text-center mt-5 w-full">
                    {announcement.name}
                  </div>
                  <div className="text-center my-3 w-full">
                    {announcement.company.name}
                    {" - "}
                    <a className="link">zobacz profil</a>
                  </div>
                  <div className="my-14 mx-7 text-justify text-[17px]">
                    {announcement.description}
                  </div>
                  {announcement.earn_time !== null && (
                    <div className="my-14 rounded-lg shadow-lg w-fit py-4 px-4 text-center font-semibold text-[19px] mx-auto">
                      {announcement.min_earn === null
                        ? ""
                        : announcement.min_earn + " zł "}
                      {announcement.max_earn === null
                        ? ""
                        : "- " + announcement.max_earn + " zł "}
                      {announcement.earn_time === null
                        ? ""
                        : announcement.earn_time.earn_time_name}
                    </div>
                  )}

                  <AnnouncementInformation
                    announcement={announcement}
                    leftDaysNumber={leftDaysNumber}
                  />
                </div>
              </div>

              <AdditionalInformatio announcement={announcement} />

              <ApplicationModule announcement={announcement} />
            </div>
          )}
        </ProtectRoute>
      </div>
    </div>
  );
}

export default AnnouncementPage;
