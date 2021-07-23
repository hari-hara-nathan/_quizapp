import React, { useState } from "react";
import "./Questions.css";
import DeleteIcon from "@material-ui/icons/Delete";

function Questions({ quiz, handleDelete,ShowDelete }) {
  return (
    <div className='questions'>
      <h2>Questions</h2>
      {quiz.questions.map((question, index) => {
        return (
          <div className='question'>
            <p>
              {index + 1}. {question.question}
            </p>
            <div className='options'>
              {[...question.incorrect_answers, question.correct_answer]
                .sort(() => Math.random() - 0.5)
                .map((ele) => {
                  return <button value={ele} className={ele===question.correct_answer && 'correct' }>{ele}</button>;
                })}
            </div>
            {ShowDelete && (<button
              onClick={(event) => {
                handleDelete("remove_question", index);
              }}
              className='delete'>
              <DeleteIcon />
            </button>)}
          </div>
        );
      })}
    </div>
  );
}

export default Questions;
