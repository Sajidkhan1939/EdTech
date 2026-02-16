import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: Booking[] = [];

  constructor() { }

  createBooking(booking: Booking): Observable<Booking> {
    return new Observable(observer => {
      setTimeout(() => {
        const newBooking = { ...booking, id: Math.random().toString(36).substr(2, 9) };
        this.bookings.push(newBooking);
        observer.next(newBooking);
        observer.complete();
      }, 800);
    });
  }

  getBookingsByStudent(studentId: string): Observable<Booking[]> {
    return of(this.bookings.filter(b => b.studentId === studentId));
  }

  getBookingsByTutor(tutorId: string): Observable<Booking[]> {
    return of(this.bookings.filter(b => b.tutorId === tutorId));
  }

  getBookingById(id: string): Observable<Booking | undefined> {
    return of(this.bookings.find(b => b.id === id));
  }

  updateBookingStatus(id: string, status: string): Observable<Booking | undefined> {
    return new Observable(observer => {
      setTimeout(() => {
        const booking = this.bookings.find(b => b.id === id);
        if (booking) {
          booking.status = status as any;
          observer.next(booking);
        }
        observer.complete();
      }, 500);
    });
  }

  cancelBooking(id: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const booking = this.bookings.find(b => b.id === id);
        if (booking) {
          booking.status = 'cancelled';
          observer.next(true);
        }
        observer.complete();
      }, 500);
    });
  }

  getUpcomingBookings(studentId: string): Observable<Booking[]> {
    return of(
      this.bookings.filter(b =>
        b.studentId === studentId &&
        new Date(b.sessionDate) > new Date() &&
        b.status !== 'cancelled'
      )
    );
  }

  getCompletedBookings(studentId: string): Observable<Booking[]> {
    return of(
      this.bookings.filter(b =>
        b.studentId === studentId &&
        b.status === 'completed'
      )
    );
  }
}
