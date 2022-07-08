import React from "react";
import { BounceLoader } from "react-spinners";

const Loader = () => {
	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "300px",
				}}
			>
				<BounceLoader color='#f5c518' />
			</div>
		</div>
	);
};

export default Loader;
