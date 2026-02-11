import { motion } from "framer-motion";
import Label from "../../../common/Label";
import Icon from "../../../common/Icon";

function DownloadsSection({ downloads, candidate, onFileChange }) {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-4">
      <Label
        text={"Downloads"}
        class_name={
          "w-full px-2 text-[clamp(1em,2vw,1.2em)] font-semibold border-b border-lighter mb-4 pb-1"
        }
      />
      <div className="w-full grid grid-cols-3 text-[clamp(1em,2vw,1.4em)] justify-center items-center gap-4">
        {downloads.map((item, index) => {
          const fileData = candidate?.[item.id];

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
                type: "tween",
                delay: index * 0.05,
              }}
              key={index}
              className="w-full flex flex-col text-[clamp(0.6em,1vw,0.8em)] items-start justify-between gap-2"
            >
              <Label text={item.label} class_name={"font-semibold"} />
              <label
                htmlFor={item.id}
                className="w-full border h-16 rounded-small border-light border-dashed relative p-2 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  onChange={onFileChange}
                  accept=".pdf"
                  id={item.id}
                  name={item.id}
                  type="file"
                  className="hidden"
                />
                {fileData ? (
                  <div className="flex flex-col items-center overflow-hidden w-full">
                    <Icon
                      icon="ri-file-pdf-2-fill"
                      class_name="text-red-500 text-2xl"
                    />
                    <span className="truncate w-full text-center px-2">
                      {fileData instanceof File
                        ? fileData.name
                        : fileData.split("/").pop()}
                    </span>
                  </div>
                ) : (
                  <Icon
                    icon={"ri-download-cloud-2-line"}
                    class_name="w-full h-full text-2xl opacity-50 flex items-center justify-center text-highLight"
                  />
                )}
              </label>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default DownloadsSection;
