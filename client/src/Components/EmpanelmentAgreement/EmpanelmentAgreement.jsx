import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import PDFHeader from "./PDFHeader";
import PDFSignatures from "./PDFSignatures";
import { PageTwoContent, PageOneContent } from "./PDFSections";

// Register fonts if needed, or use standard ones
const styles = StyleSheet.create({
  page: {
    padding: 30, // Standard professional margin
    fontFamily: "Times-Roman",
    fontSize: 10,
    lineHeight: 1.5,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "grey",
  },
});

const MyDocument = ({ clientData, serviceFeePercentage }) => (
  <Document>
    {/* Page 1 */}
    <Page size="A4" style={styles.page}>
      <PDFHeader clientData={clientData} />
      <PageOneContent
        clientData={clientData}
        serviceFeePercentage={serviceFeePercentage}
      />
      <Text
        style={styles.footer}
        render={({ pageNumber }) => `Page ${pageNumber}`}
        fixed
      />
    </Page>

    {/* Page 2 */}
    <Page size="A4" style={styles.page}>
      <PageTwoContent clientData={clientData} />
      <PDFSignatures clientData={clientData} />
      <Text
        style={styles.footer}
        render={({ pageNumber }) => `Page ${pageNumber}`}
        fixed
      />
    </Page>
  </Document>
);

const EmpanelmentAgreementView = ({
  clientData,
  serviceFeePercentage,
  setOpenAgreement,
}) => {
  return (
    <div className="fixed inset-0 z-[3000] bg-gray-900 flex flex-col">
      <div className="p-4 bg-white flex justify-between items-center shadow-md">
        <h2 className="font-bold">Agreement Preview</h2>
        <div className="flex gap-4">
          <PDFDownloadLink
            document={
              <MyDocument
                clientData={clientData}
                serviceFeePercentage={serviceFeePercentage}
              />
            }
            fileName={`Agreement_${clientData?.company_name || "Client"}.pdf`}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            {({ loading }) => (loading ? "Preparing..." : "Download PDF")}
          </PDFDownloadLink>
          <button
            onClick={() => setOpenAgreement(false)}
            className="text-gray-500 hover:text-black font-bold"
          >
            Close
          </button>
        </div>
      </div>
      <PDFViewer className="w-full h-full border-none">
        <MyDocument
          clientData={clientData}
          serviceFeePercentage={serviceFeePercentage}
        />
      </PDFViewer>
    </div>
  );
};

export default EmpanelmentAgreementView;
