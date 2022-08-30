import { TableCell } from '@mui/material';
import React from 'react';

function Column() {
  return (
    <>
        <TableCell className='title-table-info text-center'>Chức năng</TableCell>
        <TableCell className='title-table-info text-center'>Tạo</TableCell>
        <TableCell className='title-table-info text-center'>Đọc</TableCell>
        <TableCell className='title-table-info text-center'>Sửa</TableCell>
    </>
  )
}

export default Column;