import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Settings from "../pages/Setting";
import AddJobForm from "../pages/AddJobForm";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Applications from "../pages/Applications";
import ResumePage from "../pages/ResumePage";
import AIFeedback from "../pages/AiFeedback";
import CoverLetters from "../pages/CoverLetters";
import SkillGapAnalyses from "../pages/SkillGapAnalysis";

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/resume-review" element={<ResumePage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/ai-feedback" element={<AIFeedback />} />
                <Route path="/cover-letters" element={<CoverLetters />} />
                <Route path="/skill-gaps" element={<SkillGapAnalyses />} />
            </Routes>
        </>
    );
}

export default AppRoutes;