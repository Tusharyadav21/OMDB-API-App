import React, { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import styles from "./modal.module.css";

const Modal = ({ setModal, el }) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(true);

	useEffect(() => {
		setLoading(true);
		fetch(`http://www.omdbapi.com/?i=${el.imdbID}&apikey=a94a9229`)
			.then((response) => response.json())
			.then((data) => setData(data))
			.then(() => setLoading(false));
	}, [el.imdbID]);

	// console.log(data);
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
							<div className={styles.col}>
								<div>
									<h1>{el.Title}</h1>
									<p>
										Type : <span>{data.Type[0].toUpperCase() + data.Type.substring(1)}</span>
									</p>
									<p>
										Language : <span>{data.Language}</span>
									</p>
									<p>
										Runtime : <span>{data.Runtime}</span>
									</p>
									<p>
										Awards : <span>{data.Awards}</span>
									</p>
								</div>
								<div>
									<p>
										Released on : <span>{data.Released}</span>
									</p>
									<p>
										IMDB Rating : <span>{data.imdbRating}</span>
									</p>
									<p>
										IMDB Votes : <span>{data.imdbVotes}</span>
									</p>
									<p>
										Metascore : <span>{data.Metascore}</span>
									</p>
									<p>
										BoxOffice : <span>{data.imdbRating >= 7 ? "Hit" : "Flop"}</span>
									</p>
								</div>
							</div>

							<p>
								Genre : <span>{data.Genre}</span>
							</p>
							<p>
								Actors : <span>{data.Actors}</span>
							</p>
							<p>
								Writer : <span>{data.Writer}</span>
							</p>
							<p>
								Plot : <span>{data.Plot}</span>
							</p>
						</div>
					) : (
						<div className={styles.modalSpinner}>
							<BounceLoader color='#f5c518' />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
