"use client";

import CompanyContainer from "@/components/layouts/companyContainer";
import Navbar from "../../components/navbar";
import Title from "../../components/title";
import ProtectRoute from "@/utils/middleware/protectRoute";
import { IoMdAddCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

const TestModulePage = () => {
  const router = useRouter();

  const addTestNavigate = () => {
    router.push("/company/modules/tests/add");
  };

  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="tests">
          <CompanyContainer>
            <Title name="Moduły - Testy" />
            <button
              onClick={addTestNavigate}
              className="btn btn-primary rounded-none w-full p-3"
            >
              <span className="text-[20px]">
                <IoMdAddCircle />
              </span>
              Dodaj nowy test
            </button>
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>
    </div>
  );
};

export default TestModulePage;
