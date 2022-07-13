import React, { createContext, useState } from "react";

export const FetchedData = createContext();

const Context = ({ children }) => {
	const [prevData, setPrevData] = useState([]);
	const [images, setImages] = useState([]);
	const [prevModalData, setPrevModalData] = useState([]);

	return (
		<FetchedData.Provider
			value={{ prevData, setPrevData, prevModalData, setPrevModalData, images, setImages }}
		>
			{children}
		</FetchedData.Provider>
	);
};

export default Context;
