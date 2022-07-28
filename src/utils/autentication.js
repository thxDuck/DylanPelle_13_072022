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
	// TODO, set secret and reversed in random index of token
	const newToken = `${secret}.${token}.${reversedSecret}`;
	return { secret, newToken };
};
