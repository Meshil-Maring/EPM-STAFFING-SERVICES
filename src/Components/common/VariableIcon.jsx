import Icon from "./Icon";

function VariableIcon({ Icon_path, b_radius = "md" }) {
  return (
    <div
      className={`w-full h-full bg-gradient-btn text-lighter flex items-center justify-center py-1 px-2 rounded-${b_radius}`}
    >
      <Icon>
        <path d={Icon_path} />
      </Icon>
    </div>
  );
}

export default VariableIcon;
