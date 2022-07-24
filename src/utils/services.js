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
	const results = await fetch(`${APIUrl}${url}`, requestOptions)
		.then((response) => response.json())
		.catch((err) => err);

	console.log("results => ", results);
	return results;
};

export const login = async (email, password) => {
	const data = {
		email: email,
		password: password,
	};
	const apiResponse = await postAPI(REQUESTS_URLS.login, data);
	console.log("result 2 => ", apiResponse);

	if (!!apiResponse.status === 200) return apiResponse.body.token;
	else {
		if (!!apiResponse.status === 400) {
			// TODO : Here ! J'ai récupérer le status de la requete, j'ai plus qu'a renvoyer la bonne donnée
			// TODO : Gérer le try/catch lors de la coupure de l'api
		}
		return false;
	}
};
