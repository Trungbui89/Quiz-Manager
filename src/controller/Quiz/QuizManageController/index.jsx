import * as React from "react";
import { apiQuiz } from "../../../api/apiConnect";
import { toastFail, toastSuccess } from "../../../helper/Notification/utils";
import QuizManageView from "../../../components/Quiz/QuizManageComponent";

export default function QuizManage() {
  const token = localStorage.getItem("token");
  const [pagination, setPagination] = React.useState({
    page: 0,
    limit: 0,
    total: 0,
});

  // GET ALL CATEGORY
  const [categories, setCategories] = React.useState([]);
  const getAllCategories = () => {
    apiQuiz
      .get("/quiz/cate/list")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  React.useEffect(() => {
    getAllCategories();
  }, []);

  // GET ALL QUIZ BY ID
  const id = localStorage.getItem('id');
  const [quizById, setQuizById] = React.useState([])
  // const getAllQuizById = () => {
  //   apiQuiz
  //     .get(`/quiz/listbyuser/${id}`)
  //     .then((res) => {
  //       setQuizById(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }
  // React.useEffect(() => {
  //   getAllQuizById()
  // },[])

  return (
    <QuizManageView
      categories={categories}
      // quizById={quizById}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
}
