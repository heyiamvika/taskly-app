export type User = {
	id: string;
};

export type AuthState = {
	user: User | null;
	loading: boolean;
	error: string | null;
};
