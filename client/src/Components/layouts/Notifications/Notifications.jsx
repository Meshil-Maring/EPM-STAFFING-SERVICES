import React, { useState } from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import { showSuccess } from "../../../utils/toastUtils";
function Notifications({ onClose }) {
  const notes = [
    {
      type: "candidate",
      title: "New Candidate",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat, nunc non blandit interdum, nisl nisl tincidunt nisl, vitae fringilla nisl nisl sit amet nisl.",
      time: "5 minutes ago",
    },
    {
      type: "interview",
      title: "New Candidate",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat, nunc non blandit interdum, nisl nisl tincidunt nisl, vitae fringilla nisl nisl sit amet nisl.",
      time: "5 minutes ago",
    },
    {
      type: "max_applications",
      title: "New Candidate",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat, nunc non blandit interdum, nisl nisl tincidunt nisl, vitae fringilla nisl nisl sit amet nisl.",
      time: "5 minutes ago",
    },
  ];

  // function to clear all notifications
  const clearNotifications = () => {
    return showSuccess("Notifications cleared");
  };

  // function to mark all notifications as read
  const markAllNotifiations = () => {
    return showSuccess("All notifications marked as read");
  };

  // handle notifications actions buttons
  const handleNotificationAction = (name) => {
    if (name === "clear") {
      clearNotifications();
      return;
    }
    return markAllNotifiations();
  };

  return (
    <div
      onClick={() => onClose(false)}
      className="absolute z-200 top-0 left-0 inset-0 flex items-center justify-center bg-light_black"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[80%] sm:w-[60%] 
        h-[80%] md:w-[50%] overflow-hidden overflow-y-auto no-scrollbar lg:w-[40%] bg-b_white rounded-large"
      >
        <header className="w-full sticky top-0 z-200 py-2 px-4 flex flex-row items-center justify-between bg-g_btn text-text_white text-sm font-semibold">
          <div className="flex flex-col items-start justify-start">
            <Label text="Notification" class_name="text-lg" />
            <div className="flex flex-row items-center justify-start space-x-1">
              <Label text={notes.length} class_name="text-sm font-semibold" />
              <Label
                text="sealed notifications"
                class_name="text-sm font-lighter"
              />
            </div>
          </div>
          <span
            onClick={() => onClose(false)}
            className="w-8 h-8 transition-all duration-150 ease-in-out hover:rotate-90 rounded-full cursor-pointer hover:bg-b_white/30 p-1 flex items-center justify-center"
          >
            <Icon
              icon="ri-close-line"
              class_name="w-full h-full flex items-center justify-center"
            />
          </span>
        </header>
        <div className="w-full sticky px-4 top-16 left-2 z-204 bg-b_white text-sm flex flex-row items-center justify-start gap-2">
          <span
            onClick={() => handleNotificationAction("read")}
            className="cursor-pointer hover:underline text-green-800 font-semibold transition-all duration-150 ease-in-out"
          >
            Mark all are read
          </span>
          •
          <span
            onClick={() => handleNotificationAction("clear")}
            className="cursor-pointer hover:underline text-red font-semibold transition-all duration-150 ease-in-out"
          >
            Clear all
          </span>
        </div>
        {notes.length === 0 ? (
          <div className="w-full h-full flex-col p-4 flex items-center justify-center bg-gray-200 text-light_black font-semibold text-sm space-y-2">
            <Icon
              icon="ri-notification-3-line"
              class_name="p-2 rounded-full text-lg bg-gray-300 w-10 h-10 text-text_b/60"
            />
            <Label text="No Notifications" />
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-start justify-start p-4 space-y-4 h-full w-full">
            {notes.map((note, i) => {
              const icon =
                note.type === "candidate"
                  ? "ri-user-line"
                  : note.type === "interview"
                    ? "ri-calendar-line"
                    : note.type === "max_applications"
                      ? "ri-user-smile-line"
                      : "ri-notification-3-line";
              return (
                <div className="w-full flex flex-row items-start justify-start gap-2 rounded-large border-lighter">
                  <Icon
                    icon={icon}
                    class_name="p-2 rounded-large shaow-sm lg bg-gray-300 w-12 h-12 text-text_b/60"
                  />
                  <div className="w-full relative shadow-sm flex flex-col items-start justify-start bg-lighter/50 cursor-pointer hover:bg-lighter transition-all duration-150 ease-in-out rounded-large p-2">
                    <span className="p-1 absolute top-2 right-2 bg-red rounded-full" />
                    <Label text={note.title} class_name="font-semibold" />
                    <Label text={note.description} class_name="text-sm" />
                    <div className=" flex flex-row items-center justify-center gap-1">
                      <Icon icon={"ri-time-line"} />
                      <Label
                        text={note.time}
                        class_name="text-xs text-gray-400"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
