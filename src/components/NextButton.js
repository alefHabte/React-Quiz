import { useQuiz } from "../context/quizContext";

function NextButton() {
  const { chosenOption, dispatch, index, numberOfQuestion } = useQuiz();
  if (chosenOption === null) return null;
  if (index + 1 === numberOfQuestion) {
    return (
      <button
        className="btn btn ui"
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
