import React from "react";
import SettingsHeaders from "./SettingsHeaders";
import Location from "./Location";
import Button from "../../common/Button";
import Icon from "../../common/Icon";

function LocationInformation() {
  const handleDeleting = () => {
    alert("deleting location...");
  };
  const locationInfo = [
    {
      name: "Bangalore Office (HQ)",
      address: "123 Business Park, Sector 6",
      link_label: "Headquarters",
      link: "https://maps.google.com/?q=123+Business+Park+Sector+6+Bangalore",
    },
    {
      heading: "Mumbai Office",
      address: "435 Corporate Tower, Andheri East",
      link_label: "Regional Office",
      link: "https://maps.google.com/?q=435+Corporate+Tower+Andheri+East+Mumbai",
    },
  ];
  return (
    <section className="w-full pb-10 flex flex-col text-text_b text-sm border p-6 md:p-8 rounded-small border-lighter shadow-sm items-center justify-start gap-8 bg-white">
      <SettingsHeaders
        icon_bg="bg-nevy_blue"
        icon="ri-map-pin-line"
        heading="Branch Locations"
        label="Your offices across different cities"
      />

      <ul className="w-full flex flex-col gap-4 list-none p-0 m-0">
        {locationInfo.map((location, index) => (
          <li
            key={index}
            className="w-full flex items-start gap-4 relative flex-row"
          >
            <Location
              heading={location.name}
              address={location.address}
              link_label={location.link_label}
              link={location.link}
            />
            <Button
              onclick={handleDeleting}
              text={"Delete"}
              class_name="text-text_white absolute top-4 right-4 bg-g_btn rounded-small py-1 px-4 font-lighter"
            />
          </li>
        ))}
      </ul>
      <Button
        text={"Add New Branch"}
        class_name="border border-lighter py-1 hover:bg-lighter text-center w-full rounded-small"
      />
    </section>
  );
}

export default LocationInformation;
