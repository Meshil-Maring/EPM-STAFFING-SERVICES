const Icon = ({
  size = 22,
  fill = "none",
  stroke = "currentColor",
  strokeW = "1.5",
  viewBox = "0 0 24 24",
  text,
  card = false,
  children,
  icon_bg = false,
}) => (
  <div className="flex gap-2 text-[18px] flex-row items-center justify-center">
    {children && (
      <span
        className={`${
          icon_bg ? "bg-lighter" : ""
        } p-0.5 rounded-sm flex items-center justify-center`}
      >
        <svg
          width={size}
          height={size}
          viewBox={viewBox}
          fill={fill}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke={stroke}
            strokeWidth={strokeW}
            // transform="translate(4.25, 4.25)"
          >
            {children}
          </g>
        </svg>
      </span>
    )}
    {text && (
      <span className={`text-inherit ${card ? "text-xs" : ""}`}>{text}</span>
    )}
  </div>
);

export default Icon;
