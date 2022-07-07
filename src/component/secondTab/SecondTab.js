import React, { useRef, useState } from "react";
import { BounceLoader } from "react-spinners";
import styles from "./secondTab.module.css";

const SecondTab = () => {
	const [name, setName] = useState("");
	const [year, setYear] = useState("");
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(0);
	const [showPagination, setShowPagination] = useState(false);
	const totalResults = useRef(0);
	const pageCount = useRef(1);

	const fetchData = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`http://www.omdbapi.com/?s=${name}&y=${year}&page=${pageCount.current}&apikey=a94a9229`
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
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Movie Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type='number'
					placeholder='Movie Year (Optional)'
					value={year}
					onChange={(e) => setYear(e.target.value)}
				/>
				<input type='submit' value='Search' />
			</form>

			{loading ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "300px",
					}}
				>
					<BounceLoader color='#f5c518' />
				</div>
			) : (
				<div className={styles.cardContainer}>
					{data.Search?.map((el, i) => (
						<div key={i} className={styles.card}>
							<div className={styles.card_img}>
								<img
									src={el.Poster !== "N/A" ? el.Poster : require("../../assets/default_poster.jpg")}
									alt={el.Title}
								/>
							</div>
							<div className={styles.card_body}>
								<h3>{el.Title}</h3>
								<p>
									{el.Year} , <span>{el.Type[0].toUpperCase() + el.Type.substring(1)}</span>
								</p>
							</div>
						</div>
					))}
				</div>
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
		</div>
	);
};

export default SecondTab;
