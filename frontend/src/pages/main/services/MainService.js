export const getUserList = async () => {
	const responseTemplate = {
		success: false,
		data: null,
		msg: null
	};
	try {
		const response = await fetch('http://192.168.9.100:3005/api/users');
		const responseObj = await response.json();
		if(responseObj.status === 'fail') {
			throw "fail to retrieve user list.";
		}
		
		return {
			...responseTemplate,
			success: true,
			data: responseObj.data,
		};
	} catch (e) {
		console.log('--getUserList error--', e);
		return responseTemplate;
	}
};
