import axiosConferenceInstance from "../axiosConfig";


export const conferencesApi = {
    getConferences: (queryParams) => axiosConferenceInstance.get(`/conferences${queryParams ? `?${queryParams}` : ''}`),
    getConferenceById: (id) => axiosConferenceInstance.get(`/conferences/${id}/`),
    createConference: (data) => axiosConferenceInstance.post('/conferences/', data),
    updateConference: (id, data) => axiosConferenceInstance.put(`/conferences/${id}/`, data),
    deleteConference: (id) => axiosConferenceInstance.delete(`/conferences/${id}/`),
}