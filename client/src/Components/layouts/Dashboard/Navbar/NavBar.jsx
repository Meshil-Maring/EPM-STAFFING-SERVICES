/**
 * Navigation sidebar component for the Dashboard
 *
 * This component renders the main navigation sidebar for authenticated users
 * in the dashboard. It includes the company branding header and navigation
 * buttons for different sections of the application. The sidebar is fixed
 * and provides persistent navigation throughout the dashboard experience.
 */

import React from "react";
import NavButtons from "./NavButtons";
import Icon from "../../../common/Icon";
import Label from "../../../common/Label";

/**
 * Main navigation sidebar component
 *
 * @returns {JSX.Element} The complete navigation sidebar layout
 */
function Navbar() {
  return (
    <aside className="w-64 md:w-72 lg:w-80 px-4 py-4 gap-6 h-full flex flex-col items-center justify-start border-r border-lighter bg-white sticky top-0">
      {/* Company branding header section */}
      <div
        className="flex border-b pb-4 border-lighter w-full flex-row items-center justify-start gap-3 cursor-pointer group transition-all"
        role="banner"
      >
        {/* Company logo/icon */}
        <div
          className="bg-g_btn text-white rounded-large p-1.5 shadow-md group-hover:shadow-lg transition-shadow"
          aria-hidden="true"
        >
          <Icon icon="ri-building-line" class_name="text-2xl w-8 h-8" />
        </div>

        {/* Company name and tagline */}
        <div className="flex flex-col items-start justify-center">
          <Label
            as="h2"
            text="Total Consultancy"
            class_name="text-[clamp(1em,2vw,1.2em)] font-semibold text-text_b leading-none"
          />
          <Label
            as="span"
            text="Service Platform"
            class_name="text-[clamp(0.6em,1.5vw,0.8em)] text-text_b_l opacity-70 mt-1"
          />
        </div>
      </div>

      {/* Main navigation buttons section */}
      <nav
        className="w-full flex-1 overflow-y-auto"
        aria-label="Sidebar Navigation"
      >
        <NavButtons />
      </nav>
    </aside>
  );
}

export default Navbar;
