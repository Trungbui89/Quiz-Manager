import React from "react"
import { postCreateQuiz, getAllCategories, getAllAccount } from "../../../api/actions"
import { toastFail, toastSuccess } from "../../../helper/Notification/utils"
import CreateQuizPage from "../../../components/Quiz/QuizManageComponent/CreateQuizPage"
import { useHistory } from 'react-router-dom'

export default function CreateQuizController() {

    const id = localStorage.getItem('id')
    // GET ALL CATEGORY
    const [categories, setCategories] = React.useState([]);
    const getAllCategoriesFunc = () => {
        getAllCategories()
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // GET ALL STAFFS
    const [staffs, setStaffs] = React.useState([])
    const getAllStaffs = () => {
        getAllAccount()
            .then((res) => {
                setStaffs(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    React.useEffect(() => {
        getAllCategoriesFunc()
        getAllStaffs()
    },[])

    // POST CREATE QUIZ
    const [createQuizForm, setCreateQuizForm] = React.useState({
        creator: +id,
        description: '',
        startTime: '',
        expiredTime: '',
        quizTime: 0,
        status: 'not_start',
        userId:[]
    })
    const [topicState, setTopicState] = React.useState([{
        index: 1,
        cate: '',
        quantity: null
    }])

    // React.useEffect(() => {
    //     setCreateQuizForm(createQuizForm)
    // },[createQuizForm])
    
    const history = useHistory()
    const postCreateQuizFunc = () => {
        const convertTopic = topicState?.map(item => ({
            cate: item.cate.id,
            quantity: item.quantity,
        }))
        const payload = {quiz: createQuizForm, topics: convertTopic}
            postCreateQuiz(payload)
                .then(res => {
                    if(res.data.message !== 'Taọ  quiz thành công') {
                        toastFail(res.data.message)
                    } else {
                        toastSuccess('Thành công')
                        setTimeout(() => history.push('/quiz/create/quiz'), 500)
                    }
                }).catch(err => {
                    toastFail("Đã có lỗi xảy ra");
                })
    }

    return (
        <CreateQuizPage
            postCreateQuizFunc={postCreateQuizFunc}
            categories={categories}
            createQuizForm={createQuizForm}
            setCreateQuizForm={setCreateQuizForm}
            topicState={topicState}
            setTopicState={setTopicState}
            staffs={staffs}
        />
    )
}

