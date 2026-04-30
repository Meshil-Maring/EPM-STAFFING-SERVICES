import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: { marginBottom: 20, textAlign: "center" },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  logo: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  companyName: { fontSize: 16, fontWeight: "bold", color: "#dd6b20" },
  subHeaderGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingVertical: 5,
    borderColor: "#17377E",
  },
  contactCol: { width: "35%", fontSize: 8, textAlign: "left" },
  slogan: {
    width: "30%",
    fontSize: 12,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#17377E",
    textAlign: "center",
  },
  rightContactCol: { width: "35%", fontSize: 8, textAlign: "right" },
  refNo: { fontSize: 9, marginTop: 10, textAlign: "left" },
  docTitle: {
    fontSize: 12,
    color: "#17377E",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    textDecoration: "underline",
  },
});

const PDFHeader = () => (
  <View style={styles.headerContainer}>
    <View style={styles.titleRow}>
      {/* Ensure the path to your logo is correct for your environment */}
      <Image src="/Logo-EPM-1.png" style={styles.logo} />
      <Text style={styles.companyName}>
        EPM STAFFING SERVICES (OPC) PVT. LTD.
      </Text>
    </View>
    <View style={styles.subHeaderGrid}>
      <View style={styles.contactCol}>
        <Text>Imphal, Manipur - 795001</Text>
        <Text>CIN: U78100MN2025OPC015365</Text>
      </View>
      <Text style={styles.slogan}>Talent Delivered</Text>
      <View style={styles.rightContactCol}>
        <Text>+91 9862279597</Text>
        <Text>admin@epmstaffingservices.com</Text>
        <Text>careerepmstaffingservices@gmail.com</Text>
      </View>
    </View>
    <Text style={styles.refNo}>No. 015/EPMSS-CMA/2026-27</Text>
    <Text style={styles.docTitle}>COMMERCIAL EMPANELMENT AGREEMENT</Text>
  </View>
);

export default PDFHeader;
