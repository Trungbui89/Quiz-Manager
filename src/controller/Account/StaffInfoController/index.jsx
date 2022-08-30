/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiAcc } from '../../../api/apiConnect';
import { toastFail, toastSuccess } from '../../../helper/Notification/utils';
import StaffInfoView from '../../../components/Account/StaffInfoComponent';

function StaffInfo() {
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const [staff, setStaff] = useState({});
    //GET STAFF
    const getStaffWithId = () => {
        apiAcc
            .get(`/accounts/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setStaff(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getStaffWithId();
    }, []);
    //GET ROLE NOT IN USER
    const [roles, setRoles] = useState([]);
    const getAllRole = () => {
        apiAcc
            .get(`/accounts/role/list`, {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setRoles(res.data);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getAllRole();
    }, []);
    //GET ROLE HAVE IN USER
    const [roleInUser, setRoleInUser] = useState([]);
    const getRoleHaveInUser = () => {
        apiAcc
            .get(`/accounts/list/haverole/${id}`, {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setRoleInUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getRoleHaveInUser();
    }, []);

    //GET PER IN USER
    const [perInUser, setPerInUser] = useState([]);
    const getPerInUser = () => {
        apiAcc
            .get(`/accounts/list/havePer/${id}`, {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setPerInUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getPerInUser();
    }, []);
    //GET PER NOT IN USER
    // const [permissions, setPermissions] = useState([]);
    // const getPerNotInUser = () => {
    //     apiAcc
    //         .get(`/accounts/list/notPer/${id}`, {
    //             headers: {
    //                 authorization: 'Bearer ' + token,
    //             },
    //         })
    //         .then((res) => {
    //             setPermissions(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    // useEffect(() => {
    //     getPerNotInUser();
    // }, []);
    // POST UPDATE STAFF INFO
    // const [canEdit, setCanEdit] = useState(false);
    // const postUpdateStaff = (value) => {
    //     apiAcc
    //         .put('/accounts', value, {
    //             headers: {
    //                 authorization: 'Bearer ' + token,
    //             },
    //         })
    //         .then((res) => {
    //             toastSuccess('Cập nhật thông tin thành công');
    //             getStaffWithId();
    //             setCanEdit(false);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             toastFail('Thất bại, vui lòng kiểm tra lại');
    //         });
    // };
    // POST ADD ROLE To USER
    const postAddRoleToUser = (id) => {
        const req = {
            roleId: id,
            username: staff.username,
        };
        apiAcc
            .post('/accounts/role/addtoaccounts', req, {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                toastSuccess('Thêm Role thành công');
                getRoleHaveInUser();
                getAllRole();
            })
            .catch((err) => {
                console.log(err);
                toastFail('Thất bại, vui lòng kiểm tra lại');
            });
    };
    // DELETE USER ROLE
    const deleteUserRole = (id) => {
        apiAcc
            .delete('/accounts/role/deleteroleaccount', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
                data: { roleId: id, username: staff.username },
            })
            .then((res) => {
                toastSuccess('Xóa Role thành công');
                getRoleHaveInUser();
                getAllRole();
            })
            .catch((err) => {
                console.log(err);
                toastFail('Thất bại, vui lòng kiểm tra lại');
            });
    };
    //POST ADD PERMISSION TO USER
    const [perId, setPerId] = useState('');
    const postAddPerToUser = (value) => {
        
        apiAcc
            .put('/accounts/permission/updatetouser', value, {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                toastSuccess('Thêm Permission thành công');
                getPerInUser();
            })
            .catch((err) => {
                console.log(err);
                toastFail('Thất bại, vui lòng kiểm tra lại');
            });
    };
    //DELETE USER PERMISSION
    const deleteUserPer = (value) => {
        apiAcc
            .delete('/accounts/permission/deletepermissionaccount', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
                data: { roleId: value, username: staff.username },
            })
            .then((res) => {
                toastSuccess('Đã xóa Permission thành công');
                getPerInUser();
            })
            .catch((err) => {
                console.log(err);
                toastFail('Thất bại, vui lòng kiểm tra lại');
            });
    };
    // CHANGE PASS FOR USER (only ADMIN)
    const [showModalPass, setShowModalPass] = useState(false);
    const toggleModalPassChange = () => {
        setShowModalPass(!showModalPass);
    };
    const postNewPass = (value) => {
        const request = {
            username: staff.username,
            password: value,
        };
        apiAcc
            .put('/accounts/admin/changepass', request, {
                headers: { 
                    authorization: 'Bearer ' + token 
                },
            })
            .then(res => {
                toastSuccess('Đổi mật khẩu thành công');
                toggleModalPassChange()
            })
            .catch((err) => {
                toastFail('Thất bại, vui lòng kiểm tra lại');
            });
    };
    if (staff) {
        return (
            <StaffInfoView
                staff={staff}
                roles={roles}
                // postUpdateStaff={postUpdateStaff}
                // canEdit={canEdit}
                // setCanEdit={setCanEdit}
                roleInUser={roleInUser}
                postAddRoleToUser={postAddRoleToUser}
                deleteUserRole={deleteUserRole}
                perInUser={perInUser}
                postAddPerToUser={postAddPerToUser}
                setPerId={setPerId}
                deleteUserPer={deleteUserPer}
                showModalPass={showModalPass}
                toggleModalPassChange={toggleModalPassChange}
                postNewPass={postNewPass}
            />
        );
    } else return <div></div>;
}
export default StaffInfo;
