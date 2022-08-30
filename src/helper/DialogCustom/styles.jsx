import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        borderWidth:0,
        borderBottomWidth: 1.5, borderColor: '#000000',
        borderStyle: 'solid',
        paddingLeft :24,
        paddingRight: 5,
    },
    container: {
        width: '33%',
        height:'40%'
    },
    containerActions: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom:30
    },
    closeButton: {
        position: 'absolute',
        right: 5,
        top: 5,
        color: theme.palette.grey[500],
    },
    titleStyle: {
        fontSize: 18, fontWeight: '700',
        color:'#000000'
    },
    buttonExit: {
        width: 134, height: 42,
        backgroundColor:'#F9F9F9' 
    },
    txtExit: {
        fontSize: 14,
        fontWeight:'400'
    }
}));
