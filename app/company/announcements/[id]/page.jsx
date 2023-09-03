"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import Navbar from "../../components/navbar";
import CompanyContainer from "@/components/layouts/companyContainer";
import Title from "../../components/title";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { axiosWithBearer } from "@/utils/api/axios";
import Loading from "@/components/loadings/loading";
import { useQuery } from "react-query";
import moment from "moment";
import { TbPointFilled } from "react-icons/tb";
import AppliactionModule from "./components/appliacationModule";

const AnnouncementPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [announcement, setAnnouncement] = useState([]);

  const router = useRouter();
  const id = props.params.id;

  const getCompanyAnnouncementById = useQuery(
    "getCompanyAnnouncementById",
    () => {
      axiosWithBearer
        .get("/company/announcement/" + id)
        .then((res) => {
          setAnnouncement(res.data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response.status == 401 || error.response.status == 403) {
            localStorage.clear();
            router.push("/");
          } else if (error.response.status == 404) {
            router.push("/company/announcements");
          }
        })
        .finally(() => {});
    }
  );

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="announcements">
          <CompanyContainer>
            <Title name="Twoje ogłoszenia" />

            {isLoading ? (
              <Loading />
            ) : (
              <div>
                <table className="table text-center">
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <th className="w-1/2">Nazwa stanowiska</th>
                      <td>{announcement.name}</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <th className="w-1/2">Opis</th>
                      <td>{announcement.description}</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <th className="w-1/2">Data zakończenia</th>
                      <td>
                        {moment
                          .utc(announcement.data_zakonczenia)
                          .format("DD.MM.YYYY")}
                      </td>
                    </tr>
                    {/* row 4 */}
                    <tr>
                      <th className="w-1/2">Kategoria</th>
                      <td>{announcement.category.category_name}</td>
                    </tr>
                    {/* row 5 */}
                    <tr>
                      <th className="w-1/2">Rodzaj umowy</th>
                      <td>{announcement.contract.contract_name}</td>
                    </tr>
                    {/* row 6 */}
                    <tr>
                      <th className="w-1/2">Wymiar czasowy</th>
                      <td>{announcement.work_time.work_time_name}</td>
                    </tr>
                    {/* row 7 */}
                    <tr>
                      <th className="w-1/2">Typ pracy</th>
                      <td>{announcement.work_type.work_type_name}</td>
                    </tr>
                    {/* row 8 */}
                    <tr>
                      <th className="w-1/2">Wynagrodzenie</th>
                      <td>
                        {announcement.min_earn === null
                          ? "Brak informacji"
                          : announcement.max_earn === null
                          ? announcement.min_earn +
                            " zł " +
                            announcement.earn_time.earn_time_name
                          : announcement.min_earn +
                            " zł - " +
                            announcement.max_earn +
                            " zł " +
                            announcement.earn_time.earn_time_name}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="bg-base-200 rounded-2xl py-3 px-4 mt-5 mb-2">
                  <div className="flex justify-between">
                    <div className="font-bold text-[14px] grid items-center">
                      Obowiązki przyszłego pracownika:
                    </div>
                  </div>

                  {announcement.duties.map((item, index) => (
                    <div className="flex justify-between my-4" key={index}>
                      <div className="flex justify-between text-[14px]">
                        <span className="grid items-center me-3 ms-6 text-[15px]">
                          <TbPointFilled />
                        </span>
                        {item}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-base-200 rounded-2xl py-3 px-4 mt-5 mb-2">
                  <div className="flex justify-between">
                    <div className="font-bold text-[14px] grid items-center">
                      Rzeczy, które wymagasz od przyszłego pracownika:
                    </div>
                  </div>

                  {announcement.requirements.map((item, index) => (
                    <div className="flex justify-between my-4" key={index}>
                      <div className="flex justify-between text-[14px]">
                        <span className="grid items-center me-3 ms-6 text-[15px]">
                          <TbPointFilled />
                        </span>
                        {item}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-base-200 rounded-2xl py-3 px-4 mt-5 mb-2">
                  <div className="flex justify-between">
                    <div className="font-bold text-[14px] grid items-center">
                      Rzeczy, które oferujesz przyszłemu pracownikowi:
                    </div>
                  </div>

                  {announcement.offer.map((item, index) => (
                    <div className="flex justify-between my-4" key={index}>
                      <div className="flex justify-between text-[14px]">
                        <span className="grid items-center me-3 ms-6 text-[15px]">
                          <TbPointFilled />
                        </span>
                        {item}
                      </div>
                    </div>
                  ))}
                </div>

                <AppliactionModule announcement={announcement} />
              </div>
            )}
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>
    </div>
  );
};

export default AnnouncementPage;
