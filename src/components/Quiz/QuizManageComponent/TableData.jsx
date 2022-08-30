import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { convertDateTimeToLocal, convertDateToLocal } from '../../../constants/shared';
import { getAllAccount } from '../../../api/actions'
import { toastFail } from '../../../helper/Notification/utils';

export default function TableData(props) {
    const { 
        listQuiz,
        pagination
    } = props;
    const history = useHistory()

    const linkToDetail = (id) => {
        history.push(`quiz/quiz-detail/${id}`)
    }

    const [staffName, setStaffName] = React.useState('')
    const getStaffName = () => {
        getAllAccount()
        .then((res) => {
            setStaffName(res.data)
        })
        .catch((err) => {
            toastFail('Không lấy được nhân viên')
        })
    }
    React.useEffect(() => {
        getStaffName()
    },[])

    const RenderRow = () => {
        if (Array.isArray(listQuiz) && staffName && listQuiz.length > 0) {
            return listQuiz.map((item, idx) => (
                <TableRow key={idx} style={styles.container}>
                    <TableCell align="center">{(Number(pagination.page) - 1)*(pagination.limit) + idx + 1}</TableCell>
                    <TableCell align="left">{item.description}</TableCell>
                    <TableCell align="center">{staffName.filter(staff => staff.id === Number(item.creator))[0]?.fullName}</TableCell>
                    <TableCell align="center">{convertDateToLocal(item.createDate)}</TableCell>
                    <TableCell align="center">{convertDateTimeToLocal(item.startTime)}</TableCell>
                    <TableCell align="center">{convertDateTimeToLocal(item.expiredTime)}</TableCell>
                    <TableCell align="center">{item.cate}</TableCell>
                    <button style={styles.enableClick} value={item.id} onClick={(e) => linkToDetail(e.target.value)} />
                </TableRow>
            ));
        } else return (
            <TableRow>
                <TableCell align="center" colSpan={7}>No data !</TableCell>
            </TableRow>
        );
    };

    return (
        <div  className='table-quiz'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="left">Tên bài kiểm tra</TableCell>
                            <TableCell align="center">Người tạo</TableCell>
                            <TableCell align="center">Ngày tạo</TableCell>
                            <TableCell align="center">Thời gian mở</TableCell>
                            <TableCell align="center">Thời gian đóng</TableCell>
                            <TableCell align="center">Chủ đề</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <RenderRow />
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

const styles = {
    container: {
        position: 'relative',
    },
    enableClick: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
        top: 0,
        left: 0,
        cursor: 'pointer',
        border: 'none',
        background: 'none',
    }
}