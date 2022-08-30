/* eslint-disable react-hooks/exhaustive-deps */
import { RadioGroup, FormControlLabel, Radio, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import moment from 'moment'
import { apiQuiz } from '../../../api/apiConnect';
import { toastFail, toastSuccess } from '../../../helper/Notification/utils';
import Loading from '../../../helper/Loading'
import PopupCustom from '../../../helper/PopupCustom'
import { styles } from './styles'
import { convertDateTime12hours, checkStatusQuiz } from '../../../constants/shared'

const TimeOut = (props) => {
    const {
        status,
        setStatus,
        timeCount,
        setShowQuiz,
        id,
        postSubmitAnswer,
        history,
        stt
    } = props
    //Countdown Time
    const useInterval = (callback, delay) => {
        const savedCallback = React.useRef();
        // Remember the latest callback.
        React.useEffect(() => {
            savedCallback.current = callback
        }, [callback])
        // Set up the interval.
        React.useEffect(() => {
            const tick = () => {
                savedCallback.current()
            }
            if (delay !== null) {
                let id = setInterval(tick, delay)
                return () => clearInterval(id)
            }
        }, [delay])
    };
    const twoDigits = (num) => String(num).padStart(2, '0')
    const [secondsRemaining, setSecondsRemaining] = React.useState(timeCount)
    const secondsToDisplay = secondsRemaining % 60;
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
    const minutesToDisplay = minutesRemaining % 60;
    const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

    useInterval(
        () => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1)
            } else {
                setStatus(false)
                setShowQuiz(false)
                postSubmitAnswer()
                setTimeout(() => {
                    history.replace(`/list-test/take-quiz/finish/${id}&${Number(stt)}`);
                }, 1000)
            }
        },
        status === true ? 1000 : null,
        // passing null stops the interval
    )
    return (
        <div>
            <b>
                {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
                {twoDigits(secondsToDisplay)}
            </b>
        </div>
    );
}

// MAIN FUNCTION
export default function StartQuiz(props) {
    const token = localStorage.getItem('token');
    const [quizDetail, setQuizDetail] = React.useState({});
    const [timeCount, setTimeCount] = React.useState(0);
    const [answer, setAnswer] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const history = useHistory()

    // Handle Expired time
    const [checkExpiredTime, setCheckExpiredTime] = React.useState(false) 

    //HANDLE START QUIZ
    const [status, setStatus] = React.useState(false)
    const handleStart = () => {
        getStartQuiz()
    };

    //GET QUIZ DETAIL
    const getQuizDetail = () => {
        setLoading(true)
        let time = moment()
        apiQuiz
            .get(`/quiz/${id}`, { headers: { Authorization: token } })
            .then((res) => {
                if(moment.utc().diff(moment.utc(quiz.userStartQuiz), 'seconds') >= quiz.quizTime*60) {
                    setCheckExpiredTime(true)
                } else {
                    setQuizDetail(res.data)
                    res.data.userStartQuiz === 0 
                    ?
                        setTimeCount(res.data.quizTime * 60) 
                    :
                        setTimeCount(Math.ceil(((res.data.quizTime * 60)) - ((time - res.data.userStartQuiz) / 1000)))
                    setLoading(false)
                }               
            })
            .catch((err) => {
                setLoading(false)
            })
    }
    React.useEffect(() => {
        getQuizDetail()
    }, [])

    //START QUIZ
    const { id, stt } = useParams();
    const [quiz, setQuiz] = React.useState([]);
    const [showQuiz, setShowQuiz] = React.useState(false);
    const getStartQuiz = () => {
        setLoading(true)
        apiQuiz
            .get(`/quiz/startquiz/${id}`, { headers: { Authorization: token } })
            .then((res) => {
                setQuiz(res.data)
            })
            .then(() => {
                setShowQuiz(true)
                setStatus(true)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                if(err.request.status === 400){
                    toastFail('Chưa đến thời gian cho phép làm bài')
                } else {
                    toastFail('Đã có lỗi xảy ra!')
                }
            })
    }

    const [quesId, setQuesId] = React.useState([])

    React.useEffect(() => {
        if(localStorage.getItem('userAnswerId') == localStorage.getItem('id') && localStorage.getItem('userAnswerQuizId') == quizDetail.id) {
            setAnswer(JSON.parse(localStorage.getItem('userAnswer')))
        }
    },[quizDetail])

    React.useEffect(() => {
        if(answer.length > 0) {
            localStorage.setItem('userAnswer', JSON.stringify(answer))
            localStorage.setItem('userAnswerId', localStorage.getItem('id'))
            localStorage.setItem('userAnswerQuizId', id)
        }
    },[answer])

    const onChoiceSelect = (e, ques) => {
        if (quesId.includes(ques.questions_id) === true) {
            const newAnswer = answer.map((q) =>
                q.questions_id === ques.questions_id
                    ? {
                        quiz_id: ques?.quiz_id,
                        questions_id: ques?.questions_id,
                        questionType: {
                            id: ques?.questionType.id,
                        },
                        questionChoiceDTOs: [
                            {
                                id: e,
                                text: '',
                                userAnswer: true
                            },
                        ],
                    }
                    : q,
            );
            setAnswer(newAnswer);
        } else {
            setQuesId([...quesId, ques.questions_id]);
            let rechoiseAnswer = [
                ...answer,
                {
                    quiz_id: ques?.quiz_id,
                    questions_id: ques?.questions_id,
                    questionType: {
                        id: ques?.questionType.id,
                    },
                    questionChoiceDTOs: [
                        {
                            id: e,
                            text: '',
                            userAnswer: true
                        },
                    ],
                },
            ]
            setAnswer(rechoiseAnswer);
        }
    };

    const choiceCheck = answer.map((a) => a.questionChoiceDTOs[0].id)

    const postSubmitAnswer = () => {
        apiQuiz
            .post('/quiz/calculate', answer, {
                headers: { Authorization: token },
            })
            .then((res) => {
                getQuizDetail()
                changeModalStatus()
                setStatus(false)
                localStorage.removeItem('userAnswer')
                localStorage.removeItem('userAnswerId')
                localStorage.removeItem('userAnswerQuizId')
            })
            .catch((err) => {
                console.log(err);
                toastFail('Lỗi! Vui lòng kiểm tra lại');
            });
    };
    const RenderChoiceOfQuestion = (props) => {
        const { ques } = props;
        return ques?.questionChoiceDTOs.map((choice, idx) => (
            <div key={idx}>
                <FormControlLabel
                    style={{ color: '#565656' }}
                    value={choice.id}
                    control={
                        <Radio
                            checked={choiceCheck.includes(choice.id.toString())}
                            onChange={(e) => {
                                onChoiceSelect(e.target.value, ques);
                            }}
                        />
                    }
                    label={<Typography style={{ color: '#565656', fontFamily: '"Quicksand", sans-serif', fontSize: '19.2px' }}>{choice.name}</Typography>}
                />
            </div>
        ));
    };

    const RenderQuestion = () => {
        if (quiz.length > 0) {
            return quiz.map((ques, idx) => (
                <div
                    key={idx}
                    className="my-3 p-2 text-left"
                    style={{ borderBottom: '1px dashed #DCDCDC' }}
                >
                    <div className="row">
                        <div className="col-10">
                            <p style={{ fontSize: '1.2rem', color: '#565656' }}>
                                <span
                                    style={{ fontSize: 25, fontWeight: 'bold', marginRight: '1.2rem' }}
                                >
                                    {idx + 1}
                                </span>
                                <span style={{ whiteSpace: 'pre-wrap' }}>
                                    {ques.content}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div style={{ width: '95%', margin: 'auto' }}>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            column
                        >
                            <RenderChoiceOfQuestion ques={ques} />
                        </RadioGroup>
                    </div>
                </div>
            ));
        } else return null;
    }

    // MODAL STATUS CONTROLLER
    const [modalStatus, setModalStatus] = React.useState(false)

    const changeModalStatus = () => {
        setModalStatus(!modalStatus)
    }

    // RECHECK RESULTS
    const [checkResult, setCheckResult] = React.useState(false)
    const [questionRemain, setQuestionRemain] = React.useState(-1)
    const [btnTypeState, setButtonTypeState] = React.useState('')

    const overrideBtnType = () => {
        setButtonTypeState(answer.length === 0 ? 'warning' : (questionRemain === 0 ? 'success' : 'warning'))
    }
    React.useEffect(() => {
        overrideBtnType()
    },[questionRemain])

    const changeCheckResult = () => {
        setQuestionRemain(quizDetail.numberQuestions - answer.length)
        setCheckResult(!checkResult)
    }

    if (loading === false) {
        return (
            <div className="py-3 card__list-test">
                <div className='card__header'>
                    <h3>Làm bài</h3>
                </div>
                <div style={styles.previous}>
                    <IconButton sx={{ fontSize: 30, marginLeft: '-1rem' }} onClick={() => history.goBack()}>
                        <img src="/icon/Back.svg" alt="back" />
                    </IconButton>
                </div>
                {
                    status === false ?
                        (
                            <div className='card-information-user mt-4' style={styles.card}>
                                <div style={styles.cardTitle} className='pt-5'>
                                    <h3><b>{`${Number(stt)+1}. ${quizDetail.description}`}</b></h3>
                                </div>
                                <div className='p-3 row'>
                                    <div className='col-6' style={styles.labels}>
                                        <p className='mt-1 font-weight-bold'>Chủ đề</p>
                                        <p className='mt-1 font-weight-bold'>Số câu hỏi</p>
                                        <p className='mt-1 font-weight-bold'>Thời gian làm</p>
                                        <p className='mt-1 font-weight-bold'>Thời gian mở</p>
                                        <p className='mt-1 font-weight-bold'>Thời gian đóng</p>
                                        <p className='mt-1 font-weight-bold'>Trạng Thái</p>
                                    </div>
                                    <div className='col-6' style={styles.info}>
                                        <p className='mt-1'>{quizDetail.cate}</p>
                                        <p className='mt-1'>{`${quizDetail.numberQuestions} câu`}</p>
                                        <p className='mt-1'>{`${quizDetail.quizTime} phút`}</p>
                                        <p className='mt-1'>{convertDateTime12hours(quizDetail.startTime)}</p>
                                        <p className='mt-1'>{convertDateTime12hours(quizDetail.expiredTime)}</p>
                                        <div style={{ display: 'flex', justifyContent: 'left' }}>
                                            {checkStatusQuiz({value: quizDetail.status, position: 'start_quiz'})}
                                        </div>
                                    </div>
                                </div>
                                <div style={styles.btnGroup}>
                                    {
                                        quizDetail.status === 'not_start' 
                                        ?
                                            (
                                                <button
                                                    className="btn btn-outline-primary btn-lg"
                                                    onClick={handleStart}
                                                    style={styles.notStartBtn}
                                                    type="button"
                                                >
                                                    Làm bài
                                                </button>
                                            ) 
                                        :
                                            quizDetail.status === 'doing'
                                            ?
                                                (
                                                    <button
                                                        className="btn btn-outline-danger btn-lg"
                                                        onClick={handleStart}
                                                        style={styles.notStartBtn}
                                                        type="button"
                                                    >
                                                        Tiếp tục làm bài
                                                    </button>
                                                ) 
                                            :
                                                (
                                                    <>
                                                        <Link to={`/list-test/take-quiz/finish/${id}&${Number(stt)}`}>
                                                            <button
                                                                className="btn btn-outline-success btn-lg"
                                                                style={styles.notStartBtn}
                                                                type="button"
                                                            >
                                                                Xem kết quả
                                                            </button>
                                                        </Link>
                                                    </>
                                                )
                                    }
                                </div>
                            </div>
                        )
                        :
                        (
                            <div style={{ fontFamily: 'Quicksand' }}>
                                <div
                                    style={{
                                        textAlign: 'left',
                                        width: '90%',
                                        margin: 'auto',
                                        borderBottom: '1px dashed #DCDCDC',
                                        padding: 10,
                                    }}
                                >
                                    <h3>{quizDetail.description}</h3>
                                    <div className="row">
                                        <div className="col-6">
                                            <p>Số câu hỏi: {quizDetail.numberQuestions}</p>
                                            <p>Thời gian: {quizDetail.quizTime} phút</p>
                                        </div>
                                        <div className="col-2 offset-md-4">
                                            <div
                                                className="button-user text-center"
                                                style={{
                                                    width: 200,
                                                    fontWeight: 'normal',
                                                    fontSize: 18,
                                                    borderRadius: 50,
                                                    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
                                                    color: '#565656',
                                                    backgroundColor: '#fafafa'
                                                }}
                                            >
                                                Thời gian còn lại: <br />
                                                {timeCount !== 0 ?
                                                    <TimeOut
                                                        status={status}
                                                        setStatus={setStatus}
                                                        timeCount={timeCount}
                                                        setShowQuiz={setShowQuiz}
                                                        postSubmitAnswer={postSubmitAnswer}
                                                        id={id}
                                                        history={history}
                                                        stt={stt}
                                                    /> :
                                                    <b>NaN</b>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4" style={{ width: '90%', margin: 'auto' }}>
                                    {showQuiz === true ? (
                                        <>
                                            <RenderQuestion />
                                            <button
                                                onClick={
                                                    changeCheckResult
                                                }
                                                className="button-user"
                                                style={{ 
                                                    width: '100px', 
                                                    margin: '20px auto',
                                                    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'
                                                }}
                                            >
                                                Submit
                                            </button>
                                        </>
                                    ) : (
                                        <div style={{ height: '70vh' }}></div>
                                    )}
                                </div>
                            </div>
                        )
                }

                <PopupCustom
                    type='success'
                    modalStatus={modalStatus}
                    changeModalStatus={changeModalStatus}
                    paragraph={[
                        'Chúc mừng!',
                        'Bạn đã hoàn thành bài kiểm tra'
                    ]}
                    buttons={[
                        'Xem kết quả'
                    ]}
                    buttonsLink={`/list-test/take-quiz/finish/${id}&${Number(stt)}`}
                    backButton={true}
                />
                <PopupCustom
                    type={btnTypeState}
                    paragraph={
                        answer.length === 0
                        ?
                            ['hãy lựa chọn ít nhất 1 câu hỏi trước khi nộp bài']
                        :
                            questionRemain === 0 
                            ?
                                ['Chúc mừng, bạn đã có đáp án cho toàn bộ câu hỏi']
                            :
                                [
                                'Chú ý!',
                                `Bạn còn ${questionRemain} câu hỏi chưa hoàn thành`
                                ]
                    }
                    buttons={
                        answer.length === 0
                        ?
                            ['Quay lại làm bài']
                        :
                        questionRemain === 0
                        ?
                            ['Quay lại làm bài', 'Nộp bài']
                        :
                            [
                            'Làm bài tiếp',
                            'Nộp bài'
                            ]
                    }
                    checkResult={checkResult}
                    changeCheckResult={changeCheckResult}
                    postSubmitAnswer={postSubmitAnswer}
                />
            </div>
        )
    } else return (
        <>
            <Loading />
            <PopupCustom
                type='warning'
                modalStatus={checkExpiredTime}
                changeModalStatus={setCheckExpiredTime}
                paragraph={[
                    'Bài làm đang thay đổi trạng thái'
                ]}
            />
        </>
    )
}