import React from "react";
import "./Quizes_list.css";

function Quizes_list(props) {
  return (
    <div className='quizes-list'>
      <div className='quiz title'>
        <div className='box1'>
          <span>Quiz name</span>
        </div>
        <div className='box2'>
          <span>Questions</span>
          <span>Created by</span>
          <span>{props.is_admin && "Plays"}</span>
        </div>
      </div>
      {props.quizes_details !== [] &&
        props.quizes_details.map((quiz) => {
          return (
            <div className='quiz'>
              <div className='box1'>
                <span>{quiz.name}</span>
                {props.is_admin && (
                  <div className='buttons2'>
                    <button
                      onClick={(event) => {
                        props.handleResult(quiz.quiz_id);
                      }}>
                      Ranking & Stats
                    </button>
                    |
                    <button
                      onClick={(event) => {
                        props.handleQuizDelete(quiz.quiz_id);
                      }}>
                      Delete
                    </button>
                    |
                  </div>
                )}
              </div>
              <div className='box2'>
                <span>{quiz.no_of_questions}</span>
                <span>{quiz.created_by}</span>
                {props.is_admin ? (
                  <span>{quiz.submissions}</span>
                ) : (
                  <button
                    className='btn-start'
                    onClick={(e) => {
                      props.handleTest(quiz.quiz_id);
                    }}>
                    Start
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Quizes_list;
