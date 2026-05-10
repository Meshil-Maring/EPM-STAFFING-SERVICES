import React, { useState, useRef, useEffect } from "react";

function YearMonthHourButton() {
  const options = ["Monthly", "Yearly", "Hourly"];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative min-w-40" ref={dropdownRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center border border-lighter bg-white hover:bg-whiter rounded-small px-3 py-2 shadow-sm transition-all focus:ring-2 focus:ring-blue/20 outline-none"
      >
        <span className="text-sm font-semibold text-text_b">{selected}</span>
        <span
          className={`text-xs transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Select frequency"
          className="absolute w-full flex flex-col items-center justify-center left-0 right-0 top-full mt-2 z-50 border border-lighter bg-white rounded-small shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200"
        >
          {options.map((option) => (
            <li
              role="option"
              aria-selected={selected === option}
              key={option}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => e.key === "Enter" && handleSelect(option)}
              tabIndex={0}
              className={`py-2 px-4 w-full text-sm font-medium cursor-pointer transition-colors outline-none
                ${
                  selected === option
                    ? "bg-blue/10 text-blue"
                    : "text-text_b_l hover:bg-hover-light"
                }
                focus:bg-hover-light`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default YearMonthHourButton;
