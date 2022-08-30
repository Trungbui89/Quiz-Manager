import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        minHeight: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingTop:10,
        marginTop:-12
    },
    txtCurrentPage: {
        fontSize: 13, 
        fontWeight: 600,
        color: '#000',
    },
    txtOverDate: {
        fontSize: 14, 
        fontWeight: 400,
        color: '#FF0000',
    },
    paginationList: {
    },
    viewRight: {
        width:'15%'
    },
    ul: {
        '& .MuiPaginationItem-root': {
            color: '#333333',
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            backgroundColor: '#DC3545',
            color:'#fff'
        }
    },
    '@media (max-width: 1115px)': {
        txtCurrentPage: {
            textAlign: 'center'
        },
        txtOverDate: {
            textAlign: 'center'
        },
    },
    '@media (max-width: 836px)': {
        rowExportExcel: {
            justifyContent: 'center !important',
            marginTop: 15
        },
    }
    
}));