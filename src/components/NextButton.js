function NextButton({ chosenOption, dispatch, index, numberOfQuestions }) {
  if (chosenOption === null) return null;
  if (index + 1 === numberOfQuestions) {
    return (
      <button
        className="btn ui"
        onClick={() => dispatch({ type: "finishQuestion" })}
      >
        Finished
      </button>
    );
  } else
    return (
      <button
        className="btn ui"
        onClick={() => dispatch({ type: "NextQuestion" })}
      >
        Next
      </button>
    );
}

export default NextButton;
