"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import CollapseItem from "./components/collapseItem";
import { axiosBase } from "@/utils/api/axios";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "react-query";
import Loading from "@/components/loadings/loading";
import EarnItem from "./components/earnItem";
import AnnouncementItem from "./components/announcementItem";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchContext } from "@/utils/contexts/SearchContext";

const SerachAnnouncementPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState(null);

  const [advancedFilterCounter, setAdvancedFilterCounter] = useState(0);
  const [isEarnChecked, setIsEarnChecked] = useState(false);

  const [announcements, setAnnouncements] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const refForLargeScreen = useRef(null);
  const refForSmallScreen = useRef(null);

  const { searchAnnouncementState, setSearchAnnouncementState } =
    useContext(SearchContext);

  const [serachInfoCurrent, setSerachInfoCurrent] = useState(
    searchAnnouncementState
  );
  const [searchInfo, setSearchInfo] = useState(searchAnnouncementState);

  const updateSearchInfo = (newValues) => {
    setSearchInfo((prevSearchInfo) => ({
      ...prevSearchInfo,
      ...newValues,
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    onChange,
    setValue,
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const styleInputCorrecSelect =
    "select w-full font-normal text-[16px] input input-bordered";
  const styleInputErrorSelect =
    styleInputCorrecSelect + " input-error text-error";

  const styleBadge =
    advancedFilterCounter === 0
      ? "rounded-full bg-primary text-center h-[24px] grid items-center w-[24px] ms-2 text-[12px] mt-[1px] hidden"
      : "rounded-full bg-primary text-center h-[24px] grid items-center w-[24px] ms-2 text-[12px] mt-[1px]";

  const [isMediumScreen, setIsMediumScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let counter = 0;

    if (searchInfo.umowa.length > 0) counter++;
    if (searchInfo.czas_pracy.length > 0) counter++;
    if (searchInfo.typ_pracy.length > 0) counter++;
    if (isEarnChecked) counter++;

    setAdvancedFilterCounter(counter);
  }, [searchInfo, isEarnChecked]);

  const getAnnouncementSearchInfo = useQuery(
    "getAnnouncementSearchInfo",
    () => {
      axiosBase
        .get("/announcement/search/info")
        .then((res) => {
          setInfo(res.data);
          setSerachInfoCurrent(searchInfo);
          getAnnouncementSearch.mutate({ data: searchInfo, pageNumber: 1 });
        })
        .catch((error) => {
          if (error.response.status == 401 || error.response.status == 403) {
            localStorage.clear();
            router.push("/");
          } else {
            Swal.fire({
              title: "Błąd",
              text: "Nie można pobrać informacji, ponieważ wystąpił błąd podczas połączenia z serwerem!",
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
    }
  );

  const getAnnouncementSearch = useMutation({
    mutationFn: (data) => {
      axiosBase
        .post("/announcement/search?page=" + data.pageNumber, data.data)
        .then((res) => {
          if (res.data.meta.last_page === data.pageNumber) {
            setHasMore(false);
          } else {
            setCurrentPage(data.pageNumber);
          }

          if (data.pageNumber === 1) setAnnouncements(res.data.data);
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
          } else if (error.response.status == 422) {
            for (const validateField in error.response.data.errors) {
            }
          } else console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const onSubmitHandler = async (data) => {
    let json = searchInfo;

    json.nazwa = data.nazwa;
    json.kategoria = parseInt(data.kategoria);

    setSearchInfo(json);
    setSerachInfoCurrent(json);
    setSearchAnnouncementState(json);

    setCurrentPage(1);
    setAnnouncements([]);
    setHasMore(true);

    setValue("advancedSearch", false);

    getAnnouncementSearch.mutate({ data: json, pageNumber: 1 });

    if (!isMediumScreen)
      refForLargeScreen.current.scrollIntoView({
        behavior: "smooth",
      });
    else
      refForSmallScreen.current.scrollIntoView({
        behavior: "smooth",
      });
  };

  const changeValue = (value, name) => {
    if (!searchInfo[name].includes(parseInt(value))) {
      setSearchInfo((prevState) => ({
        ...prevState,
        [name]: [...prevState[name], parseInt(value)],
      }));
    } else {
      setSearchInfo((prevState) => ({
        ...prevState,
        [name]: prevState[name].filter((item) => item !== parseInt(value)),
      }));
    }
  };

  return (
    <div className="relative">
      <div>
        <ProtectRoute role="user null">
          <Navbar />

          <div>
            <div className="h-[400px] z-10 mx-auto">
              <img
                src="/assets/image2.jpg"
                alt=""
                className="object-cover w-full h-[400px]"
              />
            </div>
            {isLoading ? (
              <div className="relative bg-base-100 rounded-lg shadow-lg z-20 mt-[-100px] max-w-[1200px] mx-auto ">
                <Loading />
              </div>
            ) : (
              <div>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                  <div
                    ref={refForLargeScreen}
                    className="relative bg-base-100 rounded-lg shadow-lg z-20 mt-[-100px] max-w-[1200px] mx-auto p-10 block md:flex gap-4"
                  >
                    <div className="w-full mb-3 md:mb-0 md:w-1/2 mx-auto">
                      <input
                        type="text"
                        placeholder="Wpisz nazwę stanowiska lub firmy"
                        defaultValue={searchInfo.nazwa}
                        className={
                          errors.nazwa ? styleInputError : styleInputCorrect
                        }
                        {...register("nazwa")}
                      />
                    </div>
                    <div className="w-full mb-5 md:mb-0 md:w-1/4 mx-auto">
                      <select
                        className={
                          errors.kategoria
                            ? styleInputErrorSelect
                            : styleInputCorrecSelect
                        }
                        defaultValue={searchInfo.kategoria}
                        {...register("kategoria")}
                      >
                        <option key={0} value="0" defaultValue>
                          Wszystkie kategorie
                        </option>
                        {info.categories.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mx-auto w-full md:w-1/4">
                      <button type="submit" className="btn btn-neutral w-full ">
                        <FaSearch />
                        Szukaj
                      </button>
                    </div>
                  </div>

                  <div className="block md:flex gap-9 mx-auto max-w-[1200px] mb-2 pt-12 px-3">
                    {isMediumScreen ? (
                      <div className="block md:hidden w-full bg-base-100 mb-3 rounded-lg shadow-lg z-20">
                        <div className="collapse collapse-arrow bg-base-100 mb-3 rounded-none">
                          <input
                            type="checkbox"
                            defaultChecked
                            {...register("advancedSearch")}
                          />
                          <div className="collapse-title mb-2 text-md font-medium">
                            <div className="flex">
                              <div>Wyszukiwanie zaawansowane</div>
                              <div className={styleBadge}>
                                {advancedFilterCounter}
                              </div>
                            </div>
                          </div>
                          <div className="collapse-content">
                            <div className="block relative w-full md:w-[400px] mx-auto h-fit">
                              <CollapseItem
                                name="umowa"
                                header="Rodzaj umowy"
                                data={info.contracts}
                                changeValue={changeValue}
                                searchInfo={searchInfo}
                              />
                              <CollapseItem
                                name="czas_pracy"
                                header="Wymiar czasowy"
                                data={info.workTimes}
                                changeValue={changeValue}
                                searchInfo={searchInfo}
                              />
                              <CollapseItem
                                name="typ_pracy"
                                header="Typ pracy"
                                data={info.workTypes}
                                changeValue={changeValue}
                                searchInfo={searchInfo}
                              />
                              <EarnItem
                                setIsEarnChecked={(value) =>
                                  setIsEarnChecked(value)
                                }
                                data={info.earnTimes}
                                updateSearchInfo={updateSearchInfo}
                                searchInfo={searchInfo}
                              />

                              <div className="p-3">
                                <button
                                  type="submit"
                                  className="btn btn-neutral w-full "
                                >
                                  <FaSearch />
                                  Szukaj
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="hidden md:block relative bg-base-100 rounded-lg shadow-lg z-20 w-full md:w-[400px] mx-auto h-fit">
                        <CollapseItem
                          name="umowa"
                          header="Rodzaj umowy"
                          data={info.contracts}
                          changeValue={changeValue}
                          searchInfo={searchInfo}
                        />
                        <CollapseItem
                          name="czas_pracy"
                          header="Wymiar czasowy"
                          data={info.workTimes}
                          changeValue={changeValue}
                          searchInfo={searchInfo}
                        />
                        <CollapseItem
                          name="typ_pracy"
                          header="Typ pracy"
                          data={info.workTypes}
                          changeValue={changeValue}
                          searchInfo={searchInfo}
                        />
                        <EarnItem
                          setIsEarnChecked={setIsEarnChecked}
                          data={info.earnTimes}
                          updateSearchInfo={updateSearchInfo}
                          searchInfo={searchInfo}
                        />

                        <div className="p-3">
                          <button
                            type="submit"
                            className="btn btn-neutral w-full "
                          >
                            <FaSearch />
                            Szukaj
                          </button>
                        </div>
                      </div>
                    )}

                    <div
                      ref={refForSmallScreen}
                      className="relative bg-base-100 z-20 w-full mx-auto h-fit overflow-visible"
                    >
                      <InfiniteScroll
                        className="block overflow-visible w-full"
                        style={{ overflow: "visible !important" }}
                        dataLength={announcements.length}
                        next={() =>
                          getAnnouncementSearch.mutate({
                            data: serachInfoCurrent,
                            pageNumber: currentPage + 1,
                          })
                        }
                        hasMore={hasMore}
                        loader={<Loading />}
                      >
                        {announcements.map((item, index) => {
                          return (
                            <AnnouncementItem key={index} announcement={item} />
                          );
                        })}
                      </InfiniteScroll>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </ProtectRoute>
      </div>
    </div>
  );
};

export default SerachAnnouncementPage;
