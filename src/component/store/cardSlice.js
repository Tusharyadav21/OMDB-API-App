const { createSlice } = require("@reduxjs/toolkit");

const cardSlice = createSlice({
	name: "card",
	initialState: [],
	reducers: {
		add(state, action) {
			state.push(action.payload);
			// const newFetch = action.payload;
			// console.log(newFetch);
			// state.data = [...state, action.payload];
			// console.log(action);
		},
	},
});

export const { add } = cardSlice.actions;
export default cardSlice.reducer;
