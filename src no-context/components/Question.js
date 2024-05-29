import Options from "./Options";

function Question({ question, dispatch, chosenOption }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        chosenOption={chosenOption}
        question={question}
        dispatch={dispatch}
      />
    </div>
  );
}

export default Question;
