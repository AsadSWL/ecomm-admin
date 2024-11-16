import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddBranchLayer from "../components/AddBranchLayer";


const ViewBranchOrdersPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="View Shop Orders" />

        {/* AddBranchLayer */}
        <AddBranchLayer />


      </MasterLayout>
    </>
  );
};

export default ViewBranchOrdersPage;
