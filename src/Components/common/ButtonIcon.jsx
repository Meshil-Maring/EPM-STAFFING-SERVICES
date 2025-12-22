import Icon from "./Icon";
import Settings from "./Settings";

function ButtonIcon({
  text,
  id,
  pathData,
  onSelect,
  clicked,
  width = "full",
  set_gradient = false,
  shadow = false,
}) {
  const handleButtonClick = (text) => {
    if (id === "nav") {
      onSelect(text);
    }
  };

  const isObject = (item) => {
    return item && typeof item === "object" && !Array.isArray(item);
  };

  return (
    <div
      onClick={() => handleButtonClick(text)}
      className={`transition-all ease-in-out duration-100 items-center justify-start h-fit w-${width} py-1 px-4 rounded-lg transition-all ease-in-out duration-100 ${
        id === "nav" ? `cursor-pointer` : ""
      } flex gap-2 ${
        clicked || set_gradient
          ? `bg-gradient-btn text-whiter`
          : "border border-lighter text-primary hover:bg-lighter"
      } ${shadow ? "shadow-heavy" : ""}`}
    >
      {!isObject(pathData) && (
        <Icon text={text}>
          <path d={pathData} />
        </Icon>
      )}
      {isObject(pathData) && (
        <>
          <Settings path_1={pathData["id_1"]} path_2={pathData["id_2"]} />
          <p>{text}</p>
        </>
      )}
    </div>
  );
}

export default ButtonIcon;
