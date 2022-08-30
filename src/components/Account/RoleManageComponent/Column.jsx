import { TableCell } from '@mui/material';
import React from 'react';

function Column() {
  return (
    <>
        <TableCell>Chức năng</TableCell>
        <TableCell align="center">Tạo</TableCell>
        <TableCell align="center">Xem</TableCell>
        <TableCell align="center">Sửa</TableCell>
    </>
  )
}

export default Column;