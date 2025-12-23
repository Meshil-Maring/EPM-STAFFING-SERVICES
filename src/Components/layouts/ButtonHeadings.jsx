import React from "react";
import ButtonIcon from "../common/ButtonIcon";
import Label from "../common/Label";
import ColumnHeadings from "./ColumnHeadings";

function ButtonHeadings() {
  return (
    <div className="w-full h-19 flex flex-row gap-4 items-center justify-center p-2 border-b border-lighter">
      <ButtonIcon
        width="fit"
        set_gradient={true}
        pathData="M14 22V8M14 22H8C5.172 22 3.757 22 2.879 21.121C2 20.243 2 18.828 2 16V8C2 5.172 2 3.757 2.879 2.879C3.757 2 5.172 2 8 2C10.828 2 12.243 2 13.121 2.879C14 3.757 14 5.172 14 8M14 22H18C19.886 22 20.828 22 21.414 21.414C22 20.828 22 19.886 22 18V12C22 10.114 22 9.172 21.414 8.586C20.828 8 19.886 8 18 8H14M6.5 11H5.5M10.5 11H9.5M6.5 7H5.5M6.5 15H5.5M10.5 7H9.5M10.5 15H9.5M18.5 15H17.5M18.5 11H17.5"
      />
      <ColumnHeadings
        main_text="Total consultancy"
        main_font_size="lg"
        main_color="heavy"
        sub_text="Service Platform"
        sub_color="light"
      />
    </div>
  );
}

export default ButtonHeadings;
