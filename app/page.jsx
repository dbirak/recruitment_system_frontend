"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import NavbarMain from "./components/navbarMain";
import { TypeAnimation } from "react-type-animation";
import Hero from "./components/hero";
import MainContainer from "@/components/layouts/mainContainer";
import Title from "./company/components/title";
import AnnouncementMainItem from "./components/announcementMainItem";
import { useQuery } from "react-query";
import { useState } from "react";
import { axiosBase } from "@/utils/api/axios";
import Loading from "@/components/loadings/loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [announcements, setAnnouncements] = useState([]);

  const getPopularAnnouncements = useQuery("getPopularAnnouncements", () => {
    axiosBase
      .get("/announcement/popular")
      .then((res) => {
        setAnnouncements(res.data);
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          //localStorage.clear();
          //router.push("/");
        } else {
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  return (
    <div>
      <ProtectRoute role="null">
        <NavbarMain />
        <Hero />
        <MainContainer>
          <Title name="Najnowsze ogłoszenia" />

          {isLoading ? (
            <Loading />
          ) : announcements.length === 0 ? (
            <p className="block w-full mx-3 text-center">Brak ogłoszeń!</p>
          ) : (
            <div>
              <div className="lg:flex justify-around flex-wrap block">
                {announcements.map((item, index) => {
                  return (
                    <AnnouncementMainItem key={index} announcement={item} />
                  );
                })}
              </div>

              <button className="btn btn-neutral block mx-auto mt-6">
                Pokaż więcej
              </button>
            </div>
          )}
        </MainContainer>
      </ProtectRoute>
    </div>
  );
}
