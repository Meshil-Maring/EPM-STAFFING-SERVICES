import React from "react";
import Input from "../../../common/Input";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

/**
 * RequirementsEditComponent - Renders editable list items for requirements, responsibilities, or benefits
 *
 * The data structure from backend is: [{ "0": { "0": "text1", "1": "text2" } }]
 * This component extracts the inner string values and renders them as editable inputs
 *
 * @param {Object} props - Component props
 * @param {Array} props.data_prop - Array containing the nested object structure
 * @param {Function} props.updateReq_Res_Ben - Callback to update a value (section_id, key, value)
 * @param {string} props.icon_class - CSS classes for the delete icon
 * @param {string} props.button - Text for the add button
 * @param {Function} props.deletingReq_Res_Ben - Callback to delete an item (section_id, key)
 * @param {Function} props.addingReq_Res_Ben - Callback to add a new item (section_id)
 * @param {string} props.section_id - The section identifier (requirements, responsibilities, benefits)
 */
function RequirementsEditComponent({
  data_prop,
  updateReq_Res_Ben,
  icon_class,
  button,
  deletingReq_Res_Ben,
  addingReq_Res_Ben,
  section_id,
}) {
  // Helper function to extract string values from nested structure
  // Handles both flat [{ "0": "text" }] and nested [{ "0": { "0": "text" } }] structures
  const extractEditableItems = (data) => {
    const items = [];
    const firstObj = data?.[0];

    if (!firstObj || typeof firstObj !== "object") return items;

    Object.entries(firstObj).forEach(([outerKey, outerValue]) => {
      if (typeof outerValue === "string") {
        // Flat structure: [{ "0": "text" }]
        items.push({ key: outerKey, value: outerValue });
      } else if (typeof outerValue === "object" && outerValue !== null) {
        // Nested structure: [{ "0": { "0": "text1", "1": "text2" } }]
        Object.entries(outerValue).forEach(([innerKey, innerValue]) => {
          if (typeof innerValue === "string") {
            // Use combined key for nested items
            items.push({
              key: `${outerKey}-${innerKey}`,
              value: innerValue,
              parentKey: outerKey,
              childKey: innerKey,
            });
          }
        });
      }
    });

    return items;
  };

  const editableItems = extractEditableItems(data_prop);

  // Remove key at the deleted index
  const handleDelete = (item) => {
    // For nested items, delete using parentKey and childKey
    // For flat items, delete using the key directly
    if (item.parentKey !== undefined) {
      deletingReq_Res_Ben(section_id, item.childKey);
    } else {
      deletingReq_Res_Ben(section_id, item.key);
    }
  };

  // Handle input change
  const handleInputChange = (value, item) => {
    if (item.parentKey !== undefined) {
      updateReq_Res_Ben(section_id, item.childKey, value);
    } else {
      updateReq_Res_Ben(section_id, item.key, value);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full items-start justify-start">
      {editableItems.map((item) => (
        <div
          key={`prop-${item.key}`}
          className="w-full flex gap-1 flex-row items-center justify-start"
        >
          <Input
            id={item.key}
            value={item.value}
            onchange={handleInputChange}
            class_name="py-1 px-2 rounded-small border border-light/60 focus:outline-none focus:ring-1 ring-nevy_blue w-full"
          />
          <span
            className={`cursor-pointer transition-opacity ${
              editableItems.length > 1 ? "" : "opacity-30 pointer-events-none"
            }`}
            onClick={() => handleDelete(item)}
          >
            <Icon icon="ri-close-line" class_name={icon_class} />
          </span>
        </div>
      ))}

      <div
        onClick={() => addingReq_Res_Ben(section_id)}
        className="cursor-pointer hover:scale-105 transition-all"
      >
        <Label
          class_name="font-lighter text-sm text-nevy_blue"
          text={button || "+ Add Item"}
        />
      </div>
    </div>
  );
}

export default RequirementsEditComponent;
