import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    fieldsetCustom: {
        border: `1px solid #000000`,
        borderRadius: 20,
        height: 46,
        marginTop : -7
    },
    fieldsetCustomDisable: {
        border: '1px solid #CCCCCC',
        borderRadius: 20,
        height: 46,
        backgroundColor:'#F5F5F5',
        marginTop : -7
    },
    titleLegend: {
        fontSize: 10,
        fontWeight: 400,
        color: '#DCDCDC',
    },
    contentInput: {
        width: '100%',
    },
    input: {
        padding:0,
        '& .MuiInputBase-input': {
            backgroundColor: '#f3f6f9',
        },
        '& .MuiOutlinedInput-multiline ': {
            backgroundColor: '#F3F6F9',
        },
        '&::placeholder': {
            color: '#CCCCCC'
        },
    },
    placeHolder: {
        color: '#C0C0C0', fontStyle: 'italic'
    },
    placeHolderDisable: {
        color: '#CCCCCC', fontStyle: 'italic'
    },
    titleVertical: {
        marginBottom: 6,
        fontWeight: 500,
    },
    textErrorForm: {
        color: '#F64E60',
        fontSize: 12,
        margin: 0,
    },
}));