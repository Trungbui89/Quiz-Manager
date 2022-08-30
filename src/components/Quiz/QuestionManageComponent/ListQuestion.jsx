import * as React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import PaginationComponent from '../../../helper/PaginationComponent';
import { putDeleteQuestion } from '../../../api/actions';
import { toastFail, toastSuccess } from '../../../helper/Notification/utils';
import DialogConfirmDelete from './DialogConfirmDelete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ListQuestion(props) {
    const {
        questions,
        toggleEditQues,
        setQuestion,
        toggleCreateQuestion,
        pagination,
        getFilterQuestion,
        filterListQuestion,
        setFilterListQuestion,
    } = props;

    const [openConfirm, setOpenConfirm] = React.useState({
        type: 'single',
        open: false,
    });
    const [listQuestionDelete, setListQuestionDelete] = React.useState([]);
    const [singleQuestionDel, setSingleQuestionDel] = React.useState('');
    const [expendContent, setExpendContent] = React.useState({id:'', expend: false});

    const handleEditClick = (ques) => {
        setQuestion(ques);
        toggleEditQues();
    };

    const handleChangeCheckItem = (item) => {
        const hasItem = listQuestionDelete.findIndex(i => i === item);
        if(hasItem === -1) {
            setListQuestionDelete([...listQuestionDelete, item]);
        } else {
            const newList = listQuestionDelete.filter(i => i !== item);
            setListQuestionDelete(newList);
        }
    }

    const handleChecked = (item) => {
        const itemChecked = listQuestionDelete.includes(item);
        return itemChecked;
    }

    const handleCheckAll = () => {
        if(listQuestionDelete.length >= 0 && listQuestionDelete.length < questions.length) {
            const allItems = questions.map(i => i.questions_id)
            setListQuestionDelete(allItems)
        }
        else if (listQuestionDelete.length === questions.length) {
            setListQuestionDelete([])
        }
    }

    const handleCheckMulti = () => {
        if(listQuestionDelete.length > 0) {
            setOpenConfirm({
                type: 'multi',
                open: true,
            })
        } else {
            toastFail('Chọn ít nhất 1 câu hỏi')
        }
    }

    const handleClickDeleteSingle = () => {
        putDeleteQuestion([singleQuestionDel])
            .then((res) => {
                toastSuccess('Xóa câu hỏi thành công');
                getFilterQuestion();
                setOpenConfirm({
                    ...openConfirm,
                    open: false,
                });
            })
            .catch((err) => {
                toastFail('Đã có lỗi xảy ra !');
            });
    };

    const handleClickDeleteMulti = () => {
        putDeleteQuestion(listQuestionDelete)
            .then((res) => {
                toastSuccess('Xóa câu hỏi thành công');
                getFilterQuestion();
                setOpenConfirm({
                    ...openConfirm,
                    open: false,
                });
                setListQuestionDelete([])
            })
            .catch((err) => {
                toastFail('Đã có lỗi xảy ra !');
            });
    };

    const checkLengthQuestion = (quesId,content) => {
        const clickExpend = () => {
            setExpendContent({id: quesId, expend: true})
        }
        const clickColapse = () => {
            setExpendContent({id: '', expend: false})
        }
        const newContent = 
            content?.length > 160 ?
            <>
                {expendContent.expend === true && expendContent.id === quesId ? (
                    <div>
                        {content}  
                        <span onClick={clickColapse} style={{fontWeight: 700, cursor: 'pointer', marginLeft: '20px'}}>Thu gọn</span>
                    </div>
                ) : (
                    <div>
                        {content.slice(0, 160)} ...
                        <span onClick={clickExpend} style={{fontWeight: 700, cursor: 'pointer'}}>Xem thêm</span>
                    </div>
                )}
            </> : content;
            return newContent
        }
    return (
        <div style={{marginTop: '-50px'}}>
            <Box className='text-right pb-2'>
                <IconButton onClick={handleCheckMulti} color='error'>
                    <DeleteForeverIcon />
                    <span style={{fontSize:14, fontWeight:500, color:'#000000'}}>Xóa</span>
                </IconButton>
            </Box>
            <TableContainer component={Paper}>
                <Table className='table-list-question'>
                    <TableHead>
                        <TableRow>
                            <TableCell className='column-1' align="center">
                                <Checkbox
                                    checked={listQuestionDelete.length === questions.length}
                                    indeterminate={listQuestionDelete.length > 0 && listQuestionDelete.length < questions.length}
                                    onChange={handleCheckAll}
                                />
                            </TableCell>
                            <TableCell className='column-2' align="center">STT</TableCell>
                            <TableCell className='column-3' align="left">Câu hỏi</TableCell>
                            <TableCell className='column-4' align="left">Đáp án</TableCell>
                            <TableCell className='column-5' align="center">Chủ đề</TableCell>
                            <TableCell className='column-6' align="center">Loại câu hỏi</TableCell>
                            <TableCell className='column-7' align="center">Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(questions) && questions.length > 0 ? (
                            questions.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        <Checkbox checked={handleChecked(row.questions_id)} onChange={() => handleChangeCheckItem(row.questions_id)} />
                                    </TableCell>
                                    <TableCell align="center">{(Number(pagination.page) - 1)*(pagination.limit) + index + 1}</TableCell>
                                    <TableCell align="left">{checkLengthQuestion(row.questions_id,row.content)}</TableCell>
                                    <TableCell align="left">
                                        {row.questionChoiceDTOs.map((choice) => (
                                            <div key={choice.id} className="">
                                                {choice.true === true ? (
                                                    <i className="fa fa-check text-success"></i>
                                                ) : (
                                                    <i className="fa fa-times text-danger"></i>
                                                )}{' '}
                                                {choice.name}
                                            </div>
                                        ))}
                                    </TableCell>
                                    <TableCell align="center">{row.category ? row.category.name : ''}</TableCell>
                                    <TableCell align="center">{row.questionType ? row.questionType.name : ''}</TableCell>
                                    <TableCell>
                                        <Box sx={{display: 'flex', flexDirection: 'column', margin:'auto', width:50}}>
                                            <IconButton color='error' onClick={() => { setOpenConfirm({type: 'single',open:true}); setSingleQuestionDel(row.questions_id)}}>
                                                <DeleteForeverIcon />
                                            </IconButton>
                                            <IconButton onClick={() => {handleEditClick(row)}}>
                                                <img src='/icon/Edit.svg' alt='' />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell component="th" scope="row" colSpan={5}>
                                    Không có dữ liệu !
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationComponent
                isShowPaginate
                hiddenDivider
                pagination={pagination}
                filterInfo={filterListQuestion}
                handleChangePagination={setFilterListQuestion}
            />
            <DialogConfirmDelete
                openConfirm={openConfirm}
                setOpenConfirm={setOpenConfirm}
                handleClickDeleteSingle={handleClickDeleteSingle}
                listQuestionDelete={listQuestionDelete}
                handleClickDeleteMulti={handleClickDeleteMulti}
            />
        </div>
    );
}
