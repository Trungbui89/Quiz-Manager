/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Checkbox,
    DialogTitle,
    Grid,
    IconButton,
    Radio,
} from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import React, { useEffect, useState } from 'react';
import SearchButton from '../../../helper/GroupButton/SearchButton';
import { convertDataOptions } from '../../../constants/shared';
import SelectFieldCustom from '../../../helper/SelectFieldCustom';
import InputSearchComponent from '../../../helper/InputSearchComponent';
import TextAreaComponent from '../../../helper/TextAreaComponent';
import { Modal } from 'antd';


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

export default function CreateQuestion(props) {
    const {
        showCreateQuestion,
        toggleCreateQuestion,
        categories,
        quesTypes,
        postCreateQuestion,
    } = props;

    const [typeChoice, setTypeChoice] = useState('');
    const dataCategoryOptions = convertDataOptions(categories)
    const dataQuestionTypeOptions = convertDataOptions(quesTypes)

    const [questionSubmit, setQuestionSubmit] = useState({
        category: {
            id: '',
        },
        content: '',
        questionTime: '',
        questionType: {
            id: '',
        },
        questionChoice: [],
    });
    const [choiceA, setChoiceA] = useState({ name: '', true: false });
    const [choiceB, setChoiceB] = useState({ name: '', true: false });
    const [choiceC, setChoiceC] = useState({ name: '', true: false });
    const [choiceD, setChoiceD] = useState({ name: '', true: false });
    const [disableUpdate, setDisableUpdate] = useState(false);
    const [checkCountChoice, setCheckCountChoice] = useState(false)


    const handleChangeUpdateQuestion = (key, value) => {
        switch (key) {
            case 'category':
                setQuestionSubmit({
                    ...questionSubmit,
                    category: { id: value?.value },
                });
                break;
            case 'questionType':
                setQuestionSubmit({
                    ...questionSubmit,
                    questionType: { id: value?.value },
                });
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
                    setQuestionSubmit({...questionSubmit, questionTime: Number(value)});
                }
                break;
            case 'content':
                setQuestionSubmit({ ...questionSubmit, content: value });
                break;
            case 'choice_A':
                setChoiceA({ ...choiceA, name: value });
                break;
            case 'choice_B':
                setChoiceB({ ...choiceB, name: value });
                break;
            case 'choice_C':
                setChoiceC({ ...choiceC, name: value });
                break;
            case 'choice_D':
                setChoiceD({ ...choiceD, name: value });
                break;
            case 'choice_A_check':
                setChoiceA({ ...choiceA, true: value });
                break;
            case 'choice_B_check':
                setChoiceB({ ...choiceB, true: value });
                break;
            case 'choice_C_check':
                setChoiceC({ ...choiceC, true: value });
                break;
            case 'choice_D_check':
                setChoiceD({ ...choiceD, true: value });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (questionSubmit){
            if(questionSubmit?.content === '' || 
                questionSubmit?.questionTime === '' || 
                questionSubmit?.category.id === '' || 
                questionSubmit?.questionType.id === '' || 
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

    const handleClickCreateQuestion = () => {
        postCreateQuestion(questionSubmit);
    };

    useEffect(() => {
        setTypeChoice(questionSubmit.questionType.id)
    },[questionSubmit])

    useEffect(() => {
        if(typeChoice === 2) {
            const numberCorrect = questionSubmit.questionChoice.filter(q => q.true === true)
            if(numberCorrect.length < 2) {
                if(numberCorrect.length !== 0){
                    setCheckCountChoice(true);
                }
                setDisableUpdate(true);
            } else {
                setCheckCountChoice(false);
            }
        } else {
            setCheckCountChoice(false);
        }
    },[typeChoice, questionSubmit])


    useEffect(() => {
        if (typeChoice == 1) {
            if (choiceA.true === true) {
                setChoiceB({ ...choiceB, true: false });
                setChoiceC({ ...choiceC, true: false });
                setChoiceD({ ...choiceD, true: false });
            }
        }
    }, [typeChoice, choiceA]);

    useEffect(() => {
        if (typeChoice == 1) {
            if (choiceB.true === true) {
                setChoiceA({ ...choiceA, true: false });
                setChoiceC({ ...choiceC, true: false });
                setChoiceD({ ...choiceD, true: false });
            }
        }
    }, [typeChoice, choiceB]);

    useEffect(() => {
        if (typeChoice == 1) {
            if (choiceC.true === true) {
                setChoiceA({ ...choiceA, true: false });
                setChoiceB({ ...choiceB, true: false });
                setChoiceD({ ...choiceD, true: false });
            }
        }
    }, [typeChoice, choiceC]);

    useEffect(() => {
        if (typeChoice == 1) {
            if (choiceD.true === true) {
                setChoiceA({ ...choiceA, true: false });
                setChoiceC({ ...choiceC, true: false });
                setChoiceB({ ...choiceB, true: false });
            }
        }
    }, [typeChoice, choiceD]);
    useEffect(() => {
        setQuestionSubmit({
            ...questionSubmit,
            questionChoice: [choiceA, choiceB, choiceC, choiceD],
        });
    }, [choiceA, choiceB, choiceC, choiceD]);

    return (
        <Modal
            title={<div style={{ fontFamily: 'Quicksand' }}>Tạo câu hỏi mới</div>}
            centered
            visible={showCreateQuestion}
            onCancel={toggleCreateQuestion}
            width='70%'
            footer={null}
        >
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <SelectFieldCustom
                            title="Chủ đề"
                            data={dataCategoryOptions}
                            handleOnChange={handleChangeUpdateQuestion}
                            defaultValue={questionSubmit?.category.id}
                            name="category"
                            hiddenClear
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectFieldCustom
                            title="Loại câu hỏi"
                            data={dataQuestionTypeOptions}
                            handleOnChange={handleChangeUpdateQuestion}
                            defaultValue={questionSubmit?.questionType.id}
                            name="questionType"
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
                            // error={()=> checkError(questionSubmit?.questionTime)}
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
                        // error={errorCheck.content}
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
                                <Box sx={{ paddingTop: '10px' }}>
                                    {typeChoice == 1 ? (
                                        <Radio
                                            color="success"
                                            checked={choiceA.true}
                                            onChange={(e) =>
                                                handleChangeUpdateQuestion(
                                                    'choice_A_check',
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                    ) : (
                                        <Checkbox
                                            color="success"
                                            checked={choiceA.true}
                                            onChange={(e) =>
                                                handleChangeUpdateQuestion(
                                                    'choice_A_check',
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={10}>
                                <TextAreaComponent
                                    minRows={3}
                                    placeholder="Nhập đáp án"
                                    handleChangeText={
                                        handleChangeUpdateQuestion
                                    }
                                    value={choiceA.name ?? ''}
                                    name="choice_A"
                                    // error={errorCheck.choiceA}
                                    inputProps={{
                                        maxLength: 2000,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Box sx={{ paddingTop: '10px' }}>
                                    {typeChoice == 1 ? (
                                        <Radio
                                            color="success"
                                            checked={choiceB.true}
                                            onChange={(e) =>
                                                handleChangeUpdateQuestion(
                                                    'choice_B_check',
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                    ) : (
                                        <Checkbox
                                            color="success"
                                            checked={choiceB.true}
                                            onChange={(e) =>
                                                handleChangeUpdateQuestion(
                                                    'choice_B_check',
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={10}>
                                <TextAreaComponent
                                    minRows={3}
                                    placeholder="Nhập đáp án"
                                    handleChangeText={
                                        handleChangeUpdateQuestion
                                    }
                                    value={choiceB.name ?? ''}
                                    name="choice_B"
                                    // error={errorCheck.choiceB}
                                    inputProps={{
                                        maxLength: 2000,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Box sx={{ paddingTop: '10px' }}>
                                    {typeChoice == 1 ? (
                                        <Radio
                                            color="success"
                                            checked={choiceC.true}
                                            onChange={(e) =>
                                                handleChangeUpdateQuestion(
                                                    'choice_C_check',
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                    ) : (
                                        <Checkbox
                                            color="success"
                                            checked={choiceC.true}
                                            onChange={(e) =>
                                                handleChangeUpdateQuestion(
                                                    'choice_C_check',
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={10}>
                                <TextAreaComponent
                                    minRows={3}
                                    placeholder="Nhập đáp án"
                                    handleChangeText={
                                        handleChangeUpdateQuestion
                                    }
                                    value={choiceC.name ?? ''}
                                    name="choice_C"
                                    // error={errorCheck.choiceC}
                                    inputProps={{
                                        maxLength: 2000,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container>
                            <Grid item xs={2}>
                                <Box sx={{ paddingTop: '10px' }}>
                                    {typeChoice == 1 ? (
                                        <Radio
                                            color="success"
                                            checked={choiceD.true}
                                            onChange={(e) =>
                                                handleChangeUpdateQuestion(
                                                    'choice_D_check',
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                    ) : (
                                        <Checkbox
                                            color="success"
                                            checked={choiceD.true}
                                            onChange={(e) =>
                                                handleChangeUpdateQuestion(
                                                    'choice_D_check',
                                                    e.target.checked,
                                                )
                                            }
                                        />
                                    )}
                                </Box>
                            </Grid>
                            <Grid item xs={10}>
                                <TextAreaComponent
                                    minRows={3}
                                    placeholder="Nhập đáp án"
                                    handleChangeText={
                                        handleChangeUpdateQuestion
                                    }
                                    value={choiceD.name ?? ''}
                                    name="choice_D"
                                    // error={errorCheck.choiceD}
                                    errMessage={
                                        choiceD.name === ''
                                            ? 'Không được để trống'
                                            : ''
                                    }
                                    inputProps={{
                                        maxLength: 2000,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {checkCountChoice === true  ? (
                    <div style={{fontSize: '13px', color:'red', textAlign: 'center', paddingTop:'10px'}}>Loại câu hỏi này yêu cầu phải có ít nhất 2 đáp án đúng</div>
                ): null}
                <Box className="text-right p-2">
                    <SearchButton
                        disabled={disableUpdate}
                        onClick={handleClickCreateQuestion}
                        className="button-user"
                        title="Tạo mới"
                    />
                </Box>
        {/* </BootstrapDialog> */}</Modal>
    );
}
