import React, { useState } from 'react';

const AddCandidateView = ({setAddCan}) => {
    const [inputChange, setInputChange] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    });
    
    const addSubmit =(e) =>{
        e.preventDefault();
        setAddCan(inputChange)
    }
    return (
        <div className='container mt-4 card__list-test'>
            <div className='candidate_addform'>
                <h4>Add New Candidate</h4>
                <form onSubmit={addSubmit}>
                    <input
                        type='text'
                        className=''
                        placeholder='Full Name'
                        value={inputChange.name}
                        onChange={(e) => {
                            setInputChange({
                                ...inputChange,
                                name: e.target.value,
                            });
                        }}
                        required
                    />
                    <input
                        type='email'
                        className=''
                        placeholder='Email'
                        value={inputChange.email}
                        onChange={(e) => {
                            setInputChange({
                                ...inputChange,
                                email: e.target.value,
                            });
                        }}
                        required
                    />
                    <input
                        type='text'
                        className=''
                        placeholder='User Name'
                        value={inputChange.username}
                        onChange={(e) => {
                            setInputChange({
                                ...inputChange,
                                username: e.target.value,
                            });
                        }}
                        required
                    />
                    <input
                        type='password'
                        className=''
                        placeholder='Password'
                        value={inputChange.password}
                        onChange={(e) => {
                            setInputChange({
                                ...inputChange,
                                password: e.target.value,
                            });
                        }}
                        required
                    />
                    <input
                        type='password'
                        className=''
                        placeholder='Re-Enter Password'
                        required
                    />
                    <button type='submit' className='add_button'>
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCandidateView;
