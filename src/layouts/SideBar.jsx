import { Link } from "react-router-dom";
import { removeAuthResponse } from "../utils/authResponse";
import { useNavigate } from "react-router-dom";
import {
    FaHome,
    FaBriefcase,
    FaFileAlt,
    FaRobot,
    FaBrain,
    FaCog,
    FaUserCircle,
    FaSignOutAlt,
} from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

function Sidebar(creds) {
    const navigate = useNavigate();

    const logOut = () => {
        removeAuthResponse();
        navigate("/login");
    }

    return (
        <div className="fixed left-0 top-0 flex h-screen w-65 flex-col justify-between bg-[#0f172a] p-5 text-white shadow-2xl">

            {/* TOP */}
            <div>
                {/* LOGO */}
                <h1 className="mb-10 text-3xl font-black tracking-wide">
                    <span className="text-blue-500">Job</span>TrackerAI
                </h1>

                {/* NAVIGATION */}
                <nav className="flex flex-col gap-3">

                    <Link
                        to="/"
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition-all duration-300 hover:bg-blue-500 hover:text-white"
                    >
                        <FaHome className="text-lg" />
                        Dashboard
                    </Link>

                    <Link
                        to="/applications"
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition-all duration-300 hover:bg-blue-500 hover:text-white"
                    >
                        <FaBriefcase className="text-lg" />
                        Applications
                    </Link>

                    <Link
                        to="/resume-review"
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition-all duration-300 hover:bg-blue-500 hover:text-white"
                    >
                        <FaFileAlt className="text-lg" />
                        Resume
                    </Link>

                    <Link
                        to="/cover-letters"
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition-all duration-300 hover:bg-blue-500 hover:text-white"
                    >
                        <MdOutlineMail className="text-lg" />
                        Cover Letters
                    </Link>
                    <Link
                        to="/skill-gaps"
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition-all duration-300 hover:bg-blue-500 hover:text-white"
                    >
                        <FaRobot className="text-lg" />
                        Skill Gaps
                    </Link>

                    <Link
                        to="/ai-feedback"
                        className="
        flex items-center gap-3 rounded-2xl
        px-4 py-3 text-gray-300
        transition-all duration-300
        hover:bg-blue-500 hover:text-white
    "
                    >

                        <FaBrain className="text-lg" />
                        AI Feedbacks
                    </Link>

                    <Link
                        to="/settings"
                        className="flex items-center gap-3 rounded-2xl px-4 py-3 text-gray-300 transition-all duration-300 hover:bg-blue-500 hover:text-white"
                    >
                        <FaCog className="text-lg" />
                        Settings
                    </Link>
                </nav>
            </div>

            {/* BOTTOM */}
            <div className="space-y-4 border-t border-gray-800 pt-5">

                {/* PROFILE CARD */}
                <div className="flex items-center gap-3 rounded-2xl bg-[#1e293b] p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-xl">
                        <FaUserCircle />
                    </div>

                    <div>
                        <h3 className="font-semibold">{creds.username}</h3>
                        <p className="text-sm text-gray-400">
                            {creds.email}
                        </p>
                    </div>
                </div>

                {/* LOGOUT BUTTON */}
                <button className="flex w-full items-center gap-3 rounded-2xl bg-red-500/10 px-4 py-3 text-red-400 transition-all duration-300 hover:bg-red-500 hover:text-white" onClick={logOut}>
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;