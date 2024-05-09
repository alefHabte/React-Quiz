function FinishedScreen({ points, maxPoints, highScore }) {
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
    </>
  );
}

export default FinishedScreen;
