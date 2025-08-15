// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
	questions: [],
	status:
		// "loading", "error", "ready", "active", "finished"
		"loading",
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
};

function reducer(state, action) {
	switch (action.type) {
		case "dataRecived":
			return { ...state, questions: action.payLoad, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return { ...state, status: "active" };
		case "newAnswer":
			const question = state.questions.at(state.index);
			return {
				...state,
				answer: action.payLoad,
				points:
					action.payLoad === question.correctOption
						? state.points + question.points
						: state.points,
			};
		case "nextQuestion":
			return { ...state, index: state.index + 1, answer: null };
		case "finish":
			return {
				...state,
				status: "finished",
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
		default:
			throw new Error("Action Unknown");
	}
}

export default function App() {
	const [{ questions, status, index, answer, points, highscore }, dispatch] =
		useReducer(reducer, initialState);

	const numQuestions = questions.length;
	const totalPoints = questions.reduce((sum, question) => (sum += question.points), 0);

	useEffect(function () {
		fetch("http://localhost:8000/questions")
			.then(resp => resp.json())
			.then(data => dispatch({ type: "dataRecived", payLoad: data }))
			.catch(err => dispatch({ type: "dataFailed" }));
	}, []);

	return (
		<div className="app">
			<Header />
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === "active" && (
					<>
						<Progress
							index={index}
							numQuestions={numQuestions}
							points={points}
							totalPoints={totalPoints}
							answer={answer}
						/>
						<Questions
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						/>
						<NextButton
							dispatch={dispatch}
							answer={answer}
							index={index}
							numQuestions={numQuestions}
						/>
					</>
				)}
				{status === "finished" && (
					<FinishScreen
						points={points}
						totalPoints={totalPoints}
						highscore={highscore}
					/>
				)}
			</Main>
		</div>
	);
}
