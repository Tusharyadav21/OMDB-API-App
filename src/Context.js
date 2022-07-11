import React, { createContext, useState } from "react";

export const FetchedData = createContext();

const Context = ({ children }) => {
	const [prevData, setPrevData] = useState([]);

	return <FetchedData.Provider value={{ prevData, setPrevData }}>{children}</FetchedData.Provider>;
};

export default Context;
