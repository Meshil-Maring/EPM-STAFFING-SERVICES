import { useState } from "react";
import { X, Pencil, Trash2 } from "lucide-react";

const TABS = [
  { id: "my_comments", label: "My Comments" },
  { id: "internal_feedback", label: "Internal Feedback" },
  { id: "interview_feedback", label: "Interview Feedback" },
  { id: "rejection_reason", label: "Rejection Reason", danger: true },
];

const MOCK_COMMENTS = [
  {
    id: 1,
    author: "Meshil Maring",
    type: "Internal Feedback",
    text: "Please reupload you resume\nHey, I am guy.",
  },
  {
    id: 2,
    author: "Desire Moose",
    type: "Internal Feedback",
    text: "Please reupload you resume\nHey, I am guy.",
  },
];

export default function AddCommentModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("internal_feedback");
  const [text, setText] = useState("");
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const MAX = 1000;

  const isMyComments = activeTab === "my_comments";

  const handleDelete = (id) =>
    setComments((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add Comment</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Candidate:{" "}
              <span className="font-semibold text-gray-800">Meshil Maring</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors mt-0.5"
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
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all
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

        {/* Content */}
        {isMyComments ? (
          /* Comments List */
          <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">
                      {comment.author}
                    </span>
                    <span className="bg-indigo-100 text-indigo-500 text-xs px-2.5 py-1 rounded-full font-medium">
                      {comment.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium transition-colors">
                      <Pencil size={13} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {comment.text}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Input Form */
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
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm">
                Save Comment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
