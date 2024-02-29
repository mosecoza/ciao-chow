export interface SignInData {
    "email": string,
    "password": string
}

export interface SignUpData {
    "username": string;
    "email": string;
    "password": string;
}

export const defaultSignInData : SignInData ={
    email: "",
    password: ""
}

export const defaultSignUpData : SignUpData ={
    email: "",
    password: "",
    username: ""
}

export type authPages = "login" | "register";