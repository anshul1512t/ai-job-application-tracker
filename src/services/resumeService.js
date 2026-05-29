import api from "../api/axios";

export const getAllResumes = async () => {

    const response = await api.get("/resumes");

    return response.data;
};

export const uploadResume = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/resumes/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const deleteResumeById = async (id) => {

    const response = await api.delete(`/resumes/${id}`);

    return response.data;
};