import { config } from "./config";
const APIUrl = `${config.baseUrl}:${config.apiPort}${config.version}`;
const REQUESTS_URLS = {
	login: "/user/login",
};

const postAPI = async (url, data) => {
	console.log("    3 - POST - fetch");
	const requestOptions = {
        method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};
	return await fetch(`${APIUrl}${url}`, requestOptions)
		.then((response) => response.json())
		.then((json) => json.body )
		.catch((err) => err);
};

export const login = async (email, password) => {
	console.log("  2 - login");
	try {
		const data = {
			email: email,
			password: password,
		};
		await postAPI(REQUESTS_URLS.login, data).then((response) => {
			return response.token || "";
		});
	} catch (error) {
		return error;
	}
};
