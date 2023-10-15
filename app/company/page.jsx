"use client";

import { SearchContext } from "@/utils/contexts/SearchContext";
import ProtectRoute from "@/utils/middleware/protectRoute";
import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import Loading from "@/components/loadings/loading";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import CompanyItem from "./components/companyItem";
import CollapseItem from "./components/collapseItem";
import { axiosBase } from "@/utils/api/axios";

const SearchCompaniesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState(null);

  const [advancedFilterCounter, setAdvancedFilterCounter] = useState(0);

  const [companies, setCompanies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const refForLargeScreen = useRef(null);
  const refForSmallScreen = useRef(null);

  const { searchCompaniesState, setSearchCompaniesState } =
    useContext(SearchContext);

  const [serachInfoCurrent, setSerachInfoCurrent] =
    useState(searchCompaniesState);
  const [searchInfo, setSearchInfo] = useState(searchCompaniesState);

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

  useEffect(() => {
    let counter = 0;

    if (searchInfo.krs.length > 0) counter++;
    if (searchInfo.nip.length > 0) counter++;

    setAdvancedFilterCounter(counter);

    getCompanySearch.mutate({ data: searchInfo, pageNumber: 1 });
  }, [searchInfo]);

  const getCompanySearch = useMutation({
    mutationFn: (data) => {
      axiosBase
        .post("/company/search?page=" + data.pageNumber, data.data)
        .then((res) => {
          if (res.data.meta.last_page === data.pageNumber) {
            setHasMore(false);
          } else {
            setCurrentPage(data.pageNumber);
          }

          if (data.pageNumber === 1) setCompanies(res.data.data);
          else {
            setCompanies((previousData) => previousData.concat(res.data.data));
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  const onSubmitHandler = async (data) => {
    let json = searchInfo;

    json.nazwa = data.nazwa;
    json.województwo = parseInt(data.województwo);

    setSearchInfo(json);
    setSerachInfoCurrent(json);
    setSearchCompaniesState(json);

    setCurrentPage(1);
    setCompanies([]);
    setHasMore(true);

    setValue("advancedSearch", false);

    getCompanySearch.mutate({ data: json, pageNumber: 1 });

    refForSmallScreen.current.scrollIntoView({
      behavior: "smooth",
    });
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
                          errors.województwo
                            ? styleInputErrorSelect
                            : styleInputCorrecSelect
                        }
                        defaultValue={searchInfo.województwo}
                        {...register("województwo")}
                      >
                        <option key={0} value="0" defaultValue>
                          Wszystkie województwa
                        </option>
                        <option value="1">Dolnośląskie</option>
                        <option value="2">Kujawsko-Pomorskie</option>
                        <option value="3">Lubelskie</option>
                        <option value="4">Lubuskie</option>
                        <option value="5">Łódzkie</option>
                        <option value="6">Małopolskie</option>
                        <option value="7">Mazowieckie</option>
                        <option value="8">Opolskie</option>
                        <option value="9">Podkarpackie</option>
                        <option value="10">Podlaskie</option>
                        <option value="11">Pomorskie</option>
                        <option value="12">Śląskie</option>
                        <option value="13">Świętokrzyskie</option>
                        <option value="14">Warmińsko-Mazurskie</option>
                        <option value="15">Wielkopolskie</option>
                        <option value="16">Zachodniopomorskie</option>
                      </select>
                    </div>
                    <div className="mx-auto w-full md:w-1/4">
                      <button type="submit" className="btn btn-neutral w-full ">
                        <FaSearch />
                        Szukaj
                      </button>
                    </div>
                  </div>

                  <div className="block gap-9 mx-auto max-w-[1200px] mb-2 pt-12 px-3">
                    <div className="w-full bg-base-100 mb-4 rounded-lg shadow-lg z-20">
                      <div className="collapse collapse-arrow bg-base-100 mb-3 rounded-none">
                        <input
                          type="checkbox"
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
                          <div className="block relative w-full mx-auto h-fit">
                            <CollapseItem
                              name="krs"
                              header="Numer KRS"
                              updateSearchInfo={updateSearchInfo}
                              searchInfo={searchInfo.krs}
                            />
                            <CollapseItem
                              name="nip"
                              header="Numer NIP"
                              updateSearchInfo={updateSearchInfo}
                              searchInfo={searchInfo.nip}
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

                    <div
                      ref={refForSmallScreen}
                      className="relative bg-base-100 z-20 mb-2 w-full mx-auto h-fit overflow-visible"
                    >
                      <InfiniteScroll
                        className="block overflow-visible w-full"
                        style={{ overflow: "visible !important" }}
                        dataLength={companies.length}
                        next={() =>
                          getCompanySearch.mutate({
                            data: serachInfoCurrent,
                            pageNumber: currentPage + 1,
                          })
                        }
                        hasMore={hasMore}
                        loader={<Loading />}
                      >
                        {companies.map((item, index) => {
                          return <CompanyItem key={index} company={item} />;
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

export default SearchCompaniesPage;
