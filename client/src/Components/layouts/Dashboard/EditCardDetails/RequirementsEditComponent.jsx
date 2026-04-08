import React from "react";
import Input from "../../../common/Input";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

/**
 * RequirementsEditComponent - Renders editable list items for requirements, responsibilities, or benefits
 *
 * The data structure is a flat array: ["text1", "text2", ...]
 * This component renders them as editable inputs
 *
 * @param {Object} props - Component props
 * @param {Array} props.data_prop - Array of strings (flat array format)
 * @param {Function} props.updateReq_Res_Ben - Callback to update a value (section_id, index, value)
 * @param {string} props.icon_class - CSS classes for the delete icon
 * @param {string} props.button - Text for the add button
 * @param {Function} props.deletingReq_Res_Ben - Callback to delete an item (section_id, index)
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
  // Handle flat array format: ["text1", "text2", ...]
  const editableItems = Object.values(data_prop || {});

  // Remove item at the deleted index
  const handleDelete = (i) => {
    deletingReq_Res_Ben(section_id, i);
  };

  // Handle input change
  const handleInputChange = (value, i) => {
    updateReq_Res_Ben(section_id, i, value);
  };

  return (
    <div className="flex flex-col gap-3 w-full items-start justify-start">
      {editableItems.map((item, i) => (
        <div
          key={`prop-${i}`}
          className="w-full flex gap-1 flex-row items-center justify-start"
        >
          <input
            id={item.key}
            defaultValue={item.value}
            onChange={(e) => handleInputChange(e.target.value, i)}
            className="py-1 px-2 rounded-small border border-light/60 focus:outline-none focus:ring-1 ring-nevy_blue w-full"
          />
          <span
            className={`cursor-pointer transition-opacity ${
              editableItems.length > 1 ? "" : "opacity-30 pointer-events-none"
            }`}
            onClick={() => handleDelete(i)}
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
