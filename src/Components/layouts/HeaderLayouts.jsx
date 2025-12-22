import ButtonIcon from "../common/ButtonIcon";
import Icon from "../common/Icon";
import LogoHeadings from "./LogoHeadings";
import ProfileIcon from "../common/ProfileIcon";

function HeaderLayouts() {
  const handleAgreement = (name) => {
    alert(`Button ${name} clicked!`);
  };
  return (
    <div className="flex pr-8 pl-4 py-2 border-b border-lighter flex-row items-center justify-start">
      <LogoHeadings />
      <div className="flex flex-row gap-4  items-center justify-center ml-auto">
        <ButtonIcon
          text="Agreement"
          id="nav"
          pathData="
        M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20M16 13H8M16 17H8M10 9H8
        "
          onSelect={handleAgreement}
        />
        <Icon>
          <path d="M6.08333 17.8409C6.79101 18.4062 7.72553 18.75 8.75 18.75C9.77447 18.75 10.709 18.4062 11.4167 17.8409M1.25763 14.9318C0.836021 14.9318 0.60054 14.2694 0.855574 13.9014C1.44736 13.0475 2.01855 11.7951 2.01855 10.287L2.04296 8.10166C2.04296 4.04145 5.04581 0.75 8.75 0.75C12.5088 0.75 15.5558 4.08993 15.5558 8.20995L15.5314 10.287C15.5314 11.8055 16.0829 13.0647 16.6506 13.919C16.8958 14.2879 16.6597 14.9318 16.2433 14.9318H1.25763Z" />
        </Icon>
        <ProfileIcon />
      </div>
    </div>
  );
}

export default HeaderLayouts;
