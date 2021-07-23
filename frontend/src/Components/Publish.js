import React from "react";
import Questions from "./Questions";
import "./Publish.css";

function Publish({ quiz ,handleBack}) {
  const publishQuiz = () => { 
    let requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: quiz.name,
        created_by: quiz.created_by,
        category: quiz.category,
        difficulty: quiz.difficulty,
        questions: quiz.questions,
        pass_percentage: quiz.pass_percentage,
        no_of_questions: quiz.no_of_questions,
      }),
    };
      fetch("/quizes/save-quiz", requestOptions)
        .then((response) => {
          if (response.ok) {
            handleBack()
            return response.json();
          }
          return null;
        });
    }
  return (
    <div className='publish'>
      <div className='preview'>
        <h1>Preview</h1>
        <h2>About</h2>
        <div className='about'>
          <span className='title'>Quiz name :</span>
          <span>{quiz.name}</span>
          <span className='title'>Created by :</span>
          <span>{quiz.created_by}</span>
          <span className='title'>Number of Questions :</span>
          <span>{quiz.no_of_questions}</span>
          <span className='title'>Category :</span>
          <span>{quiz.category}</span>
          <span className='title'>Difficulty :</span>
          <span>{quiz.difficulty}</span>
          <span className='title'>Pass percentage :</span>
          <span>{quiz.pass_percentage}%</span>
        </div>
        <Questions quiz={quiz} />
        {quiz.questions.length === quiz.no_of_questions && (
          <button className='btn-publish' onClick={publishQuiz}>Publish</button>
        )}
      </div>
    </div>
  );
}

export default Publish;
