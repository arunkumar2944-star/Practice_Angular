import { UserDto } from "./UserDto"

export interface NoteDto {
    id: number | null,
    date: Date,
    title: string,
    details: string,
    User: UserDto,
    Tag:string[],
    attachmentUrl:string,
    category:string,
    priyority:string,
    status?:string,
    createdBy?: UserDto | 0,
    createdAt?: Date,
    updatedBy?: UserDto | 0,
    updatedAt?: Date,
    isActive?: boolean | true
    isFavorite: boolean,
}

