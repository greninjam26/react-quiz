// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

const initialState = {
	questions: [],
	status:
		// "loading", "error", "ready", "active", "finished"
		"loading",
};

function reducer(state, action) {
	switch (action.type) {
		case "dataRecived":
			return { ...state, questions: action.payLoad, status: "ready" };
		case "dataFailed":
			return { ...state, status: error };
		default:
			throw new Error("Action Unknown");
	}
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

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
				<p>1/15</p>
				<p>Questions?</p>
			</Main>
		</div>
	);
}
