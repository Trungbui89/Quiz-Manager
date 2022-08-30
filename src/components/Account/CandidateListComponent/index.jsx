import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CandidateItem = (props) =>
    props.candidates.map((candidate) => {
        return (
            <tr key={candidate.id}>
                <td className=''>{candidate.name}</td>
                <td className=''>{candidate.userName}</td>
                <td className=''>{candidate.rollNumber}</td>
                <td className=''>
                    <Link to='#'>View test</Link>
                </td>
                <td>
                    <button className='btn__delete'>
                        <i className='fa fa-times'></i>
                    </button>
                </td>
            </tr>
        );
    });

const CandidateListView = (props) => {
    const [search, setSearch] = useState();
    const submitSearch = (e) => {
        e.preventDefault();
        props.searchNameCandidate(search);
    };

    return (
        <div className='container card__list-test'>
            <div className='card__header'>
                <h3 className=''>List Candidate</h3>
            </div>
            <div className='form__search-candidate'>
                <form onSubmit={submitSearch}>
                    <input
                        type='text'
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
            <div className='m-1'>
                <table className='table mt-5 table-striped card__table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>NAME</th>
                            <th>USERNAME</th>
                            <th>NOMINEE</th>
                            <th>CHECK TEST</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        <CandidateItem candidates={props.candidates} />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CandidateListView;
