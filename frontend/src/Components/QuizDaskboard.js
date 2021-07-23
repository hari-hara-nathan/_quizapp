import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

function QuizDaskboaurd({ quiz, handleChange }) {
  let options = [
    "General Knowledge",
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
    "Entertainment: Musicals & Theatres",
    "Entertainment: Television",
    "Entertainment: Video Games",
    "Entertainment: Board Games",
    "Science & Nature",
    "Science: Computers",
    "Science: Mathematics",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebrities",
    "Animals",
    "Vehicles",
    "Entertainment: Comics",
    "Science: Gadgets",
    "Entertainment: Japanese Anime & Manga",
    "Entertainment: Cartoon & Animations",
  ];

  return (
    <form
      className='Quizdaskboard'
      onChange={(event) => {
        console.log(quiz);
        console.log(options);
        handleChange(event.target.id, event.target.value);
      }}>
      <h2>Quiz daskboard</h2>
      <InputLabel htmlFor='name'>Quiz name</InputLabel>
      <TextField id='name' value={quiz.name} variant='outlined' />

      <InputLabel htmlFor='author'>Created by</InputLabel>
      <TextField id='author' value={quiz.created_by} variant='outlined' />
      <br></br>
      <InputLabel htmlFor='dropdown'>Difficulty</InputLabel>
      <Select
        className='dropdown'
        value={quiz.difficulty}
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
        value={quiz.category}
        onChange={(event) => {
          console.log(options);
          handleChange("category", event.target.value);
        }}
        variant='outlined'>
        {options &&
          options.map((ele) => {
            return <MenuItem value={ele}>{ele}</MenuItem>;
          })}
      </Select>
      <InputLabel htmlFor='no_of_question'>Number of question</InputLabel>
      <TextField
        id='no_of_question'
        value={quiz.no_of_questions}
        type='number'
        variant='outlined'
        inputProps={{max:'15'}}
      />
      <InputLabel htmlFor='pass_percentage'>Pass percentage</InputLabel>
      <TextField
        id='pass_percentage'
        value={quiz.pass_percentage}
        type='number'
        variant='outlined'
        max='100'
      />
    </form>
  );
}

export default QuizDaskboaurd;
