import React, { createContext, useState } from "react";

export const FetchedData = createContext();

const Context = ({ children }) => {
	const [prevData, setPrevData] = useState([]);
	const [prevModalData, setPrevModalData] = useState([]);

	return (
		<FetchedData.Provider value={{ prevData, setPrevData, prevModalData, setPrevModalData }}>
			{children}
		</FetchedData.Provider>
	);
};

export default Context;
