import Badge from "./Badge";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

function Table({
    data = [],
    showActions = false,
}) {
    const safeData = Array.isArray(data) ? data : [];

    const formatJobType = (type) => {
        if (!type) return "-";
        return type.replaceAll("_", " ");
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Job Applications
                    </h2>
                    <p className="text-sm text-gray-500">
                        Track your current application status
                    </p>
                </div>
            </div>

            {/* Empty State */}
            {safeData.length === 0 ? (
                <div className="p-10 text-center text-gray-500">
                    No jobs found
                </div>
            ) : (
                <div className="overflow-x-auto">

                    <table className="min-w-full divide-y divide-gray-200">

                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                    Company
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                    Job Title
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                    Type
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                    Location
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                    Salary
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                    Applied On
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                    Notes
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                    Job Link
                                </th>

                                {showActions && (
                                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 bg-white">

                            {safeData.map((job) => (
                                <tr
                                    key={job.id}
                                    className="transition hover:bg-gray-50"
                                >

                                    <td className="px-4 py-4 font-medium text-gray-800 whitespace-nowrap">
                                        {job.companyName}
                                    </td>

                                    <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                                        {job.jobTitle}
                                    </td>

                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <Badge status={job.applicationStatus} />
                                    </td>

                                    <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                                        {formatJobType(job.jobType)}
                                    </td>

                                    <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                                        {job.location}
                                    </td>

                                    <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                                        ₹{job.salaryExceptation?.toLocaleString() || "-"}
                                    </td>

                                    <td className="px-4 py-4 text-gray-600 whitespace-nowrap">
                                        {job.applicationDate || "-"}
                                    </td>

                                    <td className="px-4 py-4 text-gray-600">
                                        {job.notes || "-"}
                                    </td>

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

                                    {/* ACTIONS */}
                                    {showActions && (
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">

                                                {/* EDIT */}
                                                <button
                                                    className="text-blue-600 hover:text-blue-800 transition"
                                                    title="Edit Job"
                                                >
                                                    <FaEdit size={16} />
                                                </button>

                                                {/* DELETE */}
                                                <button
                                                    className="text-red-600 hover:text-red-800 transition"
                                                    title="Delete Job"
                                                >
                                                    <FaTrashAlt size={16} />
                                                </button>

                                            </div>
                                        </td>
                                    )}

                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>
            )}

        </div>
    );
}

export default Table;