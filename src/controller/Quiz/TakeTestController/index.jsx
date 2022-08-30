/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuizPagingByUserId } from '../../../api/actions'
import OverViewQuizComponent from '../../../components/Quiz/OverViewQuizComponent'
import { toastFail } from '../../../helper/Notification/utils'

const TakeTest = () => {
    const [listQuiz, setListQuiz] = React.useState([])
    const [showResult, setShowResult] = React.useState(false)
    // const [userId, setUserId] = React.useState(-1)
    const { id } = useParams()

    const [pagination, setPagination] = React.useState({
        page: 0,
        limit: 0,
        total: 0,
    })

    const [filterListQuiz, setFilterListQuiz] = React.useState({
        page: 1,
        limit: 10,
        userId: id
    })

    const toggleShowResult = () => {
        setShowResult(!showResult)
    }

    // GET quiz all by user id
    const getQuizListGroup = () => {
        getQuizPagingByUserId(filterListQuiz)
            .then((res) => {
                setListQuiz(res.data.quizList)
                setPagination({
                    page: res.data?.page,
                    limit: res.data?.limit,
                    total: res.data?.total,
                })
            })
            .catch((err) => {
                toastFail('Lấy danh sách bài Quiz thất bại')
            });
    }
    React.useEffect(() => {
        getQuizListGroup()
    },[filterListQuiz])
    // const getQuizWithUserId = (pageNum) => {
    //     getQuizPagingByUserId({
    //         page: pageNum ? pageNum : 1,
    //         limit:100,
    //         userId: userId
    //     })
    //     .then((res) => {
    //         setListQuiz(res.data)
    //     }).catch((err) => {
    //         console.error(err)
    //     })
    // }

    // React.useEffect(() => {
    //     setUserId(id)
    // },[])

    // React.useEffect(() => {
    //     getQuizWithUserId()
    // },[userId])

    if (listQuiz.length > 0) {
    return (
        <OverViewQuizComponent
            listQuiz={listQuiz}
            showResult={showResult}
            toggleShowResult={toggleShowResult}
            setListQuiz={setListQuiz}
            pagination={pagination}
            filterListQuiz={filterListQuiz}
            setFilterListQuiz={setFilterListQuiz}
            
        />
    )
    } else
        return (
            <div className='page__out'>
                <div style={{ height: '80vh', display: 'flex'}}>
                    <div style={{alignItems: 'center', display: 'flex', margin:'auto'}} >
                        <p style={{fontFamily: 'Quicksand',fontSize: '20px', textDecoration:'italic'}}>
                            Hiện tại bạn chưa có bài Quiz nào cần làm!
                        </p>
                    </div>
                </div>
            </div>
        );
};

export default TakeTest;
