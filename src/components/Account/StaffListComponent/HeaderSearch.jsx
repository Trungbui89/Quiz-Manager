import { Box, Grid, IconButton } from '@mui/material';
import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputSearchComponent from '../../../helper/InputSearchComponent';
import SearchButton from '../../../helper/GroupButton/SearchButton';
import CreateButton from '../../../helper/GroupButton/CreateButton';
import SelectFieldCustom from '../../../helper/SelectFieldCustom';
import { convertDataOptions, dataStatusStaff } from '../../../constants/shared';
import { getAllRole } from '../../../api/actions';
import { toastFail } from '../../../helper/Notification/utils';
import DatePickerComponent from '../../../helper/DatePickerFlexComponent';

function HeaderSearch(props) {
    const token = localStorage.getItem('token')
    const { toggleAddStaffModal, getFilterStaffs, filterStaff, setFilterStaff} = props;
    const [roles, setRoles] = React.useState([]);
    const dataOptionsStatus = dataStatusStaff;
    const dataConvertRoles = convertDataOptions(roles);
    const dataOptionRoles = [
        ...dataConvertRoles, 
        // {id: dataConvertRoles.length, label:'Tất cả', value:''}
    ]
    const getRoles = () => {
        getAllRole().then(res => setRoles(res.data))
    }
    const handleChangeFilterStaff = (key,value) =>{
        switch (key) {
            case 'status':
                setFilterStaff({...filterStaff, userType: value.value})
                break;
            case 'role':
                setFilterStaff({...filterStaff, role: value.value})
                break;
            case 'key_word':
                setFilterStaff({...filterStaff, search : value})
                break;
            default:
                break;
        }
    }
    React.useEffect(() => {
        getRoles()
    }, [token])
    return (
        <div>
            <div style={{ marginTop: 20, textAlign: 'left' }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <SelectFieldCustom
                        data={dataOptionsStatus}
                        handleOnChange={handleChangeFilterStaff}
                        defaultValue={filterStaff.userType || ''}
                        title="Trạng thái"
                        name="status"
                    />
                </Grid>
                <Grid item xs={2}>
                    <SelectFieldCustom
                        data={dataOptionRoles}
                        handleOnChange={handleChangeFilterStaff}
                        defaultValue={filterStaff.role || ''}
                        title="Vai trò"
                        name="role"
                    />
                </Grid>
                <Grid item xs={2}>
                    <InputSearchComponent
                        value={filterStaff.search ?? ''}
                        handleChangeText={handleChangeFilterStaff}
                        title="Nội dung tìm kiếm"
                        name="key_word"
                    />
                </Grid>
                <Grid item xs={2}>
                    <SearchButton
                        title="Tìm kiếm"
                        onClick={getFilterStaffs}
                    />
                </Grid>
            </Grid>
            <Grid container sx={{ margin: '10px 0' }}>
                <CreateButton
                    title="Thêm nhân viên"
                    iconPath="/icon/Add.svg"
                    color="#FFC145"
                    onClick={toggleAddStaffModal}
                />
            </Grid>
        </div>
        </div>
    );
}

export default HeaderSearch;
