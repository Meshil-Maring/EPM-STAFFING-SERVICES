import Icon from "./Icon";

function ProfileIcon({ onSelect }) {
  return (
    <div className="flex border cursor-pointer p-4 tranition-all duration-100 ease-in-out bg-gradient-btn hover:bg-hover-bth text-whiter items-center justify-center max-h-10 max-w-10 rounded-full">
      <Icon>
        <path d="M20.3999 21.6L20.4003 18.0003C20.4004 16.012 18.7886 14.4 16.8003 14.4H7.20099C5.21292 14.4 3.60121 16.0116 3.60099 17.9996L3.60059 21.6M15.6006 6.00002C15.6006 7.98825 13.9888 9.60002 12.0006 9.60002C10.0124 9.60002 8.40059 7.98825 8.40059 6.00002C8.40059 4.0118 10.0124 2.40002 12.0006 2.40002C13.9888 2.40002 15.6006 4.0118 15.6006 6.00002Z" />
      </Icon>
    </div>
  );
}

export default ProfileIcon;
