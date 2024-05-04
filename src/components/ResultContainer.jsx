function ResultContainer({ score, setGetData }) {
  if (score === undefined || score === null || isNaN(score)) {
    return (
      <div className="container rcon">
        <h2>Please fill all the fields</h2>
        <button className="back" type="button" onClick={() => setGetData(true)}>
          Back
        </button>
      </div>
    );
  } else {
    return (
      <div className="container rcon">
        <h2>Your tentative SGPA is:</h2>
        <h3>{score}</h3>
        <button className="back" type="button" onClick={() => setGetData(true)}>
          Back
        </button>
      </div>
    );
  }
}

export default ResultContainer;
