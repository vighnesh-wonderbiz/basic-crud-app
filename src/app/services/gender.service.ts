import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Gender from '../models/gender.model';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private baseURI = 'http://localhost:5029/api/gender';
  constructor(private http: HttpClient) {}

  getGenders(): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${this.baseURI}`);
  }
}
