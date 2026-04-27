import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Label from "../common/Label";
import HeaderSection from "./HeaderSection";
import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import SectionThree from "./SectionThree";
import SectionSix from "./SectionSix";
import SectionFive from "./SectionFive";
import SectionSeven from "./SectionSeven";
import SectionEight from "./SectionEight";
import SectionNine from "./SectionNine";
import SignaturesSection from "./SignaturesSection";
import { createPortal } from "react-dom";
import Icon from "../common/Icon";
import { motion, AnimatePresence } from "framer-motion";

const EmpanelmentAgreement = ({
  clientData,
  serviceFeePercentage,
  setOpenAgreement,
}) => {
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const pageOne = useRef(null);
  const pageTwo = useRef(null);

  // Function to handle PDF generation and download
  const handleDownloadPdf = async () => {
    // Prevent double clicking
    if (loading) return;

    document.body.setAttribute("data-pdf-export", "true");
    setLoading(true);

    // Using 'pt' (points) for precise A4 dimensions (595.28pt x 841.89pt)
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
      compress: false,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const margin = 40; // Balanced professional margin
    const contentWidth = pdfWidth - margin * 2;

    const capturePage = async (element, pageNum) => {
      const canvas = await html2canvas(element, {
        scale: 2.5, // High resolution without crashing browser memory
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      // Forcing JPEG format avoids the 'UNKNOWN' type error in jspdf
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // Manual calculation of aspect ratio for layout precision
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const displayHeight = (imgHeight * contentWidth) / imgWidth;

      if (pageNum > 1) {
        pdf.addPage();
      }

      pdf.addImage(
        imgData,
        "JPEG",
        margin,
        margin,
        contentWidth,
        displayHeight,
      );
    };

    try {
      await capturePage(pageOne.current, 1);
      await capturePage(pageTwo.current, 2);

      const fileName = `Empanelment_Agreement_${clientData?.company_name?.replace(/\s+/g, "_") || "Client"}.pdf`;
      pdf.save(fileName);

      setOpenAgreement(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    } finally {
      document.body.removeAttribute("data-pdf-export");
      setLoading(false);
    }
  };

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="p-4 absolute w-full h-dvh z-3000 overflow-y-auto top-0 left-0 flex flex-col items-center bg-gray-100"
      >
        {/* Action Button */}
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          disabled={loading}
          style={{
            backgroundColor: loading
              ? "#9ca3af"
              : hover
                ? "rgba(23, 55, 126, 1)"
                : "rgba(37, 99, 235, 1)",
          }}
          onClick={handleDownloadPdf}
          className="mb-8 px-10 py-3 text-white font-bold rounded-lg shadow-lg transition-all sticky top-4 z-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              Generating PDF...
            </>
          ) : (
            "Download Official Agreement"
          )}
        </button>

        {/* Close Button */}
        <span
          onClick={() => !loading && setOpenAgreement(false)}
          className="fixed p-1 top-6 right-8 border-2 flex items-center justify-center transition-all duration-300 hover:rotate-90 text-blue-600 border-blue-200 hover:text-red-500 hover:border-red-200 h-10 w-10 rounded-full cursor-pointer bg-white shadow-sm z-50"
        >
          <Icon icon="ri-close-line" class_name="w-6 h-6" />
        </span>

        {/* Document Pages Container */}
        <div
          className={`flex flex-col items-center ${loading ? "opacity-20 pointer-events-none" : "opacity-100"}`}
        >
          {/* Page One */}
          <div
            ref={pageOne}
            className="w-[794px] bg-white text-black p-16 leading-relaxed text-sm mb-6 shadow-2xl"
            style={{ fontFamily: "'Times New Roman', serif" }}
          >
            <HeaderSection clientData={clientData} />
            <div className="mb-8 text-justify">
              <strong>
                {clientData?.company_name || "(Your Company Name)"}
              </strong>
              , a company, having its registered office at{" "}
              <strong>{clientData?.address || "(Address)"}</strong>, hereinafter
              referred to as the <strong>{clientData?.role || "(Role)"}</strong>
              . <strong>EPM Staffing Services (OPC) Private Limited</strong> and{" "}
              <strong>
                {clientData?.company_name || "(Your Company Name)"}
              </strong>{" "}
              shall collectively be referred to as the
              <strong> "parties"</strong> and individually as a{" "}
              <strong> "Party"</strong>[cite: 13].
            </div>

            <SectionOne />
            <SectionTwo />
            <SectionThree />

            <section className="mt-8 w-full">
              <h3 className="font-bold text-lg border-b border-black mb-4 pb-1">
                4. Payment Terms & Professional Fee [cite: 26]
              </h3>
              <p className="mb-4">
                <strong>a.</strong> For each successful hire made by the Client
                of a candidate referred/submitted by the Staffing Agency, the
                Client agrees to pay a one-time professional fee equivalent to{" "}
                <span className="underline decoration-2">
                  {serviceFeePercentage || 0}% of the candidate’s annual Cost to
                  Company (CTC)
                </span>
                [cite: 27, 31].
              </p>

              <table className="w-full text-left border-collapse border border-black">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-3 border border-black">
                      CTC Range [cite: 28]
                    </th>
                    <th className="p-3 border border-black">
                      Service Charges [cite: 30]
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-black font-medium">
                      All Levels [cite: 29]
                    </td>
                    <td className="p-3 border border-black">
                      {serviceFeePercentage || 0}% of Annual gross CTC + GST (if
                      applicable) [cite: 31]
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>

          {/* Page Two */}
          <div
            ref={pageTwo}
            className="w-[794px] bg-white text-black p-16 leading-relaxed text-sm mb-12 shadow-2xl"
            style={{
              fontFamily: "'Times New Roman', serif",
              minHeight: "1122px",
            }}
          >
            <section className="mb-8 space-y-3">
              <p>
                <strong>b.</strong> The Tax Invoice shall be raised after
                completion of the confirmation period as stated above[cite: 32].
              </p>
              <p>
                <strong>c.</strong> The payment due date shall be 7 (seven) days
                from the date of receipt of the invoice[cite: 32].
              </p>
              <p>
                <strong>d.</strong> Payments shall preferably be made via net
                banking. Bank details shall be provided in the invoice[cite:
                32].
              </p>
              <p>
                <strong>e.</strong> All payments shall be made in favour of{" "}
                <strong>EPM Staffing Services (OPC) Private Limited</strong>
                [cite: 32].
              </p>
            </section>

            <SectionFive />
            <SectionSix />
            <SectionSeven />
            <SectionEight />
            <SectionNine />

            <div className="mt-20">
              <SignaturesSection clientData={clientData} />
            </div>
          </div>
        </div>

        {/* Global Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[60] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-xl font-bold text-blue-800">
                Finalizing Agreement Document...
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

export default EmpanelmentAgreement;
