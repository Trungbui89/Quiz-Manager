/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import CandidateListView from '../views/CandidateListView';
import { apiCandidate } from '../../../api/apiConnect';

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);
    const token = localStorage.getItem('token');
    const [searchName, setSearchName] = useState('');

    const getAllCandidates = () => {
        apiCandidate
            .get('/ext/students', {
                headers: { authorization: token },
            })
            .then((res) => {
                setCandidates(res.data);
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        getAllCandidates();
    }, []);

    //SEARCH
    const searchNameCandidate = (values) => {
        const sName = values;
        if (sName !== '') {
            const result = candidates.filter((s) =>
                s.name.toLowerCase().match(sName.toLowerCase())
            );
            if (result.length > 0) {
                setSearchName(result);
            } else {
                alert('No result!');
            }
        } else {
            setSearchName([...candidates]);
        }
    };
    const searchResultRender = () => {
        if (searchName.length > 0) {
            return searchName;
        } else {
            return candidates;
        }
    };
    return (
        <>
            <CandidateListView
                candidates={searchResultRender()}
                searchNameCandidate={searchNameCandidate}
            />
        </>
    );
};

export default CandidateList;
