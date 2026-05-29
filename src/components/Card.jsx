function Card({ title, value }) {
    return (
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-gray-200 bg-linear-to-br from-blue-50 via-white to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            
            {/* soft glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-200 opacity-20 blur-2xl"></div>

            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                {title}
            </h3>

            <p className="mt-4 text-4xl font-bold text-gray-800">
                {value}
            </p>

            {/* small accent line */}
            <div className="mt-5 h-1 w-16 rounded-full bg-blue-500"></div>
        </div>
    );
}

export default Card;