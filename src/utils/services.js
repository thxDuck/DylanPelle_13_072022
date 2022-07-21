import { config } from "./config";
const APIUrl = `${config.baseUrl}:${config.apiPort}${config.version}`;

const postAPI = async (url, data) => {
	console.log("    3 - POST - fetch");
	const requestOptions = {
        method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	};
    
	fetch(`${APIUrl}${url}`, requestOptions)
    .then((response) => {
        console.log("    4 - then response.json !");
        
        response.json()})
    .then((response) => {
        console.log("    5 - then then return body !");
        const { token } = response.body;
			console.log("token => ", token);
			return token;
		})
		.catch((err) => err);
};
const REQUESTS_URLS = {
	login: "/user/login",
};
export const login = async (email, password) => {
	console.log("  2 - login");
	try {
		const data = {
			email: email,
			password: password,
		};
		postAPI(REQUESTS_URLS.login, data).then((token) => {
            console.log("  6 - in login, get token ! ", token);
			return token;
		});
	} catch (error) {
		return error;
	}
};
