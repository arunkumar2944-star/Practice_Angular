import { Service, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../config/Environment';
import { UserDto } from '../models/UserDto';
import { User } from '../../app/user/user';
import { Notes } from '../../app/notes/notes';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly localStorageIdentifier = 'user';

  private _user = signal<UserDto>(this.getuserFLS());

  readonly user = this._user.asReadonly();

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  private setheader() {
    const token = localStorage.getItem('token');
   // console.log('token ' +token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    // console.log('header ' +headers.get('Authorization'));
    return headers;
  }


  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createUser(User: UserDto): Observable<any> {
    //console.log(this.apiUrl, User)
    return this.http.post<any>(this.apiUrl, User);
  }

  updateUser(id: string, User: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, User);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  loginUser(User: any): Observable<any> {
    console.log('user'+JSON.stringify(User))
     const header=this.setheader();
    return this.http.post<any>(`${this.apiUrl}/login`, User);
  }


  update(inputuser: UserDto) {
    this._user.set({ ...inputuser });
    this.updateuserToLS()
  }

  getuserFLS() {
    const usertring = localStorage.getItem(this.localStorageIdentifier)
    return JSON.parse(usertring || '[]')

  }
  updateuserToLS() {
    localStorage.setItem(
      this.
        localStorageIdentifier,
      JSON.stringify(this.user())
    )
  }
}
