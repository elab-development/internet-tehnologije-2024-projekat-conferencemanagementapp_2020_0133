import axiosConferenceInstance from "../axiosConfig";


export const conferecesApi = {
    getConferences: () => axiosConferenceInstance.get('/conferences/'),
    getConferenceById: (id) => axiosConferenceInstance.get(`/conferences/${id}/`),
    createConference: (data) => axiosConferenceInstance.post('/conferences/', data),
    updateConference: (id, data) => axiosConferenceInstance.put(`/conferences/${id}/`, data),
    deleteConference: (id) => axiosConferenceInstance.delete(`/conferences/${id}/`),
}