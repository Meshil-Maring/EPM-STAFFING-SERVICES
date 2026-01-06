import React from "react";
import Icon from "./Icon";
import Input from "./Input";

function SearchInput() {
  return (
    <div className="relative w-full rounded-small bg-input-field text-primary tracking-wide">
      <div className="w-fit text-icon-primary h-fit absolute left-2 top-0 bottom-0 my-auto">
        <Icon icon="ri-search-line" class_name="text-2xl text-lighter" />
      </div>
      <Input
        class_name="w-full px-10 py-1.5 focus:outline-none focus:ring-2 focus:ring-lighter rounded-small"
        type="text"
        placeholder="Search jobs by title, location, or skills"
      />
    </div>
  );
}

export default SearchInput;
