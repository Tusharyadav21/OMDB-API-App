import { useRef, useState } from "react";
import FirstTab from "./component/firstTab/FirstTab";
import SecondTab from "./component/secondTab/SecondTab";
import ScrollButton from "./component/scrollButton/ScrollButton";

import { useDispatch, useSelector } from "react-redux";
import { add } from "./component/store/cardSlice";

import styles from "./App.module.css";
import Loader from "./component/loader/Loader";

function App() {
	const dispatch = useDispatch();

	const reduxData = useSelector((state) => [...state.Card]);

	const [firstTab, setFirstTab] = useState(true);
	const [name, setName] = useState("");
	const [year, setYear] = useState("");
	const [loading, setLoading] = useState(null);
	const [showPagination, setShowPagination] = useState(false);
	const [data, setData] = useState([]);

	const totalResults = useRef(1);
	const pageCount = useRef(1);

	// const checkRedux = () => {
	// reduxData.forEach((element) => {
	// 	if (name + year + pageCount.current in element) {
	// 		// (Object.values(element)[0]);
	// 		console.log(true);
	// 		var flag = true;
	// 		return true;
	// 	}
	// 	if (flag === true) {
	// 		return true;
	// 	}
	// });
	// 	reduxData.find((e) => {
	// 		console.log(Object.keys(e)[0]);
	// 		console.log(name + year + pageCount.current);
	// 		console.log(Object.keys(e)[0] === name + year + pageCount.current);
	// 	});
	// };

	// const newFetch = () => {
	// 	if (!checkRedux()) {
	// 		fetchData();
	// 	}
	// };
	// console.log(reduxData);

	// const checkRedux = (e) => e.name === name + year + pageCount.current;
	// reduxData.some(checkRedux);

	// Working

	const check = () => {
		setName(name.trim().toLowerCase());
		let flag = false;
		if (name) {
			reduxData.find((element) => {
				if (element.name === name + year + pageCount.current) {
					flag = true;
					const result = element.result;
					const x = result.totalResults / 10;
					totalResults.current = x >= parseInt(x) ? parseInt(x) + 1 : parseInt(x);
					setData(result);
					setShowPagination(true);
					// console.log(element.result);
					return element.result;
				}
			});
			if (!flag) {
				fetchData(); // FetchData Here...
			}
		}
	};

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`http://www.omdbapi.com/?s=${name.trim()}&y=${year}&page=${
					pageCount.current
				}&apikey=a94a9229`
			);
			const result = await response.json();
			const x = result.totalResults / 10;
			totalResults.current = x >= parseInt(x) ? parseInt(x) + 1 : parseInt(x);
			dispatch(add({ name: name + year + pageCount.current, result: result }));
			setData(result);
			setShowPagination(true);
		} catch (err) {
			console.log("Error: " + err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		pageCount.current = 1;
		check();
	};

	const handleNext = () => {
		if (pageCount.current < totalResults.current) {
			pageCount.current += 1;
			check();
		}
	};
	const handlePrev = () => {
		if (pageCount.current > 1) {
			pageCount.current -= 1;
			check();
		}
	};

	return (
		<>
			<div className={styles.nav_container}>
				<button id={styles.Heading}>OMDB API APP</button>
				<div>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							placeholder='Movie Name (Required)'
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						<input
							type='number'
							placeholder='Movie Year (Optional)'
							value={year}
							onChange={(e) => {
								setYear(e.target.value);
							}}
						/>
						<input id={styles.submitBtn} type='submit' value='Search' />
					</form>
				</div>
			</div>
			<div>
				<div className={styles.Tab}>
					<button
						className={`${firstTab ? styles.active : ""} `}
						onClick={() => {
							setFirstTab(true);
							pageCount.current = 1;
							fetchData();
						}}
					>
						Details
					</button>
					<button
						className={`${firstTab ? "" : styles.active}`}
						onClick={() => {
							setFirstTab(false);
							pageCount.current = 1;
							fetchData();
						}}
					>
						Posters
					</button>
				</div>
				{loading ? <Loader /> : firstTab ? <FirstTab data={data} /> : <SecondTab data={data} />}
				{loading ? null : data.Response === "False" ? (
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
						<h2>{data.Error}</h2>
					</div>
				) : null}
				{!showPagination ? null : !isNaN(totalResults.current) ? (
					<div className={styles.pagination}>
						<div>
							Page <span>{pageCount.current}</span> of {totalResults.current} {"  "}
						</div>
						<div>
							<button onClick={handlePrev}>Prev</button>
							<button onClick={handleNext}>Next</button>
						</div>
					</div>
				) : null}
				<ScrollButton />
			</div>
		</>
	);
}

export default App;
