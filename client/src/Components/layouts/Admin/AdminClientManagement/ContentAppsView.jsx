import React, { useRef, useState, useEffect, useMemo } from "react";
import ClientManagementCards from "./ClientManagementCards";
import Common_Client_Management_Searching_And_View from "./Common_Client_Management_Searching_And_View";
import { useLocation, useSearchParams } from "react-router-dom";
import { getClientManagementData } from "../../Admin/AdminClientManagement/end-point-function/client_management";

function ContentAppsView() {
  // local accounts state
  const [companyAccounts, setCompanyAccounts] = useState(null);

  // trigger states
  const [trigger, setTrigger] = useState(false);

  // refresher function
  const refresh = () => setTrigger((prev) => !prev);

  // loader Function for fetching data on component mount
  const get_user_accounts = async () => {
    const result = await getClientManagementData(1);
    setCompanyAccounts(result.data);
  };

  // loader useEffect  for fetching data on component mount
  useEffect(() => {
    get_user_accounts();
  }, [trigger]);

  // Reference for scroll container
  const containerRef = useRef(null);

  // State to check if user has scrolled
  const [scrolled, setScrolled] = useState(false);

  // State for search input value
  const [searchTerm, setSearchTerm] = useState("");

  // Hook to read URL query params (?showUnfollowed=true)
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current URL path
  const { pathname } = useLocation();

  // Extract last part of URL (example: follow_clients)
  const section = useMemo(() => {
    return pathname.split("/").at(-1);
  }, [pathname]);

  // Check if we should show only unfollowed clients
  // Example: /admin/management?showUnfollowed=true
  const showUnfollowedOnly = searchParams.get("showUnfollowed") === "true";

  // ================= SCROLL DETECTION =================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Function to detect scroll position
    const updateScroll = () => {
      setScrolled(container.scrollTop > 20);
    };

    // Add scroll listener
    container.addEventListener("scroll", updateScroll);

    // Cleanup listener when component unmounts
    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  // ================= FILTER FUNCTION =================
  const filterClients = (clients, term) => {
    const searchLower = term.toLowerCase().trim();

    // Check if current section is "follow_clients"
    const isFollowSection = section === "follow_clients";

    // If clients is not an array, return empty array
    if (!Array.isArray(clients)) {
      return [];
    }

    // Filter clients array
    return clients.filter((client) => {
      // 1. Check if client belongs in this section
      const belongsInSection = isFollowSection ? client.active === true : true;

      if (!belongsInSection) return false;

      // 2. If "Add Client" mode is ON → show only unfollowed (no followers)
      if (showUnfollowedOnly && client.followers?.length > 0) {
        return false;
      }

      // 3. If no search term → include client directly
      if (!searchLower) {
        return true;
      }

      // 4. Match search term with multiple fields
      const matches =
        client.company_name?.toLowerCase().includes(searchLower) ||
        client.industry_type?.toLowerCase().includes(searchLower) ||
        client.active?.toString().toLowerCase().includes(searchLower) ||
        client.email?.toLowerCase().includes(searchLower) ||
        client.user_created_at?.toLowerCase().includes(searchLower) ||
        client.jobs?.length?.toString().includes(searchLower) ||
        client.registration_number?.toLowerCase().includes(searchLower) ||
        client.city?.toLowerCase().includes(searchLower) ||
        client.state?.toLowerCase().includes(searchLower);

      return matches;
    });
  };

  // ================= MEMOIZED FILTERED DATA =================
  const filteredClients = useMemo(() => {
    return filterClients(companyAccounts || [], searchTerm);
  }, [searchTerm, companyAccounts, section]);

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  return (
    <main
      key={section} // re-render when section changes
      ref={containerRef}
      className="w-full h-full flex flex-col bg-whiter overflow-y-auto scroll-smooth"
    >
      <div className="px-6 pt-2 pb-10 flex flex-col gap-6">
        {/* Search + View Controls */}
        <Common_Client_Management_Searching_And_View
          scrolled={scrolled}
          onSearchChange={handleSearchChange}
        />

        {/* ================= DISPLAY CLIENTS ================= */}

        {/* If no clients found */}
        {filteredClients.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="font-semibold text-text_l_b/60 text-[clamp(1em,2vw,1.2em)]">
              Nothing to Display
            </p>
          </div>
        ) : (
          // Show client cards
          <ClientManagementCards clients={companyAccounts} refresh={refresh} />
        )}
      </div>
    </main>
  );
}

export default ContentAppsView;
