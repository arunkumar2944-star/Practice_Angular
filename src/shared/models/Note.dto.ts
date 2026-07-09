import { UserDto } from "./UserDto"

export interface NoteDto{
    id:number|null,
    title:string,
    details:string,
    User:UserDto
}