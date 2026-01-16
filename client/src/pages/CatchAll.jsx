import React, { useContext } from "react";
import Label from "../Components/common/Label";
import { useNavigate } from "react-router-dom";
import { current_path_context } from "../context/CurrentPathContext";
function CatchAll() {
  const navigate = useNavigate();
  const { current_path } = useContext(current_path_context);
  const handleBack = () => {
    navigate(current_path);
    console.log(current_path);
  };

  const labels = [
    {
      as: "h1",
      text: "404",
      class_name: "text-8xl font-bold text-red opacity-20",
    },
    {
      as: "h2",
      text: "Page Not Found",
      class_name: "text-2xl font-semibold text-text_b",
    },
    {
      as: "p",
      text: "The link you followed may be broken, or the page may have been removed.",
      class_name: "text-md text-text_b_l mb-4",
    },
  ];
  return (
    <main className="w-full h-dvh flex flex-col items-center justify-center bg-b_cream p-6 text-center">
      <div className="flex flex-col items-center gap-4 max-w-md">
        {labels.map((label, index) => (
          <Label
            key={index}
            as={label.as}
            text={label.text}
            class_name={label.class_name}
          />
        ))}
        <span
          onClick={handleBack}
          className="cursor-pointer px-8 py-3 bg-red text-text_white rounded-small font-medium hover:bg-red-dark transition-colors shadow-red_light"
        >
          <Label text="Return to Homepage" />
        </span>
      </div>
    </main>
  );
}

export default CatchAll;
