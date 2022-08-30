/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { deleteQuizGroup, postDetailGroupQuiz } from '../../../api/actions';
import { convertDateTimeToLocal, convertUTCDateStringToLocal } from '../../../constants/shared';
import { toastFail, toastSuccess } from '../../../helper/Notification/utils';
import PaginationComponent from '../../../helper/PaginationComponent';
import PopupCustom from '../../../helper/PopupCustom';
import DialogConfirm from './DialogConfirm';
import './styles.scss';
import TableData from './TableData';

function DetailQuizGroupComponent() {
    const { id } = useParams();
    const [requestData, setRequestData] = React.useState({
        page: 1,
        limit: 5,
        groupQuiz: +id,
    });
    const [data, setData] = React.useState();
    const [pagination, setPagination] = React.useState({
        page: 0,
        limit: 0,
        total: 0,
    });
    const [modalStatus, setModalStatus] = React.useState(false)
    const [confirmDialog, setConfirmDialog] = React.useState(false);
    const [groupQuizId, setGroupQuizId] = React.useState([]);
    const history = useHistory()

    const getDataGroupDetail = () => {
        postDetailGroupQuiz(requestData)
            .then(res => {
                setData(res.data);
                setPagination({
                    page: res.data.page,
                    limit: res.data.limit,
                    total: res.data.total
                })
            })
            .catch(err => {
                toastFail('Lấy thông tin thất bại');
            })
    }

    // const groupQuizId = data && data.quizList ? data.quizList.map(i => i.id) : []
    React.useEffect(() =>{
        if(data) {
            const grId = data.quizList.map(i => i.id);
            setGroupQuizId(grId)
        }
    }, [data])

    const toggleModalStatus = () => {
        setModalStatus(!modalStatus)
    }
    const toggleModalConfirmDialog = () => {
        setConfirmDialog(!confirmDialog)
    }

    const handleClickDelete = () => {
        toggleModalConfirmDialog()
    }

    const postDeleteGroupQuiz = () =>{
        deleteQuizGroup(groupQuizId).then(res => {
            if(res.data.message == 'Đã có ứng viên làm bài kiểm tra này.Xóa bài kiểm tra thất bại.') {
                toggleModalStatus()
            } else {
                toastSuccess('Xóa bài kiểm tra thành công');
                history.push('/quiz/create/quiz');
            }
        }).catch(err => {
            toggleModalStatus()
            // toastFail('Đã có lỗi xảy ra !')
        })
    }

    React.useEffect(() =>{
        getDataGroupDetail()
    },[requestData]);
    
    const quizInfo = data ? data?.quizList[0] : {};

    return (
        <div>
            <div className="card__list-test">
                <div className="card__header">
                    <div style={{ marginLeft:'-15px'}}>
                        <Link to="/quiz/create/quiz" className="back-button">
                            <IconButton sx={{ fontSize: 30 }}>
                                <img src="/icon/Back.svg" alt="back" />
                            </IconButton>
                        </Link>
                    </div>
                    <h3 className="">Quản lý bài kiểm tra</h3>
                </div>
                <Box>
                    <div className='title-detail-group-quiz'>{quizInfo ? quizInfo.groupName : ''}</div>
                </Box>
                <Box className='box-header-group'>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Box className='box-header-item' sx={{borderLeft:'4px solid #47B7FF'}}>
                                <div>Tổng số câu hỏi</div>
                                <div><span>{quizInfo?.numberQuestions ?? ''}</span> câu</div>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box className='box-header-item' sx={{borderLeft:'4px solid #36CA68'}}>
                                <div>Thời gian mở</div>
                                <div><span>{quizInfo?.startTime ? convertDateTimeToLocal(quizInfo?.startTime) : ''}</span></div>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box className='box-header-item' sx={{borderLeft:'4px solid #DC3545'}}>
                                <div>Thời gian đóng</div>
                                <div><span>{quizInfo?.expiredTime ? convertDateTimeToLocal(quizInfo?.expiredTime) : ''}</span></div>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box className='box-header-item' sx={{borderLeft:'4px solid #FFAA01'}}>
                                <div>Chủ đề</div>
                                <div><span>{quizInfo?.cate ?? ''}</span></div>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <Box className='box-table-group'>
                    <TableData 
                        dataRow={data?.quizList}
                        pagination={pagination}
                    />
                </Box>
                <PaginationComponent
                    hiddenTitle
                    isShowPaginate
                    hiddenDivider
                    pagination={pagination}
                    filterInfo={requestData}
                    handleChangePagination={setRequestData} 
                />
                <Box className='box-table-group text-right'>
                    <Button onClick={handleClickDelete} className='delete-group-quiz-button'>
                        Xóa bài kiểm tra
                    </Button>
                </Box>
            </div>
            <PopupCustom
                type='warning'
                modalStatus={modalStatus}
                changeModalStatus={toggleModalStatus}
                paragraph={[
                    'Đã có ứng viên làm bài kiểm tra này', 'Xóa bài kiểm tra thất bại!'
                ]}
            />
            <DialogConfirm open={confirmDialog} handleClose={toggleModalConfirmDialog} postDeleteGroupQuiz={postDeleteGroupQuiz}/>
        </div>
    );
}

export default DetailQuizGroupComponent;
