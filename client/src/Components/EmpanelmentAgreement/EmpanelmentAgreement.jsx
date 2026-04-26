import React, { useRef } from "react";
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
import Button from "../common/Button";
import Icon from "../common/Icon";
import { motion, AnimatePresence } from "framer-motion";

const EmpanelmentAgreement = ({
  clientData,
  serviceFeePercentage,
  setOpenAgreement,
}) => {
  const pageOne = useRef(null);
  const pageTwo = useRef(null);

  const handleDownloadPdf = async () => {
    document.body.setAttribute("data-pdf-export", "true");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 40; // Safe space for top/bottom/sides
    const contentWidth = pdfWidth - margin * 2;

    const capturePage = async (element, pageNum) => {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        background: "#ffffff",
      });
      const data = canvas.toDataURL("image/png");

      const imgProperties = pdf.getImageProperties(data);
      const displayHeight =
        (imgProperties.height * contentWidth) / imgProperties.width;

      // If it's not the first page, add a new page to the document
      if (pageNum > 1) {
        pdf.addPage();
      }

      // Add image with margins (x, y, width, height)
      pdf.addImage(data, "PNG", margin, margin, contentWidth, displayHeight);
    };

    try {
      // Capture Section 1
      await capturePage(pageOne.current, 1);
      // Capture Section 2
      await capturePage(pageTwo.current, 2);

      pdf.save(
        `Empanelment_Agreement_${clientData?.company_name || "Client"}.pdf`,
      );
      setOpenAgreement(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      document.body.removeAttribute("data-pdf-export");
    }
  };

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="p-4 absolute w-full h-dvh z-3000 overflow-y-auto top-0 left-0 flex flex-col items-center bg-b_white"
      >
        <button
          onClick={handleDownloadPdf}
          className="mb-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Download as PDF
        </button>

        <span
          onClick={() => setOpenAgreement(false)}
          className="fixed p-1 top-8 border-2 flex items-center justify-center font-lighter transition-all duration-150 ease-in-out hover:rotate-180 text-d_blue hover:text-red right-8  h-8 w-8 rounded-full"
        >
          <Icon icon="ri-close-line" class_name="w-full h-full" />
        </span>

        {/* Page One Container */}
        <div
          ref={pageOne}
          className="w-[794px] !bg-[#ffffff] !text-[#000000] p-12 leading-relaxed text-sm shadow-lg border !border-[#cccccc] mb-8"
          style={{ fontFamily: "serif" }}
        >
          <HeaderSection clientData={clientData} />
          <div className="w-full flex flex-col items-center justify-center my-4">
            <Label
              text={`This Company Empanelment Agreement is made and executed on ${new Date().toLocaleDateString() || "Date"}`}
            />
            <Label text={`BY AND BETWEEN`} class_name="font-bold text-md" />
            <Label text={`AND`} class_name="font-bold text-md" />
          </div>

          <div className="mb-6">
            <strong>{clientData?.company_name || "(Your Company Name)"}</strong>
            , a company, having its registered office at{" "}
            <strong>{clientData?.address || "(Address)"}</strong>, hereinafter
            referred to as the <strong>{clientData?.role || "(Role)"}</strong>.{" "}
            <strong>EPM Staffing Services (OPC) Private Limited</strong> and{" "}
            <strong>{clientData?.company_name || "(Your Company Name)"}</strong>{" "}
            shall collectively be referred to as the
            <strong> "parties"</strong> and individually as a
            <strong> "Party"</strong>
          </div>

          <SectionOne />
          <SectionTwo />
          <SectionThree />

          <section className="mb-4 w-full flex items-center justify-start flex-col">
            <h3 className="font-bold text-left">
              4. Payment Terms & Professional Fee
            </h3>
            <div className="w-full">
              <p>
                <strong>a.</strong> For each successful hire made by the Client
                of a candidate referred/submitted by the Staffing Agency, the
                Client agrees to pay a one-time professional fee equivalent to{" "}
                <strong>
                  {clientData?.candidate_salary || 0}% of the candidate’s annual
                  Cost to Company (CTC).
                </strong>
              </p>
              <div className="my-4 mx-auto w-[90%] border border-black p-2">
                <table className="w-full font-semibold text-left">
                  <thead>
                    <tr className="border-b border-black">
                      <th className="p-1 border-r">CTC Range</th>
                      <th className="p-1">Service Charges</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-1 border-r">All Levels</td>
                      <td className="p-1">
                        {serviceFeePercentage || 0}% of Annual gross CTC + GST
                        (if applicable)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* Page Two Container */}
        <div
          ref={pageTwo}
          className="w-[794px] h-[1122px] p-12 !bg-[#ffffff] !text-[#000000] leading-relaxed text-sm shadow-lg border border-[#cccccc] mb-8"
          style={{ fontFamily: "serif" }}
        >
          <section className="mb-4 w-full">
            <p>
              <strong>b.</strong> The Tax Invoice shall be raised after
              completion of the confirmation period as stated above.
            </p>
            <p>
              <strong>c.</strong> The payment due date shall be 7 (seven) days
              from the date of receipt of the invoice.
            </p>
            <p>
              <strong>d.</strong> Payments shall preferably be made via net
              banking. Bank details shall be provided in the invoice.
            </p>
            <p>
              <strong>e.</strong> All payments shall be made in favour of{" "}
              <strong>EPM Staffing Services (OPC) Private Limited.</strong>
            </p>
          </section>
          <SectionFive />
          <SectionSix />
          <SectionSeven />
          <SectionEight />
          <SectionNine />
          <SignaturesSection clientData={clientData} />
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

export default EmpanelmentAgreement;
