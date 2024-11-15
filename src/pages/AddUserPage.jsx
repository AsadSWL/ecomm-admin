import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import AddUserLayer from "../components/AddProductLayer";


const AddUserPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>

        {/* Breadcrumb */}
        <Breadcrumb title="Add User" />

        {/* AddUserLayer */}
        <AddUserLayer />


      </MasterLayout>
    </>
  );
};

export default AddUserPage;
