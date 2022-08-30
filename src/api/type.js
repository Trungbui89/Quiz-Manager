import {API_ACCOUNT, API_QUIZ} from './services';

// ACCOUNT ***
//login
export const API_LOGIN = `${API_ACCOUNT}/accounts/login`; //POST

export const API_GET_STAFFS = `${API_ACCOUNT}/accounts/searchWithPaging`; //POST
export const API_STAFF_INFO = `${API_ACCOUNT}/accounts`; //GET  / param  {user id}, PUT -> not params
export const API_STAFF_ALL = `${API_ACCOUNT}/accounts/list`; //GET get all accounts
//role not in user
export const API_GET_ALL_ROLE = `${API_ACCOUNT}/accounts/role/list`; //GET
//role with user
export const API_GET_ROLE_IN_USER = `${API_ACCOUNT}/accounts/list/haverole`; //GET / param  {user id}
// permission with user
export const API_GET_PER_IN_USER = `${API_ACCOUNT}/accounts/list/havePer`; //GET / param  {user id}
// add role to user
export const API_POST_PER_TO_USER = `${API_ACCOUNT}/accounts/role/addtoaccounts`; //POST 
// delete user role
export const API_DELETE_USER_ROLE = `${API_ACCOUNT}/accounts/role/deleteroleaccount`; //DELETE 
// UPDATE permission -> user
export const API_UPDATE_USER_PERMISSION = `${API_ACCOUNT}/accounts/permission/updatetouser`; //PUT
// delete user permission
export const API_DELETE_USER_PERMISSION = `${API_ACCOUNT}/accounts/permission/deletepermissionaccount`; //DELETE
// put update staff
export const API_POST_UPDATE_STAFF = `${API_ACCOUNT}/accounts`; //PUT


//QUIZ ***
// get all category
export const API_GET_ALL_CATEGORY = `${API_QUIZ}/quiz/cate/list`; //GET
// get all nominee
export const API_GET_ALL_NOMINEE = `${API_QUIZ}/quiz/nominee/list`; //GET
// get all question type
export const API_GET_ALL_QUESTION_TYPE = `${API_QUIZ}/quiz/getAllQuestionType`; //GET
// tạo category
export const API_POST_CREATE_CATEGORY = `${API_QUIZ}/quiz/createCategory`; //POST
// tạo nominee
export const API_POST_CREATE_NOMINEE = `${API_QUIZ}/quiz/createnominee`; //POST
// tạo câu hỏi
export const API_POST_CREATE_QUESTION = `${API_QUIZ}/quiz/createquestion`; //POST
// lấy danh sách + filter questions
export const API_GET_QUESTION = `${API_QUIZ}/quiz/getquestionpaging`; //POST
// sửa question 
export const API_EDIT_QUESTION = `${API_QUIZ}/quiz/editquestion`; //PUT
// tạo bài Quiz
export const API_CREATE_QUIZ = `${API_QUIZ}/quiz`; //POST
// list Quiz chưa làm của user
export const API_GET_QUIZ_NOT_START = `${API_QUIZ}/quiz/notstart`; // GET params {user id}
// list quiz đã làm
export const API_GET_QUIZ_FINISH = `${API_QUIZ}/quiz/listbyuser`; // GET params {user id}
// List all quiz by user id
export const API_GET_QUIZ_BY_USER_ID = `${API_QUIZ}/quiz/all`; // GET params {user id}
// get quiz by quiz id
export const API_GET_QUIZ_BY_QUIZ_ID = `${API_QUIZ}/quiz` // GET params {quiz id}
// import file excel
export const API_IMPORT_FILE_EXCEL = `${API_QUIZ}/quiz/importquestion`
// get quiz group list by number paging
export const API_GET_QUIZ_BY_PAGING = `${API_QUIZ}/quiz/listgroup`
// get question answer by quiz id
export const API_GET_QUIZ_ANSWER = `${API_QUIZ}/quiz/viewquiz`
// delete question
export const API_DELETE_QUESTION = `${API_QUIZ}/quiz/blockquestion`
// get detail group quiz
export const API_POST_DETAIL_GROUP_QUIZ = `${API_QUIZ}/quiz/list`
// get quiz paging by user id
export const API_GET_QUIZ_PAGING_BY_USER_ID = `${API_QUIZ}/quiz/allbyuser`
// Delete Quiz Group
export const API_DELETE_QUIZ_GROUP = `${API_QUIZ}/quiz/deletelistquiz`