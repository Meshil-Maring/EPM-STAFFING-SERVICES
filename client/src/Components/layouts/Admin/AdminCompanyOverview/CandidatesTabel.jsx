import React from "react";
import Icon from "../../../common/Icon";

function CandidatesTabel({
  potentialCandidates,
  headings,
  // handle_table_action,
}) {
  return (
    <div className="w-full text-lg h-full sticky top-0 flex items-center justify-center overflow-y-auto no-scrollbar">
      {potentialCandidates.length > 0 ? (
        <table className="w-full flex flex-col items-center justify-center rounded-large max-h-800 overflow-y-auto no-scrollbar">
          <thead className="w-full flex justify-center items-center">
            <tr className="w-full grid grid-cols-6 items-start justify-start p-2 bg-lighter/90 rounded-tr-large rounded-tl-large">
              {headings.map((item, i) => {
                return (
                  <th
                    key={`head-${i}`}
                    className="w-full truncate flex items-center justify-start"
                  >
                    {item.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="py-2 bg-lighter/20 flex flex-col gap-2 w-full justify-center items-center">
            {potentialCandidates.map((candidate, i) => {
              return (
                <tr
                  key={`candidate-${i}`}
                  className="w-full py-2 bg-lighter/40 px-1 grid grid-cols-6 gap-4 items-start justify-start"
                >
                  {headings.map((head) => {
                    const isStatus = head?.id === "active";
                    const status = candidate.active ? "Active" : "Inactive";
                    // const isAction = head.toLocaleLowerCase() === "action";
                    return (
                      <td
                        key={`candidate-${i}-header-${head.id}`}
                        className="w-full flex overflow-x-auto flex-row truncate items-center justify-start"
                      >
                        {isStatus ? status : candidate[head.id]}

                        {/*
============================================================
CANDIDATE TABLE ACTION BUTTONS: FOR FUTURE IMPLEMENTATION
============================================================
*/}
                        {/* {isAction ? (
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
                                  // onClick={() =>
                                  //   handle_table_action(icon.id, candidate)
                                  // }
                                >
                                  <Icon
                                    key={icon.id}
                                    icon={icon.icon}
                                    class_name={`flex-1 font-lighter text-md cursor-pointer rounded-large ${color}`}
                                  />
                                </span>
                              );
                            })}
                          </span>
                        ) : (
                        )} */}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="w-full flex items-center justify-center font-semibold text-lg text-text_b/60 bg-lighter p-4 rounded-large">
          <p>No candidates</p>
        </div>
      )}
    </div>
  );
}

export default CandidatesTabel;
