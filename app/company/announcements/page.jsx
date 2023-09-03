"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import { IoMdAddCircle } from "react-icons/io";
import Navbar from "../components/navbar";
import CompanyContainer from "@/components/layouts/companyContainer";
import Title from "../components/title";
import { useRouter } from "next/navigation";
import { axiosWithBearer } from "@/utils/api/axios";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "@/components/loadings/loading";
import { useState } from "react";
import AnnouncementItem from "./components/announcementItem";

const announcementsPage = () => {
  const router = useRouter();

  const [announcements, setAnnouncements] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const addAnnouncementNavigate = () => {
    router.push("/company/announcements/add");
  };

  const getCompanyAnnouncement = useQuery("getCompanyAnnouncement", () => {
    axiosWithBearer
      .get("/company/announcement?page=" + currentPage)
      .then((res) => {
        console.log(res.data.meta.last_page);
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
      <ProtectRoute role="company">
        <Navbar site="announcements">
          <CompanyContainer>
            <Title name="Twoje ogłoszenia" />
            <button
              onClick={addAnnouncementNavigate}
              className="btn btn-primary w-full p-3 mb-5"
            >
              <span className="text-[20px]">
                <IoMdAddCircle />
              </span>
              Dodaj nowe ogłoszenie
            </button>

            <InfiniteScroll
              className="block overflow-visible w-full"
              style={{ overflow: "visible !important" }}
              dataLength={announcements.length}
              next={() => getCompanyAnnouncement.refetch()}
              hasMore={hasMore}
              loader={<Loading />}
            >
              {announcements.map((item, index) => {
                return <AnnouncementItem key={index} announcement={item} />;
              })}
            </InfiniteScroll>
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>
    </div>
  );
};

export default announcementsPage;
