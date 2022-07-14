import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import styles from "./modal.module.css";

const Modal = ({ setModal, el }) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});
	const [tab, setTab] = useState("1");

	useEffect(() => {
		setLoading(true);

		fetch(`http://www.omdbapi.com/?i=${el.imdbID}&apikey=a94a9229`)
			.then((response) => response.json())
			.then((data) => {
				setData(data);
			})
			.then(() => setLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.modalBackground}>
			<div className={styles.modalContainer}>
				<div className={styles.CloseBtn}>
					<button
						onClick={() => {
							setModal(false);
						}}
					>
						X
					</button>
				</div>
				<div className={styles.modalBody}>
					<img
						src={el.Poster !== "N/A" ? el.Poster : require("../../assets/default_poster.jpg")}
						alt={el.Title}
					/>

					{!loading ? (
						<div className={styles.TextContainer}>
							<h1>
								{el.Title} <span>({el.Year})</span>
							</h1>
							<div>
								<span>{data.Type[0].toUpperCase() + data.Type.substring(1)}</span>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<span>{data.Genre}</span>
							</div>
							<div className={styles.Modal_Tabs_Container}>
								<button
									className={`${tab === "1" ? styles.active : ""}`}
									onClick={() => setTab("1")}
								>
									Overview
								</button>
								<button
									className={`${tab === "2" ? styles.active : ""}`}
									onClick={() => setTab("2")}
								>
									Cast & Crew
								</button>
								<button
									className={`${tab === "3" ? styles.active : ""}`}
									onClick={() => setTab("3")}
								>
									Rating & Awards
								</button>
							</div>
							{tab === "1" ? (
								<section>
									<div>
										<span>{data.Plot}</span>
									</div>
									<br />
									<div>
										Available in : <span>{data.Language}</span>
									</div>
									<div>
										Runtime : <span>{data.Runtime}</span>
									</div>
								</section>
							) : null}
							{tab === "2" ? (
								<section>
									<div>
										Released On : <span>{data.Released}</span>
									</div>
									<div>
										Directed By : <span>{data.Director}</span>
									</div>
									<div>
										Stars : <span>{data.Actors}</span>
									</div>
									<div>
										Writer : <span>{data.Writer}</span>
									</div>
									<div>
										Awards : <span>{data.Awards}</span>
									</div>
								</section>
							) : null}
							{tab === "3" ? (
								<section>
									<div>
										IMDB : <span>{data.imdbRating}/10</span>
									</div>
									<div>
										IMDB Votes : <span>{data.imdbVotes}</span>
									</div>
									<div>
										Metascore : <span>{data.Metascore}</span>
									</div>
									<div>
										BoxOffice : <span>{data.imdbRating >= 7 ? "Hit" : "Flop"}</span>
									</div>
									<div>
										Box Collection : <span>{data.BoxOffice}</span>
									</div>
								</section>
							) : null}
						</div>
					) : (
						<Loader />
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
