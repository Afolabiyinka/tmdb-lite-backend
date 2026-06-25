export interface SignupPayload {
    email: string;
    username: string;
    password: string;
}

export type LoginPayload = Omit<SignupPayload, "username">;

export type DecodedUser = {
    id: string | number;
};
export type EditUserPayload = Omit<SignupPayload, "password">;

export type GoogleLoginPayload = {
    credential: string
}