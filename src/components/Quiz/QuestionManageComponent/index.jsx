import React, { useState } from 'react';
import CreateCategory from '../../DialogGroup/QuizDialog/CreateCategory';
import CreateNominee from '../../DialogGroup/QuizDialog/CreateNominee';
import CreateQuestion from '../../DialogGroup/QuizDialog/CreateQuestion';
import EditQuestion from '../../DialogGroup/QuizDialog/EditQuestion';
import HeaderSearch from './HeaderSearch';
import ListQuestion from './ListQuestion';
import './styles.scss'

const QuestionManageView = (props) => {
    const {
        categories,
        getFilterQuestion,
        quesTypes,
        toggleCreateCateModal,
        questions,
        toggleEditQues,
        toggleCreateQuestion,
        createCateModal,
        postCreateCategory,
        createNomineeModal,
        toggleCreateNomineeModal,
        postCreateNominee,
        showCreateQuestion,
        postCreateQuestion,
        showEditQues,
        pagination,
        filterListQuestion,
        setFilterListQuestion
    } = props;
    const [question, setQuestion] = useState(questions[0]);
    
    return (
        <div>
            <div>
                <div className="card__list-test">
                    <div className="card__header">
                        <h3 className="">Quản lý câu hỏi</h3>
                    </div>
                    <div className="list-test__content">
                        <HeaderSearch
                            categories={categories}
                            filterListQuestion={filterListQuestion}
                            setFilterListQuestion={setFilterListQuestion}
                            quesTypes={quesTypes}
                            getFilterQuestion={getFilterQuestion}
                            toggleCreateQuestion={toggleCreateQuestion}
                            toggleCreateCateModal={toggleCreateCateModal}
                        />
                        <ListQuestion
                            questions={questions}
                            getFilterQuestion={getFilterQuestion}
                            toggleEditQues={toggleEditQues}
                            setQuestion={setQuestion}
                            pagination={pagination}
                            filterListQuestion={filterListQuestion}
                            setFilterListQuestion={setFilterListQuestion}
                        />
                    </div>
                </div>
            </div>
            <CreateCategory
                createCateModal={createCateModal}
                toggleCreateCateModal={toggleCreateCateModal}
                postCreateCategory={postCreateCategory}
                categories={categories}
            />
            <CreateNominee
                createNomineeModal={createNomineeModal}
                toggleCreateNomineeModal={toggleCreateNomineeModal}
                postCreateNominee={postCreateNominee}
            />
            <CreateQuestion
                showCreateQuestion={showCreateQuestion}
                toggleCreateQuestion={toggleCreateQuestion}
                categories={categories}
                quesTypes={quesTypes}
                postCreateQuestion={postCreateQuestion}
            />
            <EditQuestion
                showEditQues={showEditQues}
                toggleEditQues={toggleEditQues}
                question={question}
                categories={categories}
                quesTypes={quesTypes}
                getFilterQuestion={getFilterQuestion}
                filterListQuestion={filterListQuestion}
            />
        </div>
    );
};

export default QuestionManageView;
