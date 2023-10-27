"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import Navbar from "../components/navbar";
import Title from "../company/components/title";
import MainContainer from "@/components/layouts/mainContainer";
import AnnouncementItem from "./components/announcementItem";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "@/components/loadings/loading";
import { useQuery } from "react-query";
import { axiosWithBearer } from "@/utils/api/axios";

const ApplicationsPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const [announcements, setAnnouncements] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const getUserApplications = useQuery("getUserApplications", () => {
    axiosWithBearer
      .get("/user/applications?page=" + currentPage)
      .then((res) => {
        if (res.data.meta.last_page === currentPage) {
          setHasMore(false);
        } else {
          setCurrentPage((currentPage) => currentPage + 1);
        }

        if (currentPage === 1) setAnnouncements(res.data.data);
        else {
          setAnnouncements((previousData) =>
            previousData.concat(res.data.data)
          );
        }

        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status == 401 || error.response.status == 403) {
          localStorage.clear();
          router.push("/");
        } else {
          Swal.fire({
            title: "Błąd",
            text: "Nie można pobrać ogłoszeń, ponieważ wystąpił błąd podczas połączenia z serwerem!",
            icon: "error",
            color: "hsl(var(--n))",
            background: "hsl(var(--b1))",
            confirmButtonColor: "hsl(var(--er))",
            allowOutsideClick: false,
            backdrop: "#000000a6",
            confirmButtonText: "Zamknij",
          }).then((result) => {});
        }
      })
      .finally(() => {});
  });

  return (
    <div>
      <div className="relative">
        <div>
          <ProtectRoute role="user">
            <Navbar />
            <MainContainer>
              <div className="mt-5">
                <Title name="Moje aplikacje" />

                {!isLoading && announcements.length === 0 && (
                  <p className="text-center w-full my-6">
                    Brak ogłoszeń do wyświetlenia!
                  </p>
                )}

                <InfiniteScroll
                  className="block overflow-visible w-full"
                  style={{ overflow: "visible !important" }}
                  dataLength={announcements.length}
                  next={() => getUserApplications.refetch()}
                  hasMore={hasMore}
                  loader={<Loading />}
                >
                  {announcements.map((item, index) => {
                    return <AnnouncementItem key={index} announcement={item} />;
                  })}
                </InfiniteScroll>
              </div>
            </MainContainer>
          </ProtectRoute>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
