import Image from "../../../shared/components/ui/Image";
import ColumnLabels from "./ColumnLabels";
import Button from "../../../shared/components/ui/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logo.svg"

function HomeTopBar() {
  const navigate = useNavigate();
  const handleBtnClick = () => navigate("/auth/signin");

  return (
    <header className="w-full py-3 px-6 flex flex-row items-center justify-between sticky top-0 left-0 z-50 bg-white/85 backdrop-blur-md border-b border-lighter shadow-sm">
      <div
        className="flex flex-row items-center justify-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
        role="button"
        aria-label="Home"
        tabIndex={0}
      >
        <Image
          link={Logo}
          alt="EMP Staffing Logo"
          width="24"
          height="24"
          class_name="rounded-full object-contain shadow-sm"
        />

        <ColumnLabels
          heading="EPM STAFFING SERVICES"
          label="OPC PVT. LTD."
          heading_style="text-[clamp(1em,2vw,1.2em)] font-semibold text-text_b leading-none"
          label_style="text-[clamp(0.6em,1.5vw,0.8em)] text-text_b opacity-50 mt-1"
        />
      </div>

      <nav
        className="flex flex-row gap-2 items-center"
        aria-label="Primary Navigation"
      >
        <Button
          onclick={handleBtnClick}
          type="button"
          text="Login"
          class_name="text-sm md:text-base font-medium text-text_b hover:text-red transition-colors px-5 py-2.5 border border-lighter rounded-small hover:border-red/30 focus:ring-2 focus:ring-red/20 outline-none"
        />
      </nav>
    </header>
  );
}

export default HomeTopBar;
