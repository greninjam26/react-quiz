// import DateCounter from "./DateCounter";
import { useEffect } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../context/QuizContext";

export default function App() {
	const { status, dispatch } = useQuiz();

	useEffect(
		function () {
			fetch("http://localhost:8000/questions")
				.then(resp => resp.json())
				.then(data => dispatch({ type: "dataRecived", payLoad: data }))
				.catch(err => dispatch({ type: "dataFailed" }));
		},
		[dispatch]
	);

	return (
		<div className="app">
			<Header />
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && <StartScreen />}
				{status === "active" && (
					<>
						<Progress />
						<Questions />
						<Footer>
							<Timer />
							<NextButton />
						</Footer>
					</>
				)}
				{status === "finished" && <FinishScreen />}
			</Main>
		</div>
	);
}
