import { UserDto } from "./UserDto"

export interface NoteDto {
    id: number | null,
    
    title: string,
    details: string,
    User: UserDto,
    Tag:string[],
    attachmentUrl:string,
    category:string,
    priyority:string,
    status?:string,
    date: Date,
    dueDate:Date,
    reminderDate:Date,
    visibility:string,

    createdBy?: UserDto | 0,
    createdAt?: Date,
    updatedBy?: UserDto | 0,
    updatedAt?: Date,
    isActive?: boolean | true
    isFavorite: boolean,
    isPined:boolean,
    isReminded:boolean
}

