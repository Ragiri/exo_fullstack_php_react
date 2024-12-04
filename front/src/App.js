import React, { useState, useEffect } from "react";

import Question from "./Question";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [started, setStarted] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [limit, setLimit] = useState("5");

  const fetchQuestions = async () => {
    const response = await fetch(
      `https://the-trivia-api.com/v2/questions?limit=${limit}&difficulties=${difficulty}`
    );

    const questions = await response.json();
    setStarted(true);
    setQuestions(questions);
    setCurrentQuestion(0);

    console.log(questions);
  };

  const nextQuestion = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (currentQuestion < questions.length - 1)
      setCurrentQuestion(currentQuestion + 1);
    else setShowResult(true);
  };

  const resetQuiz = () => {
    setShowResult(false);
    setStarted(false);
    setScore(0);
  };

  useEffect(() => {}, []);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Quiz</h1>
      </div>

      <div className="App-content">
        {!started && (
          <div>
            <select
              id="difficulty"
              onChange={(e) => setDifficulty(e.target.value)}
              value={difficulty}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <select
              id="limit"
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
            <button onClick={fetchQuestions}>Start Quiz</button>
          </div>
        )}
        {started && questions.length > 0 && !showResult && (
          <Question
            question={questions[currentQuestion]}
            nextQuestion={nextQuestion}
          />
        )}
        {showResult && (
          <div>
            <h1>Your score: {score}</h1>
            <button onClick={resetQuiz}>Reset Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
