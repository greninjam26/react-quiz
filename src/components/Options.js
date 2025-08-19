import { useQuiz } from "../context/QuizContext";

function Options() {
	const { questions, index, dispatch, answer } = useQuiz();
	const hasAnswered = answer !== null;

	return (
		<div className="options">
			{questions[index].options.map((option, i) => (
				<button
					className={`btn btn-option ${i === answer ? "answer" : ""} ${
						hasAnswered
							? i === questions[index].correctOption
								? "correct"
								: "wrong"
							: ""
					}`}
					key={option}
					disabled={hasAnswered}
					onClick={() => dispatch({ type: "newAnswer", payLoad: i })}
				>
					{option}
				</button>
			))}
		</div>
	);
}

export default Options;
