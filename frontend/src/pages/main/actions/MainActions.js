import {apiCallStarts, apiCallError, successFetchUsers} from '../reducer/MainReducer';

import {
	getUserList,
} from '../services/MainService';

export const fetchUserList = () => async (dispatch) => {
	try {
		dispatch(apiCallStarts());
		const response = await getUserList();
		const {success, data, msg} = response;
		if (success && data) {
			dispatch(successFetchUsers(data));
		} else {
			dispatch(apiCallError('USER_LIST_FETCH'));
		}
	} catch (e) {}
};
