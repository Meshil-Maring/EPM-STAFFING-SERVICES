import {
  User,
  CheckCircle,
  CheckCircle2,
  Briefcase,
  TrendingUp,
  CalendarDays,
  FileText,
} from "lucide-react";

function InfoTile({ icon: Icon, label, value }) {
  return (
    <div className="flex-1 min-w-35 sm:min-w-0 bg-white border border-gray-200 rounded-xl px-3 py-3 sm:px-4 cursor-default select-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-blue-300">
      <div className="flex items-center gap-1.5 mb-2">
        <Icon size={14} className="text-blue-700 shrink-0" strokeWidth={1.8} />
        <span className="text-[11px] sm:text-xs font-medium text-blue-700 tracking-wide leading-tight">
          {label}
        </span>
      </div>
      <div className="text-gray-900 font-semibold text-sm sm:text-base">
        {value}
      </div>
    </div>
  );
}

export default function OfferCandidateCard({ offer = {}, onViewOffer }) {
  const candidate = offer?.candidate?.[0] ?? {};
  const job = candidate?.job?.[0] ?? {};

  const name = candidate?.candidate_name || "—";
  const experience = candidate?.experience || "—";
  const jobType = offer?.offer_type || job?.job_type || "—";
  const jobName = job?.job_name || "—";

  const [ctcMin, ctcMax] = offer?.offered_ctc?.split(" - ") ?? ["—", "—"];

  const noticePeriod = offer?.acceptance_deadline
    ? new Date(offer.acceptance_deadline).toLocaleDateString()
    : "—";

  console.log(offer);

  const offerReleasedDate = offer?.created_at
    ? new Date(offer.created_at).toLocaleDateString()
    : "—";

  return (
    <div className="flex items-center justify-center p-1 sm:p-1 font-sans w-full">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg px-4 sm:px-6 py-4 sm:py-5 animate-slideUp w-full">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5 w-full">
            {/* Left — avatar + name */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-orange-500 flex items-center justify-center shadow-md">
                  <User size={28} color="#fff" strokeWidth={1.5} />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                    {name}
                  </h2>
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 border border-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    <CheckCircle size={11} />
                    Offer Released
                  </span>
                </div>

                <p className="text-[11px] sm:text-xs text-gray-400 font-mono tracking-wide flex items-center gap-2">
                  <span>
                    <span className="font-black">Experience: </span>
                    {experience} yr's
                  </span>
                  <span className="w-1 h-4 bg-black/20 rounded-full" />
                  <span>{jobType}</span>
                </p>
              </div>
            </div>

            {/* Right — action button */}
            <div className="flex items-center gap-2 sm:shrink-0">
              <button
                onClick={onViewOffer}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 transition-all duration-200 hover:bg-blue-700 hover:border-blue-700 hover:text-white hover:-translate-y-px hover:shadow-md"
              >
                <FileText size={13} />
                View Offer
              </button>
            </div>
          </div>

          {/* Info tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <InfoTile icon={Briefcase} label="Job Name" value={jobName} />
            <InfoTile
              icon={TrendingUp}
              label="Package"
              value={`${ctcMin} - ${ctcMax} LPA`}
            />
            <InfoTile
              icon={CalendarDays}
              label="Acceptance Deadline"
              value={noticePeriod}
            />
            <InfoTile
              icon={CheckCircle2}
              label="Released on"
              value={offerReleasedDate}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .animate-slideUp {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  );
}
