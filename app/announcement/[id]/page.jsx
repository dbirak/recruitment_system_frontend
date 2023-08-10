"use client";

import Navbar from "@/app/components/navbar";
import MainContainer from "@/components/layouts/mainContainer";
import Loading from "@/components/loadings/loading";
import { axiosWithBearerOrBase } from "@/utils/api/axios";
import ProtectRoute from "@/utils/middleware/protectRoute";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "react-query";
import { AiFillFileText } from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {
  MdAccessTimeFilled,
  MdLocationOn,
  MdOutlineTimelapse,
  MdWork,
} from "react-icons/md";
import moment from "moment";
import { TbPointFilled } from "react-icons/tb";

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
          ? ""
          : "/announcement/" + id
      )
      .then((res) => {
        setAnnouncement(res.data);
        console.log(res.data);
        var a = moment(res.data.expiry_date);
        var b = moment();

        setLeftDaysNumber(a.diff(b, "days") + 1);
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          localStorage.clear();
          router.push("/");
        } else if (error.response.status == 404) {
          router.push("/");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
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
                    <img src="/avatars/company.png" alt="" />
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

                  <div className="flex justify-between mx-7 ">
                    <div className="w-1/2">
                      <div className="text-right flex my-7">
                        <div className="grid items center text-[35px] me-5">
                          <MdLocationOn />
                        </div>
                        <div className="text-[16px] font-semibold grid items-center truncate overflow-hidden">
                          {announcement.company.street.charAt(0).toUpperCase() +
                            announcement.company.street.slice(1).toLowerCase() +
                            ", " +
                            announcement.company.city.charAt(0).toUpperCase() +
                            announcement.company.city.slice(1).toLowerCase() +
                            ", " +
                            announcement.company.province.province_name
                              .charAt(0)
                              .toUpperCase() +
                            announcement.company.province.province_name
                              .slice(1)
                              .toLowerCase()}
                        </div>
                      </div>

                      <div className="text-right flex my-7">
                        <div className="grid items center text-[35px] me-5">
                          <BiSolidCategoryAlt />
                        </div>
                        <div className="text-[16px] font-semibold grid items-center">
                          {announcement.category.category_name}
                        </div>
                      </div>

                      <div className="text-right flex my-7">
                        <div className="grid items center text-[35px] me-5">
                          <AiFillFileText />
                        </div>
                        <div className="text-[16px] font-semibold grid items-center">
                          {announcement.contract.contract_name}
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="text-right flex my-7">
                        <div className="grid items center text-[35px] me-5">
                          <MdOutlineTimelapse />
                        </div>
                        <div className="text-[16px] font-semibold grid items-center">
                          Dostępne jeszcze: {leftDaysNumber}{" "}
                          {leftDaysNumber === 1 ? "dzień" : "dni"} - do{" "}
                          {moment
                            .utc(announcement.expiry_date)
                            .format("DD.MM.YYYY")}
                        </div>
                      </div>

                      <div className="text-right flex my-7">
                        <div className="grid items center text-[35px] me-5">
                          <MdAccessTimeFilled />
                        </div>
                        <div className="text-[16px] font-semibold grid items-center">
                          {announcement.work_time.work_time_name}
                        </div>
                      </div>

                      <div className="text-right flex my-7">
                        <div className="grid items center text-[35px] me-5">
                          <MdWork />
                        </div>
                        <div className="text-[16px] font-semibold grid items-center">
                          {announcement.work_type.work_type_name}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] mx-auto py-3 px-4 mt-8 mb-4">
                <div className="flex justify-between">
                  <div className="font-bold text-[20px] grid items-center">
                    Nasze wymagania:
                  </div>
                </div>

                {announcement.requirements.map((item, index) => (
                  <div className="flex justify-between my-4" key={index}>
                    <div className="flex justify-between text-[15px]">
                      <span className="grid items-center me-3 ms-6 text-[16px]">
                        <TbPointFilled />
                      </span>
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] mx-auto py-3 px-4 mt-8 mb-4">
                <div className="flex justify-between">
                  <div className="font-bold text-[20px] grid items-center">
                    Twoje obowiązki:
                  </div>
                </div>

                {announcement.duties.map((item, index) => (
                  <div className="flex justify-between my-4" key={index}>
                    <div className="flex justify-between text-[15px]">
                      <span className="grid items-center me-3 ms-6 text-[16px]">
                        <TbPointFilled />
                      </span>
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] mx-auto py-3 px-4 mt-8 mb-4">
                <div className="flex justify-between">
                  <div className="font-bold text-[20px] grid items-center">
                    Co oferujemy:
                  </div>
                </div>

                {announcement.offer.map((item, index) => (
                  <div className="flex justify-between my-4" key={index}>
                    <div className="flex justify-between text-[15px]">
                      <span className="grid items-center me-3 ms-6 text-[16px]">
                        <TbPointFilled />
                      </span>
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative bg-base-100 shadow-lg rounded-lg z-20 max-w-[1200px] text-center mx-auto py-5 px-4 mt-8 mb-4">
                <button className="btn btn-neutral w-full mx-auto">
                  <div className="text-[20px]">
                    <AiFillFileText />
                  </div>
                  Aplikuj teraz
                </button>
              </div>
            </div>
          )}
        </ProtectRoute>
      </div>
    </div>
  );
}

export default AnnouncementPage;
