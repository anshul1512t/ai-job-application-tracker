import { useState } from "react";
import Badge from "../Badge";
import { FaEdit, FaTrashAlt, FaRegFileAlt } from "react-icons/fa";

function JobTableRow({ job, showActions, onDelete, onEdit, onAIReview, activeAIJobId, onCoverLetter, onSkillGap, }) {

    const [open, setOpen] = useState(false);
    const [aiMenuOpen, setAiMenuOpen] = useState(false);

    const formatJobType = (type) =>
        type ? type.replaceAll("_", " ") : "-";

    return (
        <tr className="transition hover:bg-gray-50">

            {/* Company */}
            <td className="px-4 py-4 font-medium text-gray-800 whitespace-nowrap">
                {job.companyName}
            </td>

            {/* Job Title */}
            <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                {job.jobTitle}
            </td>

            {/* Status */}
            <td className="px-4 py-4 whitespace-nowrap">
                <Badge status={job.applicationStatus} />
            </td>

            {/* Type */}
            <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                {formatJobType(job.jobType)}
            </td>

            {/* Location */}
            <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                {job.location}
            </td>

            {/* Salary */}
            <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                ₹{job.salaryExceptation?.toLocaleString() || "-"}
            </td>

            {/* Applied On */}
            <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                {job.applicationDate || "-"}
            </td>

            {/* Description */}
            <td className="px-4 py-4 whitespace-nowrap relative">

                {job.jobDescription ? (
                    <>
                        <button
                            onClick={() => setOpen(true)}
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                        >
                            <FaRegFileAlt size={16} />
                        </button>

                        {open && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

                                <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

                                    <div className="flex items-center justify-between border-b px-6 py-4">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            Job Description
                                        </h2>

                                        <button
                                            onClick={() => setOpen(false)}
                                            className="text-xl text-gray-500 hover:text-gray-700"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    <div className="max-h-112.5 overflow-y-auto px-6 py-5">
                                        <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                                            {job.jobDescription}
                                        </p>
                                    </div>

                                </div>

                            </div>
                        )}
                    </>
                ) : (
                    "-"
                )}

            </td>

            {/* Notes */}
            <td className="px-4 py-4 text-gray-600">
                {job.notes || "-"}
            </td>

            {/* Job Link */}
            <td className="px-4 py-4 whitespace-nowrap">
                <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    View
                </a>
            </td>

            {/* Actions */}
            {showActions && (
                <td className="px-4 py-4">

                    <div className="flex items-center gap-3">

                        {/* EDIT */}
                        <button
                            className="
                    text-blue-600 transition
                    hover:text-blue-800
                "
                            onClick={() => onEdit(job)}
                        >
                            <FaEdit size={16} />
                        </button>

                        {/* DELETE */}
                        <button
                            className="
                    text-red-600 transition
                    hover:text-red-800
                "
                            onClick={() => onDelete(job.id)}
                        >
                            <FaTrashAlt size={16} />
                        </button>

                        {/* AI DROPDOWN */}
                        <div className="relative">

                            <button
                                onClick={() =>
                                    setAiMenuOpen((prev) => !prev)
                                }
                                className={`
                        rounded-lg p-2 transition

                        ${activeAIJobId === job.id
                                        ? "bg-purple-100 text-purple-700 ring-2 ring-purple-300"
                                        : "text-purple-600 hover:bg-purple-50 hover:text-purple-800"
                                    }
                    `}
                            >
                                🤖
                            </button>

                            {/* DROPDOWN MENU */}
                            {aiMenuOpen && (

                                <div
                                    className="
                            absolute right-0 z-40 mt-2
                            w-56 rounded-2xl border
                            border-gray-200 bg-white
                            p-2 shadow-xl
                        "
                                >

                                    {/* COVER LETTER */}
                                    <button
                                        onClick={() => {

                                            onCoverLetter(job.id);

                                            setAiMenuOpen(false);
                                        }}
                                        className="
                                w-full rounded-xl
                                px-4 py-3 text-left
                                text-sm text-gray-700
                                transition hover:bg-gray-100
                            "
                                    >
                                        Generate Cover Letter
                                    </button>

                                    {/* SKILL GAP */}
                                    <button
                                        onClick={() => {
                                            onSkillGap(job.id);
                                            setAiMenuOpen(false);
                                        }}
                                        className="w-full rounded-xl px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-100"
                                    >
                                        Skill Gap Analysis
                                    </button>

                                </div>
                            )}

                        </div>

                    </div>

                </td>
            )}

        </tr>
    );
}

export default JobTableRow;