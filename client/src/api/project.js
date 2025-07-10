import axios from '../utils/axios';

export const fetchMembers = (projectId) =>
  axios.get(`/api/projects/${projectId}/members`).then(res => res.data);

export const addMember = (projectId, userId) =>
  axios.post(`/api/projects/${projectId}/members`, { user_id: userId });

export const removeMember = (projectId, memberId) =>
  axios.delete(`/api/projects/${projectId}/members/${memberId}`);
