import api from "../api/axios";

export const getJobs = async (page = 0, size = 10, filters = {}) => {
    const response = await api.get("/jobs", {
        params: {
            page,
            size,
            status: filters.status || "",
            keyword: filters.search || "",
            sort: "applicationDate,desc",
        },
    });

    return response.data;
};

export const getCardDetails = async ()=>{
    const response = await api.get("/jobs/cardDetails");    
    return response.data;
}

export const createJobInDB = async (jobFormData)=>{
    const response = await api.post("/jobs",jobFormData);
    return response.data;
}

export const deleteJobById = async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
};

export const updateJobById = async (id, data) => {
    const response = await api.patch(`/jobs/${id}`, data);
    return response.data;
};