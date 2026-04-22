import { useState } from "react";
import { X, Pencil, Trash2 } from "lucide-react";
import { saveComment, deleteComment, updateComment } from "./clientCard.js";
import { showError, showSuccess } from "../../../../utils/toastUtils.js";

const TABS = [
  { id: "my_comments", label: "Comments" },
  { id: "Internal", label: "Internal Feedback" },
  { id: "Interview", label: "Interview Feedback" },
  { id: "Rejection", label: "Rejection Reason", danger: true },
];

export default function AddCommentModal({ data, onClose }) {
  const [activeTab, setActiveTab] = useState("Internal");
  const [text, setText] = useState("");
  const [comments, setComments] = useState(data.comments ?? []);
  const [editingComment, setEditingComment] = useState(null);
  const [isSave, setIsSave] = useState(false);

  const MAX = 1000;

  const candidate = data.candidate?.[0];
  const isMyComments = activeTab === "my_comments";

  // ─── DELETE ─────────────────────────────────────────
  const handleDelete = async (id) => {
    const res = await deleteComment(id);

    if (!res.success) return showError("Failed to delete comment");

    showSuccess("Comment deleted");

    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  // ─── EDIT ───────────────────────────────────────────
  const editCommentHandler = (comment) => {
    setEditingComment(comment);
    setActiveTab(comment.type);
    setText(comment.comments);
  };

  // ─── SAVE / UPDATE ──────────────────────────────────
  const saveCommentHandler = async () => {
    if (!text.trim()) return;
    setIsSave(true);

    // UPDATE MODE
    if (editingComment) {
      const res = await updateComment(editingComment.id, text);

      if (!res.success) return showError("Failed to update comment");

      showSuccess("Comment updated");

      setComments((prev) =>
        prev.map((c) =>
          c.id === editingComment.id
            ? { ...c, comments: text, type: activeTab }
            : c,
        ),
      );

      setEditingComment(null);
      setText("");
      return;
    }

    // CREATE MODE
    const res = await saveComment(
      data.id,
      candidate?.id,
      activeTab,
      "client",
      text,
    );

    if (!res.success) return showError("Failed to save comment");

    showSuccess("Comment saved successfully");

    setComments((prev) => [
      ...prev,
      {
        id: res.data?.id,
        type: activeTab,
        comments: text,
        candidate_id: candidate?.id,
        application_id: data.id,
      },
    ]);

    setIsSave(false);

    setText("");
  };

  // ─── CANCEL (also reset edit mode) ───────────────────
  const handleCancel = () => {
    setEditingComment(null);
    setText("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {editingComment ? "Edit Comment" : "Add Comment"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Candidate:{" "}
              <span className="font-semibold text-gray-800">
                {candidate?.candidate_name ?? "—"}
              </span>
            </p>
          </div>

          <button
            onClick={handleCancel}
            className="cursor-pointer text-gray-400 hover:text-gray-700 transition-colors mt-0.5"
          >
            <X size={22} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 mb-6">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium border transition-all
                ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : tab.danger
                      ? "text-red-500 border-red-300 hover:bg-red-50"
                      : "text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        {isMyComments ? (
          // ─── COMMENTS LIST ─────────────────────────────
          <div className="space-y-4 max-h-85 overflow-y-auto pr-1">
            {comments.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">
                No comments yet.
              </p>
            ) : (
              comments.map((comment) => {
                const isRejection = comment.type === "Rejection";

                return (
                  <div
                    key={comment.id}
                    className={`border rounded-xl p-4 ${
                      isRejection
                        ? "border-red-200 bg-red-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          isRejection
                            ? "bg-red-100 text-red-500"
                            : "bg-indigo-100 text-indigo-500"
                        }`}
                      >
                        {comment.type}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => editCommentHandler(comment)}
                          className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium transition-colors"
                        >
                          <Pencil size={13} />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(comment.id)}
                          className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors"
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    </div>

                    <div
                      className={`rounded-lg p-3 text-sm whitespace-pre-line leading-relaxed ${
                        isRejection
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {comment.comments}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          // ─── INPUT FORM ────────────────────────────────
          <>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX))}
              placeholder="Write your feedback or internal note here..."
              rows={7}
              className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />

            <div className="text-right text-xs text-gray-400 mt-1 mb-4">
              {text.length}/{MAX}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="cursor-pointer px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={saveCommentHandler}
                disabled={isSave}
                className={`${isSave ? "bg-black/20" : "from-orange-500 to-red-500"} cursor-pointer px-5 py-2.5 rounded-xl bg-linear-to-r  text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm`}
              >
                {editingComment ? "Update Comment" : "Save Comment"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
