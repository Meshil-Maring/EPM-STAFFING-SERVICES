import React, { useRef, useState, useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ClientManagementCards from "./ClientManagementCards";
import Common_Client_Management_Searching_And_View from "./Common_Client_Management_Searching_And_View";
import { getClientManagementData } from "../../Admin/AdminClientManagement/end-point-function/client_management";

// ============================================================
// ContentAppsView
// Displays a filtered, searchable list of client management cards.
// Supports "follow_clients" section filtering and unfollowed-only mode.
// ============================================================

function ContentAppsView() {
  const containerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  // Derive the active section from the last URL segment (e.g. "follow_clients")
  const section = useMemo(() => pathname.split("/").at(-1), [pathname]);

  // When ?showUnfollowed=true is in the URL, hide clients who already have followers
  const showUnfollowedOnly = searchParams.get("showUnfollowed") === "true";

  // ── React Query ────────────────────────────────────────────
  // TODO: Replace `1` with the real page/account ID when pagination is added
  // TODO: Move the query key to a shared constants file (e.g. QUERY_KEYS.clientManagement)
  const {
    data: companyAccounts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clientManagement"],
    queryFn: async () => {
      const result = await getClientManagementData(1);
      return result.data;
    },
  });

  // ── Scroll Detection ───────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => setScrolled(container.scrollTop > 20);
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Filter Logic ───────────────────────────────────────────
  // TODO: Extract filterClients into a separate utility/hook (e.g. useClientFilter)
  //       once more sections need the same filtering behaviour.
  const filteredClients = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const isFollowSection = section === "follow_clients";

    if (!Array.isArray(companyAccounts)) return [];

    return companyAccounts.filter((client) => {
      // In "follow_clients" section, only show active clients
      if (isFollowSection && !client.active) return false;

      // In "Add Client" mode, hide clients who already have followers
      if (showUnfollowedOnly && client.followers?.length > 0) return false;

      // No search term → include all remaining clients
      if (!term) return true;

      // Match against every relevant field
      return (
        client.company_name?.toLowerCase().includes(term) ||
        client.industry_type?.toLowerCase().includes(term) ||
        client.active?.toString().includes(term) ||
        client.email?.toLowerCase().includes(term) ||
        client.user_created_at?.toLowerCase().includes(term) ||
        client.jobs?.length?.toString().includes(term) ||
        client.registration_number?.toLowerCase().includes(term) ||
        client.city?.toLowerCase().includes(term) ||
        client.state?.toLowerCase().includes(term)
      );
    });
  }, [companyAccounts, searchTerm, section, showUnfollowedOnly]);

  // ── Render ─────────────────────────────────────────────────
  // TODO: Replace text-based loading/error states with proper Skeleton / ErrorBoundary components
  if (isLoading) return <p className="p-6 text-center">Loading...</p>;
  if (isError)
    return (
      <p className="pt-6 text-center text-red-500">
        Failed to load clients. Please try again.
      </p>
    );

  return (
    <main
      key={section} // forces re-render when the active section changes
      ref={containerRef}
      className="w-full h-full flex flex-col bg-whiter overflow-y-auto scroll-smooth"
    >
      <div className="px-6 pt-2 pb-10 flex flex-col gap-6">
        {/* Search bar + view-mode toggle */}
        <Common_Client_Management_Searching_And_View
          scrolled={scrolled}
          onSearchChange={setSearchTerm}
        />

        {/* Client cards — or empty state */}
        {filteredClients.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="font-semibold text-text_l_b/60 text-[clamp(1em,2vw,1.2em)]">
              Nothing to Display
            </p>
          </div>
        ) : (
          // TODO: Pass `filteredClients` instead of `companyAccounts` so cards
          //       reflect the active search/filter state
          <ClientManagementCards clients={companyAccounts} />
        )}
      </div>
    </main>
  );
}

export default ContentAppsView;
