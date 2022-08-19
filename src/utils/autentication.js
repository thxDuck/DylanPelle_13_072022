const CryptoJS = require("crypto-js");

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
		return (document.cookie = `${name}=${value};`);
	},
	clear: (name) => {
		return (document.cookie = `${name}="";max-age=0`);
	},
};
export const createLoginToken = (token) => {
	const secret = randomString(50);
	const reversedSecret = secret.split("").reverse().join("");
	const encryptedToken = CryptoJS.AES.encrypt(token, reversedSecret).toString();
	return { secret, newToken: encryptedToken };
};
export const setLoginInformations = (newToken, secret, keepLogged = false) => {
	localStorage.setItem("keepLogged", keepLogged);
	const storage = keepLogged ? localStorage : sessionStorage;
	storage.token = newToken;
	cookies.set("sId", secret);
};
export const getSavedLoginInformations = () => {
	const keepLogged = localStorage.keepLogged === "true";
	const storage = keepLogged ? localStorage : sessionStorage;
	const encryptedToken = storage.getItem("token");
	const secret = cookies.get("sId");
	if (!encryptedToken || !secret) return false;
	const reversedSecret = secret.split("").reverse().join("");
	const bytes = CryptoJS.AES.decrypt(encryptedToken, reversedSecret);
	const token = bytes.toString(CryptoJS.enc.Utf8);
	return token;
};
export const clearLoginInformations = () => {
	cookies.clear("sId");
	localStorage.clear();
	sessionStorage.clear();
};
