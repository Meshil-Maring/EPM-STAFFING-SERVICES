import React from "react";
import Icon from "../../../common/Icon";
import Input from "../../../common/Input";

function SearchCandidate({ setSearchKey }) {
  const handleSearching = (value, id) => {
    setSearchKey(value);
  };
  return (
    <div className="w-full flex flex-row items-center relative">
      <Icon
        icon={"ri-search-line"}
        class_name={`absolute top-0 bottom-0 left-2 flex items-center justify-center`}
      />
      <Input
        onchange={handleSearching}
        placeholder="Search candidate by name, experience..."
        class_name={
          "w-full py-2 px-8 rounded-small placeholder-light/60 text-sm border-2 bg-lighter/50 focus:border-none border-light focus:outline-none focus:ring-2 ring-nevy_blue"
        }
      />
    </div>
  );
}

export default SearchCandidate;
