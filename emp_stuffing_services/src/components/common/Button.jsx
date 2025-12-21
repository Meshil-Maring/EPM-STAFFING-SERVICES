import Icon from "./Icon";

function Button({
  text,
  pathData,
  Clicked,
  width = 10,
  height = 10,
  px = 1,
  py = 1,
  justify_items = "center",
  align_items = "center",
  gap = 2,
  flex = "row",
  bg = "bg-btn-gradient",
  border = 1,
  border_color = "candy-red",
  text_color = "primary",
  border_radius = "md",
}) {
  return (
    <div
      onClick={Clicked}
      className={`flex flex-${flex} gap-${gap} ${bg} items-${align_items} h-${height} w-${width} py-${py} px-${px} justify-${justify_items} border-${border} border${border_color} text-${text_color} rounded-${border_radius} px-${px} py-${py}`}
    >
      {pathData && (
        <Icon text={text} justify_items="start" width="fit">
          <path d={pathData} />
        </Icon>
      )}
    </div>
  );
}

export default Button;
