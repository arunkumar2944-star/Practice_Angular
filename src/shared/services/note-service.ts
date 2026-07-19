import { Service, signal, Injectable } from '@angular/core';
import { } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../config/Environment';
import { UserDto } from '../models/UserDto';
import { User } from '../../app/user/user';
import { Notes } from '../../app/notes/notes';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { CommonMethods } from './common.methods';
import { NoteDto } from '../models/Note.dto';

@Injectable({
    providedIn: 'root'
})
export class NoteService {


    common = new CommonMethods();


    private apiUrl = environment.apiUrl + '/notes';
    constructor(private http: HttpClient) { }

//POST:Create note
    createNote(note: NoteDto, files: File[]): Observable<any> {

        // console.log('service method called')
        const formData = new FormData();

        formData.append('title', note.title);
        formData.append('details', note.details);
        formData.append('tag', note.tag);
        formData.append('category', note.category.toString());
        formData.append('priority', note.priority.toString());
        formData.append('status', note.status.toString());
        formData.append('date', note.date.toISOString());
        formData.append('dueDate', note.dueDate.toISOString());

        if (note.reminderDate) {
            formData.append(
                'reminderDate',
                note.reminderDate.toISOString()
            );
        }

        formData.append('visibility', String(note.visibility));
        formData.append(
            'isFavorite',
            String(note.isFavorite)
        );

        formData.append(
            'isPined',
            String(note.isPined)
        );

        formData.append(
            'isReminded',
            String(note.isReminded)
        );

        // formData.append(
        //     'user',
        //     note.user.id
        // );

        files.forEach(file => {
            formData.append(
                'attachments',
                file
            );
        });
        const headers = this.common.setheader();

        // formData.forEach((value, key) => {
        //     console.log(key, value);
        // });
        return this.http.post(
            `${this.apiUrl}/add`,
            formData,
            { headers }
        );
    }

    //GET:Note list by userid

    getNoteByUserID(page:number,limit:number,selectedTab:string): Observable<any> {
        const headers = this.common.setheader();
         console.log(`${this.apiUrl}/getByUserID`)
        return this.http.get(`${this.apiUrl}/getByUserID/?page=${page}&limit=${limit}&stab=${selectedTab}`,{headers})
    }

    getRecentNotesByUserID():Observable<any>{
        const headers=this.common.setheader();
        return this.http.get(`${this.apiUrl}/getRecentNotes`,{headers})
    }

getDasboardStatsforUser():Observable<any>{
    const headers=this.common.setheader();
    return this.http.get(`${this.apiUrl}/getListforStatsBoard`,{headers})
}


}
