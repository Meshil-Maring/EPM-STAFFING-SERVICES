import React from "react";
import Label from "../../common/Label";
import { Outlet } from "react-router-dom";

function AdminClientManagementContent() {
  return (
    <div className="w-7/9 h-dvh bg-lighter text-text_l_b tracking-wide">
      <div className="border-b border-light w-full">
        <div className="flex flex-col items-start justify-center m-2">
          <Label text="Client Management" class_name="text-lg font-slighter" />
          <Label text="Track your partnerships" class_name="text-sm" />
        </div>
      </div>
      <main className="w-full flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminClientManagementContent;
