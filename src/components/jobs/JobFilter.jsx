function JobFilters({ filters, onChange }) {
    return (
        <div className="mb-6 flex flex-wrap gap-3">

            <input
                type="text"
                name="search"
                value={filters.search}
                onChange={onChange}
                placeholder="Search..."
                className="border px-3 py-2 rounded-lg"
            />

            <select
                name="status"
                value={filters.status}
                onChange={onChange}
                className="border px-3 py-2 rounded-lg"
            >
                <option value="">All Status</option>
                <option value="APPLIED">Applied</option>
                <option value="INTERVIEW">Interview</option>
                <option value="REJECTED">Rejected</option>
                <option value="OFFER">Offer</option>
                <option value="ACCEPTED">Accepted</option>
            </select>

        </div>
    );
}

export default JobFilters;