import JobTableRow from "./JobRow";

function JobTable({
    data = [],
    showActions = false,
    onDelete,
    onEdit,
    onAIReview,
    onCoverLetter,
    onSkillGap,
    activeAIJobId,
}) {
    const safeData = Array.isArray(data) ? data : [];

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

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
                                    Description
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
                                <JobTableRow
    key={job.id}
    job={job}
    showActions={showActions}
    onDelete={onDelete}
    onEdit={onEdit}
    onAIReview={onAIReview}
    onCoverLetter={onCoverLetter}
    onSkillGap={onSkillGap}
    activeAIJobId={activeAIJobId}
/>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
        </div>
    );
}

export default JobTable;