import React ,{useState,useEffect} from 'react';
// import Pagination from '@material-ui/lab/Pagination';
import Pagination from '@mui/material/Pagination';
import { Grid } from '@material-ui/core';
import useStyles from './styles';

const PaginationComponent = (props) => {
    const classes = useStyles();
    const { isShowPaginate, filterInfo, handleChangePagination,pagination, hiddenDivider, hiddenTitle } = props;
    const [paginationPage,setPagination] = useState(false);
    
    useEffect(() => {
        if(pagination?.total){
            handlePagination();
        }
    }, [pagination]);

    async function handlePagination(){
        let paginationNew= {};
        const fromRecord = Math.floor(1 + (pagination?.page - 1) * pagination?.limit);
        const toRecord = Math.floor(pagination?.page*pagination?.limit);
        let newTotalPage = Math.floor(pagination?.total/pagination?.limit);
        if(Math.floor(pagination?.total%pagination?.limit) >0 ){
            newTotalPage+=1;
        }
        paginationNew={
            limit:pagination?.limit,
            currentPage:pagination?.page,
            from:fromRecord,
            to:toRecord > pagination?.total ? pagination?.total : toRecord  ,
            total:pagination?.total,
            totalPage:newTotalPage,
        };
        setPagination(paginationNew);
    };
    return (
        <Grid container className={classes.container}
            style={{borderWidth:0,borderTopWidth:isShowPaginate&&!hiddenDivider ? 1 : 0,
                marginTop:hiddenDivider ? 10 : 0,
                borderColor:'#8A8A8A',
                borderStyle:'solid',}}
        >
            {
                isShowPaginate &&
                <Grid item xs={12} md={3}>
                    {hiddenTitle ? '' :
                    <p className={classes.txtCurrentPage}>
                        Hiển thị {paginationPage?.from}-{paginationPage?.to} trong {paginationPage?.total} bản ghi
                    </p>
                    }
                </Grid>
            }
            {
                isShowPaginate &&
                <Grid item xs={12} md={hiddenTitle ? 7 : 5} style={{display:'flex',justifyContent:'center'}}>
                    <Pagination className={classes.paginationList}
                        classes={{
                            ul: classes?.ul
                        }}
                        onChange={(event,value)=>handleChangePagination({...filterInfo, page: value})}
                        page={pagination?.page}
                        size='small'
                        variant="outlined" shape="rounded"
                        count={paginationPage?.totalPage}
                        color="warning"
                        // defaultPage={1}
                    />
                </Grid>
            }
        </Grid>
    );
};
export default React.memo(PaginationComponent);

