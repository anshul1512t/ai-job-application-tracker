import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import {
    getAllSkillGaps,
    deleteSkillGapById,
} from "../services/aiService";

function SkillGapAnalyses() {
    const [analyses, setAnalyses] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetchAnalyses();
    }, []);

    const fetchAnalyses = async () => {
        try {
            const data = await getAllSkillGaps();
            setAnalyses(Array.isArray(data) ? data : []);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this skill gap analysis?")) return;

        try {
            await deleteSkillGapById(id);

            setAnalyses((prev) =>
                prev.filter((item) => item.analysisId !== id)
            );

            if (selected?.analysisId === id) {
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
                        Skill Gap Analyses
                    </h1>

                    <p className="mt-2 text-gray-500">
                        All generated skill gap reports
                    </p>
                </div>

                {analyses.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
                        No skill gap analysis found
                    </div>
                )}

                <div className="grid gap-6">
                    {analyses.map((item) => (
                        <div
                            key={item.analysisId}
                            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
                        >
                            <div className="flex items-start justify-between gap-5">

                                <div className="flex-1 space-y-4">
                                    <div className="inline-block rounded-2xl bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                                        Match: {item.matchPercentage}%
                                    </div>

                                    <p className="line-clamp-3 leading-7 text-gray-600">
                                        {item.analysisText}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        Job ID: {item.jobApplicationId}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setSelected(item)}
                                        className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item.analysisId)}
                                        className="rounded-2xl bg-red-100 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-200"
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
                            <h2 className="text-2xl font-bold text-gray-800">
                                Skill Gap Analysis
                            </h2>

                            <button
                                onClick={() => setSelected(null)}
                                className="text-3xl text-gray-500 hover:text-black"
                            >
                                ×
                            </button>
                        </div>

                        <div className="max-h-[75vh] overflow-y-auto space-y-6 px-6 py-6">

                            <div className="rounded-3xl bg-purple-50 p-6">
                                <h3 className="mb-2 text-lg font-semibold text-purple-800">
                                    Match Percentage
                                </h3>

                                <p className="text-5xl font-bold text-purple-700">
                                    {selected.matchPercentage}%
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                                    Analysis
                                </h3>

                                <p className="rounded-2xl bg-gray-50 p-5 leading-8 text-gray-700">
                                    {selected.analysisText}
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                                    Missing Skills
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {selected.missingSkills?.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                                    Recommended Skills
                                </h3>

                                <div className="flex flex-wrap gap-3">
                                    {selected.recommendedSkills?.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default SkillGapAnalyses;