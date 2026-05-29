import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { getAllCoverLetters, deleteCoverLetterById, } from "../services/aiService";


function CoverLetters() {
    const [letters, setLetters] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetchLetters();
    }, []);

    const fetchLetters = async () => {
        try {
            const data = await getAllCoverLetters();
            setLetters(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log(error);
        }
    };

    const formatDate = (date) =>
        date ? new Date(date).toLocaleString() : "-";

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this cover letter?"
        );

        if (!confirmDelete) return;

        try {

            await deleteCoverLetterById(id);

            setLetters((prev) =>
                prev.filter((item) => item.id !== id)
            );

            if (selected?.id === id) {
                setSelected(null);
            }

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Cover Letters
                    </h1>
                    <p className="mt-2 text-gray-500">
                        All generated AI cover letters
                    </p>
                </div>

                {letters.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                        No cover letters found
                    </div>
                )}

                <div className="grid gap-6">
                    {letters.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
                        >
                            <div className="flex items-start justify-between gap-5">
                                <div className="flex-1 space-y-3">
                                    <div className="inline-block rounded-2xl bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                                        Job ID: {item.jobApplicationId}
                                    </div>

                                    <p className="line-clamp-3 whitespace-pre-wrap leading-7 text-gray-600">
                                        {item.coverLetter}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        {formatDate(item.createdAt)}
                                    </p>
                                </div>

                                <div className="flex gap-3">

                                    <button
                                        onClick={() => setSelected(item)}
                                        className="
            rounded-2xl bg-blue-600
            px-5 py-3 text-sm
            font-semibold text-white
            transition hover:bg-blue-700
        "
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="
            rounded-2xl bg-red-100
            px-5 py-3 text-sm
            font-semibold text-red-600
            transition hover:bg-red-200
        "
                                    >
                                        Delete
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    AI Cover Letter
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Job ID: {selected.jobApplicationId}
                                </p>
                            </div>

                            <button
                                onClick={() => setSelected(null)}
                                className="text-3xl text-gray-500 hover:text-black"
                            >
                                ×
                            </button>
                        </div>

                        <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
                            <div className="whitespace-pre-wrap rounded-2xl bg-gray-50 p-5 leading-8 text-gray-700">
                                {selected.coverLetter}
                            </div>

                            <div className="mt-5 flex justify-end">
                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            selected.coverLetter
                                        )
                                    }
                                    className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    Copy Cover Letter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default CoverLetters;