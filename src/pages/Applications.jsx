import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import JobTable from "../components/jobs/JobTable";
import JobFilters from "../components/jobs/JobFilter";
import Pagination from "../components/jobs/Pagination";
import {
    getResumeFeedback, generateCoverLetter,
    getAllCoverLetters, generateSkillGap
} from "../services/aiService";
import { getJobs, deleteJobById, updateJobById } from "../services/jobService";

function Applications() {

    const [skillGapOpen, setSkillGapOpen] = useState(false);
    const [skillGapResult, setSkillGapResult] = useState(null);
    const [loadingSkillGap, setLoadingSkillGap] = useState(false);

    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [aiResult, setAiResult] = useState(null);
    const [aiOpen, setAiOpen] = useState(false);
    const [loadingAI, setLoadingAI] = useState(false);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    const [activeAIJobId, setActiveAIJobId] = useState(null);

    const [coverLetterOpen, setCoverLetterOpen] = useState(false);
    const [coverLetterResult, setCoverLetterResult] = useState(null);
    const [coverLetters, setCoverLetters] = useState([]);
    const [loadingCoverLetter, setLoadingCoverLetter] = useState(false);

    const [formData, setFormData] = useState({
        status: "",
        salaryExpectation: "",
        location: "",
        jobType: "",
        notes: "",
        jobDescription: "",
    });
    const [filters, setFilters] = useState({
        search: "",
        status: "",
    });

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await getJobs(page, 10, filters);
            setJobs(res.content || []);
            setTotalPages(res.totalPages || 0);
        };

        fetchJobs();
    }, [page, filters]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));

        setPage(0);
    };

    const handleClearFilters = () => {
    setFilters({
        search: "",
        status: "",
    });

    setPage(0);
};

    // DELETE
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this job?")) return;

        await deleteJobById(id);
        setJobs((prev) => prev.filter((j) => j.id !== id));
    };

    // OPEN EDIT
    const handleEditOpen = (job) => {
        setEditId(job.id);

        setFormData({
            status: job.applicationStatus || job.status,
            salaryExpectation: job.salaryExceptation,
            location: job.location,
            jobType: job.jobType,
            notes: job.notes,
            jobDescription: job.jobDescription,
        });

        setIsEditOpen(true);
    };

    // UPDATE
    const handleUpdate = async () => {
        try {
            const payload = {
                ...formData,
                salaryExpectation: formData.salaryExpectation
                    ? Number(formData.salaryExpectation)
                    : null,
            };

            const updated = await updateJobById(editId, payload);

            setJobs((prev) =>
                prev.map((job) =>
                    job.id === editId ? updated : job
                )
            );

            setIsEditOpen(false);
        } catch (err) {
            console.log(err);
        }
    };
    const handleAIReview = async (jobId) => {

        try {

            setActiveAIJobId(jobId);

            setLoadingAI(true);

            const resumeId =
                localStorage.getItem("selectedResumeId");

            if (!resumeId) {

                alert("Please select resume first");

                return;
            }

            const result = await getResumeFeedback(
                resumeId,
                jobId
            );

            setAiResult(result);

            setAiOpen(true);

        } catch (error) {

            console.log(error);

            alert("AI review failed");

        } finally {

            setLoadingAI(false);
        }
    };

    const handleGenerateCoverLetter = async (jobId) => {
        try {
            const resumeId = localStorage.getItem("selectedResumeId");

            if (!resumeId) {
                alert("Please select a resume first");
                return;
            }

            setLoadingCoverLetter(true);

            const result = await generateCoverLetter(
                resumeId,
                jobId
            );

            setCoverLetterResult(result);
            setCoverLetterOpen(true);

            const updatedCoverLetters = await getAllCoverLetters();
            setCoverLetters(updatedCoverLetters || []);

        } catch (error) {
            console.log(error);
            alert("Cover letter generation failed");
        } finally {
            setLoadingCoverLetter(false);
        }
    };
    const handleSkillGap = async (jobId) => {
    try {
        const resumeId = localStorage.getItem("selectedResumeId");

        if (!resumeId) {
            alert("Please select a resume first");
            return;
        }

        setLoadingSkillGap(true);

        const result = await generateSkillGap(resumeId, jobId);

        setSkillGapResult(result);
        setSkillGapOpen(true);

    } catch (error) {
        console.log(error);
        alert("Skill gap analysis failed");
    } finally {
        setLoadingSkillGap(false);
    }
};
    return (
        <Layout>

            <div className="mb-6 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
            <h1 className="text-3xl font-bold text-slate-800">
                Applications
            </h1>

            <p className="mt-1 text-sm text-slate-500">
                Manage, search and track your job applications
            </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">

            <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleChange}
                placeholder="Search company or title..."
                className="
                    w-full rounded-2xl border border-slate-200
                    px-4 py-3 text-sm
                    focus:border-blue-500
                    focus:outline-none
                    focus:ring-4 focus:ring-blue-100
                    sm:w-72
                "
            />

            <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="
                    rounded-2xl border border-slate-200
                    px-4 py-3 text-sm
                    focus:border-blue-500
                    focus:outline-none
                    focus:ring-4 focus:ring-blue-100
                "
            >
                <option value="">All Status</option>
                <option value="APPLIED">Applied</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="INTERVIEW">Interview</option>
                <option value="OFFER">Offer</option>
                <option value="REJECTED">Rejected</option>
                <option value="ACCEPTED">Accepted</option>
            </select>

            <button
                onClick={handleClearFilters}
                className="
                    rounded-2xl border border-slate-200
                    px-5 py-3 text-sm font-semibold
                    text-slate-600
                    hover:bg-slate-100
                "
            >
                Clear
            </button>

        </div>
    </div>
</div>

            <JobTable
    data={jobs}
    showActions={true}
    onDelete={handleDelete}
    onEdit={handleEditOpen}
    onAIReview={handleAIReview}
    onCoverLetter={handleGenerateCoverLetter}
    onSkillGap={handleSkillGap}
    activeAIJobId={activeAIJobId}
/>

            <Pagination
                page={page}
                totalPages={totalPages}
                onPrev={() => setPage((p) => Math.max(p - 1, 0))}
                onNext={() =>
                    setPage((p) => (p + 1 < totalPages ? p + 1 : p))
                }
            />

            {/* EDIT MODAL (simple, Tailwind friendly) */}
            {isEditOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-2xl w-125 space-y-4">

                        <h2 className="text-xl font-bold">Edit Job</h2>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={(e) =>
                                setFormData((p) => ({
                                    ...p,
                                    status: e.target.value,
                                }))
                            }
                            className="w-full border p-2 rounded"
                        >
                            <option>APPLIED</option>
                            <option>IN_REVIEW</option>
                            <option>INTERVIEW</option>
                            <option>OFFER</option>
                            <option>REJECTED</option>
                            <option>ACCEPTED</option>
                        </select>

                        <input
                            name="salaryExpectation"
                            value={formData.salaryExpectation}
                            onChange={(e) =>
                                setFormData((p) => ({
                                    ...p,
                                    salaryExpectation: e.target.value,
                                }))
                            }
                            className="w-full border p-2 rounded"
                            placeholder="Salary"
                        />

                        <input
                            name="location"
                            value={formData.location}
                            onChange={(e) =>
                                setFormData((p) => ({
                                    ...p,
                                    location: e.target.value,
                                }))
                            }
                            className="w-full border p-2 rounded"
                            placeholder="Location"
                        />

                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={(e) =>
                                setFormData((p) => ({
                                    ...p,
                                    jobType: e.target.value,
                                }))
                            }
                            className="w-full border p-2 rounded"
                        >
                            <option>FULL_TIME</option>
                            <option>INTERNSHIP</option>
                            <option>CONTRACT</option>
                            <option>REMOTE</option>
                            <option>HYBRID</option>
                        </select>

                        <textarea
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={(e) =>
                                setFormData((p) => ({
                                    ...p,
                                    jobDescription: e.target.value,
                                }))
                            }
                            className="w-full border p-2 rounded"
                            placeholder="Job Description"
                            rows="5"
                        />

                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={(e) =>
                                setFormData((p) => ({
                                    ...p,
                                    notes: e.target.value,
                                }))
                            }
                            className="w-full border p-2 rounded"
                            placeholder="Notes"
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsEditOpen(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Update
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {aiOpen && aiResult && (

                <div className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 px-4
    ">

                    <div className="
            w-full max-w-3xl
            rounded-3xl bg-white
            shadow-2xl
        ">

                        {/* HEADER */}
                        <div className="
                flex items-center justify-between
                border-b px-6 py-4
            ">

                            <div>
                                <h2 className="
                        text-2xl font-bold text-gray-800
                    ">
                                    🤖 AI Resume Review
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Resume vs Job Analysis
                                </p>
                            </div>

                            <button
                                onClick={() => setAiOpen(false)}
                                className="
                        text-2xl text-gray-500
                        hover:text-gray-700
                    "
                            >
                                ×
                            </button>

                        </div>

                        {/* BODY */}
                        <div className="
                max-h-[80vh] overflow-y-auto
                space-y-6 px-6 py-5
            ">

                            {/* SCORE */}
                            <div className="
                    rounded-2xl bg-blue-50
                    p-5
                ">

                                <h3 className="
                        mb-2 text-lg font-semibold
                        text-blue-800
                    ">
                                    Match Score
                                </h3>

                                <p className="
                        text-4xl font-bold text-blue-700
                    ">
                                    {aiResult.score}%
                                </p>

                            </div>

                            {/* SUMMARY */}
                            <div>

                                <h3 className="
                        mb-2 text-lg font-semibold
                        text-gray-800
                    ">
                                    Summary
                                </h3>

                                <p className="
                        rounded-2xl bg-gray-50
                        p-4 leading-7 text-gray-700
                    ">
                                    {aiResult.summary}
                                </p>

                            </div>

                            {/* MISSING SKILLS */}
                            <div>

                                <h3 className="
                        mb-3 text-lg font-semibold
                        text-gray-800
                    ">
                                    Missing Skills
                                </h3>

                                <div className="
                        flex flex-wrap gap-2
                    ">

                                    {aiResult.missingSkills?.map(
                                        (skill, index) => (

                                            <span
                                                key={index}
                                                className="
                                        rounded-full
                                        bg-red-100
                                        px-4 py-2
                                        text-sm font-medium
                                        text-red-700
                                    "
                                            >
                                                {skill}
                                            </span>
                                        )
                                    )}

                                </div>

                            </div>

                            {/* SUGGESTIONS */}
                            <div>

                                <h3 className="
                        mb-3 text-lg font-semibold
                        text-gray-800
                    ">
                                    Suggestions
                                </h3>

                                <div className="space-y-3">

                                    {aiResult.suggestions?.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="
                                        rounded-2xl
                                        border border-gray-200
                                        bg-gray-50
                                        p-4 text-gray-700
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

            {coverLetterOpen && coverLetterResult && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl">

                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    AI Cover Letter
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Generated successfully
                                </p>
                            </div>

                            <button
                                onClick={() => setCoverLetterOpen(false)}
                                className="text-3xl text-gray-500 hover:text-black"
                            >
                                ×
                            </button>
                        </div>

                        <div className="max-h-[75vh] overflow-y-auto px-6 py-6">
                            <div className="rounded-2xl bg-gray-50 p-5 leading-8 text-gray-700 whitespace-pre-wrap">
                                {coverLetterResult.coverLetter}
                            </div>

                            <div className="mt-5 flex justify-end">
                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            coverLetterResult.coverLetter
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
            {skillGapOpen && skillGapResult && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Skill Gap Analysis
                </h2>

                <button
                    onClick={() => setSkillGapOpen(false)}
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
                        {skillGapResult.matchPercentage}%
                    </p>
                </div>

                <div>
                    <h3 className="mb-3 text-xl font-semibold text-gray-800">
                        Analysis
                    </h3>

                    <p className="rounded-2xl bg-gray-50 p-5 leading-8 text-gray-700">
                        {skillGapResult.analysisText}
                    </p>
                </div>

                <div>
                    <h3 className="mb-3 text-xl font-semibold text-gray-800">
                        Missing Skills
                    </h3>

                    <div className="flex flex-wrap gap-3">
                        {skillGapResult.missingSkills?.map((skill, index) => (
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
                        {skillGapResult.recommendedSkills?.map((skill, index) => (
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

export default Applications;