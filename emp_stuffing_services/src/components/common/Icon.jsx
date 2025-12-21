const Icon = ({
  size = 24,
  fill = "none",
  stroke = "currentColor",
  strokeW = "1.5",
  viewBox = "0 0 24 24",
  text,
  children,
  width = "full",
  height = "full",
  padding_x = "1",
  padding_y = "1",
  flex = "flex",
  align_items = "center",
  justify_items = "center",
  border_edge = "",
  border_color = "border-lighter",
  gap = "2",
  margin_x = "",
}) => (
  <div
    className={`w-${width} h-${height} py-${padding_y} px-${padding_x} ${flex} items-${align_items} justify-${justify_items} border-${border_edge} border-${border_color} gap-${gap} mx-${margin_x}`}
  >
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke={stroke} strokeWidth={strokeW}>
        {children}
      </g>
    </svg>
    {text && <span className="text-inherit">{text}</span>}
  </div>
);

export default Icon;
