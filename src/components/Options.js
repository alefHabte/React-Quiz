function Options({ question, dispatch, chosenOption }) {
  const selectedOption = chosenOption !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            index === chosenOption ? "answer" : ""
          } ${
            selectedOption
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => {
            dispatch({ type: "showCorrectOption", payload: index });
          }}
          disabled={selectedOption}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
