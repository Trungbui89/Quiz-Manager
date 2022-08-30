import React, { useState } from 'react';
import AddCandidateView from '../views/AddCandidateView';

const AddCandidate = () => {
    const [addCan, setAddCan] = useState([])


    return <AddCandidateView setAddCan={setAddCan} />;
};

export default AddCandidate;
