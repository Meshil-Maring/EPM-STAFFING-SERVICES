import React from "react";
import AdminNavBar from "../Components/layouts/AdminClientManagement/AdminNavBar";
import AdminClientManagementContent from "../Components/layouts/AdminClientManagement/AdminClientManagementContent";

function Admin_Client_Management() {
  return (
    <div className="w-full h-dvh flex flex-row items-start justify-start">
      <AdminNavBar />
      <AdminClientManagementContent />
    </div>
  );
}

export default Admin_Client_Management;
