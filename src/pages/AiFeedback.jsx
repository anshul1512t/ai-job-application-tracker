import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import {
    getAllFeedbacks,
    deleteFeedbackById,
} from "../services/aiService";

function AIFeedback() {

    const [feedbacks, setFeedbacks] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {

        const fetchFeedbacks = async () => {

            try {

                const data = await getAllFeedbacks();

                setFeedbacks(Array.isArray(data) ? data : []);

            } catch (error) {

                console.log(error);
            }
        };

        fetchFeedbacks();

    }, []);

    const handleDelete = async (id) => {

        try {

            await deleteFeedbackById(id);

            setFeedbacks((prev) =>
                prev.filter(
                    (item) =>
                        item.resumeAnalysisId !== id
                )
            );

            if (selected?.resumeAnalysisId === id) {
                setSelected(null);
            }

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <Layout>

            <div className="space-y-6">

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        AI Resume Reviews
                    </h1>

                    <p className="mt-2 text-gray-500">
                        All AI-generated resume analysis reports
                    </p>
                </div>

                {/* EMPTY */}
                {feedbacks.length === 0 && (
                    <div
                        className="
                            rounded-3xl border border-dashed
                            border-gray-300 bg-white p-10
                            text-center text-gray-500
                        "
                    >
                        No AI feedbacks found
                    </div>
                )}

                {/* CARDS */}
                <div className="grid gap-6">

                    {feedbacks.map((item) => (

                        <div
                            key={item.resumeAnalysisId}
                            className="
                                rounded-3xl border border-gray-200
                                bg-white p-6 shadow-sm
                                transition hover:shadow-lg
                            "
                        >

                            <div className="flex items-start justify-between gap-5">

                                <div className="flex-1 space-y-4">

                                    {/* SCORE */}
                                    <div
                                        className="
                                            inline-block rounded-2xl
                                            bg-purple-100 px-4 py-2
                                            text-sm font-semibold
                                            text-purple-700
                                        "
                                    >
                                        AI Score: {item.score}/10
                                    </div>

                                    {/* SUMMARY */}
                                    <p
                                        className="
                                            line-clamp-3 leading-7
                                            text-gray-600
                                        "
                                    >
                                        {item.summary}
                                    </p>

                                    {/* DATE */}
                                    <p className="text-sm text-gray-400">
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleString()}
                                    </p>

                                </div>

                                {/* ACTIONS */}
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
                                        onClick={() =>
                                            handleDelete(
                                                item.resumeAnalysisId
                                            )
                                        }
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

            {/* MODAL */}
            {selected && (

                <div
                    className="
                        fixed inset-0 z-50
                        flex items-center justify-center
                        bg-black/50 px-4
                    "
                >

                    <div
                        className="
                            w-full max-w-4xl rounded-3xl
                            bg-white shadow-2xl
                        "
                    >

                        {/* HEADER */}
                        <div
                            className="
                                flex items-center justify-between
                                border-b px-6 py-4
                            "
                        >

                            <h2
                                className="
                                    text-2xl font-bold text-gray-800
                                "
                            >
                                🤖 Resume Analysis
                            </h2>

                            <button
                                onClick={() => setSelected(null)}
                                className="
                                    text-3xl text-gray-500
                                    hover:text-black
                                "
                            >
                                ×
                            </button>

                        </div>

                        {/* BODY */}
                        <div
                            className="
                                max-h-[80vh] overflow-y-auto
                                space-y-8 px-6 py-6
                            "
                        >

                            {/* SCORE */}
                            <div
                                className="
                                    rounded-3xl bg-blue-50 p-6
                                "
                            >

                                <h3
                                    className="
                                        mb-2 text-lg font-semibold
                                        text-blue-800
                                    "
                                >
                                    Resume Score
                                </h3>

                                <p
                                    className="
                                        text-5xl font-bold text-blue-700
                                    "
                                >
                                    {selected.score}/10
                                </p>

                            </div>

                            {/* SUMMARY */}
                            <div>

                                <h3
                                    className="
                                        mb-3 text-xl font-semibold
                                        text-gray-800
                                    "
                                >
                                    Summary
                                </h3>

                                <div
                                    className="
                                        rounded-2xl bg-gray-50
                                        p-5 leading-8 text-gray-700
                                    "
                                >
                                    {selected.summary}
                                </div>

                            </div>

                            {/* STRENGTHS */}
                            <div>

                                <h3
                                    className="
                                        mb-4 text-xl font-semibold
                                        text-gray-800
                                    "
                                >
                                    Strengths
                                </h3>

                                <div className="flex flex-wrap gap-3">

                                    {selected.strengths?.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="
                                                    rounded-full bg-green-100
                                                    px-4 py-2 text-sm
                                                    font-medium text-green-700
                                                "
                                            >
                                                {item}
                                            </div>
                                        )
                                    )}

                                </div>

                            </div>

                            {/* IMPROVEMENTS */}
                            <div>

                                <h3
                                    className="
                                        mb-4 text-xl font-semibold
                                        text-gray-800
                                    "
                                >
                                    Improvements
                                </h3>

                                <div className="space-y-3">

                                    {selected.improvements?.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="
                                                    rounded-2xl border
                                                    border-gray-200
                                                    bg-gray-50 p-4
                                                    text-gray-700
                                                "
                                            >
                                                {item}
                                            </div>
                                        )
                                    )}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </Layout>
    );
}

export default AIFeedback;