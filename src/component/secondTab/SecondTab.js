import React, { useContext, useEffect } from "react";
import { FetchedData } from "../../Context";
import styles from "./secondTab.module.css";

const SecondTab = ({ data }) => {
	const { images, setImages } = useContext(FetchedData);
	useEffect(() => {
		data.Search?.forEach((el) => {
			if (!(el.imdbID in images)) {
				setImages({
					[el.imdbID]: el.Poster,
					...images,
				});
			}
		});
	});

	console.log(images);

	return (
		<div>
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
		</div>
	);
};

export default SecondTab;
