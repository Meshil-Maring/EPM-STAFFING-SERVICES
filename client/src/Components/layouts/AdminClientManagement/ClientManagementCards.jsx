import React, { useState, useContext, lazy, Suspense } from "react";
import client_management_display_data from "../../dummy_data_structures/client_management_display_data.json";
import { listGridViewContext } from "../../../context/ListGridViewContext";

import ListView from "./ListView";
import CompanyCard from "./CompanyCard";

function ClientManagementCards() {
  const keys = Object.keys(client_management_display_data);

  const { view } = useContext(listGridViewContext);

  return (
    <div
      className={`w-full h-fit items-center ${
        view === "apps"
          ? "grid grid-cols-2 gap-10 justify-center"
          : view === "grid"
          ? "grid grid-cols-3 gap-10 justify-center"
          : "flex flex-col items-center justify-start gap-6"
      }`}
    >
      {keys.map((key, index) =>
        view === "list" ? (
          <ListView key={index} company={client_management_display_data[key]} />
        ) : (
          <CompanyCard
            key={key}
            company={client_management_display_data[key]}
          />
        )
      )}
    </div>
  );
}

export default ClientManagementCards;
