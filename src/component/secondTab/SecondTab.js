import React from "react";
import { BounceLoader } from "react-spinners";
import styles from "./secondTab.module.css";

const SecondTab = (props) => {
	return (
		<div className={styles.container}>
			{props.loading ? (
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
					{props.data.Search?.map((el, i) => (
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
		</div>
	);
};

export default SecondTab;
