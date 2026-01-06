import Icon from "./Icon";

function ButtonIcon({
  text,
  icon,
  id,
  onSelect,
  clicked,
  set_gradient = false,
  shadow = false,
  class_name = `items-center justify-start w-full py-1 px-4 rounded-small transition-all ease-in-out duration-100 ${
    id === "nav" ? `cursor-pointer` : ""
  } flex gap-1 ${
    clicked || set_gradient
      ? `bg-gradient-btn text-whiter`
      : "border border-lighter text-primary hover:bg-lighter"
  } ${shadow ? "shadow-heavy" : ""}`,
}) {
  return (
    <div onClick={() => onSelect(text)} className={`${class_name}`}>
      <Icon icon={icon} class_name="text-lg" />
      <p>{text}</p>
    </div>
  );
}

export default ButtonIcon;
