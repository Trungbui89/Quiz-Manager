import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

export default function AddPermissions(props) {
    const [allow, setAllow] = useState({
        canCreate: false,
        canRead: false,
        canUpdate: false,
    });
    const submitAllow = (e) => {
        e.preventDefault();
        props.postAddPerToUser(allow);
        setAllow({
            canCreate: false,
            canRead: false,
            canUpdate: false,
        });
        props.toggleAddPer();
    };
    return (
        <Modal centered show={props.showAddPer}  onHide={props.toggleAddPer}>
            <Modal.Header>
                <b>Allow permission</b>
                <button
                    className='btn '
                    onClick={() => {
                        props.toggleAddPer();
                    }}
                >
                    <i className='fa fa-times fa-2x'></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={submitAllow}>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            onChange={() => {
                                setAllow({ ...allow, canRead: !allow.canRead });
                            }}
                        />
                        <label>Can Read </label>
                    </div>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            onChange={() => {
                                setAllow({
                                    ...allow,
                                    canCreate: !allow.canCreate,
                                });
                            }}
                        />
                        <label>Can Create </label>
                    </div>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            onChange={() => {
                                setAllow({
                                    ...allow,
                                    canUpdate: !allow.canUpdate,
                                });
                            }}
                        />
                        <label>Can Update </label>
                    </div>
                    <button type='submit' className='btn btn-success'>
                        Assign
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
