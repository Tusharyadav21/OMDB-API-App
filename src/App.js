import { useState } from "react";
import FirstTab from "./component/firstTab/FirstTab";
import SecondTab from "./component/secondTab/SecondTab";
import ScrollButton from "./component/scrollButton/ScrollButton";

import styles from "./App.module.css";

function App() {
	const [firstTab, setFirstTab] = useState(true);
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
			{firstTab ? <FirstTab /> : <SecondTab />}
			<ScrollButton />
		</div>
	);
}

export default App;
