import React from 'react'
import { useParams, useHistory, useRouteMatch, Link } from 'react-router-dom'
import {
    Box,
    Grid,
    IconButton,
    LinearProgress,
    linearProgressClasses,
    styled,
} from '@mui/material';
import moment from 'moment';
import { getQuizByQuizId } from '../../../api/actions';
import Loading from '../../../helper/Loading';
import './styles.scss';
import RenderQuiz from '../RenderQuizComponent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { SvgIcon } from '@material-ui/core';
import { Pie, measureTextWidth } from '@ant-design/plots';
import { convertDateToLocal } from '../../../constants/shared';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 13,
    borderRadius: 7,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor:
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#102930' : '#102930',
    },
}));

const QuizzesDetail = (props) => {
    const { testedTime, twoDigits, doneQuizPerc, stt } = props;
    const {
        description,
        cate,
        numberQuestions,
        quizTime,
        userStartQuiz,
        endTime,
    } = props.quizDetail;
    const createDate = convertDateToLocal(userStartQuiz);
    const totalTime = `${twoDigits(Math.floor(quizTime / 60))}:${twoDigits(
        quizTime % 60,
    )}:00`;
    const quizSuccess = Number(doneQuizPerc[0]);
    const quizFalse = Number(doneQuizPerc[1]);
    const quizEmpty = Number(doneQuizPerc[2]);
    const [checkDoneTime, setCheckDoneTime] = React.useState(0)

    React.useEffect(() => {
            moment(endTime).diff(
                moment(userStartQuiz),
                'seconds',
            ) >= quizTime*60
        ?
            setCheckDoneTime(quizTime*60)
        :
            setCheckDoneTime(
                moment(endTime).diff(
                    moment(userStartQuiz),
                    'seconds',
                )
            )
    },[quizTime])

    const doneTime = 
        twoDigits(Math.floor(checkDoneTime / 3600)) +
        ':' +
        twoDigits(Math.floor(checkDoneTime / 60) - Math.floor(checkDoneTime / 3600)*60) +
        ':' +
        twoDigits(checkDoneTime % 60)
    const quizStartedTime = moment(userStartQuiz).format('HH:mm:ss');
    const quizEndTime = moment(endTime).format('HH:mm:ss');
    const quizStartedDate = moment(userStartQuiz).format('DD/MM/YYYY');

    const percentTimeFinish = Math.floor(
        (Number(checkDoneTime) / (Number(quizTime) * 60)) * 100,
    );

    function renderStatistic(containerWidth, text, style) {
        const { width: textWidth, height: textHeight } = measureTextWidth(
            text,
            style,
        );
        const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

        let scale = 1;

        if (containerWidth < textWidth) {
            scale = Math.min(
                Math.sqrt(
                    Math.abs(
                        Math.pow(R, 2) /
                        (Math.pow(textWidth / 2, 2) +
                            Math.pow(textHeight, 2)),
                    ),
                ),
                1,
            );
        }

        const textStyleStr = `width:${containerWidth}px;`;
        return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'
            };">${text}</div>`;
    }

    const data = [
        {
            type: 'Trả lời đúng:',
            value: quizSuccess,
        },
        {
            type: 'Trả lời sai:',
            value: quizFalse,
        },
        {
            type: 'Chưa trả lời:',
            value: quizEmpty,
        },
    ];

    const config = {
        appendPadding: 10,
        data,
        color: ['#21C17B', '#FF5151', '#DCDCDC'],
        angleField: 'value',
        colorField: 'type',
        width: 250,
        height: 250,
        radius: 1,
        innerRadius: 0.7,
        meta: {
            value: {
                formatter: (v) => `${v} ¥`,
            },
        },
        label: {
            type: 'inner',
            offset: '-50%',
            style: {
                textAlign: 'center',
            },
            autoRotate: false,
            content: '',
        },
        statistic: {
            title: {
                offsetY: -40,
                customHtml: (container, view, datum) => {
                    const { width, height } = container.getBoundingClientRect();
                    const d = Math.sqrt(
                        Math.pow(width / 2, 2) + Math.pow(height / 2, 2),
                    );
                    const text = '';
                    return renderStatistic(d, text, {
                        fontSize: 28,
                    });
                },
            },
            content: {
                offsetY: -13,
                style: {
                    fontSize: '32px',
                },
                customHtml: (container, view, datum, data) => {
                    const { width } = container.getBoundingClientRect();
                    const text = datum
                        ? `${Math.floor(
                            (datum.value / numberQuestions) * 100,
                        )} %`
                        : `${Math.floor(
                            (quizSuccess / numberQuestions) * 100,
                        )} %`;
                    return renderStatistic(width, text, {
                        fontSize: 32,
                    });
                },
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
            {
                type: 'pie-statistic-active',
            },
        ],
    };

    return (
        <Box>
            <Box className="box-info-quiz-finish">
                <div className="box-info-quiz-finish-title">{description}</div>
                <Grid container spacing={2} className="py-5">
                    <Grid
                        item
                        xs={3}
                        className="box-info-quiz-finish-item-title"
                        sx={{ textAlign: 'center' }}
                    >
                        <img src="/icon/Clock_dashboard.svg" alt="" />
                        <div>Thời gian làm bài</div>
                        <p>{quizTime} phút</p>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        className="box-info-quiz-finish-item-title"
                        style={{ textAlign: 'center', paddingTop: '12px'}}
                    >
                        <img src="/icon/QuestionCount_Dashboard.svg" alt="" />
                        <div style={{ paddingTop: '20px' }}>Số câu hỏi</div>
                        <p>{numberQuestions} câu</p>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        className="box-info-quiz-finish-item-title"
                        sx={{ textAlign: 'center' }}
                    >
                        <img src="/icon/CreateDate_Dashboard.svg" alt="" />
                        <div>Ngày tạo</div>
                        <p>{createDate}</p>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        className="box-info-quiz-finish-item-title"
                        sx={{ textAlign: 'center' }}
                    >
                        <img src="/icon/Topic_Dashboard.svg" alt="" />
                        <div>Chủ đề</div>
                        <p>{cate}</p>
                    </Grid>
                </Grid>
            </Box>
            <Box className="box-progress-chart">
                <Grid container spacing={8} className="py-3">
                    <Grid item xs={6}>
                        <Box className="box-progress-info">
                            <div className="box-progress-info-title">
                                <div>
                                    <SvgIcon>
                                        <AccessTimeIcon />
                                    </SvgIcon>
                                </div>
                                <div style={{ padding: '5px 0 0 15px' }}>
                                    Tổng thời gian
                                </div>
                            </div>
                            <div className="box-progress-info-time">
                                <span>{doneTime} /</span>
                                <span> {totalTime}</span>
                            </div>
                            <div
                                style={{
                                    width: '88%',
                                    margin: 'auto',
                                    paddingTop: '20px',
                                }}
                            >
                                <BorderLinearProgress
                                    variant="determinate"
                                    value={percentTimeFinish}
                                />
                            </div>
                            <div
                                style={{
                                    width: '88%',
                                    margin: 'auto',
                                    paddingTop: '20px',
                                }}
                            >
                                <Grid container spacing={1}>
                                    <Grid
                                        item
                                        xs={7}
                                        className="box_time_detail_data"
                                    >
                                        <div>
                                            Thời gian bắt đầu:{' '}
                                            <span>{quizStartedTime}</span>
                                        </div>
                                        <div>
                                            Thời gian kết thúc:{' '}
                                            <span>{quizEndTime}</span>
                                        </div>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={5}
                                        className="box_time_detail_data"
                                    >
                                        <div>
                                            Ngày: <span>{quizStartedDate}</span>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box className="pie-chart-group">
                            <Grid container spacing={2}>
                                <Grid item xs={10}>
                                    <Pie {...config} />
                                </Grid>
                                <Box sx={{display: 'flex', alignItems: 'center', paddingTop:'15px', textAlign:'right'}}>
                                    <ul style={{listStyleType: 'none', marginLeft:'-30px'}}>
                                        <li style={{fontWeight: 400, color:'#000000', fontSize: '14px'}}>{quizSuccess}</li>
                                        <li style={{fontWeight: 400, color:'#000000', fontSize: '14px', padding:'3px 0 3px 0'}}>{quizFalse}</li>
                                        <li style={{fontWeight: 400, color:'#000000', fontSize: '14px'}}>{quizEmpty}</li>
                                    </ul>
                                </Box>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

// MAIN
export default function QuizFinish(props) {
    const history = useHistory()
    const { id, stt } = useParams()
    const [quizDetail, setQuizDetail] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [testedTime, setTestedTime] = React.useState('')
    const regScore = /[\/ ()]/g;
    const [doneQuizPerc, setdoneQuizPerc] = React.useState({})

    //GET QUIZ DETAIL
    const getQuizDetail = () => {
        setLoading(true);
        getQuizByQuizId(id)
            .then((res) => {
                setQuizDetail(res.data);
                setLoading(false);
                moment(res.data.endTime).diff(moment(res.data.userStartQuiz)) <
                    0
                    ? setTestedTime(timeDiff(0, res.data.quizTime * 60 * 1000))
                    : setTestedTime(
                        timeDiff(res.data.userStartQuiz, res.data.endTime),
                    );
                setdoneQuizPerc(res.data.score.split(regScore, 3));
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    React.useEffect(() => {
        getQuizDetail();
    }, []);

    const twoDigits = (num) => String(num).padStart(2, '0');
    const timeDiff = (start, end) => {
        const hours = twoDigits(
            Math.floor(moment(end).diff(moment(start)) / 1000 / 60 / 60),
        );
        const minutes = twoDigits(
            Math.floor(moment(end).diff(moment(start)) / 1000 / 60) -
            hours * 60,
        );
        const seconds = twoDigits(
            Math.ceil(moment(end).diff(moment(start)) / 1000) % 60,
        );
        return `${hours}:${minutes}:${seconds}`;
    };

    const pushHistory = () => {
        history.goBack()
    }

    const match = useRouteMatch().path

    return (
        <div className="card__list-test">
            {
                Number(localStorage.getItem('roleId')) === 1
                    ?
                    (
                        <div className="card__header">
                            <div style={{ textAlign: 'left', marginLeft: '-13px' }} className='back-button'>
                                <IconButton sx={{ fontSize: 30 }} onClick={pushHistory}>
                                    <img src="/icon/Back.svg" alt="back" />
                                </IconButton>
                            </div>
                            {
                                match === '/quiz/create/quiz/quiz-detail/finish/:id&:stt'
                                    ?
                                    <h3 className="">Quản lý bài kiểm tra</h3>
                                    :
                                    <h3 className="">Quản lý nhân viên</h3>
                            }
                        </div>
                    )
                    :
                    (
                        <div className="card__header">
                            <div style={{ textAlign: 'left', marginLeft: '-13px' }} className='back-button'>
                                <IconButton sx={{ fontSize: 30 }} onClick={pushHistory}>
                                    <img src="/icon/Back.svg" alt="back" />
                                </IconButton>
                            </div>
                            <h3 className="">Làm bài</h3>
                        </div>
                    )
            }
            
            {
                loading === false ?
                    (
                        <>
                            <QuizzesDetail
                                quizDetail={quizDetail}
                                testedTime={testedTime}
                                twoDigits={twoDigits}
                                doneQuizPerc={doneQuizPerc}
                                stt={stt}
                            />
                            {
                                (Number(localStorage.getItem('roleId')) === 1 &&
                                    <div className="p-4" style={{ margin: '55px 5% 55px 10%' }}>
                                        <RenderQuiz
                                            id={id}
                                            checkAnswerFromAdmin={'checkAnswerFromAdmin'}
                                        />
                                   </div>)
                            }
                        </>
                        ) : <Loading />
            }
        </div>
    )
}
