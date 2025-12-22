import React from "react";
import Icon from "./Icon";

function SearchInput() {
  return (
    <div className="relative w-full focus:border focus:border-primary rounded-lg bg-input-field text-primary tracking-wide">
      <div className="w-fit text-icon-primary h-fit absolute left-2 top-0 bottom-0 my-auto">
        <Icon>
          <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" />
        </Icon>
      </div>
      <input
        className="w-full px-9 py-1.5 focus:outline-none"
        type="text"
        placeholder="Search jobs by title, location, or skills"
      />
    </div>
  );
}

export default SearchInput;
