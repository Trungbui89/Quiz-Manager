import moment from 'moment';
import AccActiveInfo from '../components/Account/AccActiveInfoComponent';
import ListQuizById from '../components/Quiz/ListQuizByIdComponent';
import QuizFinish from '../components/Quiz/QuizFinishComponent';
import StartQuiz from '../components/Quiz/StartQuizComponent';
import CompanyManage from '../controller/Account/CompanyManageController';
import RoleManage from '../controller/Account/RoleManageController';
import StaffInfo from '../controller/Account/StaffInfoController';
import React from 'react'
import StaffList from '../controller/Account/StaffListController';
import QuestionManage from '../controller/Quiz/QuestionManageController';
import QuizManage from '../controller/Quiz/QuizManageController';
import CreateQuizController from '../controller/Quiz/QuizManageController/CreateQuizController';
import TakeTest from '../controller/Quiz/TakeTestController';
import QuizDetail from '../components/Quiz/QuizDetailComponent';
import DetailQuizGroupComponent from '../components/Quiz/DetailQuizGroupComponent';

export const routePath = [
    {
        id: 0,
        path: '/supperadmin/role-manage',
        exact: true,
        component: RoleManage,
    },
    // {
    //     id: 1,
    //     path: '/supperadmin/company-manage',
    //     exact: true,
    //     component: CompanyManage,
    // },
    {
        id: 2,
        path: '/admin/staff-list',
        exact: true,
        component: StaffList,
    },
    {
        id: 3,
        path: '/admin/staff-list/:id',
        exact: true,
        component: StaffInfo,
    },
    {
        id: 4,
        path: '/quiz/create/question',
        exact: true,
        component: QuestionManage,
    },
    {
        id: 5,
        path: '/quiz/create/quiz',
        exact: true,
        component: QuizManage,
    },
    {
        id: 11,
        path: '/quiz/create/quiz/createquiz',
        exact: true,
        component: CreateQuizController,
    },
    {
        id: 6,
        path: '/quiz/quiz-user/:id',
        exact: true,
        component: ListQuizById,
    },
    {
        id: 7,
        path: '/account',
        exact: true,
        component: AccActiveInfo,
    },
    {
        id: 8,
        path: '/list-test/take-quiz/:id',
        exact: true,
        component: TakeTest,
    },
    {
        id: 14,
        path: '/admin/staff-list/list-quiz/:id',
        exact: true,
        component: TakeTest,
    },
    {
        id: 9,
        path: '/list-test/take-quiz/finish/:id&:stt',
        exact: true,
        component: QuizFinish,
    },
    {
        id: 15,
        path: '/admin/staff-list/list-quiz/finish/:id&:stt',
        exact: true,
        component: QuizFinish,
    },
    {
        id: 16,
        path: '/quiz/create/quiz/quiz-detail/finish/:id&:stt',
        exact: true,
        component: QuizFinish,
    },
    {
        id: 10,
        path: '/list-test/take-quiz/start/:id&:stt',
        exact: true,
        component: StartQuiz,
    },
    {
        id: 12,
        path: '/quiz/create/quiz/quiz-detail/:id',
        exact: true,
        component: DetailQuizGroupComponent,
    },
    {
        id: 13,
        path: '/quiz/create/quiz/quiz-detail/personally/:id&:stt',
        exact: true,
        component: QuizDetail,
    }
];

export const menuItem = [
    // {
    //     id: 1,
    //     title: 'Công ty',
    //     path: '/supperadmin/company-manage',
    //     icon: '/icon/Company.svg',
    //     type: 'staff',
    // },
    {
        id: 2,
        title: 'Phân quyền',
        path: '/supperadmin/role-manage',
        icon: '/icon/Role.svg',
        type: 'staff',
    },
    {
        id: 3,
        title: 'Nhân viên',
        path: '/admin/staff-list',
        icon: '/icon/Staff.svg',
        type: 'staff',
    },
    {
        id: 4,
        title: 'Câu hỏi',
        path: '/quiz/create/question',
        icon: '/icon/Question.svg',
        type: 'staff',
    },
    {
        id: 5,
        title: 'Bài kiểm tra',
        path: '/quiz/create/quiz',
        icon: '/icon/Quizz.svg',
        type: 'staff',
    },
    {
        id: 6,
        title: 'Làm bài',
        path: `/list-test/take-quiz/`,
        icon: '/icon/Take-test.svg',
        type: 'guest',
    },
];

export const dataStatusStaff = [
    // {
    //     id:0,
    //     label: 'Tất cả',
    //     value: ''
    // },
    {
        id:1,
        label: 'Chính thức',
        value: 'official'
    },
    {
        id:2,
        label: 'Thử việc',
        value: 'probation'
    },
    {
        id:3,
        label: 'Học việc',
        value: 'apprentice'
    },
    {
        id:4,
        label: 'Ứng viên',
        value: 'candidate'
    },
    {
        id:5,
        label: 'Nghỉ việc',
        value: 'escaped'
    },
]

export const imgLink = [
    '/images/company_1.jpg',
    '/images/company_2.jpg',
    '/images/company_3.jpg',
    '/images/company_4.jpg',
    '/images/company_5.jpg',
    '/images/company_6.jpg',
    '/images/company_1.jpg',
]

export const checkStatusStaff = (status) => {
    switch (status) {
        case 'official':
            return (
                <div className='status-staff-official'>
                    <div style={{ padding: '2px' }}>Chính thức</div>
                </div>
            );
        case 'probation':
            return (
                <div className='status-staff-probation'>
                    <div style={{ padding: '2px' }}>Thử việc</div>
                </div>
            );
        case 'apprentice':
            return (
                <div className='status-staff-apprentice'>
                    <div style={{ padding: '2px' }}>Học việc</div>
                </div>
            );
        case 'candidate':
            return (
                <div className='status-staff-candidate'>
                    <div style={{ padding: '2px' }}>Ứng viên</div>
                </div>
            );
        case 'escaped':
            return (
                <div className='status-staff-escaped'>
                    <div style={{ padding: '2px' }}>Nghỉ việc</div>
                </div>
            );
        default:
            return null;
    }
}

export const dataStatusStaffIcon = [
    // {
    //     id:0,
    //     label: 'Tất cả',
    //     value: ''
    // },
    {
        id:1,
        label: <div style={{width: '20px'}}>{checkStatusStaff('official')}</div>,
        value: 'official'
    },
    {
        id:2,
        label: <div style={{width: '20px'}}>{checkStatusStaff('probation')}</div>,
        value: 'probation'
    },
    {
        id:3,
        label: <div style={{width: '20px'}}>{checkStatusStaff('apprentice')}</div>,
        value: 'apprentice'
    },
    {
        id:4,
        label: <div style={{width: '20px'}}>{checkStatusStaff('candidate')}</div>,
        value: 'candidate'
    },
    {
        id:5,
        label: <div style={{width: '20px'}}>{checkStatusStaff('escaped')}</div>,
        value: 'escaped'
    },
]

export const checkStatusQuiz = (status) => {
    if(status.position && status.position === 'start_quiz') {
        switch (status.value) {
            case 'done':
                return (
                    <div className='status-staff-official-no-margin'>
                        <div style={{ padding: '2px' }}>Đã làm</div>
                    </div>
                );
            case 'not_start':
                return (
                    <div className='status-staff-apprentice-no-margin'>
                        <div style={{ padding: '2px' }}>Chưa làm</div>
                    </div>
                );
            case 'expired':
                return (
                    <div className='status-staff-candidate-no-margin'>
                        <div style={{ padding: '2px' }}>Hết hạn</div>
                    </div>
                );
            case 'doing':
                return (
                    <div className='status-staff-escaped-no-margin'>
                        <div style={{ padding: '2px' }}>Đang làm</div>
                    </div>
                );
            default:
                return null;
        }
    } else {
        switch (status) {
            case 'done':
                return (
                    <div className='status-staff-official'>
                        <div style={{ padding: '2px' }}>Đã làm</div>
                    </div>
                );
            case 'not_start':
                return (
                    <div className='status-staff-apprentice'>
                        <div style={{ padding: '2px' }}>Chưa làm</div>
                    </div>
                );
            case 'expired':
                return (
                    <div className='status-staff-candidate'>
                        <div style={{ padding: '2px' }}>Hết hạn</div>
                    </div>
                );
            case 'quitted':
                return (
                    <div className='status-quiz-expired'>
                        <div style={{ padding: '2px' }}>Bỏ thi</div>
                    </div>
                );
            case 'doing':
                return (
                    <div className='status-staff-escaped'>
                        <div style={{ padding: '2px' }}>Đang làm</div>
                    </div>
                );
            default:
                return null;
        }
    }
}



export const convertDateToLocal = (date) => {
    const dateLocal = moment(date).format("DD/MM/YYYY");
    return dateLocal;
}

export const convertDateTimeToLocal = (date) => {
    const dateLocal = moment(date).format("DD/MM/YYYY HH:mm");
    return dateLocal;
}

export const convertDateTime12hours = (date) => {
    const dateLocal = moment(date).format("DD/MM/YYYY LT");
    return dateLocal;
}

export const convertDateToApi = (date) => {
    const dateApi = moment(date).format("MM/DD/YYYY");
    return dateApi;
}

export const convertDataOptions = (data) => {
    if(Array.isArray(data) && data.length > 0) {
        const options =  data.map(item => ({
            id: item.id,
            label: item.name,
            value: item.id,
        }))
        return options
    } else return []
}
export const convertUTCDateStringToLocal = (dateString)=>{
    const dateUtc = moment.utc(dateString).format('YYYY-MM-DD HH:mm:ss');;
    const localDate = moment.utc(dateUtc).toDate();
    return moment(localDate).format('DD/MM/YYYY HH:mm:ss');
}

export const convertDateStringLocalToISOUTC = (dateString,formatOut = 'YYYY-MM-DDTHH:mm:ss')=>{
    const dateFormatFlex = moment(dateString).format(formatOut);
    const dateFormatISO = moment(dateFormatFlex).toISOString();
    const dateformat = moment.utc(dateFormatISO).format(formatOut);
   return dateformat;
}



