/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Checkbox,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Radio,
} from '@mui/material';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { toastFail, toastSuccess } from '../../../helper/Notification/utils';
import SearchButton from '../../../helper/GroupButton/SearchButton';
import { convertDataOptions } from '../../../constants/shared';
import SelectFieldCustom from '../../../helper/SelectFieldCustom';
import InputSearchComponent from '../../../helper/InputSearchComponent';
import TextAreaComponent from '../../../helper/TextAreaComponent';
import { putUpdateQuestion } from '../../../api/actions';
import { Modal } from 'antd';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function EditQuestion(props) {
    const {
        showEditQues,
        toggleEditQues,
        question,
        categories,
        quesTypes,
        filterListQuestion,
        getFilterQuestion
    } = props;

    const dataCategoryOptions = convertDataOptions(categories)
    const dataQuestionTypeOptions = convertDataOptions(quesTypes)


    const [questionSubmit, setQuestionSubmit] = useState({
        id: question?.questions_id ?? '',
        cateId: question?.category?.id ?? '',
        content: question?.content ?? '',
        questionTime: question?.questionTime ?? '',
        questionTypeId: question?.questionType?.id ?? '',
        questionChoice: [],
    });
    const [typeChoice, setTypeChoice] = useState('');
    const [choiceA, setChoiceA] = useState({name: '', true: false})
    const [choiceB, setChoiceB] = useState({name: '', true: false})
    const [choiceC, setChoiceC] = useState({name: '', true: false})
    const [choiceD, setChoiceD] = useState({name: '', true: false})
    const [disableUpdate, setDisableUpdate] = useState(false)


    useEffect(() => {
        setTypeChoice(questionSubmit.questionTypeId)
    },[questionSubmit])

    useEffect(() => {
        if(typeChoice == 1) {
            if(choiceA.true === true) {
                setChoiceB({...choiceB, true: false})
                setChoiceC({...choiceC, true: false})
                setChoiceD({...choiceD, true: false})
            }
        }
    }, [typeChoice, choiceA])

    useEffect(() => {
        if(typeChoice == 1) {
            if(choiceB.true === true) {
                setChoiceA({...choiceA, true: false})
                setChoiceC({...choiceC, true: false})
                setChoiceD({...choiceD, true: false})
            }
        }
    }, [typeChoice, choiceB])

    useEffect(() => {
        if(typeChoice == 1) {
            if(choiceC.true === true) {
                setChoiceA({...choiceA, true: false})
                setChoiceB({...choiceB, true: false})
                setChoiceD({...choiceD, true: false})
            }
        }
    }, [typeChoice, choiceC])

    useEffect(() => {
        if(typeChoice == 1) {
            if(choiceD.true === true) {
                setChoiceA({...choiceA, true: false})
                setChoiceC({...choiceC, true: false})
                setChoiceB({...choiceB, true: false})
            }
        }
    }, [typeChoice, choiceD])

    useEffect(() => {
        if(question) {
            setQuestionSubmit({
                id: question?.questions_id,
                cateId: question?.category?.id,
                content: question?.content,
                questionTime: question?.questionTime,
                questionTypeId:question?.questionType?.id,
            })
            setChoiceA({name: question?.questionChoiceDTOs[0].name, true: question?.questionChoiceDTOs[0].true})
            setChoiceB({name: question?.questionChoiceDTOs[1].name, true: question?.questionChoiceDTOs[1].true})
            setChoiceC({name: question?.questionChoiceDTOs[2].name, true: question?.questionChoiceDTOs[2].true})
            setChoiceD({name: question?.questionChoiceDTOs[3].name, true: question?.questionChoiceDTOs[3].true})
        }
    },[question])


    const handleChangeUpdateQuestion = (key, value) => {
        switch (key) {
            case 'category':
                setQuestionSubmit({...questionSubmit, cateId: value?.value});
                break;
            case 'questionType':
                setQuestionSubmit({...questionSubmit, questionTypeId: value?.value});
                break;
            case 'questionTime':
                if(value > 60) {
                    setQuestionSubmit({...questionSubmit, questionTime: 60});
                } else
                if(!value) {
                    setQuestionSubmit({...questionSubmit, questionTime: ''});
                } else
                if(value <= 0) {
                    setQuestionSubmit({...questionSubmit, questionTime: 1});
                } else {
                    setQuestionSubmit({...questionSubmit, questionTime: value});
                }
                break;
            case 'content':
                setQuestionSubmit({...questionSubmit, content: value});
                break;
            case 'choice_A':
                setChoiceA({...choiceA, name: value});
                break;
            case 'choice_B':
                setChoiceB({...choiceB, name: value});
                break;
            case 'choice_C':
                setChoiceC({...choiceC, name: value});
                break;
            case 'choice_D':
                setChoiceD({...choiceD, name: value});
                break;
            case 'choice_A_check':
                setChoiceA({...choiceA, true: value});
                break;
            case 'choice_B_check':
                setChoiceB({...choiceB, true: value});
                break;
            case 'choice_C_check':
                setChoiceC({...choiceC, true: value});
                break;
            case 'choice_D_check':
                setChoiceD({...choiceD, true: value});
                break;
            default:
                break;
        }
    }

    const handleClickUpdateQuestion = () => {
        putUpdateQuestion(questionSubmit)
            .then(res => {
                toastSuccess('Cập nhật câu hỏi thành công !');
                toggleEditQues()
                getFilterQuestion(filterListQuestion)
            })
            .catch(err => {
                toastFail('Đã có lỗi xảy ra !')
            })
    }

    useEffect(() => {
        if (question){
            if(questionSubmit?.content === '' || 
                questionSubmit?.questionTime === '' || 
                choiceA.name === '' || 
                choiceB.name === '' || 
                choiceC.name === '' || 
                choiceD.name === ''){
                setDisableUpdate(true)
            } else {
                setDisableUpdate(false)
            }
        }
    },[questionSubmit])

    useEffect(() => {
        setQuestionSubmit({...questionSubmit, questionChoice:[choiceA, choiceB, choiceC, choiceD]})
    },[choiceA, choiceB, choiceC, choiceD])

    return (
        <Modal
            title={<div style={{ fontFamily: 'Quicksand', fontSize: '18px'}}>Chỉnh sửa câu hỏi</div>}
            centered
            visible={showEditQues}
            onCancel={toggleEditQues}
            width='70%'
            footer={null}
        >
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <SelectFieldCustom
                        title="Chủ đề"
                        data={dataCategoryOptions}
                        handleOnChange={handleChangeUpdateQuestion}
                        defaultValue={questionSubmit?.cateId}
                        name="category"
                        require
                        hiddenClear
                    />
                </Grid>
                <Grid item xs={4}>
                    <SelectFieldCustom
                        title="Loại câu hỏi"
                        data={dataQuestionTypeOptions}
                        handleOnChange={handleChangeUpdateQuestion}
                        defaultValue={questionSubmit?.questionTypeId}
                        name="questionType"
                        require
                        hiddenClear
                    />
                </Grid>
                <Grid item xs={4}>
                    <InputSearchComponent
                        title="Thời gian"
                        type='number'
                        name='questionTime'
                        handleChangeText={handleChangeUpdateQuestion}
                        value={questionSubmit?.questionTime ?? ''}
                        error={questionSubmit?.questionTime === ''}
                        errMessage={questionSubmit?.questionTime === '' ? 'Không được để trống' : ''}
                    />
                </Grid>
            </Grid>
            <Box style={{width:'100%'}}>
                <TextAreaComponent
                    title="Nội dung câu hỏi" 
                    minRows={4}
                    name='content' 
                    handleChangeText={handleChangeUpdateQuestion}
                    value={questionSubmit?.content ?? ''}
                    error={questionSubmit?.content === ''}
                    errMessage={questionSubmit?.content === '' ? 'Không được để trống' : ''}
                    inputProps={{
                        maxLength: 5000
                    }}
                />
            </Box>
            <Typography sx={{paddingTop:'15px'}}>Đáp án</Typography>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Box sx={{paddingTop: '10px'}}>
                                {typeChoice == 1 ? 
                                <Radio 
                                    color="success"
                                    checked={choiceA.true}
                                    onChange={(e)=> handleChangeUpdateQuestion('choice_A_check', e.target.checked)}
                                />
                                :
                                <Checkbox 
                                    color="success"
                                    checked={choiceA.true}
                                    onChange={(e)=> handleChangeUpdateQuestion('choice_A_check', e.target.checked)}
                                />
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={10}>
                            <TextAreaComponent 
                                minRows={3}
                                placeholder='Nhập đáp án'
                                handleChangeText={handleChangeUpdateQuestion}
                                value={choiceA.name ?? ''}
                                name='choice_A' 
                                error={choiceA.name === ''}
                                errMessage={choiceA.name === '' ? 'Không được để trống' : ''}
                                inputProps={{
                                    maxLength: 2000
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Box sx={{paddingTop: '10px'}}>
                                {typeChoice == 1 ? 
                                <Radio 
                                    color="success"
                                    checked={choiceB.true}
                                    onChange={(e)=> handleChangeUpdateQuestion('choice_B_check', e.target.checked)}
                                />
                                :
                                <Checkbox 
                                    color="success"
                                    checked={choiceB.true}
                                    onChange={(e)=> handleChangeUpdateQuestion('choice_B_check', e.target.checked)}
                                />
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={10}>
                            <TextAreaComponent 
                                minRows={3}
                                placeholder='Nhập đáp án'
                                handleChangeText={handleChangeUpdateQuestion}
                                value={choiceB.name ?? ''}
                                name='choice_B' 
                                error={choiceB.name === ''}
                                errMessage={choiceB.name === '' ? 'Không được để trống' : ''}
                                inputProps={{
                                    maxLength: 2000
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Box sx={{paddingTop: '10px'}}>
                                {typeChoice == 1 ? 
                                <Radio 
                                    color="success"
                                    checked={choiceC.true}
                                    onChange={(e)=> handleChangeUpdateQuestion('choice_C_check', e.target.checked)}
                                />
                                :
                                <Checkbox 
                                    color="success"
                                    checked={choiceC.true}
                                    onChange={(e)=> handleChangeUpdateQuestion('choice_C_check', e.target.checked)}
                                />
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={10}>
                            <TextAreaComponent 
                                    minRows={3}
                                    placeholder='Nhập đáp án'
                                    handleChangeText={handleChangeUpdateQuestion}
                                    value={choiceC.name ?? ''}
                                    name='choice_C'
                                    error={choiceC.name === ''}
                                    errMessage={choiceC.name === '' ? 'Không được để trống' : ''}
                                    inputProps={{
                                    maxLength: 2000
                                    }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Box sx={{paddingTop: '10px'}}>
                                {typeChoice == 1 ? 
                                <Radio 
                                    color="success"
                                    checked={choiceD.true}
                                    onChange={(e)=> handleChangeUpdateQuestion('choice_D_check', e.target.checked)}
                                />
                                :
                                <Checkbox 
                                    color="success"
                                    checked={choiceD.true}
                                    onChange={(e)=> handleChangeUpdateQuestion('choice_D_check', e.target.checked)}
                                />
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={10}>
                            <TextAreaComponent 
                                minRows={3}
                                placeholder='Nhập đáp án'
                                handleChangeText={handleChangeUpdateQuestion}
                                value={choiceD.name ?? ''}
                                name='choice_D'
                                error={choiceD.name === ''}
                                errMessage={choiceD.name === '' ? 'Không được để trống' : ''}
                                inputProps={{
                                    maxLength: 2000
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid style={{textAlign:'right'}}>
                <SearchButton disabled={disableUpdate} onClick={handleClickUpdateQuestion} className="button-user" title="Cập nhật" />
            </Grid>
        </Modal>
    );
}
