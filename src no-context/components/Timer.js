import { useEffect } from "react";

function Timer({ setTimer, dispatch }) {
  const min = Math.floor(setTimer / 60);
  const sec = setTimer % 60;
  useEffect(() => {
    const timeInt = setInterval(() => {
      dispatch({ type: "tik" });
    }, 1000);

    return () => clearInterval(timeInt);

    // setInterval(setTimer, 1000);
  }, [dispatch]);
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
