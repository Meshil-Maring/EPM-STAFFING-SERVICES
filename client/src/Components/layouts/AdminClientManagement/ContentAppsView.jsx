import React, { useRef, useState, useEffect, Suspense } from "react";
import ClientManagementCards from "./ClientManagementCards";
import Common_Client_Management_Searching_And_View from "./Common_Client_Management_Searching_And_View";

function ContentAppsView() {
  const containerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return null;
    const updateScroll = () => {
      if (container.scrollTop > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    container.addEventListener("scroll", updateScroll);

    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <main
      ref={containerRef}
      className="w-full h-full flex flex-col bg-whiter overflow-y-auto scroll-smooth"
    >
      <div className="px-6 pt-2 pb-10 flex flex-col gap-6">
        <Common_Client_Management_Searching_And_View scrolled={scrolled} />

        <Suspense
          fallback={
            <div className="min-h-screen animate-pulse bg-lighter rounded-small" />
          }
        >
          <ClientManagementCards />
        </Suspense>
      </div>
    </main>
  );
}

export default ContentAppsView;
