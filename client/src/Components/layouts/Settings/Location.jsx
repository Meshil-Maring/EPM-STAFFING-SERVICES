import React from "react";
import Label from "../../common/Label";

function Location({
  heading = "Location",
  address = "",
  link,
  link_label = "View on Map",
}) {
  return (
    <section className="w-full p-4 rounded-small bg-red-lighter flex flex-col items-start justify-start gap-1">
      <header className="w-full">
        <Label
          as="h3"
          text={heading}
          class_name="font-semibold text-md text-text_b"
        />
      </header>

      <Label
        as="p"
        text={address}
        class_name="text-sm text-text_b_l opacity-90"
      />

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 text-nevy_blue hover:underline focus-visible:ring-2 focus-visible:ring-nevy_blue rounded-sm outline-none transition-all"
        aria-label={`${link_label} at ${address}`}
      >
        <span className="text-sm font-medium">{link_label}</span>
      </a>
    </section>
  );
}

export default Location;
