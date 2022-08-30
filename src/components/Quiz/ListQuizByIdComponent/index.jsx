/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import { getQuizByQuizId } from "../../../api/actions"
import RenderQuiz from '../RenderQuizComponent'

export default function ListQuizById() {
  const { id } = useParams();
  // quiz header details
  const [quizheader, setQuizHeader] = React.useState('')
  const getQuizAnswerId = () => {
    getQuizByQuizId(id)
    .then((res) => {
      setQuizHeader(res.data)
    })
    .catch((err) => console.error(err))
  }
  React.useEffect(() => {
    getQuizAnswerId()
  },[])

  const QuizHeader = () => {
    if(quizheader !== '') {
      return (
        <div className="p-4" style={{ width: '85%', margin: 'auto' }}>
          <h1 style={{marginBottom: '35px', marginTop: '25px'}}>{quizheader.description}</h1>
          <p>Tổng số câu hỏi: {quizheader.numberQuestions} câu</p>
          <p>Thời gian làm bài: {quizheader.quizTime} phút</p>
          <p>Category: {quizheader.cate}</p>
        </div>
      )
    } else return <div>Ko có thông tin</div>
  }

  return (
    <div className="page__out">
      <div className="page__in">
        <div className="card__list-test">
          <div className="card__header row">
            <QuizHeader />
          </div>
          <div className="p-4" style={{ width: '85%', margin: 'auto' }}>
            <RenderQuiz id={id}/>
          </div>
        </div>
      </div>
    </div>
  );
}
