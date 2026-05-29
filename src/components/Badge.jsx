function Badge({ status }) {
    const statusStyles = {
        APPLIED: "bg-blue-100 text-blue-700",
        IN_REVIEW: "bg-purple-100 text-purple-700",
        INTERVIEW: "bg-yellow-100 text-yellow-700",
        OFFER: "bg-cyan-100 text-cyan-700",
        REJECTED: "bg-red-100 text-red-700",
        ACCEPTED: "bg-green-100 text-green-700",
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
        >
            {status.replaceAll("_", " ")}
        </span>
    );
}

export default Badge;