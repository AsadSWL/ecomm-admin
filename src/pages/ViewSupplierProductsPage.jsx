import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddBranchLayer from "../components/AddBranchLayer";


const ViewSupplierProductsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="View Supplier Products" />

        {/* AddBranchLayer */}
        <AddBranchLayer />


      </MasterLayout>
    </>
  );
};

export default ViewSupplierProductsPage;
