import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";

import OfferCandidateCard from "./OfferCandidateCard";
import { OfferViewModal } from "./OfferViewModal";
import { getOfferReleaseInfo } from "./OfferReleased";

// Maps raw offer row → OfferViewModal prop shape
function mapOfferToModal(offer = {}) {
  const candidate = offer?.candidate?.[0] ?? {};
  const job = candidate?.job?.[0] ?? {};
  const [ctcMin, ctcMax] = offer?.offered_ctc?.split(" - ") ?? [];

  console.log(candidate);

  return {
    name: candidate.candidate_name,
    role: offer.job_role ?? job.job_name,
    status: "Offer Released",
    gender: candidate.gender,
    dob: candidate.date_of_birth,
    documents: candidate?.candidate_documents,
    email: candidate.email,
    linkedin: candidate.linkedin,
    phone: candidate.phone,
    location: candidate.location,
    noticePeriod: candidate.notice_period_days,
    ctcMin,
    ctcMax,
    skills: candidate.skills ?? [],
    employmentType: offer.offer_type ?? job.job_type,
    workingHours: offer.working_hours,
    reportingTo: offer.reporting_to,
    reportingRole: offer.reporting_role,
    officeLocation: offer.office_location,
    offerReleasedDate: offer.created_at?.split("T")[0],
    acceptanceDeadline: new Date(offer.acceptance_deadline).toDateString(),
    expectedJoining: new Date(offer.joining_date).toLocaleDateString(),
    message: offer.message,
  };
}

const OfferReleasedMain = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["offers_released_info", 1],
    queryFn: async () => {
      const res = await getOfferReleaseInfo(1);
      return res ?? [];
    },
  });

  console.log(data);

  const offers = Array.isArray(data?.data)
    ? data.data
    : Array.isArray(data)
      ? data
      : [];

  return (
    <div className="px-4 pb-10 w-full">
      <header className="mb-6">
        <h2 className="text-2xl mt-8 font-medium text-gray-900">
          Offer Management
        </h2>
        <p className="mt-2 text-base text-gray-500">
          Track and manage offer letters sent to candidates
        </p>
      </header>

      {isLoading && (
        <p className="text-center pt-8 w-full text-gray-400">Loading...</p>
      )}

      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          Failed to load offers: {error.message}
        </div>
      )}

      {!isLoading && !error && offers.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400">
          <p>No offers released yet.</p>
        </div>
      )}

      {!isLoading && !error && offers.length > 0 && (
        <div className="flex flex-wrap gap-4 w-full">
          {offers.map((offer, index) => (
            <OfferCandidateCard
              key={offer.id ?? index}
              offer={offer}
              onViewOffer={() => setSelectedOffer(offer)}
            />
          ))}
        </div>
      )}

      {/* Modal overlay */}
      <AnimatePresence>
        {selectedOffer && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-8"
            onClick={() => setSelectedOffer(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="overflow-y-auto max-h-[90vh] w-full max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <OfferViewModal
                offer={mapOfferToModal(selectedOffer)}
                onDismiss={() => setSelectedOffer(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OfferReleasedMain;
