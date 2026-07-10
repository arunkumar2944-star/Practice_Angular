import { UserType } from "./UserType.enum";

export interface UserDto{
    id?:string|null,
    name:string,
    age:number,
    gender:string,
    email:string,
    password:string,
    phoneNo:number,
    type?:UserType|UserType.Admin,
    createdBy?:number|0,
    createdAt?:Date,
    updatedBy?:number|0,
    updatedAt?:Date,
    isActive?:boolean|true
}