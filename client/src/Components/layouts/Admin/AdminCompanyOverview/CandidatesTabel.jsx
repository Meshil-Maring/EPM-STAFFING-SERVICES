import React from "react";
import Icon from "../../../common/Icon";

function CandidatesTabel({
  potentialApplications,
  headings,
  // handle_table_action,
}) {
  return (
    <div className="w-full text-lg h-full sticky top-0 flex items-center justify-center overflow-y-auto no-scrollbar">
      {potentialApplications.length > 0 ? (
        <table className="w-full flex flex-col items-center justify-center rounded-large max-h-800 overflow-y-auto no-scrollbar">
          <thead className="w-full flex justify-center items-center">
            <tr className="w-full grid grid-cols-6 items-start justify-start p-2 bg-lighter/90 rounded-tr-large rounded-tl-large">
              {headings.map((item) => {
                return (
                  <th
                    key={item.id}
                    className="w-full truncate flex items-center justify-start"
                  >
                    {item.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="py-2 bg-lighter/20 flex flex-col gap-2 w-full justify-center items-center">
            {potentialApplications.map((application, i) => {
              const candidate = application?.candidate?.[0];
              return (
                <tr
                  key={`application-${i}`}
                  className="w-full py-2 bg-lighter/40 px-1 grid grid-cols-6 gap-4 items-start justify-start"
                >
                  {headings.map((head) => {
                    const isStatus = head?.id === "active";
                    const status = candidate?.active ? "Active" : "Inactive";
                    // const isAction = head.toLocaleLowerCase() === "action";
                    return (
                      <td
                        key={`application-${i}-header-${head.id}`}
                        className="w-full flex overflow-x-auto flex-row truncate items-center justify-start"
                      >
                        {isStatus ? status : candidate?.[head.id]}

                        {/*
                        ============================================================
                          CANDIDATE TABLE ACTION BUTTONS: FOR FUTURE IMPLEMENTATION
                        ============================================================
                        */}

                        {/* {isAction ? (
                          <span className="w-full gap-2 flex flex-row items-center justify-between">
                            {[
                              { icon: "ri-eye-line", id: "view application" },
                              {
                                icon: "ri-edit-line",
                                id: "edit application",
                              },
                              {
                                icon: "ri-delete-bin-line",
                                id: "delete application",
                              },
                            ].map((icon, i) => {
                              const is_delete = icon.id === "delete application";

                              const color = is_delete
                                ? "text-red-dark hover:bg-red-light/30"
                                : "hover:bg-light_green/30";
                              return (
                                <span
                                  key={`icon-${i}`}
                                  // onClick={() =>
                                  //   handle_table_action(icon.id, application)
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
