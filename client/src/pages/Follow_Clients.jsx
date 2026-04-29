import React, { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CompanyCard from "./../Components/layouts/Admin/AdminClientManagement/CompanyCard.jsx";
import { getClientManagementService } from "../services/client_management.server.js";
import { updateFollowClient } from "./../Components/layouts/Admin/AdminClientManagement/end-point-function/client_management.js";
import { showError } from "../utils/toastUtils";
import { useAuth } from "../hooks/useAuth.js";

export const Follow_Clients = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const view = sessionStorage.getItem("view_type") || "grid";
  const isGrid = view === "grid";

  // ── Fetch followed companies ──────────────────────────────────────────────
  const {
    data: companies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["followed-companies"],
    queryFn: async () => {
      const res = await getClientManagementService(1);
      const all = res?.data || []; // 👈 extract .data first

      return all.filter((company) =>
        company.followers?.some((f) => f.follower_id === user?.id),
      );
    },
  });

  // ── Same signature as ClientManagementCards ───────────────────────────────
  const handleFollowChange = useCallback(
    async (companyId, user_id, status) => {
      try {
        const res = await updateFollowClient(companyId, user_id, status);

        // if unfollowing (status === true means currently followed → now unfollowing)
        if (res?.success && status) {
          queryClient.setQueryData(["followed-companies"], (prev = []) =>
            prev.filter((c) => c.user_id !== companyId),
          );
        }
        return res;
      } catch (e) {
        showError("Could not save follow status!");
      }
    },
    [queryClient],
  );

  // ── Refresh helper ────────────────────────────────────────────────────────
  const refresh = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["followed-companies"] });
  }, [queryClient]);

  // ── States ────────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-500 text-sm">
        <i className="ri-loader-4-line animate-spin mr-2 text-indigo-500" />
        Loading followed clients…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-2 text-red-500 text-sm">
        <i className="ri-error-warning-line text-2xl" />
        <span>Could not load followed clients.</span>
        <button
          onClick={refresh}
          className="mt-1 text-xs text-indigo-500 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-2 text-slate-400 text-sm">
        <i className="ri-building-line text-3xl text-violet-300" />
        <span>You haven't followed any clients yet.</span>
      </div>
    );
  }

  return (
    <div
      className={
        isGrid
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          : "flex flex-col gap-3"
      }
    >
      {companies.map((company) => (
        <CompanyCard
          key={company.user_id}
          companyId={company.user_id}
          company={company}
          refresh={refresh}
          handleFollowChange={handleFollowChange}
        />
      ))}
    </div>
  );
};
