import { Eye, Pencil, Trash2, Clock, CheckCircle } from "lucide-react";

const statusConfig = {
  "Resume Review": {
    icon: <Clock size={10} strokeWidth={2} className="text-amber-700" />,
    className: "bg-amber-50 text-amber-800",
  },
  "Offer Release": {
    icon: <CheckCircle size={10} strokeWidth={2} className="text-teal-800" />,
    className: "bg-teal-50 text-teal-800",
  },
};

const avatarColors = [
  { bg: "bg-blue-100", text: "text-blue-800" },
  { bg: "bg-teal-100", text: "text-teal-800" },
];

const candidates = [
  {
    name: "Ds Meshil Maring",
    status: "Resume Review",
    location: "Imphal, Manipur, India",
    experience: "8 years",
    currentCTC: "120k – 140k",
    expectedCTC: "120k – 200k",
  },
  {
    name: "Desire Sign",
    status: "Offer Release",
    location: "Delhi, India",
    experience: "3 years",
    currentCTC: "160k – 190k",
    expectedCTC: "180k – 280k",
  },
];

const initials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const ActionBtn = ({ icon, label }) => (
  <button
    title={label}
    className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
  >
    {icon}
  </button>
);

export default function CandidatesTable() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {[
              "Name",
              "Status",
              "Location",
              "Experience",
              "Current CTC",
              "Expected CTC",
              "Action",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-3 text-xs font-medium text-gray-500 whitespace-nowrap text-center"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {candidates.map((c, i) => {
            const av = avatarColors[i % avatarColors.length];
            const st = statusConfig[c.status];
            return (
              <tr
                key={c.name}
                className="border-b last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${av.bg} ${av.text}`}
                    >
                      {initials(c.name)}
                    </div>
                    <span className="font-medium text-gray-900">{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${st.className}`}
                  >
                    {st.icon}
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{c.location}</td>
                <td className="px-4 py-3 text-gray-700">{c.experience}</td>
                <td className="px-4 py-3 tabular-nums text-gray-700">
                  {c.currentCTC}
                </td>
                <td className="px-4 py-3 tabular-nums text-gray-700">
                  {c.expectedCTC}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <ActionBtn
                      label="View"
                      icon={<Eye size={14} className="text-gray-500" />}
                    />
                    <ActionBtn
                      label="Edit"
                      icon={<Pencil size={14} className="text-gray-500" />}
                    />
                    <ActionBtn
                      label="Delete"
                      icon={<Trash2 size={14} className="text-gray-500" />}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
