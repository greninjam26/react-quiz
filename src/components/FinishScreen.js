import { useQuiz } from "../context/QuizContext";

function FinishScreen() {
	const { points, totalPoints, highscore, dispatch } = useQuiz();
	const precentage = (points / totalPoints) * 100;

	let emoji;
	if (precentage === 100) emoji = "🥇";
	else if (precentage >= 80) emoji = "🎉";
	else if (precentage >= 50) emoji = "🙃";
	else if (precentage > 0) emoji = "🤔";
	else if (precentage === 0) emoji = "🤦";

	return (
		<>
			<p className="result">
				<span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
				{totalPoints} ({Math.ceil(precentage)}%)
			</p>
			<p className="highscore">(Highscore: {highscore} points)</p>
			<button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
				Restart Quiz
			</button>
		</>
	);
}

export default FinishScreen;
