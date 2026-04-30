import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  sigContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  sigBox: { width: "45%" },
  label: { fontSize: 11, fontWeight: "bold", marginBottom: 10 },
  stampBox: {
    width: 70,
    height: 70,
    border: 1,
    borderStyle: "dashed",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 8,
    color: "grey",
  },
  details: { marginTop: 10, fontSize: 9, lineHeight: 1.4 },
});

const PDFSignatures = ({ clientData }) => (
  <View style={styles.sigContainer}>
    {/* Proposed Section */}
    <View style={styles.sigBox}>
      <Text style={styles.label}>Proposed</Text>
      <View style={styles.stampBox}>
        <Text>Stamp</Text>
      </View>
      <View style={styles.details}>
        <Text>...................................</Text>
        <Text style={{ fontWeight: "bold" }}>Dangshawapipa Angrung</Text>
        <Text>Director</Text>
        <Text>EPM Staffing Services OPC Private Limited</Text>
      </View>
    </View>

    {/* Accepted Section */}
    <View style={styles.sigBox}>
      <Text style={styles.label}>Accepted</Text>
      <View style={styles.details}>
        <Text>Signature: ....................................</Text>
        <Text>Name of Competent Authority: .................</Text>
        <Text>Designation: .................................</Text>
        <Text>
          Company Name: {clientData?.company_name || ".................."}
        </Text>
        <Text>CIN: {clientData?.cin || ".................."}</Text>
      </View>
    </View>
  </View>
);

export default PDFSignatures;
