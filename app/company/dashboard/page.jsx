"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import Navbar from "../components/navbar";
import CompanyContainer from "@/components/layouts/companyContainer";
import Title from "../components/title";

const DashboardCompany = () => {
  return (
    <div>
      <ProtectRoute role="company">
        <Navbar site="home">
          <CompanyContainer>
            <Title name="Strona główna" />
          </CompanyContainer>
        </Navbar>
      </ProtectRoute>
    </div>
  );
};

export default DashboardCompany;
