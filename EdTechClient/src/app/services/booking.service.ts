import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Booking } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5237/api/bookings';

  constructor(private http: HttpClient) { }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking).pipe(
      catchError(error => {
        console.error('Error creating booking:', error);
        return of(booking);
      })
    );
  }

  getBookingsByStudent(studentId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/student/${studentId}`).pipe(
      catchError(error => {
        console.error('Error fetching student bookings:', error);
        return of([]);
      })
    );
  }

  getBookingsByTutor(tutorId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/tutor/${tutorId}`).pipe(
      catchError(error => {
        console.error('Error fetching tutor bookings:', error);
        return of([]);
      })
    );
  }

  getBookingById(id: string): Observable<Booking | undefined> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching booking:', error);
        return of(undefined);
      })
    );
  }

  updateBookingStatus(id: string, status: string): Observable<Booking | undefined> {
    return this.http.put<Booking>(`${this.apiUrl}/${id}/status`, { status }).pipe(
      catchError(error => {
        console.error('Error updating booking status:', error);
        return of(undefined);
      })
    );
  }

  cancelBooking(id: string): Observable<boolean> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error cancelling booking:', error);
        return of(false);
      })
    );
  }

  getUpcomingBookings(studentId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/student/${studentId}/upcoming`).pipe(
      catchError(error => {
        console.error('Error fetching upcoming bookings:', error);
        return of([]);
      })
    );
  }

  getCompletedBookings(studentId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/student/${studentId}/completed`).pipe(
      catchError(error => {
        console.error('Error fetching completed bookings:', error);
        return of([]);
      })
    );
  }
}

