import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import ClientManagementCards from "./ClientManagementCards";
import Common_Client_Management_Searching_And_View from "./Common_Client_Management_Searching_And_View";
import { Company_context } from "../../../../context/AccountsContext";

function ContentAppsView() {
  const { companyAccounts } = useContext(Company_context) || {};
  const containerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return null;
    const updateScroll = () => {
      if (container.scrollTop > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    container.addEventListener("scroll", updateScroll);

    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  // Search function to filter clients
  const filterClients = (clients, searchTerm) => {
    if (!searchTerm.trim()) return clients;

    const searchLower = searchTerm.toLowerCase();

    return Object.keys(clients).reduce((filtered, key) => {
      const client = clients[key];

      // Check if client matches search criteria (name, field, status, email, joined_date)
      const matches =
        client.name?.toLowerCase().includes(searchLower) ||
        client.field?.toLowerCase().includes(searchLower) ||
        client.status?.toLowerCase().includes(searchLower) ||
        client.email?.toLowerCase().includes(searchLower) ||
        client["joined date"]?.toLowerCase().includes(searchLower) ||
        client.positions?.toString().includes(searchLower) ||
        client["active jobs"]?.toString().includes(searchLower) ||
        client["pending jobs"]?.toString().includes(searchLower);

      if (matches) {
        filtered[key] = client;
      }

      return filtered;
    }, {});
  };

  // Filtered clients based on search term
  const filteredClients = useMemo(() => {
    return filterClients(companyAccounts || {}, searchTerm);
  }, [searchTerm, companyAccounts]);

  const handleSearchChange = (value, id) => {
    setSearchTerm(value);
  };

  return (
    <main
      ref={containerRef}
      className="w-full h-full flex flex-col bg-whiter overflow-y-auto scroll-smooth"
    >
      <div className="px-6 pt-2 pb-10 flex flex-col gap-6">
        <Common_Client_Management_Searching_And_View
          scrolled={scrolled}
          onSearchChange={handleSearchChange}
        />

        {Object.values(filteredClients).length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="font-semibold text-text_l_b/60 text-[clamp(1em,2vw,1.2em)]">
              Nothing to Display
            </p>
          </div>
        ) : (
          <ClientManagementCards clients={filteredClients} />
        )}
      </div>
    </main>
  );
}

export default ContentAppsView;
