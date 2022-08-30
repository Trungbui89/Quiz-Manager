import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

export default function AddCompany(props) {
    const [info, setInfo] = useState({
        image: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        shortCutName:'',
    });
    const submitCompany = (e) =>{
        e.preventDefault();
        props.postAddCompany(info)
    }
    return (
        <Modal show={props.show} centered size='lg'>
            <Modal.Header>
                <b>Information Company</b>
                <button onClick={props.toggleModalAdd} className='btn'>
                    <i className='fa fa-times fa-2x text-danger'></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className='container'>
                    <form onSubmit={submitCompany}>
                        <div className="form-group">
                            <label>Image</label>
                            <input
                                type='file'
                                className='form-control'
                                onChange={(e) => {
                                    setInfo({ ...info, image: e.target.files[0] });
                                }}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Company Name</label>
                            <input
                                type='text'
                                className='form-control'
                                value={info.name}
                                onChange={(e) => {
                                    setInfo({ ...info, name: e.target.value });
                                }}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Shortcut Name</label>
                            <input
                                type='text'
                                className='form-control'
                                value={info.shortCutName}
                                onChange={(e) => {
                                    setInfo({ ...info, shortCutName: e.target.value });
                                }}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <input
                                type='email'
                                className='form-control'
                                value={info.email}
                                onChange={(e) => {
                                    setInfo({ ...info, email: e.target.value });
                                }}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Number Phone</label>
                            <input
                                type='number'
                                className='form-control'
                                value={info.phone}
                                onChange={(e) => {
                                    setInfo({ ...info, phone: e.target.value });
                                }}
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label>Address</label>
                            <input
                                type='text'
                                className='form-control'
                                value={info.address}
                                onChange={(e)=>{
                                    setInfo({ ...info, address: e.target.value });
                                }}
                                required
                            />
                        </div>
                        <div className=''>
                            <button type='submit' className='custom-btn btn-5'>
                                <span>SEND</span>
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    );
}
