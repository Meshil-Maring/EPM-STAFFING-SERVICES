import React, { useRef, useState, useEffect, useContext } from "react";
import ClientManagementCards from "./ClientManagementCards";
import Common_Client_Management_Searching_And_View from "./Common_Client_Management_Searching_And_View";
function ContentAppsView() {
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    const updateScroll = () => {
      const container_scrollTop = container.scrollTop;
      const target_scrollTop = target.scrollTop;
      if (container_scrollTop > target_scrollTop) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    container.addEventListener("scroll", updateScroll);

    return () => container.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full gap-5 px-6 pt-4 pb-10 flex flex-col transition-all ease-in-out duration-120 overflow-y-auto"
    >
      <Common_Client_Management_Searching_And_View
        refer={targetRef}
        scrolled={scrolled}
      />
      <ClientManagementCards />
    </div>
  );
}

export default ContentAppsView;
