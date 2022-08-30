import React from 'react';
import { Modal } from 'react-bootstrap';
import dateFormat from 'dateformat';

export default function ResultQuiz(props) {
    return (
        <Modal
            size='xl'
            centered
            show={props.showResult}
            onHide={props.toggleShowResult}
        >
            <Modal.Header>
                <h5 className='font-weight-bold text-info'>Quiz Result</h5>
                <button
                    className=' btn text-danger'
                    onClick={props.toggleShowResult}
                >
                    <i className='fa fa-times-circle-o fa-2x'></i>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className='text-center font-weight-bold text-dark'>
                    <h4>{props.quizDone.description}</h4>
                </div>
                <div className='row'>
                    <div className='col-6'>
                        <ul>
                            <li>
                                <b>Bắt đầu cho phép:{' '}</b>
                                {dateFormat(
                                    props.quizDone.startTime,
                                    'hh : MM : ss , ngày dd/mm/yyyy'
                                )}
                            </li>
                            <li>
                                <b>Hết hạn:{' '}</b>
                                {dateFormat(
                                    props.quizDone.startTime,
                                    'hh : MM : ss , ngày dd/mm/yyyy'
                                )}
                            </li>
                            <li>
                                <b>Kết thúc làm:{' '}</b>
                                {dateFormat(
                                    props.quizDone.endTime,
                                    'hh : MM : ss , ngày dd/mm/yyyy'
                                )}
                            </li>
                        </ul>
                    </div>
                    <div className='col-6'>
                        <ul>
                            <li>
                                <b>Tổng thời gian làm: </b>
                                {props.quizDone.quizTime} phút
                            </li>
                            <li>
                                <b>Tổng số câu hỏi: </b>
                                {props.quizDone.numberQuestions} câu
                            </li>
                            <li>
                                <b>Kết quả: </b>
                                {props.quizDone.score}
                            </li>
                        </ul>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
