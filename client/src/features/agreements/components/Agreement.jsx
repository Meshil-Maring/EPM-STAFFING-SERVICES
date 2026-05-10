import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../shared/hooks/useAuth";

import { DEFAULTS } from "../constants/constants";
import { fetchAgreementData } from "../services/api";
import { agreementStyles } from "./styles";
import AgreementContent from "./AgreementContent";
import Toolbar from "./Toolbar";
import { usePrint, useEscapeKey, useBodyScrollLock } from "../hooks/hooks";

export default function EmpanelmentAgreement({onClose }) {
  const {user} = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["agreement", user.id],
    queryFn: () => fetchAgreementData(user.id),
    staleTime: 1000 * 60 * 5,
  });

  const d = { ...DEFAULTS, ...data };
  const feeLabel =
    d.serviceChargePercent === "___" ? "__%" : `${d.serviceChargePercent}%`;

  const handlePrint = usePrint();

  useEscapeKey(onClose);
  useBodyScrollLock();

  return createPortal(
    <>
      <style>{agreementStyles}</style>

      <div
        id="ea-print-root"
        className="ea-serif fixed inset-0 z-900 bg-black/60 backdrop-blur-sm overflow-y-auto"
      >
        <div className="flex flex-col items-center py-6 gap-3">
          {/* sticky toolbar — pins at top of the scroll container while document scrolls */}
          <div className="sticky top-6 z-10 w-204 max-w-[calc(100vw-16px)]">
            <Toolbar
              isLoading={isLoading}
              isError={isError}
              onPrint={handlePrint}
              onClose={onClose}
            />
          </div>

          <div
            id="ea-document"
            className="w-204 max-w-[calc(100vw-16px)] bg-white shadow-2xl mb-6"
          >
            <AgreementContent d={d} feeLabel={feeLabel} />
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
