import { useRef, useState } from "react";
import FirstTab from "./component/firstTab/FirstTab";
import SecondTab from "./component/secondTab/SecondTab";
import ScrollButton from "./component/scrollButton/ScrollButton";

import styles from "./App.module.css";

function App() {
	const [firstTab, setFirstTab] = useState(true);
	const [name, setName] = useState("");
	const [year, setYear] = useState("");
	const [loading, setLoading] = useState(null);
	const [showPagination, setShowPagination] = useState(false);
	const [data, setData] = useState([]);

	const totalResults = useRef(1);
	const pageCount = useRef(1);

	const fetchData = async () => {
		setName(name.trim());
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

			setData(result);
			setShowPagination(true);
		} catch (err) {
			console.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchData();
	};

	const handleNext = () => {
		if (pageCount.current < totalResults.current) {
			pageCount.current += 1;
			fetchData();
		}
	};
	const handlePrev = () => {
		if (pageCount.current > 1) {
			pageCount.current -= 1;
			fetchData();
		}
	};

	return (
		<div className={styles.container}>
			<h1 id={styles.Heading}>OMDB API APP</h1>
			<div className={styles.buttons}>
				<button
					className={`${firstTab ? styles.active : ""} `}
					onClick={() => {
						setFirstTab(true);
					}}
				>
					First Tab
				</button>
				<button
					className={`${firstTab ? "" : styles.active}`}
					onClick={() => {
						setFirstTab(false);
					}}
				>
					Second Tab
				</button>
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='Movie Name'
						value={name}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<input
						type='number'
						placeholder='Movie Year (Optional)'
						value={year}
						onChange={(e) => setYear(e.target.value)}
					/>
					<input type='submit' value='Search' />
				</form>
			</div>
			{firstTab ? (
				<FirstTab loading={loading} data={data} />
			) : (
				<SecondTab loading={loading} data={data} />
			)}
			{showPagination ? (
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
	);
}

export default App;
