import { config } from "./config";
const APIUrl = `${config.baseUrl}:${config.apiPort}${config.version}`;
const REQUESTS_URLS = {
	login: "/user/login",
	findUser: "/user/profile",
	update: "/user/profile",
};
const SUCCESS = {
	success: true,
};
const ERROR = {
	success: false,
};

const postAPI = async (url, options) => {
	const results = await fetch(`${APIUrl}${url}`, options)
		.then((response) => response.json())
		.catch((err) => err);
	return results;
};

export const getToken = async (email, password) => {
	const data = {
		email: email,
		password: password,
	};
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};
	try {
		const apiResponse = await postAPI(REQUESTS_URLS.login, options);
		if (apiResponse.status === 200) {
			return { ...SUCCESS, token: apiResponse.body.token };
		} else {
			return { ...ERROR, ...apiResponse };
		}
	} catch (error) {
		console.error("catch error => ", error);
		return { ERROR, ...error };
	}
};

const getAuthenticateHeaders = (token) => {
	return {
		authorization: `Bearer ${token}`,
	};
};

export const fetchProfile = async (token) => {
	const options = {
		method: "POST",
		headers: getAuthenticateHeaders(token),
	};
	try {
		const apiResponse = await postAPI(REQUESTS_URLS.findUser, options);
		if (apiResponse.status === 200) {
			return { ...SUCCESS, user: apiResponse.body };
		} else {
			return { ...ERROR, ...apiResponse };
		}
	} catch (error) {
		return { ERROR, ...error };
	}
};

export const updateUserName = async (token, firstName, lastName) => {
	const data = { firstName: firstName, lastName: lastName };
	const options = {
		method: "PUT",
		headers: {
			authorization: `Bearer ${token}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
	};
	try {
		const apiResponse = await postAPI(REQUESTS_URLS.update, options);
		if (apiResponse.status === 200) {
			return { ...SUCCESS };
		} else {
			return { ...ERROR, ...apiResponse };
		}
	} catch (error) {
		return { ERROR, ...error };
	}
};
