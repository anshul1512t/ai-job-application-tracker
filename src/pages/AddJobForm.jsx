import { useState } from "react";
import { createJobInDB } from "../services/jobService";

function AddJobForm({ setShowModal }) {
    const today = new Date().toISOString().split("T")[0];

    const [jobFormData, setJobFormData] = useState({
        companyName: "",
        jobTitle: "",
        status: "APPLIED",
        jobType: "FULL_TIME",
        salaryExpectation: "",
        location: "",
        applicationDate: today,
        jobUrl: "",
        jobDescription: "",
        notes: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        setJobFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleForm = async () => {
        try {
            const response = await createJobInDB(jobFormData);

            console.log(response);

            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="rounded-3xl border border-gray-200 bg-white/90 p-8 shadow-xl backdrop-blur">
            {/* Header */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        Add Job Application
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Save and track your next opportunity
                    </p>
                </div>

                <div className="rounded-2xl bg-blue-100 px-4 py-3 text-2xl">
                    💼
                </div>
            </div>

            <form className="space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Company Name
                        </label>

                        <input
                            type="text"
                            name="companyName"
                            value={jobFormData.companyName}
                            onChange={handleChange}
                            placeholder="Google"
                            className="
                                w-full rounded-2xl border border-gray-200
                                bg-gray-50 px-5 py-4 text-gray-700
                                outline-none transition duration-200
                                focus:border-blue-500 focus:bg-white
                                focus:ring-4 focus:ring-blue-100
                            "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Job Title
                        </label>

                        <input
                            type="text"
                            name="jobTitle"
                            value={jobFormData.jobTitle}
                            onChange={handleChange}
                            placeholder="Frontend Developer"
                            className="
                                w-full rounded-2xl border border-gray-200
                                bg-gray-50 px-5 py-4 text-gray-700
                                outline-none transition duration-200
                                focus:border-blue-500 focus:bg-white
                                focus:ring-4 focus:ring-blue-100
                            "
                        />
                    </div>
                </div>

                {/* Select Fields */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Status
                        </label>

                        <select
                            name="status"
                            value={jobFormData.status}
                            onChange={handleChange}
                            className="
                                w-full rounded-2xl border border-gray-200
                                bg-gray-50 px-5 py-4 text-gray-700
                                outline-none transition duration-200
                                focus:border-blue-500 focus:bg-white
                                focus:ring-4 focus:ring-blue-100
                            "
                        >
                            <option>APPLIED</option>
                            <option>IN_REVIEW</option>
                            <option>INTERVIEW</option>
                            <option>OFFER</option>
                            <option>REJECTED</option>
                            <option>ACCEPTED</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Job Type
                        </label>

                        <select
                            name="jobType"
                            value={jobFormData.jobType}
                            onChange={handleChange}
                            className="
                                w-full rounded-2xl border border-gray-200
                                bg-gray-50 px-5 py-4 text-gray-700
                                outline-none transition duration-200
                                focus:border-blue-500 focus:bg-white
                                focus:ring-4 focus:ring-blue-100
                            "
                        >
                            <option>FULL_TIME</option>
                            <option>INTERNSHIP</option>
                            <option>CONTRACT</option>
                            <option>REMOTE</option>
                            <option>HYBRID</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Salary Expectation
                        </label>

                        <input
                            type="number"
                            name="salaryExpectation"
                            value={jobFormData.salaryExpectation}
                            onChange={handleChange}
                            min="0"
                            step="1000"
                            placeholder="1200000"
                            className="
                                w-full rounded-2xl border border-gray-200
                                bg-gray-50 px-5 py-4 text-gray-700
                                outline-none transition duration-200
                                focus:border-blue-500 focus:bg-white
                                focus:ring-4 focus:ring-blue-100
                            "
                        />
                    </div>
                </div>

                {/* Extra Info */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={jobFormData.location}
                            onChange={handleChange}
                            placeholder="Bangalore"
                            className="
                                w-full rounded-2xl border border-gray-200
                                bg-gray-50 px-5 py-4 text-gray-700
                                outline-none transition duration-200
                                focus:border-blue-500 focus:bg-white
                                focus:ring-4 focus:ring-blue-100
                            "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Application Date
                        </label>

                        <input
                            type="date"
                            name="applicationDate"
                            value={jobFormData.applicationDate}
                            onChange={handleChange}
                            max={today}
                            className="
                                w-full rounded-2xl border border-gray-200
                                bg-gray-50 px-5 py-4 text-gray-700
                                outline-none transition duration-200
                                focus:border-blue-500 focus:bg-white
                                focus:ring-4 focus:ring-blue-100
                            "
                        />
                    </div>
                </div>

                {/* Job URL */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Job URL
                    </label>

                    <input
                        type="text"
                        name="jobUrl"
                        value={jobFormData.jobUrl}
                        onChange={handleChange}
                        placeholder="https://company.com/job"
                        className="
                            w-full rounded-2xl border border-gray-200
                            bg-gray-50 px-5 py-4 text-gray-700
                            outline-none transition duration-200
                            focus:border-blue-500 focus:bg-white
                            focus:ring-4 focus:ring-blue-100
                        "
                    />
                </div>

                {/* Job Description */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Job Description
                    </label>

                    <textarea
                        rows="6"
                        name="jobDescription"
                        value={jobFormData.jobDescription}
                        onChange={handleChange}
                        placeholder="Paste complete job description here..."
                        className="
            w-full rounded-2xl border border-gray-200
            bg-gray-50 px-5 py-4 text-gray-700
            outline-none transition duration-200
            focus:border-blue-500 focus:bg-white
            focus:ring-4 focus:ring-blue-100
        "
                    />
                </div>

                {/* Notes */}
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Notes
                    </label>

                    <textarea
                        rows="5"
                        name="notes"
                        value={jobFormData.notes}
                        onChange={handleChange}
                        placeholder="Interview details, recruiter contact, preparation notes..."
                        className="
                            w-full rounded-2xl border border-gray-200
                            bg-gray-50 px-5 py-4 text-gray-700
                            outline-none transition duration-200
                            focus:border-blue-500 focus:bg-white
                            focus:ring-4 focus:ring-blue-100
                        "
                    />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-4 pt-4">
                    <button
                        type="button"
                        className="
                            rounded-2xl border border-gray-300
                            px-6 py-3 font-medium text-gray-600
                            transition hover:bg-gray-100
                        "
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleForm}
                        className="
        rounded-2xl bg-linear-to-r
        from-blue-600 to-indigo-600
        px-8 py-3 font-semibold text-white
        shadow-lg shadow-blue-200
        transition duration-300
        hover:scale-[1.02]
        hover:from-blue-700 hover:to-indigo-700
    "
                    >
                        Add Application
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddJobForm;