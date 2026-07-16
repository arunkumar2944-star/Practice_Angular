import { User } from "../../app/user/user"
import { Category, Priority, Status, Visibility } from "./enum"
import { UserDto } from "./UserDto"

export interface NoteDto {
    // _id: number | null,
    
    title: string,
    details: string,
    tag:string,
    attachments:File[],
    category:Category,
    priority:Priority,
    status:Status,
    date: Date,
    dueDate:Date,
    reminderDate:Date,
    visibility:Visibility,
    isFavorite: boolean,
    isPined:boolean,
    isReminded:boolean
    user:string
    createdBy?: string | UserDto,
    createdAt?: Date,
    updatedBy?: string | UserDto,
    updatedAt?: Date,
    isActive?: boolean | true
}

