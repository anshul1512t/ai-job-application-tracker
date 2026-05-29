import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";

import {
    FaFilePdf,
    FaTrashAlt,
    FaFileWord,
    FaRobot,
    FaStar,
} from "react-icons/fa";

import {
    getAllResumes,
    uploadResume,
    deleteResumeById,
} from "../services/resumeService";

import { getResumeFeedback } from "../services/aiService";

function ResumePage() {

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [selectedAI, setSelectedAI] = useState(null);
    const [loadingAI, setLoadingAI] = useState(false);

    const [activeResumeId, setActiveResumeId] = useState(
        localStorage.getItem("selectedResumeId")
    );

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {

        try {

            const data = await getAllResumes();

            setResumes(data || []);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this resume?"
        );

        if (!confirmDelete) return;

        try {

            await deleteResumeById(id);

            setResumes((prev) =>
                prev.filter((resume) => resume.id !== id)
            );

        } catch (error) {

            console.log(error);
        }
    };

    const handleUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        try {

            setUploading(true);

            await uploadResume(file);

            fetchResumes();

        } catch (error) {

            console.log(error);

        } finally {

            setUploading(false);
        }
    };

    const handleUseForAI = (resume) => {

        if (activeResumeId == resume.id) {

            localStorage.removeItem(
                "selectedResumeId"
            );

            localStorage.removeItem(
                "selectedResumeName"
            );

            setActiveResumeId(null);

            return;
        }

        localStorage.setItem(
            "selectedResumeId",
            resume.id
        );

        localStorage.setItem(
            "selectedResumeName",
            resume.filename
        );

        setActiveResumeId(resume.id);
    };

    const handleAIReview = async (resume) => {

        try {

            setLoadingAI(true);

            const result = await getResumeFeedback(
                resume.id
            );

            setSelectedAI(result);

        } catch (error) {

            console.log(error);

            alert("AI Review failed");

        } finally {

            setLoadingAI(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    };

    return (
        <Layout>

            <div className="space-y-8">

                {/* HEADER */}
                <div className="
                    flex flex-col gap-5 rounded-3xl
                    border border-gray-200 bg-white
                    p-8 shadow-sm
                    md:flex-row md:items-center
                    md:justify-between
                ">

                    <div>

                        <h1 className="
                            text-3xl font-bold text-gray-800
                        ">
                            My Resumes
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Upload and manage resumes
                            for AI-powered features
                        </p>

                    </div>

                    <label
                        className="
                            cursor-pointer rounded-2xl
                            bg-linear-to-r
                            from-blue-600 to-indigo-600
                            px-6 py-4 font-semibold text-white
                            shadow-lg shadow-blue-200
                            transition hover:scale-[1.02]
                        "
                    >

                        {uploading
                            ? "Uploading..."
                            : "Upload Resume"}

                        <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleUpload}
                        />

                    </label>

                </div>

                {/* LOADING */}
                {loading && (
                    <div
                        className="
                            rounded-2xl bg-white
                            p-10 text-center
                            text-gray-500 shadow-sm
                        "
                    >
                        Loading resumes...
                    </div>
                )}

                {/* EMPTY */}
                {!loading && resumes.length === 0 && (
                    <div
                        className="
                            rounded-2xl bg-white
                            p-10 text-center
                            text-gray-500 shadow-sm
                        "
                    >
                        No resumes uploaded yet
                    </div>
                )}

                {/* RESUME CARDS */}
                {!loading && resumes.length > 0 && (

                    <div className="
                        grid gap-6
                        md:grid-cols-2
                        xl:grid-cols-3
                    ">

                        {resumes.map((resume) => (

                            <div
                                key={resume.id}
                                className="
                                    rounded-3xl border
                                    border-gray-200 bg-white
                                    p-6 shadow-sm transition
                                    hover:-translate-y-1
                                    hover:shadow-xl
                                "
                            >

                                {/* TOP */}
                                <div className="
                                    flex items-start
                                    justify-between
                                ">

                                    <div className="
                                        flex items-center gap-4
                                    ">

                                        <div
                                            className={`
                                                rounded-2xl p-4

                                                ${resume.filename.endsWith(".pdf")
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-blue-100 text-blue-600"
                                                }
                                            `}
                                        >

                                            {resume.filename.endsWith(".pdf")
                                                ? <FaFilePdf size={24} />
                                                : <FaFileWord size={24} />
                                            }

                                        </div>

                                        <div>

                                            <h2 className="
                                                max-w-45 truncate
                                                text-lg font-semibold
                                                text-gray-800
                                            ">
                                                {resume.filename}
                                            </h2>

                                            <p className="
                                                mt-1 text-sm
                                                text-gray-500
                                            ">
                                                Uploaded:
                                                {" "}
                                                {formatDate(
                                                    resume.uploadTime
                                                )}
                                            </p>

                                        </div>

                                    </div>

                                    <div
                                        className="
                                            flex items-center gap-1
                                            rounded-full bg-yellow-100
                                            px-3 py-1 text-xs
                                            font-semibold text-yellow-700
                                        "
                                    >
                                        <FaStar size={10} />
                                        Resume
                                    </div>

                                </div>

                                {/* ACTIONS */}
                                <div className="
                                    mt-8 flex flex-wrap gap-3
                                ">

                                    {/* AI REVIEW */}
                                    <button
                                        onClick={() =>
                                            handleAIReview(resume)
                                        }
                                        disabled={loadingAI}
                                        className="
                                            flex items-center gap-2
                                            rounded-xl bg-blue-600
                                            px-4 py-3 text-sm
                                            font-semibold text-white
                                            transition hover:bg-blue-700
                                        "
                                    >

                                        <FaRobot />

                                        {loadingAI
                                            ? "Analyzing..."
                                            : "AI Review"}

                                    </button>

                                    {/* USE FOR AI */}
                                    <button
                                        onClick={() =>
                                            handleUseForAI(resume)
                                        }
                                        className={`
                                            rounded-xl border
                                            px-4 py-3 text-sm
                                            font-medium transition

                                            ${activeResumeId == resume.id
                                                ? "border-purple-500 bg-purple-100 text-purple-700"
                                                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                            }
                                        `}
                                    >

                                        {activeResumeId == resume.id
                                            ? "✓ Selected"
                                            : "Use For AI"}

                                    </button>

                                    {/* DELETE */}
                                    <button
                                        onClick={() =>
                                            handleDelete(resume.id)
                                        }
                                        className="
                                            rounded-xl border
                                            border-red-200
                                            px-4 py-3 text-sm
                                            font-medium text-red-600
                                            transition hover:bg-red-50
                                        "
                                    >
                                        <FaTrashAlt />
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

            {/* AI MODAL */}
            {selectedAI && (

                <div
                    className="
                        fixed inset-0 z-50
                        flex items-center justify-center
                        bg-black/50 px-4
                    "
                >

                    <div
                        className="
                            w-full max-w-4xl
                            rounded-3xl bg-white
                            shadow-2xl
                        "
                    >

                        {/* HEADER */}
                        <div
                            className="
                                flex items-center
                                justify-between
                                border-b px-6 py-4
                            "
                        >

                            <h2
                                className="
                                    text-2xl font-bold
                                    text-gray-800
                                "
                            >
                                🤖 Resume Analysis
                            </h2>

                            <button
                                onClick={() =>
                                    setSelectedAI(null)
                                }
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
                                max-h-[80vh]
                                overflow-y-auto
                                space-y-8 px-6 py-6
                            "
                        >

                            {/* SCORE */}
                            <div
                                className="
                                    rounded-3xl
                                    bg-blue-50 p-6
                                "
                            >

                                <h3
                                    className="
                                        mb-2 text-lg
                                        font-semibold
                                        text-blue-800
                                    "
                                >
                                    Resume Score
                                </h3>

                                <p
                                    className="
                                        text-5xl font-bold
                                        text-blue-700
                                    "
                                >
                                    {selectedAI.score}/10
                                </p>

                            </div>

                            {/* SUMMARY */}
                            <div>

                                <h3
                                    className="
                                        mb-3 text-xl
                                        font-semibold
                                        text-gray-800
                                    "
                                >
                                    Summary
                                </h3>

                                <div
                                    className="
                                        rounded-2xl bg-gray-50
                                        p-5 leading-8
                                        text-gray-700
                                    "
                                >
                                    {selectedAI.summary}
                                </div>

                            </div>

                            {/* STRENGTHS */}
                            <div>

                                <h3
                                    className="
                                        mb-4 text-xl
                                        font-semibold
                                        text-gray-800
                                    "
                                >
                                    Strengths
                                </h3>

                                <div className="
                                    flex flex-wrap gap-3
                                ">

                                    {selectedAI.strengths?.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="
                                                    rounded-full
                                                    bg-green-100
                                                    px-4 py-2
                                                    text-sm font-medium
                                                    text-green-700
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
                                        mb-4 text-xl
                                        font-semibold
                                        text-gray-800
                                    "
                                >
                                    Improvements
                                </h3>

                                <div className="space-y-3">

                                    {selectedAI.improvements?.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="
                                                    rounded-2xl
                                                    border
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

export default ResumePage;