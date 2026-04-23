import { useState, useRef, useEffect } from "react";
import {
  X,
  Pencil,
  Trash2,
  Send,
  MessageSquare,
  Check,
  CornerUpLeft,
} from "lucide-react";
import { saveComment, deleteComment, updateComment } from "./CandidateCard.js";
import { showError, showSuccess } from "../../../../utils/toastUtils.js";

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "Internal", label: "Internal" },
  { id: "Interview", label: "Interview" },
  { id: "Rejection", label: "Rejection", danger: true },
  { id: "Candidate", label: "Candidate" },
];

const TYPE_OPTIONS = FILTER_TABS.filter((t) => t.id !== "all");

const TYPE_META = {
  Candidate: { badge: "bg-orange-100 text-orange-600" }, // already there ✓
  Internal: { badge: "bg-indigo-100 text-indigo-600" },
  Interview: { badge: "bg-violet-100 text-violet-600" },
  Rejection: { badge: "bg-red-100 text-red-500" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtTime = (iso) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null; // guard against Invalid Date
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const initials = (name) =>
  (name ?? "?")
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

// ─── Component ────────────────────────────────────────────────────────────────

export default function AddCommentModal({ data, onClose }) {
  const [filterTab, setFilterTab] = useState("all");
  const [commentType, setCommentType] = useState("Internal");
  const [text, setText] = useState("");
  // Preserve DB insertion order (FIFO) — DB already returns oldest-first
  const [comments, setComments] = useState(data.comments ?? []);
  const [editingComment, setEditingComment] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  console.log("Data", data);

  const MAX = 1000;
  const candidate = data.candidate?.[0];

  // Derived: filtered list
  const filtered =
    filterTab === "all"
      ? comments
      : comments.filter((c) => c.type === filterTab);

  // Scroll to bottom when the comment list grows
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments.length]);

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (editingComment) textareaRef.current?.focus();
  }, [editingComment]);

  // ─── Delete ───────────────────────────────────────────────────────────────

  const handleDelete = async (id) => {
    const res = await deleteComment(id);

    if (!res.success) {
      showError("Failed to delete comment");
      return;
    }

    showSuccess("Comment deleted");
    setComments((prev) => prev.filter((c) => c.id !== id));

    // If the comment being edited is deleted, clear edit mode
    if (editingComment?.id === id) {
      setEditingComment(null);
      setText("");
    }
  };

  // ─── Edit ─────────────────────────────────────────────────────────────────

  const handleStartEdit = (comment) => {
    setEditingComment(comment);
    setCommentType(comment.type);
    setText(comment.message);
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setText("");
  };

  // ─── Send / Update ────────────────────────────────────────────────────────

  const handleSend = async () => {
    if (!text.trim() || isSaving) return;
    setIsSaving(true);

    try {
      // ── UPDATE MODE ──
      if (editingComment) {
        const res = await updateComment(editingComment.id, text);

        if (!res.success) {
          showError("Failed to update comment");
          return;
        }

        showSuccess("Comment updated");
        setComments((prev) =>
          prev.map((c) =>
            c.id === editingComment.id
              ? { ...c, message: text, type: commentType }
              : c,
          ),
        );
        setEditingComment(null);
        setText("");
        return;
      }

      // ── CREATE MODE ──
      const res = await saveComment(
        data.id,
        candidate?.id,
        commentType,
        "client",
        text,
      );

      if (!res.success) {
        showError("Failed to save comment");
        return;
      }

      setComments((prev) => [
        ...prev,
        {
          id: res.data?.id ?? Date.now(),
          type: commentType,
          message: text,
          candidate_id: candidate?.id,
          application_id: data.id,
          created_at: new Date().toISOString(),
          is_read: true,
        },
      ]);
      setText("");
    } finally {
      // Always reset — prevents stuck disabled state
      setIsSaving(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden"
        style={{ height: "82vh", maxHeight: "700px" }}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 bg-linear-to-r from-slate-800 to-slate-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
              <MessageSquare size={16} className="text-white/80" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white leading-tight">
                Comments
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {candidate?.candidate_name ?? "—"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* ── Filter Tabs ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 px-5 py-3 border-b border-slate-100 shrink-0 overflow-x-auto">
          {FILTER_TABS.map((tab) => {
            const isActive = filterTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] font-medium border whitespace-nowrap transition-all cursor-pointer
                  ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                      : tab.danger
                        ? "text-red-500 border-red-200 hover:bg-red-50"
                        : "text-slate-500 border-slate-200 hover:bg-slate-50"
                  }`}
              >
                {tab.label}
                {tab.id !== "all" && (
                  <span
                    className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold
                    ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {
                      comments.filter(
                        (c) => tab.id === "all" || c.type === tab.id,
                      ).length
                    }
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Message List ────────────────────────────────────────────────── */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 flex flex-col gap-4 bg-slate-50/50">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                <MessageSquare size={20} className="text-slate-300" />
              </div>
              <p className="text-sm text-slate-400">No comments yet</p>
            </div>
          )}

          {filtered.map((c) => {
            // "Candidate" type = message from the candidate (left side, no edit/delete)
            const isClient = c.type !== "Candidate";
            // Only show Unread when is_read is explicitly false — undefined means no data, treat as read
            const isUnread = c.is_read === false && !isClient;
            const isBeingEdited = editingComment?.id === c.id;
            const typeMeta = TYPE_META[c.type] ?? {
              badge: "bg-slate-100 text-slate-500",
            };

            return (
              <div
                key={c.id}
                className={`flex items-end gap-2 ${isClient ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex flex-col gap-1 max-w-[72%] ${isClient ? "items-end" : "items-start"}`}
                >
                  {/* Meta row: type badge only */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeMeta.badge}`}
                    >
                      {!isClient ? "" : c.type}
                    </span>
                  </div>

                  {/* Bubble */}
                  <div
                    className={`relative rounded-2xl px-4 py-2.5 transition-all
                      ${isBeingEdited ? "ring-2 ring-indigo-400 ring-offset-1" : ""}
                      ${
                        isClient
                          ? "bg-indigo-600 text-white rounded-br-sm shadow-sm shadow-indigo-200"
                          : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm"
                      }`}
                  >
                    <p className="text-[13px] leading-relaxed whitespace-pre-line">
                      {c.message}
                    </p>

                    {/* Unread label — only for unread candidate messages */}
                    {/* {isUnread && (
                      <span className="absolute -right-6 -bottom-2 bg-orange-100 text-[10px] font-semibold text-orange-500 mt-0.5">
                        Unread
                      </span>
                    )} */}
                  </div>

                  {/* Timestamp — shown below every bubble when available */}
                  {fmtTime(c.created_at) && (
                    <span className="text-[10px] text-slate-400 mt-0.5 tabular-nums">
                      {fmtTime(c.created_at)}
                    </span>
                  )}

                  {/* Edit / Delete — only for client messages, below timestamp */}
                  {isClient && (
                    <div className="flex items-center gap-1">
                      <button
                        title="Edit"
                        onClick={() => handleStartEdit(c)}
                        className="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 text-slate-400 transition-all cursor-pointer shadow-xs"
                      >
                        <Pencil size={10} />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(c.id)}
                        className="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-slate-200 hover:border-red-300 hover:bg-red-50 hover:text-red-500 text-slate-400 transition-all cursor-pointer shadow-xs"
                      >
                        <Trash2 size={10} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>

        {/* ── Edit Banner ─────────────────────────────────────────────────── */}
        {editingComment && (
          <div className="mx-5 mb-0 mt-0 px-4 py-2.5 bg-indigo-50 border-t border-b border-indigo-100 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <CornerUpLeft size={13} className="text-indigo-500" />
              <span className="text-xs font-medium text-indigo-600">
                Editing <span className="font-bold">{editingComment.type}</span>{" "}
                comment
              </span>
            </div>
            <button
              onClick={handleCancelEdit}
              className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-indigo-200 text-indigo-400 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* ── Input Area ──────────────────────────────────────────────────── */}
        <div className="px-5 pt-3 pb-4 shrink-0 bg-white border-t border-slate-100">
          {/* Type selector — hidden while editing (type is locked to original) */}
          {!editingComment && (
            <div className="flex gap-1.5 mb-2.5">
              {TYPE_OPTIONS.slice(0, 3).map((tab) => {
                const isActive = commentType === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCommentType(tab.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all cursor-pointer
                      ${
                        isActive
                          ? tab.danger
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-indigo-600 text-white border-indigo-600"
                          : tab.danger
                            ? "text-red-400 border-red-200 hover:bg-red-50"
                            : "text-slate-400 border-slate-200 hover:bg-slate-50"
                      }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Textarea + send */}
          <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-indigo-300 focus-within:bg-white transition-colors">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX))}
              onKeyDown={handleKey}
              placeholder={
                editingComment
                  ? "Edit your comment…"
                  : `Add ${commentType.toLowerCase()} comment…`
              }
              rows={2}
              className="flex-1 text-[13px] text-slate-700 placeholder:text-slate-400 resize-none outline-none leading-relaxed bg-transparent"
            />

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="text-[9px] text-slate-300">
                {text.length}/{MAX}
              </span>
              <button
                onClick={handleSend}
                disabled={!text.trim() || isSaving}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {editingComment ? (
                  <Check size={13} className="text-white" />
                ) : (
                  <Send size={13} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
