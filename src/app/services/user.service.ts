import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURI = 'http://localhost:5029/api/user';
  constructor(private http: HttpClient) {}

  getUser(
    start: number,
    limit: number,
    q: string,
    filter: string
  ): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.baseURI}?start=${start}&limit=${limit}&q=${q}&filter=${filter}`
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseURI}/${id}`);
  }

  createUser(user: User): Observable<User> {
    const { name, email, isActive, genderId, createdBy } = user;
    return this.http.post<User>(`${this.baseURI}`, {
      name,
      email,
      isActive,
      genderId,
      createdBy,
    });
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseURI}/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    const { userId, name, email, genderId, isActive } = user;
    return this.http.put<User>(`${this.baseURI}/${id}`, {
      userId,
      name,
      email,
      genderId,
      isActive,
      updatedBy: 1,
    });
  }
}
