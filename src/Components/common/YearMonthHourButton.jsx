import React, { useState } from "react";

function YearMonthHourButton() {
  const options = ["Monthly", "Yearly", "Hourly"];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="min-w-40 relative flex justify-between items-center border border-red-light bg-red-light rounded-lg px-2 py-1 shadow-sm"
    >
      {selected}
      <span className="text-heavy">{isOpen ? "▲" : "▼"}</span>

      {isOpen && (
        <ul
          type="text"
          className="absolute w-full flex flex-col items-center justify-center left-0 right-0 top-full mt-2 z-50 border border-lighter bg-whiter rounded-lg shadow-lg overflow-hidden animate-in fade-in duration-200"
        >
          {options.map((option) => (
            <li
              type="text"
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}
              className="py-3 px-2 w-full text-primary hover:bg-blue-hover hover:text-blue cursor-pointer transition-colors"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}

export default YearMonthHourButton;
