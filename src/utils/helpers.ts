export const checkCreds = (email: string, password: string): boolean => {
	if (!email || !email.includes("@") || !password || password.length < 6) {
		return false;
	}
	return true;
};

export const getErrorMessage = (error: unknown): string => {
	if (error instanceof Error) return error.message;
	return "An error occurred";
};

export const handleCredsErrors = (message: string) => {
	console.log(message);
	if (message.includes("auth/email")) {
		return "Email already in use";
	} else if (message.includes("auth/invalid")) {
		return "Invalid email or password";
	} else {
		return "An error occurred";
	}
};

export const getLevelAsWidth = (level: number, maxLevel: number) => {
	const progress = Math.floor((level * 100) / maxLevel);
	return Math.min(progress, 100);
};
