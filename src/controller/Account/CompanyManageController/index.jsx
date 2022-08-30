/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { apiAcc } from '../../../api/apiConnect';
import CompanyManageView from '../../../components/Account/CompanyManageComponent';

export default function CompanyManage() {
    const token = localStorage.getItem('token');
    const [companies, setCompanies] = useState([]);
    const [addFailed, setAddFailed] = useState(false);
    const [addSuccess, setAddSuccess] = useState(false);
    const [show, setShow] = useState(false);
    const toggleModalAdd = () => {
        setShow(!show);
    };
    // GET ALL COMPANY
    const getAllCompany = () => {
        apiAcc
            .get('/company/list', {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setCompanies(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getAllCompany();
    }, []);
    //POST ADD COMPANY
    const postAddCompany = (value) => {
        let formData = new FormData(); 
        formData.append('image', value.image);
        formData.append('name',value.name);
        formData.append('shortCutName',value.shortCutName);
        formData.append('email',value.email);
        formData.append('phone',value.phone);
        formData.append('address',value.address);
        apiAcc
            .post('/company', formData, {
                headers: {
                    authorization: 'Bearer ' + token,
                    'content-type': 'multipart/form-data'
                },
            })
            .then((res) => {
                toggleModalAdd();
                getAllCompany();
                setAddSuccess(true);
            })
            .catch((err) => {
                console.log(err);
                setAddFailed(true);
            });
    };
    //PUT EDIT COMPANY
    const [canEdit, setCanEdit] = useState(false);
    const putEditCompany = (value) => {
        let formData = new FormData(); 
        formData.append('image', value.image);
        formData.append('name',value.name);
        formData.append('shortCutName',value.shortCutName);
        formData.append('email',value.email);
        formData.append('phone',value.phone);
        formData.append('address',value.address);
        apiAcc
            .put('/company', formData, {
                headers: {
                    authorization: 'Bearer ' + token,
                    'content-type': 'multipart/form-data'
                },
            })
            .then((res) => {    
                getAllCompany();
                setAddSuccess(true);
                setCanEdit(false)
            })
            .catch((err) => {
                console.log(err);
                setAddFailed(true);
            });
    };
    return (
        <CompanyManageView
            companies={companies}
            show={show}
            toggleModalAdd={toggleModalAdd}
            postAddCompany={postAddCompany}
            addSuccess={addSuccess}
            setAddSuccess={setAddSuccess}
            addFailed={addFailed}
            setAddFailed={setAddFailed}
            canEdit={canEdit}
            setCanEdit={setCanEdit}
            putEditCompany={putEditCompany}
        />
    );
}
