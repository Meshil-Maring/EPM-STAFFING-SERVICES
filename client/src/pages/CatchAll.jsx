import React from "react";
import { Link } from "react-router-dom";
import Label from "../Components/common/Label";

function CatchAll() {
  return (
    <main className="w-full h-dvh flex flex-col items-center justify-center bg-b_cream p-6 text-center">
      <div className="flex flex-col items-center gap-4 max-w-md">
        <Label
          as="h1"
          text="404"
          class_name="text-8xl font-bold text-red opacity-20"
        />

        <Label
          as="h2"
          text="Page Not Found"
          class_name="text-2xl font-semibold text-text_b"
        />

        <Label
          as="p"
          text="The link you followed may be broken, or the page may have been removed."
          class_name="text-md text-text_b_l mb-4"
        />

        <Link
          to="/"
          className="px-8 py-3 bg-red text-text_white rounded-small font-medium hover:bg-red-dark transition-colors shadow-red_light"
        >
          <Label text="Return to Homepage" />
        </Link>
      </div>
    </main>
  );
}

export default CatchAll;
