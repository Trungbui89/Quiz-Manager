import React from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { IconButton, Typography } from '@mui/material'
import SearchButton from '../../../helper/GroupButton/SearchButton';
import QuizTable from './QuizTable';
import PopupCustom  from '../../../helper/PopupCustom'
import PaginationComponent from '../../../helper/PaginationComponent';
import { getQuizPagingByUserId } from '../../../api/actions'
import { toastFail } from '../../../helper/Notification/utils'


const OverViewQuizComponent = (props) => {
    const { 
        listQuiz,
        setListQuiz,
        pagination,
        filterListQuiz,
        setFilterListQuiz
    } = props;
    
    const [quizStatus, setQuizstatus] = React.useState(false)
    const history = useHistory()

    const pushHistory = () => {
        history.goBack()
    }

    const changeQuizStatus = () => {
        setQuizstatus(!quizStatus)
    }

    return (
        <div className="page__out">
            <div className="page__in">
                <div className="card__list-test">
                    <div className="card__header">
                        {
                            Number(localStorage.getItem('roleId')) === 1
                            ??
                            (
                                <div onClick={pushHistory} className="back-button">
                                    <IconButton sx={{ fontSize: 30 }}>
                                        <img src="/icon/Back.svg" alt="back" />
                                    </IconButton>
                                    <Typography>
                                        Xem bài kiểm tra
                                    </Typography>
                                </div>
                            )
                        }
                        {
                            Number(localStorage.getItem('roleId')) === 1
                            ?
                                <h3 className="">Quản lý nhân viên</h3>
                            :
                                <h3 className="">Danh sách bài kiểm tra</h3>
                        }
                    </div>
                    {/* <div className='mt-3'>
                        <form onSubmit={searchQuizzes}>
                            <div className='container row'>
                                <div className='col-3'>
                                    <div className='form-group text-left'>
                                        <label>Thời gian mở</label>
                                        <input
                                            className='form-control'
                                            type='datetime-local'
                                            value={quizInput.startTime}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    startTime:
                                                        e.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className='form-group text-left'>
                                        <label>Thời gian hết hạn</label>
                                        <input
                                            className='form-control'
                                            type='datetime-local'
                                            value={quizInput.expiredTime}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    expiredTime:
                                                        e.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div className='form-group text-left'>
                                        <label>Trạng Thái</label>
                                        <select
                                            className='form-control text-info form-select'
                                            value={quizInput.status}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput,
                                                    status: e.target.value,
                                                });
                                            }}
                                        >
                                            <option value='done'>
                                                Đã làm 
                                            </option>
                                            <option value='not start'>
                                                Chưa làm 
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div className='form-group text-left'>
                                        <label>Nội dung tìm kiếm</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            placeholder='Nội dung'
                                            value={quizInput.content}
                                            onChange={(e) => {
                                                setQuizInput({
                                                    ...quizInput.quiz,
                                                    content:
                                                        e.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <SearchButton
                                        title='Tìm kiếm'
                                        quizListStyle={{width: '100%', fontSize: '1rem', lineHeight: 1.6}}
                                    />
                                </div>
                            </div>
                        </form>
                    </div> */}
                    <QuizTable 
                        listQuiz={listQuiz}
                        changeQuizStatus={changeQuizStatus}
                        pagination={pagination}
                    />
                    <PaginationComponent
                        isShowPaginate
                        hiddenDivider
                        pagination={pagination}
                        filterInfo={filterListQuiz}
                        handleChangePagination={setFilterListQuiz}
                    />
                </div>
            </div>
            <PopupCustom
                type = 'warning'
                paragraph = {[
                    'Chưa có kết quả cho bài kiểm tra này'
                ]}
                buttons = {['Quay lại']}
                quizStatus={quizStatus}
                changeQuizStatus={changeQuizStatus}
            />
        </div>
    );
};

export default OverViewQuizComponent;

// const styles = {
//     card_header: {
//         height: '8%',
//         width: '100%',
//         textAlign: 'left',
//         color: 'rgba(22, 30, 84, 1)',
//         fontFamily: 'Quicksand, sans-serif',
//         paddingTop: '1.5%',
//         fontWeight: 800,
//         fontSize: '35px',
//     }
// }

const styles = {
    backBtn: {
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        cursor: 'pointer', 
        padding: '15px 0px 10px', 
        width: 'fit-content',
        color: 'rgba(22, 30, 84, 1)'
    }
}