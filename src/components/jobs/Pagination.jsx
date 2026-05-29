function Pagination({ page, totalPages, onPrev, onNext }) {
    return (
        <div className="mt-6 flex justify-between items-center">

            <button
                onClick={onPrev}
                disabled={page === 0}
                className="px-4 py-2 border rounded disabled:opacity-50"
            >
                ← Prev
            </button>

            <p className="text-sm text-gray-600">
                Page {page + 1} of {totalPages}
            </p>

            <button
                onClick={onNext}
                disabled={page + 1 >= totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
            >
                Next →
            </button>

        </div>
    );
}

export default Pagination;