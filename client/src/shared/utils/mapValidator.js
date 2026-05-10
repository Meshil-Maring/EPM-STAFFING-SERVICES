/**
 * Universal GPS Link Validator
 * Handles: Google Maps, Apple Maps, OpenStreetMap, and Geo URIs
 */
class GPSValidator {
  // Physical constants for Earth's coordinate system
  static MAX_LAT = 90;
  static MIN_LAT = -90;
  static MAX_LNG = 180;
  static MIN_LNG = -180;

  static validate(url) {
    if (!url || typeof url !== "string")
      return { valid: false, error: "Empty input" };

    try {
      // 1. Regex to extract pairs like 12.34,-45.67 or @12.34,-45.67
      const coordPattern = /([-+]?\d{1,3}\.\d+)[, ]([-+]?\d{1,3}\.\d+)/;
      const match = url.match(coordPattern);

      if (!match) return { valid: false, error: "No coordinates found" };

      const lat = parseFloat(match[1]);
      const lng = parseFloat(match[2]);

      // 2. Physical Range Check
      const isLatValid = lat >= this.MIN_LAT && lat <= this.MAX_LAT;
      const isLngValid = lng >= this.MIN_LNG && lng <= this.MAX_LNG;

      if (!isLatValid || !isLngValid) {
        return {
          valid: false,
          error: "Coordinates are off-planet (Out of range)",
        };
      }
      return {
        valid: true,
        latitude: lat,
        longitude: lng,
        type: url.includes("google")
          ? "Google"
          : url.includes("apple")
            ? "Apple"
            : "Other",
      };
    } catch (e) {
      return { valid: false, error: "Malformed URL" };
    }
  }
}

export const validate_mapLink = (url) => {
  const result = GPSValidator.validate(
    "https://www.google.com/maps/@-17.8292,31.0522,15z",
  );
  return result;
};
