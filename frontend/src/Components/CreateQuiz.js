import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./CreateQuiz.css";
import Publish from "./Publish";
import CreateQuestion from "./CreateQuestion";
import ImportQuestion from "./ImportQuestion";
import QuizDaskboard from "./QuizDaskboard.js";
import Question from "./Questions";
import HomeIcon from "@material-ui/icons/Home";
import TransformIcon from "@material-ui/icons/Transform";
import TelegramIcon from "@material-ui/icons/Telegram";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {children}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "calc(100vh - 70px)",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: " #ccebff",
    width: "18vw",
    minWidth: "230px",
  },
}));
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function CreateQuiz({ user,quiz_name ,handleBack}) {
  const [value, setValue] = useState(0);
  const [ShowDrop, setShowDrop] = useState(false);
  const classes = useStyles();

  const [createdquiz, setQuiz] = useState({
    name: quiz_name,
    category: "General Knowledge",
    difficulty: "easy",
    no_of_questions: 10,
    pass_percentage: 35,
    created_by: user,
    questions: [],
  });

  const handleChange = (event, newValue) => {
    if (newValue === 1) {
      setShowDrop(true);
    } else if (newValue === 0 || newValue == 4) {
      setShowDrop(false);
    }
    setValue(newValue);
  };

  const handleQuiz = (type, value) => {
    switch (type) {
      case "difficulty":
        setQuiz({ ...createdquiz, difficulty: value });
        break;
      case "no_of_question":
        setQuiz({ ...createdquiz, no_of_questions: value });
        break;
      case "category":
        setQuiz({ ...createdquiz, category: value });
        break;
      case "name":
        setQuiz({ ...createdquiz, name: value });
        break;
      case "author":
        setQuiz({ ...createdquiz, created_by: value });
        break;
      case "pass_percentage":
        setQuiz({ ...createdquiz, pass_percentage: value });
        break;
      case "push_question":
        createdquiz.questions.push(value);
        setQuiz({
          ...createdquiz,
          questions: createdquiz.questions,
        });
        break;
      case "remove_question":
        setQuiz({
          ...createdquiz,
          questions: createdquiz.questions.filter((ele, index) => {
            if (index === value) {
              return false;
            } else {
              return true;
            }
          }),
        });
        break;
    }
  };

  return (
    <div className='create-quiz'>
      <div className={classes.root}>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          className={classes.tabs}
          indicatorColor='primary'>
          <Tab
            label='Quiz Dashboard'
            value={0}
            {...a11yProps(0)}
            icon={<HomeIcon />}
          />
          <Tab
            label='Questions'
            value={1}
            {...a11yProps(1)}
            icon={<TransformIcon />}
          />
          {ShowDrop && (
            <Tab label='Create questions' value={2} {...a11yProps(2)} />
          )}
          {ShowDrop && (
            <Tab label='Import questions' value={3} {...a11yProps(3)} />
          )}
          <Tab
            label='Publish'
            value={4}
            {...a11yProps(4)}
            icon={<TelegramIcon />}
          />
        </Tabs>

        <TabPanel value={value} index={0}>
          <QuizDaskboard quiz={createdquiz} handleChange={handleQuiz} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Question
            quiz={createdquiz}
            handleDelete={handleQuiz}
            ShowDelete={true}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CreateQuestion quiz={createdquiz} handlePush={handleQuiz} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ImportQuestion quiz={createdquiz} handlePush={handleQuiz} />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Publish quiz={createdquiz} handleBack={handleBack}/>
        </TabPanel>
      </div>
    </div>
  );
}

export default CreateQuiz;
