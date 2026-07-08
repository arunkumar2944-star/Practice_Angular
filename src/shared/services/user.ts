import { Service } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../config/Environment';
@Injectable({
  providedIn: 'root'
})
export class User {

  private apiUrl=environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createUser(User: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, User);
  }

  updateUser(id: string, User: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, User);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
