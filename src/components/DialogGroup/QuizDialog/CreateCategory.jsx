/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Grid, IconButton } from '@mui/material';
import InputSearchComponent from '../../../helper/InputSearchComponent'
import './styles.scss';
import { Modal } from 'antd';

export default function CreateCategory(props) {
    const { categories, createCateModal, toggleCreateCateModal, postCreateCategory } = props
    const [cateName, setCateName] = useState({ name: '' })
    const [errorCate, setErrorCate] = useState(false);
    const [errMsg, setErrMsg] = useState('')
   
    const handleChangeCateName =(key, value) => {
        switch (key) {
            case 'cateName':
                setCateName({...cateName, name: value})
                break;
        
            default:
                break;
        }
    }

    const handleCheckCateName = () => {
        const hasCate = categories.findIndex(i => i.name === cateName.name)
        if(hasCate !== -1){
            setErrorCate(true);
            setErrMsg('Chủ đề đã tồn tại')
        } else {
            setErrorCate(false);
            setErrMsg('')
        }
    }

    const handleClickCreateCate = () => {
        if(cateName.name === '') {
            setErrorCate(true);
            setErrMsg('Không được để trống');
        } else {
            postCreateCategory(cateName);
            setCateName({...cateName, name: ''})
        }
    }

    useEffect(()=> {
        handleCheckCateName()
    }, [cateName])

    return (
        // <Modal centered show={props.createCateModal}>
        <Modal
            title={<div style={{ fontFamily: 'Quicksand', fontSize: '16px'}}>Tạo chủ đề mới</div>}
            centered
            visible={createCateModal}
            onCancel={toggleCreateCateModal}
            width='30%'
            footer={null}
        >
            
                <InputSearchComponent 
                    title='Tên chủ đề' 
                    required
                    value={cateName.name}
                    handleChangeText={handleChangeCateName}
                    name='cateName'
                    error={errorCate}
                    errMessage={errMsg}
                    inputProps={{
                        maxLength: 200
                    }}
                />
                <Box sx={{textAlign: 'right', padding: '25px 13px 10px 0'}}>
                    <Button onClick={handleClickCreateCate} className='button-save-update'>Tạo</Button>
                </Box>
        </Modal>
    );
}
