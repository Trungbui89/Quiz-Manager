import React, { useState } from 'react';
import DialogAddStaff from './DialogAddStaff'
import IconButton from '@mui/material/IconButton';
import PaginationComponent from '../../../helper/PaginationComponent';
import TableData from './TableData';
import HeaderSearch from './HeaderSearch';
import './styles.scss'

const StaffListView = (props) => {
    const { staffs, getFilterStaffs, pagination, filterStaff, setFilterStaff } =
        props;
    const [addModal, setAddModal] = useState(false);
    const toggleAddStaffModal = () => {
        setAddModal(!addModal);
    };
    const [selected, setSelected] = useState([]);
    const handleSelect = (staffId) => {
        if (selected.includes(staffId) === true) {
            const newSelected = selected.filter((id) => id !== staffId);
            setSelected(newSelected);
        } else {
            setSelected([...selected, staffId]);
        }
    };


    return (
        <div>
            <div>
                <DialogAddStaff
                    show={addModal}
                    setAddModal={setAddModal}
                    toggleAddStaffModal={toggleAddStaffModal}
                    getAllStaffs={getFilterStaffs}
                />
                <div className="card__list-test">
                    <div className="card__header row">
                        <h3 className="">Quản lý nhân viên</h3>
                    </div>
                    <HeaderSearch
                        toggleAddStaffModal={toggleAddStaffModal}
                        getFilterStaffs={getFilterStaffs}
                        filterStaff={filterStaff}
                        setFilterStaff={setFilterStaff}
                    />
                    <div className="row m-1">
                        <TableData
                            staffs={staffs}
                            handleSelect={handleSelect}
                            pagination={pagination}
                        />
                        <PaginationComponent
                            isShowPaginate
                            hiddenDivider
                            pagination={pagination}
                            filterInfo={filterStaff}
                            handleChangePagination={setFilterStaff}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffListView;
