const { createSlice } = require("@reduxjs/toolkit");

const cardSlice = createSlice({
	name: "card",
	initialState: [],
	reducers: {
		add(state, action) {
			state.push(action.payload);
		},
	},
});

export const { add } = cardSlice.actions;
export default cardSlice.reducer;
