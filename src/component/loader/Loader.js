import React from "react";
import styles from "./loader.module.css";

const Loader = () => {
	return (
		<div>
			<div className={styles.profile_main_loader}>
				<div className={styles.loader}>
					<svg className={styles.circular_loader} viewBox='25 25 50 50'>
						<circle
							className={styles.loader_path}
							cx='50'
							cy='50'
							r='20'
							fill='none'
							stroke='#f5c518'
							strokeWidth='2'
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default Loader;
