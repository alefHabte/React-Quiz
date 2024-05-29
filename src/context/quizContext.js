/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const quizContext = createContext();
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

function QuizProvider({ children }) {
  useEffect(() => {
    fetch("https://alefhabte.github.io/Quiz-Data/questions.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
        //
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const [
    { questions, status, index, chosenOption, points, highScore, setTimer },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numberOfQuestion = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  return (
    <quizContext.Provider
      value={{
        questions,
        status,
        index,
        chosenOption,
        points,
        highScore,
        setTimer,
        maxPoints,
        numberOfQuestion,
        dispatch,
      }}
    >
      {children}
    </quizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(quizContext);
  if (context === undefined) {
    throw new Error("quiz context must be used within the context provider");
  }
  return context;
}
export { useQuiz, QuizProvider };
