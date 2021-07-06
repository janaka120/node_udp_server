import {configureStore} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import MainReducer from './pages/main/reducer/MainReducer';

const store = configureStore({
	reducer: {
		main: MainReducer,
	},
});

export default store;

export const useTypedSelector = useSelector;