import React from "react";
import Icon from "../../../common/Icon";

function CandidatesTabel({
  potentialCandidates,
  headings,
  handle_table_action,
}) {
  return (
    <div className="w-full flex items-center justify-center">
      {potentialCandidates.length > 0 ? (
        <table className="w-full flex flex-col items-center justify-center rounded-small">
          <thead className="w-full flex justify-center items-center">
            <tr className="w-full grid grid-cols-7 items-start justify-start p-2 bg-lighter rounded-tr-small rounded-tl-small">
              {headings.map((item) => {
                return (
                  <th
                    key={item}
                    className="w-full truncate flex items-center justify-start"
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="p-2 bg-lighter/50 flex flex-col gap-2 w-full justify-center items-center">
            {potentialCandidates.map((candidate, i) => {
              return (
                <tr
                  key={`candidate-${i}`}
                  className="w-full grid grid-cols-7 items-start justify-start"
                >
                  {headings.map((head) => {
                    const isStatus = head.toLocaleLowerCase() === "status";
                    head = isStatus ? "offer status" : head;
                    const isAction = head.toLocaleLowerCase() === "action";
                    return (
                      <td
                        key={head}
                        className="w-full flex flex-row truncate items-center justify-start"
                      >
                        {isAction ? (
                          <span className="w-full gap-2 flex flex-row items-center justify-between">
                            {[
                              { icon: "ri-eye-line", id: "view candidate" },
                              {
                                icon: "ri-edit-line",
                                id: "edit candidate",
                              },
                              {
                                icon: "ri-delete-bin-line",
                                id: "delete candidate",
                              },
                            ].map((icon, i) => {
                              const is_delete = icon.id === "delete candidate";

                              const color = is_delete
                                ? "text-red-dark hover:bg-red-light/30"
                                : "hover:bg-light_green/30";
                              return (
                                <span
                                  key={`icon-${i}`}
                                  onClick={() =>
                                    handle_table_action(icon.id, candidate)
                                  }
                                >
                                  <Icon
                                    key={icon.id}
                                    icon={icon.icon}
                                    class_name={`flex-1 font-lighter text-md cursor-pointer rounded-small ${color}`}
                                  />
                                </span>
                              );
                            })}
                          </span>
                        ) : (
                          candidate[head.toLowerCase()]
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="w-full flex items-center justify-center font-semibold text-lg text-text_b/60 bg-lighter p-4 rounded-small">
          <p>No candidates</p>
        </div>
      )}
    </div>
  );
}

export default CandidatesTabel;
