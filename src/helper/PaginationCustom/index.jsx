import { Box, FormControl, Typography } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import React from 'react'
import useStyles from './styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
export default function PaginationCustom({rowsPerPage,handleChangeRowsPerPage,handleChangePage,totalRecord,page,count}) {
    const classes = useStyles();

    return (
        <>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignsItem: 'center',
            marginTop: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <Typography className={classes.textDefault}>Hiển thị</Typography>
            <FormControl
              style={{
                width: 84,
                '&. MuiOutlinedInput-root': {
                  height: 32,
                },
              }}
            >
              <Select
                value={rowsPerPage}
                style={{ height: 32 }}
                onChange={handleChangeRowsPerPage}
              >
                {[20, 50, 100].map((item, index) => {
                  return (
                    <MenuItem value={item} key={`${item}-${index}`}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Typography className={classes.textDefault}>
              trong {totalRecord ? totalRecord : 0} bản ghi
            </Typography>
          </div>
          <Pagination
            selected={true}
            defaultValue={1}
            className={classes.rootPagination}
            count={count}
            variant="outlined"
            shape="rounded"
            page={page > 0 ? page : 1}
            onChange={handleChangePage}
          />
        </Box>
        </>
    )
}
