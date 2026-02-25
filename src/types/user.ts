export interface UserRegister{
email:string,
username:string,
password :string
}

export interface UserRole{
    role:string
}

export interface UserOTP{
email:string,
otp:string
}

export interface UserLogin{
    username:string,
    password:string
}