import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { InputLabel } from "@material-ui/core";

function CreateQuestion({ quiz, handlePush }) {
  const [question, setQuestion] = useState("");
  const [correct_answer, setCorrect] = useState(null);
  const [wrong_answer1, setWrong1] = useState("");
  const [wrong_answer2, setWrong2] = useState("");
  const [wrong_answer3, setWrong3] = useState("");
  const handleAdd = (event) => {
    handlePush("push_question", {
      question,
      correct_answer,
      incorrect_answers: [wrong_answer1, wrong_answer2, wrong_answer3],
    });
    setQuestion("");
    setWrong1("");
    setWrong2("");
    setCorrect("");
    setWrong3("");
  };
  const handleChange = (event) => {
    let value = event.target.value;
    switch (event.target.id) {
      case "question":
        setQuestion(value);
        break;
      case "wrong_answer1":
        setWrong1(value);
        break;
      case "wrong_answer2":
        setWrong2(value);
        break;
      case "wrong_answer3":
        setWrong3(value);
        break;
      case "correct_answer":
        setCorrect(value);
        break;
    }
  };
  if (quiz.no_of_questions <= quiz.questions.length) {
    return <div className='warning'>
      <p>You already reach your question count,To add more question change Number of question in Quiz daskboard</p>
    </div>;
  } else {
    return (
      <div className='create-question'>
        <h2>Question {quiz.questions.length + 1}</h2>
        <InputLabel htmlFor='question'>Question</InputLabel>
        <TextField
          id='question'
          variant='outlined'
          autoFocus
          multiline
          type='text'
          value={question}
          rowsMax={3}
          inputProps={{ maxlength: "150" }}
          onChange={handleChange}
        />
        <h3>Correct answer</h3>
        <InputLabel htmlFor='correct_answer'>Correct answer</InputLabel>
        <TextField
          id='correct_answer'
          value={correct_answer}
          variant='outlined'
          inputProps={{ maxlength: "16" }}
          onChange={handleChange}
        />
        <h3>Wrong answers</h3>

        <InputLabel htmlFor={`wrong_answer1`}>Wrong answer 1</InputLabel>
        <TextField
          id={`wrong_answer1`}
          variant='outlined'
          value={wrong_answer1}
          inputProps={{ maxlength: "16" }}
          onChange={handleChange}
        />
        <InputLabel htmlFor={`wrong_answer2`}>Wrong answer 2</InputLabel>
        <TextField
          id={`wrong_answer2`}
          variant='outlined'
          value={wrong_answer2}
          inputProps={{ maxlength: "16" }}
          onChange={handleChange}
        />
        <InputLabel htmlFor={`wrong_answer1`}>Wrong answer 3</InputLabel>
        <TextField
          id={`wrong_answer3`}
          variant='outlined'
          value={wrong_answer3}
          inputProps={{ maxlength: "16" }}
          onChange={handleChange}
        />

        <button className='btn btn-add' onClick={handleAdd}>
          Add
      </button>
      </div>
    )
  };
}

export default CreateQuestion;
