import React, { useState } from "react";
import styles from "./scrollbutton.module.css";

const ScrollButton = () => {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop;
		if (scrolled > 300) {
			setVisible(true);
		} else if (scrolled <= 300) {
			setVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	window.addEventListener("scroll", toggleVisible);
	return (
		<>
			<button
				className={styles.TopButton}
				onClick={scrollToTop}
				style={{ display: visible ? "inline" : "none" }}
			>
				<img src={require("../../assets/arrow_up_icon.png")} alt='Up Icon' />
			</button>
		</>
	);
};

export default ScrollButton;
