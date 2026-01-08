import React from "react";
import Input from "../../common/Input";

function mainContent() {
  return (
    <div className="w-full border-2 flex flex-col items-center justify-start">
      <Input
        placeholder="Search clients by name, industry, or status"
        type="text"
        class_name="w-full focus:outline-none placeholder-lighter"
      />
      Good
    </div>
  );
}

export default mainContent;
