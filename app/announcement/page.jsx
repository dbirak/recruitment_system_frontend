"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import Navbar from "../components/navbar";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import CollapseItem from "./components/collapseItem";
import { axiosBase } from "@/utils/api/axios";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "react-query";
import Loading from "@/components/loadings/loading";
import EarnItem from "./components/earnItem";
import AnnouncementItem from "./components/announcementItem";

const SerachAnnouncementPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [searchInfo, setSearchInfo] = useState({
    nazwa: "",
    kategoria: 0,
    umowa: [],
    min_wynagrodzenie: null,
    max_wynagrodzenie: null,
    typ_wynagrodzenia: 0,
    czas_pracy: [],
    typ_pracy: [],
  });

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
  } = useForm();

  const styleInputCorrect = "input input-bordered w-full";
  const styleInputError = styleInputCorrect + " input-error text-error";

  const styleInputCorrecSelect =
    "select w-full font-normal text-[16px] input input-bordered";
  const styleInputErrorSelect =
    styleInputCorrecSelect + " input-error text-error";

  const getAnnouncementSearchInfo = useQuery(
    "getAnnouncementSearchInfo",
    () => {
      axiosBase
        .get("/announcement/search/info")
        .then((res) => {
          setInfo(res.data);
          getAnnouncementSearch.mutate(searchInfo);
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
        .post("/announcement/search", data)
        .then((res) => {
          setAnnouncements(res.data);
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

    setSearchInfo(() => ({
      ...json,
    }));

    console.log(searchInfo);
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
                  <div className="relative bg-base-100 rounded-lg shadow-lg z-20 mt-[-100px] max-w-[1200px] mx-auto p-10 flex gap-4 mb-7">
                    <div className="w-1/2 mx-auto">
                      <input
                        type="text"
                        placeholder="Wpisz nazwę stanowiska lub firmy"
                        className={
                          errors.nazwa ? styleInputError : styleInputCorrect
                        }
                        defaultValue=""
                        {...register("nazwa")}
                      />
                    </div>
                    <div className="w-1/4 mx-auto">
                      <select
                        className={
                          errors.kategoria
                            ? styleInputErrorSelect
                            : styleInputCorrecSelect
                        }
                        defaultValue="0"
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
                    <div className="mx-auto w-1/4">
                      <button type="submit" className="btn btn-neutral w-full ">
                        <FaSearch />
                        Szukaj
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-8 mx-auto max-w-[1200px] mb-2">
                    <div className="relative bg-base-100 rounded-lg shadow-lg z-20 w-[400px] mx-auto h-fit">
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
                        data={info.earnTimes}
                        updateSearchInfo={updateSearchInfo}
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

                    <div className="relative bg-base-100 z-20 w-full mx-auto  h-fit">
                      {announcements.data.map((item, index) => {
                        return (
                          <AnnouncementItem key={index} announcement={item} />
                        );
                      })}
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
