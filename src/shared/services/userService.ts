import { Service, signal } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../config/Environment';
import { UserDto } from '../models/UserDto';
import { User } from '../../app/user/user';
import { Notes } from '../../app/notes/notes';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import{CommonMethods} from '../services/common.methods';
@Injectable({
  providedIn: 'root'
})
export class UserService {
common =new CommonMethods();
  // private readonly localStorageIdentifier = 'user';

  // private _user = signal<any>(this.common.getfromLS(this.localStorageIdentifier));

  // readonly user = this._user.asReadonly();

  private apiUrl = environment.apiUrl+'/users';
  constructor(private http: HttpClient) { }
  
  


  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  createUser(User: UserDto): Observable<any> {
    //console.log(this.apiUrl, User)
    return this.http.post<any>(this.apiUrl, User);
  }

  updateUser(id: string, User: any): Observable<any> {

    const headers = this.common.setheader()
    return this.http.put<any>(`${this.apiUrl}/${id}`, User, { headers });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updatePassword(data: any): Observable<any> {
    const headers = this.common.setheader()
    return this.http.put<any>(`${this.apiUrl}/updatePassword`, data, { headers })
  }

  loginUser(User: any): Observable<any> {
    // console.log('user' + JSON.stringify(User))
    // const headers = this.setheader();
    return this.http.post<any>(`${this.apiUrl}/login`, User);
  }

  comparePassword(cmpPassword: any): Observable<any> {
    //  console.log('user' + JSON.stringify(cmpPassword))
    const headers = this.common.setheader();
    return this.http.post<any>(`${this.apiUrl}/comparePassword`, cmpPassword, { headers });
  }

  //local storage update value functions
 
}
