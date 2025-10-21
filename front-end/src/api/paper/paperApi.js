import axiosConferenceInstance from "../axiosConfig";

export const paperApi = {
  submitPaper: (data) => {
    // data: { title, abstract, file, topicId, conferenceId, coAuthors }
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("abstract", data.abstract);
    formData.append("file", data.file);
    formData.append("topicId", data.topicId);
    formData.append("conferenceId", data.conferenceId);
    if (data.coAuthors) formData.append("coAuthors", data.coAuthors);

    return axiosConferenceInstance.post("/papers", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};