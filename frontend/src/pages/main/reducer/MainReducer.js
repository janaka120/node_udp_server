import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	userList: [],
	isInProgress: false,
	retryApi: null,
};

export const MainReducer = createSlice({
	name: 'main',
	initialState,
	reducers: {
		successFetchUsers: (state, action) => {
			state.userList = action.payload;
			state.isInProgress = false;
		},
		apiCallStarts: (state) => {
			state.isInProgress = true;
			state.retryApi = null;
		},
		apiCallError: (state, action) => {
			state.isInProgress = false;
			state.retryApi = action.payload;
		},
	},
});

export const {
	apiCallStarts,
	apiCallError,
	successFetchUsers
} = MainReducer.actions;

export default MainReducer.reducer;