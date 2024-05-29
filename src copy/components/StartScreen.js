function StartScreen({ numberOfQuestion, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numberOfQuestion} Questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "showQuestion" });
        }}
      >
        Start button
      </button>
    </div>
  );
}

export default StartScreen;
