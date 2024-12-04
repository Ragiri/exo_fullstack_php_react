import React, { useState, useEffect } from "react";

const Question = (props) => {
  const [selected, setSelected] = useState(null); // TODO select an answer
  const answers = [props.question.correctAnswer, ...props.question.incorrectAnswers].sort(
		(a, b) => (a < b ? -1 : 1)
	);
  const [validate, setValidate] = useState(false);

  const handleClick = () => {
    if (validate) {
			setValidate(false)
			setSelected(null)
      props.nextQuestion(selected === props.question.correctAnswer);
    } else {
			setValidate(true)
		}
  };

  return (
    <div className="question-container">
      <h2>{props.question?.question.text}</h2>
      <div className="question-answers">
        {answers.map((v) => (
          <div>
            <p
              className={v === selected ? "selected" : ""}
              onClick={() => {
								if (!validate)
                	setSelected(v);
              }}
							style={validate ? v === props.question.correctAnswer ? {color: 'green'} : {color: 'red'} : {}}
            >
              {v}
            </p>
          </div>
        ))}
      </div>
      <button onClick={handleClick}>
        {validate ? "Next Question" : "Validate"}
      </button>
    </div>
  );
};

export default Question;
