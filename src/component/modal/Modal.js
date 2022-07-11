import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
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
							<h1>{el.Title}</h1>
							<div className={styles.col}>
								<section>
									<div>
										<span>{data.Year}</span>
										&nbsp;&nbsp;&nbsp;
										<span>{data.Type[0].toUpperCase() + data.Type.substring(1)}</span>{" "}
										&nbsp;&nbsp;&nbsp;&nbsp;
										<span>{data.Genre}</span>
									</div>
									{/* <div>
										<span>{data.Genre}</span>
									</div> */}
									<div>
										Available in : <span>{data.Language}</span>
									</div>
									<div>
										Runtime : <span>{data.Runtime}</span>
									</div>
									<div>
										Stars : <span>{data.Actors}</span>
									</div>
								</section>
								<section>
									<div>
										IMDB :{" "}
										<span>
											{data.imdbRating}/10
											{/* <svg
												xmlns='http://www.w3.org/2000/svg'
												width='24'
												height='24'
												class='ipc-icon ipc-icon--star sc-7ab21ed2-4 hLFdut'
												id='iconContext-star'
												viewBox='0 0 24 24'
												fill='#f5c518'
												role='presentation'
											>
												<path d='M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z'></path>
											</svg> */}
										</span>
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
								</section>
							</div>
							<br />
							<section>
								<div className={styles.plot}>
									<span>{data.Plot}</span>
								</div>
								<br />
								<div>
									Writer : <span>{data.Writer}</span>
								</div>
								<div>
									Awards : <span>{data.Awards}</span>
								</div>
							</section>
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
