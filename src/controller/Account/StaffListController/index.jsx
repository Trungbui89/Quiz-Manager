/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { apiAcc } from '../../../api/apiConnect';
import StaffListView from '../../../components/Account/StaffListComponent';
import { toastFail } from '../../../helper/Notification/utils';

const StaffList = ({ setLoading }) => {
    const token = localStorage.getItem('token');
    const [staffs, setStaffs] = useState([]);
    const [filterStaff, setFilterStaff] = useState({
        page:1,
        limit: 10, 
        search: '',
        role:'',
        userType:''
    });
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 0,
        total: 0
    })
    // Lấy staff STAFFS
    const getFilterStaffs = () => {
        apiAcc
            .post('accounts/searchWithPaging', filterStaff, {
                headers: { 
                    authorization: `Bearer ${token}` 
                },
            })
            .then((res) => {
                setStaffs(res.data.accounts_list);
                setPagination({
                    page: res.data?.page,
                    limit: res.data?.limit,
                    total: res.data?.total
                })
            })
            .catch((err) => {
                toastFail('Lấy danh sách nhân viên thất bại');
            });
    };
    useEffect(() => {
        getFilterStaffs();
    }, [filterStaff.page]);
    // SEARCH
    

    return (
        <StaffListView
            staffs={staffs}
            getFilterStaffs={getFilterStaffs}
            setLoading={setLoading}
            pagination={pagination}
            filterStaff={filterStaff}
            setFilterStaff={setFilterStaff}
        />
    );
};

export default StaffList;
