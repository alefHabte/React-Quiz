import { useEffect, useReducer } from "react";
import Header from "./Header";
import main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // loading, ready, error, active, finished
  status: "loading",
  index: 0,
  chosenOption: null,
  points: 0,
  highScore: 0,
  setTimer: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataFailed":
      return { ...state, status: "error" };
    case "showQuestion":
      return {
        ...state,
        status: "active",
        setTimer: state.questions.length * SEC_PER_QUESTION,
      };
    case "showCorrectOption":
      const question = state.questions.at(state.index);
      const isCorrectQuestion = action.payload === question.correctOption;

      return {
        ...state,
        chosenOption: action.payload,
        points: isCorrectQuestion
          ? state.points + question.points
          : state.points,
      };

    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "NextQuestion":
      return { ...state, index: state.index + 1, chosenOption: null };
    case "finishQuestion":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "RestartQuiz":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tik":
      return {
        ...state,
        setTimer: state.setTimer - 1,
        status: state.setTimer === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Invalid Action");
  }
}

function App() {
  const [
    { questions, status, index, chosenOption, points, highScore, setTimer },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestion = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
        //
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />{" "}
      <main>
        {status === "finished" && (
          <FinishedScreen
            maxPoints={maxPoints}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestion={numberOfQuestion}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numberOfQuestions={numberOfQuestion}
              points={points}
              maxPoints={maxPoints}
              chosenOption={chosenOption}
            />
            <Question
              chosenOption={chosenOption}
              dispatch={dispatch}
              question={questions[index]}
            />
            <footer>
              <Timer setTimer={setTimer} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                chosenOption={chosenOption}
                index={index}
                numberOfQuestions={numberOfQuestion}
              />
            </footer>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
