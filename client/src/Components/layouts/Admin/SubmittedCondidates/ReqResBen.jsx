import React from "react";
import Label from "../../../common/Label";

/**
 * Helper function to extract string values from nested data structure
 * The backend returns data in format: [{ "0": { "0": "text1", "1": "text2" } }]
 * This function handles both flat and nested structures
 * @param {any} item - The item to extract values from
 * @returns {string[]} Array of string values
 */
function extractTextValues(item) {
  const results = [];

  if (typeof item === "string") {
    return [item];
  }

  if (typeof item === "object" && item !== null) {
    Object.values(item).forEach((value) => {
      if (typeof value === "string") {
        results.push(value);
      } else if (typeof value === "object" && value !== null) {
        // Recursively extract from nested objects
        results.push(...extractTextValues(value));
      }
    });
  }

  return results;
}

/**
 * ReqResBen component - Displays job requirements, responsibilities, and benefits
 * @param {Object} props - Component props
 * @param {Object} props.currentJob - Current job data with requirements, responsibilities, and benefits
 * @returns {JSX.Element} Rendered requirements, responsibilities, and benefits component
 */
function ReqResBen({ currentJob = {} }) {
  // Get job requirements with fallback to empty array
  const requirements = Array.isArray(currentJob?.requirements)
    ? [...currentJob?.requirements]
    : [];
  // Get job responsibilities with fallback to empty array
  const responsibilities = Array.isArray(currentJob?.responsibilities)
    ? [...currentJob?.responsibilities]
    : [];
  // Get job benefits with fallback to empty array
  const benefits = Array.isArray(currentJob?.benefits)
    ? [...currentJob?.benefits]
    : [];

  // Helper to render a list item with bullet point
  const renderListItem = (text, key) => (
    <div key={key} className="w-full flex flex-col">
      <div className="flex flex-row gap-1 items-center">
        <span className="w-4 h-4 rounded-full border-4 border-red-dark" />
        <Label text={text} class_name="" />
      </div>
    </div>
  );

  return (
    <div className="w-full gap-8 flex flex-col justify-start text-sm">
      {/* Requirements section */}
      <div className="w-full flex flex-col gap-2 justify-center">
        <Label
          text="Requirements"
          class_name="font-semibold pb-2 px-2 border-b border-lighter"
        />
        {requirements.map((req, i) => {
          const values = extractTextValues(req);
          return values.map((val, j) => renderListItem(val, `req-${i}-${j}`));
        })}
      </div>

      {/* Responsibilities section */}
      <div className="w-full flex flex-col gap-2 justify-center">
        <Label
          text="Responsibilities"
          class_name="font-semibold pb-2 px-2 border-b border-lighter"
        />
        {responsibilities.map((res, i) => {
          const values = extractTextValues(res);
          return values.map((val, j) => renderListItem(val, `res-${i}-${j}`));
        })}
      </div>

      {/* Benefits section */}
      <div className="w-full flex flex-col gap-2 justify-center">
        <Label
          text="Benefits & Perks"
          class_name="font-semibold pb-2 px-2 border-b border-lighter"
        />
        {benefits.map((ben, i) => {
          const values = extractTextValues(ben);
          return values.map((val, j) => renderListItem(val, `ben-${i}-${j}`));
        })}
      </div>
    </div>
  );
}

export default ReqResBen;
