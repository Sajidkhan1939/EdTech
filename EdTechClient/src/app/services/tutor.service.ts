import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tutor, Review } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private apiUrl = 'http://localhost:5237/api/tutors';

  constructor(private http: HttpClient) { }

  getTutors(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching tutors:', error);
        return of([]);
      })
    );
  }

  getTutorById(id: string): Observable<Tutor | undefined> {
    return this.http.get<Tutor>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching tutor:', error);
        return of(undefined);
      })
    );
  }

  searchTutors(query: string): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(`${this.apiUrl}/search?q=${query}`).pipe(
      catchError(error => {
        console.error('Error searching tutors:', error);
        return of([]);
      })
    );
  }

  filterTutors(filters: {
    specialization?: string;
    minRating?: number;
    maxRate?: number;
  }): Observable<Tutor[]> {
    let url = this.apiUrl + '/filter?';
    const params: string[] = [];

    if (filters.specialization) params.push(`specialization=${filters.specialization}`);
    if (filters.minRating) params.push(`minRating=${filters.minRating}`);
    if (filters.maxRate) params.push(`maxRate=${filters.maxRate}`);

    url += params.join('&');

    return this.http.get<Tutor[]>(url).pipe(
      catchError(error => {
        console.error('Error filtering tutors:', error);
        return of([]);
      })
    );
  }

  getReviews(tutorId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/${tutorId}/reviews`).pipe(
      catchError(error => {
        console.error('Error fetching reviews:', error);
        return of([]);
      })
    );
  }

  addReview(tutorId: string, studentId: string, rating: number, comment: string): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/${tutorId}/reviews`, {
      studentId,
      rating,
      comment
    }).pipe(
      catchError(error => {
        console.error('Error adding review:', error);
        return of({} as Review);
      })
    );
  }
}
