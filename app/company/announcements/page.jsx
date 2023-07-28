"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import { IoMdAddCircle } from "react-icons/io";
import Navbar from "../components/navbar";
import CompanyContainer from "@/components/layouts/companyContainer";
import Title from "../components/title";
import { useRouter } from "next/navigation";

const announcementsPage = () => {
  const router = useRouter();

  const addAnnouncementNavigate = () => {
    router.push("/company/announcements/add");
  };

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
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>
    </div>
  );
};

export default announcementsPage;
