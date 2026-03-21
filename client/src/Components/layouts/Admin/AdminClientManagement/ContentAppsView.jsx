import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import ClientManagementCards from "./ClientManagementCards";
import Common_Client_Management_Searching_And_View from "./Common_Client_Management_Searching_And_View";
import { Company_context } from "../../../../context/AccountsContext";
import { useLocation, useSearchParams } from "react-router-dom";

function ContentAppsView() {
  const { company_accounts } = useContext(Company_context) || {};
  const containerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const { pathname } = useLocation();

  const section = useMemo(() => {
    return pathname.split("/").at(-1);
  }, [pathname]);

  // Check if we should show only unfollowed companies (for "Add New Client" functionality)
  const showUnfollowedOnly = searchParams.get("showUnfollowed") === "true";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScroll = () => {
      setScrolled(container.scrollTop > 20);
    };

    container.addEventListener("scroll", updateScroll);
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  const filterClients = (clients, term) => {
    const searchLower = term.toLowerCase().trim();
    const isFollowSection = section === "follow_clients";

    return Object.keys(clients).reduce((filtered, key) => {
      const client = clients[key];

      // 1. Check if the client meets the section criteria first
      const belongsInSection = isFollowSection
        ? client["follow status"] === true
        : true;

      if (!belongsInSection) return filtered;

      // 2. If showing unfollowed only, filter for companies with follow status = false
      if (showUnfollowedOnly && client["follow status"] === true) {
        return filtered;
      }

      // 3. If there is no search term, add the client since they belong in this section
      if (!searchLower) {
        filtered[key] = client;
        return filtered;
      }

      // 4. If there is a search term, check for matches
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

  const filteredClients = useMemo(() => {
    return filterClients(company_accounts || {}, searchTerm);
  }, [searchTerm, company_accounts, section]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <main
      key={section}
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
