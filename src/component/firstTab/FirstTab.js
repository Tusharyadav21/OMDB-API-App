import React, { useState } from "react";
import Loader from "../loader/Loader";
import Modal from "../modal/Modal";
import styles from "./firstTab.module.css";

const FirstTab = (props) => {
	const [modal, setModal] = useState(false);
	const [modalData, setModalData] = useState({});

	const handleModal = function (el) {
		setModal(true);
		setModalData(el);
	};

	return (
		<div className={styles.container}>
			{props.loading ? (
				<Loader />
			) : (
				<div className={styles.cardContainer}>
					{props.data.Search?.map((el, i) => (
						<div
							key={i}
							className={styles.card}
							onClick={() => {
								handleModal(el);
							}}
						>
							<div className={styles.card_img}>
								{/* <img
									src={el.Poster !== "N/A" ? el.Poster : require("../../assets/default_poster.jpg")}
									alt={el.Title}
								/> */}
							</div>
							<div className={styles.card_body}>
								<h3>{el.Title}</h3>
								<p>
									{el.Year} , <span>{el.Type[0].toUpperCase() + el.Type.substring(1)}</span>
								</p>
							</div>
						</div>
					))}
					{modal && <Modal setModal={setModal} el={modalData} />}
				</div>
			)}
		</div>
	);
};

export default FirstTab;
