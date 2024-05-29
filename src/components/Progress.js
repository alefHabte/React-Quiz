import { useQuiz } from "../context/quizContext";

function Progress() {
  const { index, numberOfQuestion, points, maxPoints, chosenOption } =
    useQuiz();
  return (
    <header className="progress">
      <progress
        value={index + Number(chosenOption != null)}
        max={numberOfQuestion}
      />
      <p>
        Question <strong>{index}</strong> /{numberOfQuestion}
      </p>
      <p>
        <strong>{points}</strong> /{maxPoints}
      </p>
    </header>
  );
}

export default Progress;
