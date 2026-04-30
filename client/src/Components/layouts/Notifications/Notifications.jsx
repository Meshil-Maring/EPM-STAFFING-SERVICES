import React, { useState } from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import { updateNotification } from "./notification";

const TAB_OPTIONS = ["All", "Unread", "Read"];

function NotificationItem({ note, onMarkRead }) {
  const iconMap = {
    info: {
      icon: "ri-information-line",
      bg: "bg-indigo-50",
      color: "text-indigo-500",
    },
    success: {
      icon: "ri-checkbox-circle-line",
      bg: "bg-emerald-50",
      color: "text-emerald-500",
    },
    warning: {
      icon: "ri-alert-line",
      bg: "bg-amber-50",
      color: "text-amber-500",
    },
    error: {
      icon: "ri-error-warning-line",
      bg: "bg-red-50",
      color: "text-red-500",
    },
  };
  const type = note.type || "info";
  const { icon, bg, color } = iconMap[type] || iconMap.info;

  return (
    <div
      className={`group relative flex items-start gap-3 px-4 py-3 border-b border-slate-100 transition-colors duration-150 hover:bg-slate-50 cursor-pointer ${
        !note.read ? "bg-violet-50/40" : "bg-white"
      }`}
      onClick={() => !note.read && onMarkRead(note.id)}
    >
      {/* Unread dot */}
      {!note.read && (
        <span className="absolute top-3.5 right-4 w-2 h-2 rounded-full bg-violet-500 shrink-0" />
      )}

      {/* Icon badge */}
      <div
        className={`shrink-0 mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}
      >
        <i className={`${icon} text-base ${color}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-4">
        <p
          className={`text-sm leading-snug ${
            note.read
              ? "text-slate-500 font-normal"
              : "text-slate-800 font-semibold"
          }`}
        >
          {note.title}
        </p>
        {note.message && (
          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed line-clamp-2">
            {note.message}
          </p>
        )}
        <p className="text-[11px] text-slate-300 mt-1.5 font-medium">
          {note.time}
        </p>
      </div>
    </div>
  );
}

function Notifications({ onClose, notes: initialNotes }) {
  const [notes, setNotes] = useState(initialNotes || []);
  const [activeTab, setActiveTab] = useState("All");

  const unreadCount = notes.filter((n) => !n.read).length;

  const filteredNotes =
    activeTab === "Unread"
      ? notes.filter((n) => !n.read)
      : activeTab === "Read"
        ? notes.filter((n) => n.read)
        : notes;

  const markRead = async (id) => {
    updateNotification(id);

    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllRead = () =>
    setNotes((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div
      onClick={() => onClose(false)}
      className="absolute z-500 top-0 left-0 inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[88%] sm:w-[60%] md:w-[46%] lg:w-[32%] max-h-[82vh] bg-white rounded-2xl flex flex-col shadow-2xl shadow-slate-900/20 overflow-hidden border border-slate-100"
      >
        {/* ── Header ── */}
        <header className="shrink-0 px-5 pt-5 pb-4 bg-linear-to-br from-slate-800 to-slate-900">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white text-[15px] font-bold tracking-tight leading-none">
                Notifications
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`
                  : "You're all caught up"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[11px] text-violet-300 hover:text-violet-200 font-medium transition-colors duration-150 px-2 py-1 rounded-lg hover:bg-white/10"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => onClose(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/15 transition-all duration-150"
              >
                <i className="ri-close-line text-base" />
              </button>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="flex items-center gap-1 mt-4 bg-slate-700/50 rounded-xl p-1">
            {TAB_OPTIONS.map((tab) => {
              const count =
                tab === "Unread"
                  ? notes.filter((n) => !n.read).length
                  : tab === "Read"
                    ? notes.filter((n) => n.read).length
                    : notes.length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-1.5 rounded-lg transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  {tab}
                  {count > 0 && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                        activeTab === tab
                          ? tab === "Unread"
                            ? "bg-violet-100 text-violet-600"
                            : "bg-slate-100 text-slate-500"
                          : "bg-slate-600 text-slate-300"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </header>

        {/* ── Body ── */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="h-full min-h-50 flex flex-col items-center justify-center gap-3 py-10">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                <i
                  className={`text-xl text-slate-400 ${
                    activeTab === "Unread"
                      ? "ri-notification-off-line"
                      : activeTab === "Read"
                        ? "ri-check-double-line"
                        : "ri-notification-3-line"
                  }`}
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700">
                  {activeTab === "Unread"
                    ? "No unread notifications"
                    : activeTab === "Read"
                      ? "No read notifications"
                      : "No notifications yet"}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeTab === "Unread"
                    ? "You're all caught up!"
                    : "Nothing to show here"}
                </p>
              </div>
            </div>
          ) : (
            <div>
              {filteredNotes.map((note) => (
                <NotificationItem
                  key={note.id}
                  note={note}
                  onMarkRead={markRead}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {notes.length > 0 && (
          <footer className="shrink-0 px-5 py-3 border-t border-slate-100 bg-slate-50">
            <button className="w-full text-center text-xs font-semibold text-indigo-500 hover:text-indigo-600 transition-colors duration-150 py-0.5">
              View all activity
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}

export default Notifications;
