import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function ImportQuestion({ quiz, handlePush }) {
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState(9);
  const [options, setOptions] = useState([]);
  const [no_of_questions, setNoofQuestion] = useState(
    quiz.no_of_questions - quiz.questions.length,
  );
  const [maxvalue, setMaxvalue] = useState(
    quiz.no_of_questions - quiz.questions.length,
  );
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data.trivia_categories);
      });
    setNoofQuestion(quiz.no_of_questions - quiz.questions.length);
  }, []);
  
  useEffect(() => {
    setMaxvalue(quiz.no_of_questions - quiz.questions.length);
    setNoofQuestion(quiz.no_of_questions - quiz.questions.length);
   },[quiz.questions.length])
  const handleChange = (type, value) => {
    switch (type) {
      case "difficulty":
        setDifficulty(value);
        break;
      case "no_of_questions":
        setNoofQuestion(value);
        break;
      case "category":
        setCategory(value);
        break;
    }
  };
  const handleImport = () => {
    fetch(
      `https://opentdb.com/api.php?amount=${no_of_questions}&category=${category}&difficulty=${difficulty}&type=multiple`,
    )
      .then((response) => response.json())
      .then((data) => {
        data.results.map((ele) => {
          handlePush("push_question", {
            question: ele.question,
            correct_answer: ele.correct_answer,
            incorrect_answers: ele.incorrect_answers,
          });
        });
      });
  };
  if (quiz.no_of_questions <= quiz.questions.length) {
    return <div className='warning'>
      <p>You already reach your question count,To add more question change Number of question in Quiz daskboard</p>
    </div>;
  } else {
    return (
      <div className='importquestion'>
        <h2>Import Questions</h2>
        <InputLabel htmlFor='no_of_questions'>Number of Questions</InputLabel>
        <TextField
          id='no_of_questions'
          value={no_of_questions}
          type='number'
          variant='outlined'
          onChange={(event) => {
            handleChange("no_of_questions", event.target.value);
          }}
          inputProps={{
            max: `${maxvalue}`,
          }}
        />
        <InputLabel htmlFor='dropdown'>Difficulty</InputLabel>
        <Select
          className='dropdown'
          value={difficulty}
          onChange={(event) => {
            handleChange("difficulty", event.target.value);
          }}
          variant='outlined'>
          <MenuItem value={"easy"}>Easy</MenuItem>
          <MenuItem value={"medium"}>Medium</MenuItem>
          <MenuItem value={"hard"}>Hard</MenuItem>
        </Select>
        <br />
        <InputLabel htmlFor='category'>Category</InputLabel>
        <Select
          className='category'
          value={category}
          variant='outlined'
          onChange={(event) => {
            handleChange("category", event.target.value);
          }}>
          {options.map((ele) => {
            return <MenuItem value={ele.id}>{ele.name}</MenuItem>;
          })}
        </Select>
        <br />
        <button className='btn btn-import' onClick={handleImport}>
          Import
        </button>
      </div>
    );
  }
}

export default ImportQuestion;
