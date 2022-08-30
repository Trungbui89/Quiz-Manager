import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom'
import { checkStatusQuiz } from '../../../constants/shared';
import moment from 'moment'
import PopupCustom  from '../../../helper/PopupCustom'

function TableData(props) {
    const {
        dataRow,
        pagination
    } =props;
    const history = useHistory()
    const regScore = /[\/ ()]/g

    const pushHistory = (value, index, status) => {
        status === 'not_start' || status === 'doing' || status === 'expired'
        ?
            history.push(`/quiz/create/quiz/quiz-detail/personally/${value}&${index}`)
        :
            history.push(`/quiz/create/quiz/quiz-detail/finish/${value}&${index}`)
    }

    const [modalStatus, setModalStatus] = React.useState(false)
    const changeModalStatus = () => {
        setModalStatus(!modalStatus)
    }

    const handleTimeToFinishQuiz = (start, end) => {
        const startTime = moment(start);
        const endTime = moment(end);
        const timeFinish = startTime.diff(endTime, 'minutes');
        return timeFinish
    }
    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                {/* <caption>A basic table example with a caption</caption> */}
                <TableHead>
                    <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="left">Họ và tên</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="center">Thời gian làm bài</TableCell>
                        <TableCell align="center">Trạng thái</TableCell>
                        <TableCell align="center">Kết quả</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Array.isArray(dataRow) && dataRow.length > 0 && dataRow.map((row, index) => (
                        <TableRow key={index} style={{ position: 'relative' }}>
                            <TableCell align="center" component="th" scope="row">
                                {(Number(pagination.page) - 1)*(pagination.limit) + index + 1}
                            </TableCell>
                            <TableCell align="left">{row?.user?.fullName}</TableCell>
                            <TableCell align="left">{row?.user?.email}</TableCell>
                            <TableCell align="center">{row?.quizTime !== null ? row.quizTime : '-' } phút</TableCell>
                            <TableCell align="center">
                                {
                                    row?.status == 'doing'
                                    ?
                                        moment().diff(moment(row?.userStartQuiz), 'seconds') >= row?.quizTime*60
                                        ?
                                            checkStatusQuiz('quitted')
                                        :
                                            checkStatusQuiz('doing')
                                    :
                                        checkStatusQuiz(row?.status)
                                }
                                </TableCell>
                            <TableCell align="center">{row?.score !== null ? row.score.split(regScore, 3)[0]+`/${row.numberQuestions}` : '-' }</TableCell>
                            <div className="text-dark" onClick={() => pushHistory(row.id, index, row.status)} style={styles.staffLinks}></div>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PopupCustom 
                singleModalStatus={modalStatus}
                changeSingleModalStatus={changeModalStatus}
                type='warning'
                buttons={['Quay lại']}
                paragraph={['Chưa có kết quả cho bài kiểm tra này']}
            />
        </>
    );
}

export default TableData;

const styles = {
    staffLinks: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        zIndex: 100,
        top: 0,
        left: 0,
    }
}
