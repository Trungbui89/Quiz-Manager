import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { Modal } from 'antd';

export default function DialogUploadFille(props) {
    const {openUpload, handleCloseDialog, upLoadExcelFile, onFileUpload, uploadFileState} = props;

    return (
        <Modal
            title={<div style={{fontFamily: 'Quicksand' }}>Import câu hỏi từ file Excel</div>}
            centered
            visible={openUpload}
            onCancel={handleCloseDialog}
            width='30%'
            footer={null}
        >
            <DialogContent>
                <div className="custom-file input-import">
                    <input type="file" className="custom-file-input" id="inputGroupFile04" onChange={upLoadExcelFile}/>
                    <label className="custom-file-label" htmlFor="inputGroupFile04">
                        {uploadFileState ? uploadFileState?.name : 'Chọn file...'}
                    </label>
                </div>
            </DialogContent>
            <div className='group-button-upload'>
                <Button className='cancel-button'>Tải form mẫu</Button>
                <Button className='cancel-button' onClick={handleCloseDialog}>Hủy</Button>
                {uploadFileState ? (
                    <Button className='import-button' onClick={onFileUpload}> Import </Button>
                ) : null}
            </div>
        </Modal>
    );
}
