export const checkCreds = (email: string, password: string): boolean => {
	if (!email || !email.includes("@") || !password || password.length < 6) {
		return false;
	}
	return true;
};

export const handleCredsErrors = (error) => {
	switch (error.code) {
		case "auth/email-already-in-use":
			return "Email already in use";
		case "auth/invalid-credential":
			return "Invalid credential";
		default:
			return "An error occured";
	}
};

export const getLevelAsWidth = (level: number, maxLevel: number) => {
	const progress = Math.floor((level * 100) / maxLevel);
	return Math.min(progress, 100);
};
