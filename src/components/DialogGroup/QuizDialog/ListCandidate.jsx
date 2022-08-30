/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Modal } from 'react-bootstrap';
import { apiAcc } from '../../../../api/apiConnect';

export default function ListCandidate(props) {
    const token = localStorage.getItem('token');
    const [users, setUsers] = React.useState([]);
    const getAllUser = () => {
        apiAcc
            .get('/accounts/list', {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    React.useEffect(() => {
        getAllUser();
    }, []);

    // SEARCH

    const [candidateResult, setCandidateResult] = React.useState(users);
    const searchCandidate = (values) => {
        const sName = values;
        if (sName !== '') {
            const result = users.filter((s) =>
                s.fullName.toLowerCase().match(sName.toLowerCase())
            );
            if (result.length > 0) {
                setCandidateResult(result);
            } else {
                alert('No result!');
            }
        } else {
            setCandidateResult([...users]);
        }
    };
    const searchResultRender = () => {
        if (candidateResult.length > 0) {
            return candidateResult;
        } else {
            return users;
        }
    };
    const [search, setSearch] = React.useState('');
    const submitCandidateSearch = (e) => {
        e.preventDefault();
        // searchStaff(search);
        searchCandidate(search);
    };
    const usersAfterSearch = searchResultRender();
    const RenderCandidate = () => {
        if (usersAfterSearch.length > 0) {
            return usersAfterSearch.map((candidate, idx) => (
                <tbody key={idx}>
                    {candidate.userType === 'Cand' ? (
                        <tr>
                            <td>{candidate.id}</td>
                            <td>{candidate.fullName}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.address}</td>
                            <td>
                                {candidate.userType === 'Cand'
                                    ? 'Candidate'
                                    : ''}
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        props.selectCandidate(candidate);
                                        props.toggleModalUser();
                                    }}
                                    className='btn btn-warning'
                                >
                                    Chọn
                                </button>
                            </td>
                        </tr>
                    ) : null}
                </tbody>
            ));
        }
    };
    return (
        <Modal show={props.showUser} size='xl' centered>
            <Modal.Header className='text-info'>
                <b>Select Candidate for this Quiz</b>
                <button
                    className='btn text-danger'
                    onClick={() => {
                        props.toggleModalUser();
                    }}
                >
                    <i className='fa fa-times fa-2x'></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='form__search-candidate col-3 mb-3'>
                        <form onSubmit={submitCandidateSearch}>
                            {/* <div className='loader_icon'>
                                <Puff
                                    type='Puff'
                                    color='#00BFFF'
                                    height={20}
                                    width={20}
                                />
                            </div> */}
                            <input
                                type='text'
                                placeholder='Search'
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                            <button type='submit'>
                                <i className='fa fa-search'></i>
                            </button>
                        </form>
                    </div>
                </div>
                <table className='table text-center table-borderless'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Position</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <RenderCandidate />
                </table>
            </Modal.Body>
        </Modal>
    );
}
