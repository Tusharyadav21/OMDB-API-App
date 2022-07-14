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

	const reduxData = useSelector((state) => state.Card);

	const [firstTab, setFirstTab] = useState(true);
	const [name, setName] = useState("");
	const [year, setYear] = useState("");
	const [loading, setLoading] = useState(null);
	const [showPagination, setShowPagination] = useState(false);
	const [data, setData] = useState([]);

	const totalResults = useRef(1);
	const pageCount = useRef(1);

	const check = () => {
		setLoading(true);
		setName(name.trim().toLowerCase());
		let flag = false;
		if (name) {
			// eslint-disable-next-line array-callback-return
			reduxData.find((element) => {
				// Find Data in Redux Store
				if (element.name === name + year + pageCount.current) {
					flag = true; // Set flag to true to indicate data is available in redux store.
					const result = element.result;
					const x = result.totalResults / 10; // Calc Total Number of pages.
					totalResults.current = x >= parseInt(x) ? parseInt(x) + 1 : parseInt(x);
					setData(result);
					setShowPagination(true);
					setLoading(false);
					// console.log(element.result);
					return element.result;
				}
			});
			if (!flag) {
				// Fetch only if data is not available in redux Store
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
		pageCount.current = 1; // Set Page 1
		check(); // Submit Button
	};

	const handleNext = () => {
		if (pageCount.current < totalResults.current) {
			pageCount.current += 1; // Set next Page
			check(); // Next Button
		}
	};
	const handlePrev = () => {
		if (pageCount.current > 1) {
			pageCount.current -= 1; // Set  prev Page
			check(); // Prev Button
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
