import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  section: { marginBottom: 12, width: "100%" },
  headerContainer: { width: "100%", alignItems: "center", marginBottom: 6 },
  sectionHeader: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "underline",
  },
  paragraph: {
    fontSize: 10,
    marginBottom: 5,
    textAlign: "justify",
    lineHeight: 1.4,
  },
  columnText: {
    fontSize: 10,
    marginBottom: 5,
    textAlign: "justify",
    lineHeight: 1.4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  bold: { fontWeight: "bold" },
  bulletRow: { flexDirection: "row", marginBottom: 4, paddingLeft: 10 },
  bullet: { width: 10, fontSize: 10 },
  bulletText: { flex: 1, fontSize: 10, textAlign: "justify" },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    marginVertical: 8,
  },
  tableRow: { flexDirection: "row", borderBottomWidth: 1 },
  tableColHeader: {
    width: "50%",
    borderRightWidth: 1,
    padding: 5,
    backgroundColor: "#f0f0f0",
  },
  tableCol: { width: "50%", borderRightWidth: 1, padding: 5 },
  tableCell: { fontSize: 9 },
});

export const PageOneContent = ({ clientData, serviceFeePercentage }) => (
  <View>
    <View style={styles.section}>
      <View style={styles.columnText}>
        <Text>
          This Company Empanelment Agreement is made and executed on (
          {new Date().toLocaleDateString() || "DD-MM-YYYY"})
        </Text>
        <Text>BY AND BETWEEN</Text>
        <Text>AND</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>
            {clientData?.company_name || "(Your Company Name)"}
          </Text>
          , a company, having its registered office at{" "}
          <Text style={styles.bold}>{clientData?.address || "(Address)"}</Text>,
          hereinafter referred to as the "Client". EPM Staffing Services (OPC)
          Private Limited and{" "}
          <Text style={styles.bold}>
            {clientData?.company_name || "(Your Company Name)"}
          </Text>{" "}
          shall collectively be referred to as the "Parties" and individually as
          a "Party."
        </Text>
      </View>
    </View>

    <View style={styles.section}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeader}>
          1. Job Requirement Sharing & Candidate Submission
        </Text>
      </View>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>1.1</Text> The Client shall share itsjob
        requirements with the Staffing Agency. In response, the Staffing Agency
        shall source and submit qualified candidates to fulfil staffing needs
        across various roles.
      </Text>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>1.2</Text> The Staffing Agency shall follow a
        process focused on quality, efficiency, and timeliness, ensuring the
        delivery of candidates aligned with the Client’s requirements,
        expectations, and workplace culture.
      </Text>
    </View>

    <View style={styles.section}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeader}>
          2. Candidate Submission & Interview Scheduling
        </Text>
      </View>
      <View style={styles.bulletRow}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          Candidates submitted by the Staffing Agency shall initially be shared
          without contact details.
        </Text>
      </View>
      <View style={styles.bulletRow}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          Upon shortlisting and confirmation of interest by the Client,
          interview scheduling (online/telephonic/physical) shall be coordinated
          through the Staffing Agency. Candidate contact details may be shared
          only for recruitment-related communication.
        </Text>
      </View>
    </View>

    <View style={styles.section}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeader}>3. Hiring Confirmation</Text>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>3.1</Text> Outstation candidates called for
        interviews shall be reimbursed directly by the Client.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>3.2</Text> The Client agrees to pay the
        professional charges for any candidate referred by the Staffing Agency,
        even if such candidate is hired directly or indirectly by the Client
        within 6 (six) months from the date of first reference .
        <Text style={styles.bold}>(CV cooling period of 6 months).</Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>3.3</Text> The Client shall confirm the
        continuation of the recruited candidate after 30 days from the date of
        joining.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>3.4</Text> In the absence of any communication
        within 7 (seven) days after completion of 30 days, the placement shall
        be deemed successful.
      </Text>
    </View>

    <View style={styles.section}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeader}>
          4. Payment Terms & Professional Fee
        </Text>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>a.</Text> For each successful hire made by the
        Client of a candidate referred/submitted by the Staffing Agency, the
        Client agrees to pay a one-time professional fee equivalent to
        <Text style={styles.bold}>
          {serviceFeePercentage || 0}% of the candidate's annual Cost to Company
          (CTC).
        </Text>
      </Text>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={[styles.tableCell, styles.bold]}>CTC Range</Text>
          </View>
          <View style={[styles.tableColHeader, { borderRightWidth: 0 }]}>
            <Text style={[styles.tableCell, styles.bold]}>Service Charges</Text>
          </View>
        </View>
        <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>All Levels</Text>
          </View>
          <View style={[styles.tableCol, { borderRightWidth: 0 }]}>
            <Text style={styles.tableCell}>
              {serviceFeePercentage || "%%"}% of Annual gross CTC + GST (if
              applicable)
            </Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

export const PageTwoContent = ({ serviceFeePercentage }) => (
  <View>
    <View style={styles.section}>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>b.</Text> The Tax Invoice shall be raised
        after completion of the confirmation period as stated above.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>c.</Text> The payment due date shall be 7
        (seven) days from the date of receipt of the invoice.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>d.</Text> Payments shall preferably be made
        via net banking. Bank details shall be provided in the invoice.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>d.</Text> All payments shall be made in favour
        of EPM Staffing Services (OPC) Private Limited.
      </Text>
    </View>

    <View style={styles.section}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeader}>
          4.1 Service Fee Eligibility Conditions
        </Text>
      </View>
      <Text style={styles.paragraph}>
        The agreed professional service fee, i.e. % % of Annual gross CTC +{" "}
        {"GST (if applicable)"}{" "}
        <Text style={styles.bold}>
          shall be payable within 60 days from the candidate’s date of joining
        </Text>
        , subject to the fulfilment of the service.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>
          b. Replacement / Lock-in period of 90 days
        </Text>
      </Text>
    </View>

    <View style={styles.section}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeader}>
          5. Continued Default & Legal Implications
        </Text>
      </View>
      <Text style={styles.paragraph}>
        In the event of non-payment of the agreed service fee within the
        stipulated 45-60 days, the Staffing Agency reserves the right to:
      </Text>
      <View style={styles.bulletRow}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          Suspend ongoing recruitment services.
        </Text>
      </View>
      <View style={styles.bulletRow}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          Withhold further candidate submissions;
        </Text>
      </View>
      <View style={styles.bulletRow}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>
          Initiate recovery of outstanding dues.
        </Text>
      </View>
    </View>

    <View style={styles.section}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeader}>
          5.1. Legal Recovery Proceedings
        </Text>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>
          In case of continued default, the Staffing Agency reserves the right
          to initiate recovery proceedings under applicable Indian laws,
          including:
        </Text>
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>a.</Text> This Agreement shall be governed by
        the laws of India.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>b.</Text> Any dispute arising between the
        Parties shall be referred to arbitration under the Arbitration and
        Conciliation Act, 1996.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>c.</Text> Arbitration proceedings shall be
        conducted in Guwahati, in the English language.
      </Text>
      <Text style={[styles.paragraph, styles.bold]}>
        Note: All legal costs, including court fees, arbitration expenses,
        advocate fees, and incidental costs, shall be borne by the Client
      </Text>
    </View>

    <View style={styles.section}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeader}>5. Duration and Termination:</Text>
      </View>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>a.</Text> If accepted, the services shall be
        provided for a duration of 3 years from the date of signing, and any
        alteration to this proposal shall be on mutual agreement, recorded in
        writing.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>b.</Text> This agreement may be terminated by
        either party by giving 30 days’ notice.
      </Text>
    </View>

    <View style={styles.section}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionHeader}>7. Acknowledgement</Text>
      </View>
      <Text style={styles.paragraph}>
        By entering into this Agreement, both Parties acknowledge and agree to
        abide by the terms and conditions stated herein and commit to
        maintaining a professional and mutually beneficial relationship
      </Text>
    </View>
  </View>
);
