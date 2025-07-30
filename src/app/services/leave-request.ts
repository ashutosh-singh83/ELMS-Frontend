import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveRequest } from '../models/leave-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  private apiUrl = 'https://localhost:7256/api/LeaveRequest'; // Replace with your API

  constructor(private http: HttpClient) {}

  submitLeave(request: LeaveRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }
}


