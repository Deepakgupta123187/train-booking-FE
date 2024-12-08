import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private apiUrl = 'https://trainbooking-ws17vgri.b4a.run';

  constructor(private http: HttpClient) {}

  getSeats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/seats`);
  }

  bookSeats(numSeats: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/book-seats`, { numSeats });
  }
  resetSeats(): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-seats`, {});
  }
}
