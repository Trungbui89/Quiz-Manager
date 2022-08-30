/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { getQuizListPaging } from '../../../api/actions';
import { Link, useHistory } from 'react-router-dom';
import HeaderSearch from './HeaderSearch';
import './style.scss';
import CreateButton from '../../../helper/GroupButton/CreateButton';
import TableData from './TableData';
import PaginationComponent from '../../../helper/PaginationComponent';
import { toastFail } from '../../../helper/Notification/utils';

export default function QuizManageView(props) {
    const history = useHistory();
    const { categories, pagination, setPagination } = props;
    const [listQuiz, setListQuiz] = React.useState([]);
    //GET User - Candidate
    const getQuizList = () => {
        getQuizListPaging(filterListQuiz)
            .then((res) => {
                setListQuiz(res.data.groupQuizList);
                setPagination({
                    page: res.data?.page,
                    limit: res.data?.limit,
                    total: res.data?.total,
                });
            })
            .catch((err) => {
                toastFail('Lấy danh sách bài Quiz thất bại')
            });
    };
    const [filterListQuiz, setFilterListQuiz] = React.useState({
        page: 1,
        limit: 10,
        cate: '',
        keywords:"",
        createDate:"",
        startTime:"",
        expiredTime:""
    });

    const [filterQuiz, setFilterQuiz] = React.useState({...filterListQuiz})

    const getQuizSearch = () => {
        setFilterListQuiz(filterQuiz)
    }

    React.useEffect(() => {
        getQuizList();
    }, [filterListQuiz]);

    return (
        <div>
            <div className="card__list-test">
                <div className="card__header">
                    <h3 className="">Quản lý bài kiểm tra</h3>
                </div>
                <div>
                    <HeaderSearch 
                        categories={categories} 
                        filterListQuiz={filterQuiz} 
                        setFilterListQuiz={setFilterQuiz}
                        getQuizList={getQuizSearch}
                    />
                    <div className="group-toolbar">
                        <CreateButton
                            title="Tạo mới"
                            onClick={() =>
                                history.push('/quiz/create/quiz/createquiz')
                            }
                            iconPath="/icon/Add.svg"
                        />
                    </div>
                </div>
            </div>
            <div className="my-4">
            <TableData 
                listQuiz={listQuiz} 
                pagination={pagination}
            />
            </div>
            <PaginationComponent
                isShowPaginate
                hiddenDivider
                pagination={pagination}
                filterInfo={filterListQuiz}
                handleChangePagination={setFilterListQuiz}
            />
        </div>
    );
}
