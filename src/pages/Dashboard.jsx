import { useEffect, useState } from "react";
import JobTable from "../components/jobs/JobTable";
import AddJobForm from "./AddJobForm";
import Layout from "../layouts/Layout";
import { getJobs } from "../services/jobService";
import { getDashboardSummary } from "../services/dashboardService";

function Dashboard() {
    const [showModal, setShowModal] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            const [jobsResponse, summaryResponse] = await Promise.all([
                getJobs(0, 5),
                getDashboardSummary()
            ]);

            setJobs(jobsResponse.content || []);
            setSummary(summaryResponse || {});
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const totalApplications = summary.totalApplications ?? 0;

    const getPercent = (value) => {
        if (!totalApplications) return 0;
        return Math.round((value / totalApplications) * 100);
    };

    return (
        <Layout>
            <div className="min-h-screen space-y-8 bg-slate-50">

                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900 p-8 text-white shadow-xl">
                    <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl"></div>
                    <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-purple-400/20 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="mb-2 text-sm font-medium text-blue-200">
                                AI Job Application Tracker
                            </p>

                            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                                Welcome back 👋
                            </h1>

                            <p className="mt-3 max-w-xl text-sm text-slate-300">
                                Track applications, analyze resumes, generate cover letters,
                                and improve your job search using AI.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="w-fit rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 shadow-lg transition hover:scale-[1.03] hover:bg-blue-50"
                        >
                            + Add Job
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="rounded-3xl bg-white p-8 text-gray-500 shadow-sm">
                        Loading dashboard...
                    </div>
                ) : (
                    <>
                        {/* Main Stats */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                            <StatCard
                                title="Total Applications"
                                value={summary.totalApplications ?? 0}
                                subtitle="Jobs tracked"
                                accent="from-blue-500 to-indigo-600"
                            />

                            <StatCard
                                title="Interviews"
                                value={summary.interviewCount ?? 0}
                                subtitle={`${getPercent(summary.interviewCount ?? 0)}% conversion`}
                                accent="from-emerald-500 to-teal-600"
                            />

                            <StatCard
                                title="Offers"
                                value={summary.offerCount ?? 0}
                                subtitle="Final wins"
                                accent="from-amber-500 to-orange-600"
                            />

                            <StatCard
                                title="Avg Match"
                                value={`${Math.round(summary.averageMatchPercentage ?? 0)}%`}
                                subtitle="AI skill match"
                                accent="from-purple-500 to-pink-600"
                            />
                        </div>

                        {/* Middle Section */}
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                            {/* Pipeline */}
                            <div className="xl:col-span-2 rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">
                                            Application Pipeline
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            Status breakdown of your job search
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <PipelineRow
                                        label="Applied"
                                        value={summary.appliedCount ?? 0}
                                        percent={getPercent(summary.appliedCount ?? 0)}
                                        bar="bg-blue-500"
                                    />

                                    <PipelineRow
                                        label="Interview"
                                        value={summary.interviewCount ?? 0}
                                        percent={getPercent(summary.interviewCount ?? 0)}
                                        bar="bg-emerald-500"
                                    />

                                    <PipelineRow
                                        label="Rejected"
                                        value={summary.rejectedCount ?? 0}
                                        percent={getPercent(summary.rejectedCount ?? 0)}
                                        bar="bg-red-500"
                                    />

                                    <PipelineRow
                                        label="Offers"
                                        value={summary.offerCount ?? 0}
                                        percent={getPercent(summary.offerCount ?? 0)}
                                        bar="bg-amber-500"
                                    />
                                </div>
                            </div>

                            {/* AI Activity */}
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
                                <h2 className="text-xl font-bold text-slate-800">
                                    AI Activity
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Your AI-powered career assistant usage
                                </p>

                                <div className="mt-6 space-y-4">
                                    <AIActivityItem
                                        title="Resume Reviews"
                                        value={summary.totalAiFeedbacks ?? 0}
                                        description="AI feedback generated"
                                    />

                                    <AIActivityItem
                                        title="Cover Letters"
                                        value={summary.totalCoverLetters ?? 0}
                                        description="Letters created"
                                    />

                                    <AIActivityItem
                                        title="Skill Gap Reports"
                                        value={summary.totalSkillGapReports ?? 0}
                                        description="Job match reports"
                                    />

                                    <AIActivityItem
                                        title="Uploaded Resumes"
                                        value={summary.totalResumes ?? 0}
                                        description="Available for AI"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Recent Applications */}
                        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">
                                        Recent Applications
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        Latest jobs you added
                                    </p>
                                </div>
                            </div>

                            {jobs.length > 0 ? (
                                <JobTable
                                    data={jobs}
                                    limit={5}
                                    showActions={false}
                                />
                            ) : (
                                <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
                                    <h3 className="text-lg font-semibold text-slate-700">
                                        No applications yet
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Add your first job application to start tracking.
                                    </p>

                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
                                    >
                                        Add Job
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Add Job Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                        <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute right-5 top-4 text-3xl text-gray-400 transition hover:text-black"
                            >
                                ×
                            </button>

                            <div className="p-8">
                                <AddJobForm
                                    setShowModal={setShowModal}
                                    onJobAdded={fetchDashboardData}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

function StatCard({ title, value, subtitle, accent }) {
    return (
        <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm border border-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
            <div className={`absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-to-br ${accent} opacity-15 transition group-hover:opacity-25`}></div>

            <p className="text-sm font-medium text-slate-500">
                {title}
            </p>

            <h3 className="mt-4 text-4xl font-bold text-slate-900">
                {value}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
                {subtitle}
            </p>
        </div>
    );
}

function PipelineRow({ label, value, percent, bar }) {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <div>
                    <p className="font-semibold text-slate-700">
                        {label}
                    </p>
                    <p className="text-xs text-slate-400">
                        {percent}% of total applications
                    </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                    {value}
                </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                    className={`h-full rounded-full ${bar} transition-all duration-700`}
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    );
}

function AIActivityItem({ title, value, description }) {
    return (
        <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100">
            <div>
                <h3 className="font-semibold text-slate-800">
                    {title}
                </h3>

                <p className="text-xs text-slate-500">
                    {description}
                </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
                {value}
            </div>
        </div>
    );
}

export default Dashboard;