import React, { useState, useEffect } from "react";

import Question from "./Question";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const fetchQuestions = async () => {
    const response = await fetch(
      "https://the-trivia-api.com/v2/questions?limit=5"
    );

    const questions = await response.json();
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
    setScore(0);
    fetchQuestions();
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Quiz</h1>
        <h2>Your score: {score}</h2>
      </div>

      <div className="App-content">
        {questions.length > 0 && !showResult && (
          <Question
            question={questions[currentQuestion]}
            nextQuestion={nextQuestion}
          />
        )}
        {showResult && <button onClick={resetQuiz}>Reset Quiz</button>}
      </div>
    </div>
  );
};

export default App;
