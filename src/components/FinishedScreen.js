import { useQuiz } from "../context/quizContext";

function FinishedScreen() {
  const { points, maxPoints, highScore, dispatch } = useQuiz();
  let emoji = "❌";
  const percentage = (points / maxPoints) * 100;

  if (percentage > 90) emoji = "🎖️";
  if (percentage > 70) emoji = "🥈";
  if (percentage > 50) emoji = "🥉";
  if (percentage < 50) emoji = "😭";

  return (
    <>
      <p className="result">
        {"    "}
        <span>{emoji}</span>
        You have finished with {points} from {maxPoints} (
        {Math.ceil(percentage)}
        %)
        {"  "}
      </p>
      <p className="highscore">(HighScore: {highScore})</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "RestartQuiz" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
