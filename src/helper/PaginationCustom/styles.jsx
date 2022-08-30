import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    textDefault: {
        color: '#000',
      },
      rootPagination: {
        '& .Mui-selected': {
          color: '#FFFFFF',
          backgroundColor: '#F7C245 !important',
          border: '1px solid #FFFFFF',
          borderRadius: '4px',
        },
      },
}));