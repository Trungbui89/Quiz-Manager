import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

export default function CreateNominee(props) {
    const [nomineeName, setNomineeName] = useState({ name: '' });
    const submitCateName = (e) => {
        e.preventDefault();
        props.postCreateNominee(nomineeName);
    };
    return (
        <Modal show={props.createNomineeModal}>
            <Modal.Header>
                Create a new nominee
                <button
                    onClick={() => {
                        props.toggleCreateNomineeModal();
                    }}
                    className='btn text-danger'
                >
                    <i className='fa fa-times fa-2x'></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={submitCateName}>
                    <div className='form-group'>
                        <label>Enter Nominee Name</label>
                        <input
                            className='form-control'
                            type='text'
                            value={nomineeName.name}
                            onChange={(e) => {
                                setNomineeName({
                                    ...nomineeName,
                                    name: e.target.value,
                                });
                            }}
                        />
                    </div>
                    <button type='submit' className='btn btn-outline-success'>
                        Create
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}
