import Label from "./Label";

function CardLabels({ slots_available, date_posted }) {
  return (
    <div className="w-fit flex flex-wrap items-center text-xs justify-start gap-4">
      <span className="flex flex-row items-center justify-center gap-1 after:absolute relative text-lighter after:left-[-5px] after:bottom-0.5 after:bg-red-light after:w-1 after:h-1 after:rounded-full">
        <Label text={slots_available} font_size="xs" color="lighter" />
        <span>available</span>
      </span>
      <Label text={date_posted} font_size="xs" color="lighter" />
    </div>
  );
}

export default CardLabels;
