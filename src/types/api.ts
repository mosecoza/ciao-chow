export type Data<T> = {
    success: boolean;
    message: string;
    data?: T;
};

export type Error = {
    status: 400,
    name: string,
    message: string,
    details: object
}

export type AuthFailedResponse = {
    data: null,
    error: Error
}
export interface AuthSuccessResponse {
    jwt: string
    user: User
}

export interface User {
    id: number
    username: string
    email: string
    provider: string
    confirmed: boolean
    blocked: boolean
    createdAt: string
    updatedAt: string
}

export const defaultData: Data<AuthSuccessResponse> = {
    success: false,
    message: ""
}