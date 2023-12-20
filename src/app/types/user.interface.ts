export interface IAuthUser {
    UserName: string
    Email: string
    Password: string
}

export interface IUserLogin {
    UserName: string
    Password: string
}

export interface IUser {
    userName: string;
    access_token: string;
}