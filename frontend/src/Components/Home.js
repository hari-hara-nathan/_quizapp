import React, { useState, useEffect } from "react";
import Header from "./Header";
import CreateQuiz from "./CreateQuiz";
import Quizes_list from "./Quizes_list";
import Testbox from "./Testbox"
import Result from './Result'
import "./Home.css";

function Home(props) {
  const [username, setUser] = useState(null);
  const [is_admin, setStatus] = useState(false);
  const [showCreateQuiz, setshowCreateQuiz] = useState(false);
  const [quiz_name, setQuizName] = useState("");
  const [showtestBox, SetShowTestBox] = useState(false);
  const [quiz_id, setQuiz_id] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [quizes_details, setQuizes] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const [showResult,setshowResult]=useState(false)

  const handleLogout = () => {
    fetch("./account/logout").then((response) => {
      setUser(null);
    });
  };

  const handleShowQuiz = () => {
    if (quiz_name !== "") {
      setshowCreateQuiz(!showCreateQuiz);
    }
  };

  const handleBack = () => {
    setQuizName("");
    setshowCreateQuiz(false);
    SetShowTestBox(false)
    setshowResult(false)
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleQuizDelete = (id) => {
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quiz_id: id }),
    };
    fetch("/quizes/delete-quiz", requestOption)
      .then((response) => response.json())
      .then((data) => {
        handleRefresh();
      });
  };

  const handleTest = (id) => {
       const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz_id: id }),
      };
      async function fetchquiz() {
        let response = await fetch("/quizes/take-quiz", requestOption)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return null;
          })
          .then((data) => {
            if (data !== null) {
              setQuiz(data);
              SetShowTestBox(true);
            }
          });
    }
    fetchquiz();
  };

  const handleShowResult = (id) => {
    setQuiz_id(id)
    setshowResult(true)
   }

  useEffect(() => {
    fetch("./account/get-user")
      .then((response) => response.json())
      .then((data) => {
        if (data.username != null) {
          setUser(data.username);
          setStatus(data.is_admin);
        } else {
          props.history.push("/login");
        }
      });
  }, [username]);

  useEffect(() => {
    async function fetchQuizes() {
      let response = await fetch("/quizes/get-quizes")
        .then((response) => response.json())
        .then((data) => {
          setQuizes(data);
        });
    }
    fetchQuizes();
  }, [showCreateQuiz,showtestBox,refresh]);

  let callBack = {
    handleLogout,
    handleBack: handleBack,
    showBack: showCreateQuiz || showtestBox ||showResult,
  };

  return (
    <div className='home'>
      <Header {...callBack} />
      {is_admin && (
        <div className='wrapper'>
          <input
            value={quiz_name}
            type='text'
            placeholder='Title for your quiz'
            onChange={(event) => {
              setQuizName(event.target.value);
            }}
          />
          <button onClick={handleShowQuiz}>+New quiz</button>
        </div>
      )}
      {showCreateQuiz && (
        <CreateQuiz
          user={username}
          quiz_name={quiz_name}
          handleBack={handleBack}
        />
      )}
      <h1>Quizes</h1>
      <Quizes_list
        is_admin={is_admin}
        quizes_details={quizes_details}
        handleQuizDelete={handleQuizDelete}
        handleTest={handleTest}
        handleRefresh={handleRefresh}
        handleResult={handleShowResult}
      />
      {showtestBox && <Testbox quiz={quiz} user={username}/>}
      {showResult && <Result id={quiz_id}/>}

    </div>
  );
}

export default Home;
