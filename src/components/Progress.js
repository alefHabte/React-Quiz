import { useQuiz } from "../context/quizContext";

function Progress() {
  const { index, numberOfQuestions, points, maxPoints, chosenOption } =
    useQuiz();
  return (
    <header className="progress">
      <progress
        value={index + Number(chosenOption != null)}
        max={numberOfQuestions}
      />
      <p>
        Question <strong>{index}</strong> /{numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> /{maxPoints}
      </p>
    </header>
  );
}

export default Progress;
