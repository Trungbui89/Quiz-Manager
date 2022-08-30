/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import RoleManageView from '../../../components/Account/RoleManageComponent';
import { apiAcc } from '../../../api/apiConnect';
import {toastSuccess,  toastFail } from '../../../helper/Notification/utils'

export default function RoleManage() {
    const token = localStorage.getItem('token');

    //GET ALL ROLE
    const [roles, setRoles] = useState([]);
    const getAllRole = () => {
        apiAcc
            .get('/accounts/role/list', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setRoles(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getAllRole();
    }, []);

    //POST SAVE ROLE
    const [showModalAddRole, setShowModalAddRole] = useState(false);
    const toggleAddRoleModal = () => {
        setShowModalAddRole(!showModalAddRole);
    };
    const postSaveRole = (name) => {
        const request = {
            name: name,
        };
        apiAcc
            .post('/accounts/role/save', request, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                toastSuccess('Thêm role mới thành công!');
                getAllRole();
                toggleAddRoleModal();
            })
            .catch((err) => {
                toastFail('Lỗi! Vui lòng thử lại');
                console.log(err);
            });
    };

    // GET ALL PERMISSIONS
    const [permissions, setPermissions] = useState([]);
    const getAllPermissions = () => {
        apiAcc
            .get('/accounts/per/list', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setPermissions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getAllPermissions();
    }, []);

    // GET ROLE DETAIL (RoleHavePer)
    const [roleDetail, setRoleDetail] = useState([]);
    const [roleDetailId, setRoleDetailId] = useState(Number(localStorage.getItem('roleId')))
    const getRoleDetail = () => {
            apiAcc
                .get(`/accounts/role/havePer/${roleDetailId}`, {
                    headers: {
                        authorization: 'Bearer ' + token,
                    },
                })
                .then((res) => {
                    setRoleDetail(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
    };
    useEffect(() =>{
        getRoleDetail()
    },[roleDetailId])
    // GET PER NOT IN ROLE
    // const [perNotInRole, setPerNotInRole] = useState([]);
    // const getPerNotInRole = (roleId) => {
    //     apiAcc
    //         .get(`/accounts/role/notPer/${roleId}`, {
    //             headers:{
    //                 authorization: 'Bearer ' + token,
    //             }
    //         })
    //         .then(res => {
    //             setPerNotInRole(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };
    //ADD PERMISSION TO ROLE
    const [perId, setPerId] = useState('');
    const [roleId, setRoleId] = useState('');
    const postAddPerToRole = (value) => {
        apiAcc
            .put('/accounts/permission/updatetorole', value, {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                getRoleDetail(roleId);
                toastSuccess('Cập nhật Permission thành công');
                setPerId('')
            })
            .catch((err) => {
                toastFail('Lỗi, vui lòng kiểm tra lại');
            });
    };
    // DELETE ROLE PERMISSION
    const deleteRolePer = (value) => {
        apiAcc
            .delete('/accounts/permission/deletepermissiontorole', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
                data: { roles_id: roleId, permissions_id: value },
            })
            .then((res) => {
                getRoleDetail();
                toastSuccess('Cập nhật thông tin thành công');
                setRoleDetailId(roleId);
            })
            .catch((err) => {
                toastFail('Lỗi! Vui lòng kiểm tra lại');
            });
    };
    return (
        <RoleManageView
            roles={roles}
            showModalAddRole={showModalAddRole}
            toggleAddRoleModal={toggleAddRoleModal}
            postSaveRole={postSaveRole}
            permissions={permissions}
            roleDetail={roleDetail}
            setRoleDetailId={setRoleDetailId}
            setPerId={setPerId}
            setRoleId={setRoleId}
            postAddPerToRole={postAddPerToRole}
            deleteRolePer={deleteRolePer}
            perId={perId}
            roleDetailId={roleDetailId}
        />
    );
}
