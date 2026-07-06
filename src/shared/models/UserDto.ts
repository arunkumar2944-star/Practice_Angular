import { UserType } from "./UserType.enum";

export interface UserDto{
    id:number|null,
    name:string,
    age:number,
    gender:string,
    userID:string,
    password:string,
    usertype:UserType
}