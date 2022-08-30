import axios from 'axios';
import { API_CREATE_QUIZ, API_EDIT_QUESTION, API_GET_ALL_CATEGORY, API_GET_ALL_NOMINEE, API_GET_ALL_QUESTION_TYPE, API_GET_QUESTION, 
         API_GET_QUIZ_FINISH, API_GET_QUIZ_NOT_START, API_POST_CREATE_CATEGORY, API_POST_CREATE_NOMINEE, API_POST_CREATE_QUESTION,
         API_GET_QUIZ_BY_USER_ID, API_STAFF_ALL, API_GET_QUIZ_BY_QUIZ_ID, API_IMPORT_FILE_EXCEL, API_GET_QUIZ_BY_PAGING, 
         API_GET_QUIZ_ANSWER,API_GET_ALL_ROLE, API_POST_UPDATE_STAFF, API_DELETE_QUESTION, API_STAFF_INFO, API_POST_DETAIL_GROUP_QUIZ,
         API_GET_QUIZ_PAGING_BY_USER_ID, API_DELETE_QUIZ_GROUP, API_LOGIN } from './type';

         
const headers = { headers: { Authorization:'Bearer ' + localStorage.getItem('token'), } }

//Account
//LOGIN
export const postLogin = (payload) => {
    return axios.post(`${API_LOGIN}`, payload);
};
// GET ALL ACCOUNT
export const getAllAccount = () => {
    return axios.get(`${API_STAFF_ALL}`, { headers: { Authorization:'Bearer ' + localStorage.getItem('token'), } });
};
//GET ALL ROLE
export const getAllRole = () => {
    return axios.get(`${API_GET_ALL_ROLE}`, { headers: { Authorization:'Bearer ' + localStorage.getItem('token'), } });
};
//POST UPDATE STAFF
export const postUpdateStaff = (payload) => {
    return axios.put(`${API_POST_UPDATE_STAFF}`, payload, { headers: { Authorization:'Bearer ' + localStorage.getItem('token'), } });
};
//GET ACCOUNT BY ID
export const getAccountById = (id) => {
    return axios.get(`${API_STAFF_INFO}/${id}`, { headers: { Authorization:'Bearer ' + localStorage.getItem('token'), } });
};


//Quiz

// GET ALL CATEGORY
export const getAllCategories = () => {
    return axios.get(`${API_GET_ALL_CATEGORY}`, headers);
};
// GET ALL NOMINEE
export const getAllNominee = () => {
    return axios.get(`${API_GET_ALL_NOMINEE}`, headers);
};
// GET ALL QUESTION TYPE
export const getAllQuesType = () => {
    return axios.get(`${API_GET_ALL_QUESTION_TYPE}`, headers);
};
//POST CREATE CATEGORY
export const postCreateCategory = (payload) => {
    return axios.post(`${API_POST_CREATE_CATEGORY}`, payload, headers);
};
//POST CREATE NOMINEE
export const postCreateNominee = (payload) => {
    return axios.post(`${API_POST_CREATE_NOMINEE}`, payload, headers)
};
// POST CREATE QUESTION
export const postCreateQuestion = (payload) => {
    return axios.post(`${API_POST_CREATE_QUESTION}`, payload, headers)
};
// POST import file excel
export const importFileExcel = (payload) => {
    return axios.post(`${API_IMPORT_FILE_EXCEL}`, payload, headers)
}
// POST request QUIZ list paging
export const getQuizListPaging = (payload) => {
    return axios.post(`${API_GET_QUIZ_BY_PAGING}`, payload, headers)
}
// Get all + Filter QUESTION
export const getFilterQuestion = (payload) => {
    return axios.post(`${API_GET_QUESTION}`, payload, headers)
};
// PUT EDIT QUESTION
export const putUpdateQuestion = (payload) => {
    return axios.put(`${API_EDIT_QUESTION}`, payload, headers)
};
// POST CREATE QUIZ
export const postCreateQuiz = (payload) => {
    return axios.post(`${API_CREATE_QUIZ}`, payload, headers)
};
// GET quiz notstart
export const getQuizNotStartWithUser = (userId) => {
    return axios.get(`${API_GET_QUIZ_NOT_START}/${userId}`, headers)
};
// GET quiz finished
export const getQuizFinishWithUser = (userId) => {
    return axios.get(`${API_GET_QUIZ_FINISH}/${userId}`, headers)
};
// GET questions by QUIZ id
export const getQuestionsByQuizId = (userId) => {
    return axios.get(`${API_GET_QUIZ_BY_USER_ID}/${userId}`, headers)
};
// GET quiz by quiz id
export const getQuizByQuizId = (quizId) => {
    return axios.get(`${API_GET_QUIZ_BY_QUIZ_ID}/${quizId}`, headers)
}
// GET quiz answer by quiz id
export const getQuizAnswerByQuizId = (quizId) =>{
    return axios.get(`${API_GET_QUIZ_ANSWER}/${quizId}`, headers)
}
// !Only block, GET quiz answer by quiz id 
export const putDeleteQuestion = (payload) =>{
    return axios.put(`${API_DELETE_QUESTION}`, payload, headers)
}
// POST detail group quiz
export const postDetailGroupQuiz = (payload) =>{
    return axios.post(`${API_POST_DETAIL_GROUP_QUIZ}`, payload, headers)
}
// GET quiz paging by user id
export const getQuizPagingByUserId = (payload) =>{
    return axios.post(`${API_GET_QUIZ_PAGING_BY_USER_ID}`, payload, headers)
}
// DELETE quiz group
export const deleteQuizGroup = (payload) =>{
    return axios.delete(`${API_DELETE_QUIZ_GROUP}`, {data: payload}, headers)
}
