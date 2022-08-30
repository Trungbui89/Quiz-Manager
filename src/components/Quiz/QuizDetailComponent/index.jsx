import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Box, Grid, IconButton, Typography } from '@mui/material';
import RenderQuiz from '../RenderQuizComponent'
import { getQuizByQuizId, getAllAccount } from '../../../api/actions'
import Loading from '../../../helper/Loading'
import { convertDateToLocal } from '../../../constants/shared'

export default function QuizDetail() {
    const { id } = useParams()
    const [quizDetail, setQuizDetail] = React.useState('')

    const getQuizDetail = () => {
        getQuizByQuizId(id)
        .then((res) => {
            setQuizDetail(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }
    React.useEffect(() => {
        getQuizDetail()
    },[])

    const [staffs, setStaffs] = React.useState('')

    const getStaffs = () => {
        getAllAccount()
        .then((res) => {
            setStaffs(res.data)
        })
        .catch((err) => {
            console.error(err)
        })
    }

    React.useEffect(() => {
        getStaffs()
    },[])

    const history = useHistory()
    const pushHistory = () => {
        history.goBack()
    }

    return (
        <div>
        {
            quizDetail !== '' && staffs !== '' ?
            (
            <div className="card__list-test">
                <div className="card__header">
                    <div onClick={pushHistory} className='back-button'>
                        <IconButton sx={{ marginLeft:'-15px' }}>
                            <img src="/icon/Back.svg" alt="back" />
                        </IconButton>
                    </div>
                    <h3 className="">Quản lý bài kiểm tra</h3>
                </div>
                    {/* <div onClick={pushHistory} style={styles.backBtn}>
                        <IconButton sx={{ fontSize: 30 }}>
                            <img src="/icon/Back.svg" alt="back" />
                        </IconButton>
                        <Typography>
                            Chi tiết thông tin
                        </Typography>
                    </div> */}
                    <Box className='box-info-quiz-finish'>
                        <div className='box-info-quiz-finish-title'>{quizDetail.description}</div>
                        <Grid container spacing={2} className='py-5'>
                            <Grid item xs={3} className='box-info-quiz-finish-item-title' sx={{textAlign: 'center'}}>
                                <img src='/icon/Clock_dashboard.svg' alt=''/>
                                <div>Thời gian làm bài</div>
                                <p>{quizDetail.quizTime} phút</p>
                            </Grid>
                            <Grid item xs={3} className='box-info-quiz-finish-item-title' sx={{textAlign: 'center'}}>
                                <img src='/icon/QuestionCount_Dashboard.svg' alt=''/>
                                <div>Số câu hỏi</div>
                                <p>{quizDetail.numberQuestions} câu</p>
                            </Grid>
                            <Grid item xs={3} className='box-info-quiz-finish-item-title' sx={{textAlign: 'center'}}>
                                <img src='/icon/CreateDate_Dashboard.svg' alt=''/>
                                <div>Ngày tạo</div>
                                <p>{convertDateToLocal(quizDetail.createDate)}</p>
                            </Grid>
                            <Grid item xs={3} className='box-info-quiz-finish-item-title' sx={{textAlign: 'center'}}>
                                <img src='/icon/Topic_Dashboard.svg' alt=''/>
                                <div>Chủ đề</div>
                                <p>{quizDetail.cate}</p>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box style={{ margin: '55px 5% 55px 10%' }}>
                        <RenderQuiz id={id}/>
                    </Box>
            </div>
            )
            :
            <Loading />
        }
        </div>
    )
}

const styles = {
    backBtn: {
        display: 'flex', 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        cursor: 'pointer', 
        padding: '15px 0px 10px 0', 
        marginLeft: '-15px',
        width: 'fit-content'
    },
    header: {
        marginLeft: '5%',
    }
}