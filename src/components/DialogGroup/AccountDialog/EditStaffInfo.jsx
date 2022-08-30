import React, { useState } from 'react';

export default function EditStaffInfo({ staff, postUpdateStaff, setCanEdit }) {
    const [updateStaff, setUpdateStaff] = useState({
        fullName: staff.fullName,
        email: staff.email,
        address: staff.address,
        userType: staff.userType,
        username: staff.username,
        company: {
            id: localStorage.getItem('company'),
        },
        active: true,
    });

    const handleStaffSubmit = (e) => {
        e.preventDefault();
        postUpdateStaff(updateStaff);
    };
    return (
        <div>
            <form onSubmit={handleStaffSubmit}>
                <table className='table'>
                    <thead className='header'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row'>FULL NAME</th>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Full Name'
                                    value={updateStaff.fullName || ''}
                                    onChange={(e) => {
                                        setUpdateStaff({
                                            ...updateStaff,
                                            fullName: e.target.value,
                                        });
                                    }}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'>EMAIL</th>
                            <td>
                                <input
                                    type='email'
                                    className='form-control'
                                    placeholder='Email'
                                    value={updateStaff.email || ''}
                                    onChange={(e) => {
                                        setUpdateStaff({
                                            ...updateStaff,
                                            email: e.target.value,
                                        });
                                    }}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'>ADDRESS</th>
                            <td>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Address'
                                    value={updateStaff.address || ''}
                                    onChange={(e) => {
                                        setUpdateStaff({
                                            ...updateStaff,
                                            address: e.target.value,
                                        });
                                    }}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'>POSITION</th>
                            <td>
                                <select
                                    className='form-control'
                                    type='select'
                                    value={updateStaff.userType}
                                    onChange={(e) => {
                                        setUpdateStaff({
                                            ...updateStaff,
                                            userType: e.target.value,
                                        });
                                    }}
                                >
                                    <option value=''> </option>
                                    <option value='Cand'>Candidate</option>
                                    <option value='HR'>HR</option>
                                    <option value='ADMIN'>ADMIN</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'>COMPANY CODE</th>
                            <td>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={localStorage.getItem('company')}
                                    disabled
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className=''>
                    <button type='submit' className='btn'>
                        <span className='text-success fa fa-check fa-2x'></span>
                    </button>
                    <div
                        className='btn'
                        onClick={() => {
                            setCanEdit(false);
                        }}
                    >
                        <i className='text-danger fa fa-times fa-2x'></i>
                    </div>
                </div>
            </form>
        </div>
    );
}
