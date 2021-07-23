import React, { useState, useEffect } from "react";
import "./Testbox.css";

function Testbox(props) {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [no, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [selected_answer, setSelectedanswer] = useState(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showResult, setResult] = useState(false);
  const [questions, setQuestions] = useState(props.quiz.questions);

  const start = () => {
    run();
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    clearInterval(interv);
  };

  const handleNext = (e) => {
    setNumber(no + 1);
    setShowCorrect(false);
    setDisabled(false);
    if (no === questions.length - 1) {
      setShowSubmit(true);
    }
  };
  const handleSubmit = (e) => {
    stop();
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quiz_id: props.quiz.quiz_id,
        username: props.user,
        score: score,
        duration: time.m,
      }),
    };
    fetch("/result/save-result", requestOption).then((response) => {
      if (response.ok) {
        console.log("submitted");
        setResult(true);
      }
    });
  };

  const computeAnswer = (ele, correct_answer) => {
    setSelectedanswer(ele);
    if (ele === correct_answer) {
      setScore(score + 1);
    } else {
      setShowCorrect(true);
    }
  };
  const getClass = (ele, correct_answer) => {
    if (selected_answer === ele) {
      if (selected_answer === correct_answer) {
        return "correct";
      } else {
        return "wrong";
      }
    } else if (ele === correct_answer && showCorrect) {
      return "correct";
    }
  };
  useEffect(() => {
    start();
  }, []);

  if (!showResult) {
    return (
      <div className='testbox'>
        <div className='test-container'>
          <div className='container-top'>
            <span className='score'>Score:{score}</span>
            <div className='timer'>
              <span>{time.m >= 10 ? time.m : "0" + time.m}</span>
              &nbsp;:&nbsp;
              <span>{time.s >= 10 ? time.s : "0" + time.s}</span>
              &nbsp;
            </div>
          </div>
          <div className='question-box'>
            <p className='test-question'>
              {questions[no] && questions[no].text}
            </p>
            <div className='test-options'>
              {questions[no] &&
                questions[no].options.map((ele) => {
                  return (
                    <button
                      value={ele}
                      className={getClass(ele, questions[no].correct_answer)}
                      onClick={(e) => {
                        setDisabled(true);
                        computeAnswer(ele, questions[no].correct_answer);
                      }}
                      disabled={disabled}>
                      {ele}
                    </button>
                  );
                })}
            </div>
          </div>
          <button
            onClick={no === questions.length - 1 ? handleSubmit : handleNext}
            className='btn-next'>
            {no === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='test-result'>
        <div className='result-container'>
          <h1>{props.quiz.name}</h1>
          <div className='body'>
            <span>Name :</span>
            <span>{"hari"}</span>
            <span>Score :</span>
            <span>{score}</span>
            <span>Status :</span>
            <span>
              {score * 10 < parseInt(props.quiz.pass_percentage)
                ? "Fail"
                : "Pass"}
            </span>
            <span>Duration :</span>
            <span>
              <span>{time.m >= 10 ? time.m : "0" + time.m}</span>
              &nbsp;:&nbsp;
              <span>{time.s >= 10 ? time.s : "0" + time.s}</span>
              &nbsp;
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Testbox;
