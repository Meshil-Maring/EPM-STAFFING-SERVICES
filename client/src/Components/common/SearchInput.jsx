import React, { useState, useContext } from "react";
import Icon from "./Icon";
import Input from "./Input";

function SearchInput({ onSearchChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div className="relative w-full rounded-small bg-input-field text-primary tracking-wide group">
      <label htmlFor="job-search-input" className="sr-only">
        Search jobs by title, location, or skills
      </label>

      <div
        className="w-10 h-10 absolute left-0 top-0 flex items-center justify-center pointer-events-none text-icon-primary z-10"
        aria-hidden="true"
      >
        <Icon
          icon="ri-search-line"
          class_name="text-xl text-lighter group-focus-within:text-primary transition-colors"
        />
      </div>

      <Input
        require={false}
        id="job-search-input"
        name="job-search"
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search jobs by title, location, or skills"
        class_name="w-full pl-10 pr-4 py-2.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-small border border-lighter transition-all text-sm"
      />
    </div>
  );
}

export default SearchInput;
