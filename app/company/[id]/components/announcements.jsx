"use client";

import Loading from "@/components/loadings/loading";
import { axiosBase } from "@/utils/api/axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import AnnouncementItem from "./announcementItem";

const Announcements = (props) => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButton, setIsLoadingButton] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getAnnouncementSearch = useMutation({
    mutationFn: (data) => {
      axiosBase
        .post(
          "/company-profile/" + props.id + "/announcement?page=" + currentPage
        )
        .then((res) => {
          if (res.data.meta.last_page === res.data.meta.current_page)
            setHasMore(false);

          if (res.data.meta.current_page === 1) setAnnouncements(res.data.data);
          else {
            setAnnouncements((previousData) =>
              previousData.concat(res.data.data)
            );
          }

          setCurrentPage(res.data.meta.current_page + 1);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
          setIsLoadingButton(false);
        });
    },
  });

  useEffect(() => {
    getAnnouncementSearch.mutate();
  }, []);

  const showMoreAnnouncement = () => {
    setIsLoadingButton(true);
    getAnnouncementSearch.mutate();
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div>
            {announcements.length === 0 ? (
              <p className="text-center w-full my-6">
                Brak aktualnych ogłoszeń do wyświetlenia!
              </p>
            ) : (
              <div>
                {announcements.map((announcement, index) => (
                  <AnnouncementItem announcement={announcement} key={index} />
                ))}
              </div>
            )}
          </div>
          {hasMore &&
            (isLoadingButton ? (
              <button className="btn btn-neutral block mx-auto mt-7 btn-disabled w-[130px]">
                <span className="loading loading-spinner"></span>
              </button>
            ) : (
              <button
                onClick={showMoreAnnouncement}
                className="btn btn-neutral block mx-auto mt-7 w-[130px]"
              >
                Pokaż więcej
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
