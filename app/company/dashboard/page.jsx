"use client";

import ProtectRoute from "@/utils/middleware/protectRoute";
import Navbar from "../components/navbar/navbar";
import MainContainer from "@/components/layouts/mainContainer";

const DashboardCompany = () => {
  return (
    <div>
      <ProtectRoute role="company">
        <Navbar>
          <MainContainer>asdsad</MainContainer>
        </Navbar>
      </ProtectRoute>
    </div>
  );
};

export default DashboardCompany;
