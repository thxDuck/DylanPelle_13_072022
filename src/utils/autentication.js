const randomString = (length) => {
	const result = [];
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789([-_)]}$*,?:/!§ù%*µ$£^¨";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
	}
	return result.join("");
};
const cookies = {
	get: (name) => {
		return document.cookie
			.split("; ")
			.find((row) => row.startsWith(`${name}=`))
			?.split("=")[1];
	},
	set: (name, value) => {
		return document.cookie
			.split("; ")
			.find((row) => row.startsWith(`${name}=`))
			?.split("=")[1];
	},
};
export const getLoginToken = () => {
	const secret = document.cookie
		.split("; ")
		.find((row) => row.startsWith("sId="))
		?.split("=")[1];
	if (!secret) return false;
	const loginToken = Window.localstorage.token || Window.sessionStorage.token;
	loginToken.shift();
	loginToken.pop();
	return loginToken;
};

export const createLoginToken = (token) => {
	const secret = randomString(50);
	const reversedSecret = secret.split("").reverse().join("");
	const newToken = `${secret}.${token}.${reversedSecret}`;
	return { secret, newToken };
};
export const setTokenInformations = (newToken, secret, keepLogged = false) => {
	localStorage.setItem("keepLogged", keepLogged);
	const storage = keepLogged ? localStorage : sessionStorage;
	storage.token = newToken;
	document.cookie = `sId=${secret};`;
};
export const getSavedLoginInformations = () => {
	const keepLogged = localStorage.getItem("keepLogged");
	const storage = keepLogged ? localStorage : sessionStorage;
	const encryptedToken = storage.getItem("token");
	const secret = cookies.get("sId");
	const tokenArray = encryptedToken.split(".");
	tokenArray.pop();
	tokenArray.shift();
	const token = tokenArray.join().replaceAll(",", ".");
	return { token, keepLogged };
};
