import { UserType } from "./enum";

export interface UserDto{
    id?:string|null,
    _id?:string|null,
    name:string,
    age:number,
    gender:string,
    email:string,
    password:string,
    confirmPassword:string,
    phoneNo:number,
    token?:string,
    type?:UserType|UserType.Admin,
    // user?:UserDto,
    createdBy?:number|0,
    createdAt?:Date,
    updatedBy?:number|0,
    updatedAt?:Date,
    isActive?:boolean|true
}