import api from "../api/axios";

export const getResumeFeedback = async (
    resumeId
) => {

    const response = await api.post(
        "/ai/resume-feedback",
        {
            resumeId
        }
    );

    return response.data;
};



export const getAllFeedbacks = async () => {
    const response = await api.get(
        "/resume-analysis/feedbacks"
    );

    return response.data;
};

export const getFeedbackById = async (id) => {
    const response = await api.get(
        `/resume-analysis/feedbacks/${id}`
    );

    return response.data;
};

export const deleteFeedbackById = async (id) => {
    const response = await api.delete(
        `/resume-analysis/feedbacks/${id}`
    );

    return response.data;
};

export const generateCoverLetter = async (
    resumeId,
    jobApplicationId
) => {
    const response = await api.post("/ai/cover-letter", {
        resumeId,
        jobApplicationId,
    });

    return response.data;
};

export const getAllCoverLetters = async () => {
    const response = await api.get("/cover-letter");

    return response.data;
};

export const deleteCoverLetterById = async (id) => {
    const response = await api.delete(
        `/cover-letter/${id}`
    );

    return response.data;
};

export const generateSkillGap = async (resumeId, jobApplicationId) => {
    const response = await api.post("/ai/skill-gap", {
        resumeId,
        jobApplicationId,
    });

    return response.data;
};

export const getAllSkillGaps = async () => {
    const response = await api.get("/skill-gap-analysis");

    return response.data;
};

export const deleteSkillGapById = async (id) => {
    const response = await api.delete(`/skill-gap-analysis/${id}`);

    return response.data;
};