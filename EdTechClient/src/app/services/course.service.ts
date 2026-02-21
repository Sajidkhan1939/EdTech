import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:5237/api/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching courses:', error);
        return of([]);
      })
    );
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching course:', error);
        return of(undefined);
      })
    );
  }

  searchCourses(query: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/search?q=${query}`).pipe(
      catchError(error => {
        console.error('Error searching courses:', error);
        return of([]);
      })
    );
  }

  filterCourses(filters: {
    category?: string;
    level?: string;
    maxPrice?: number;
    minRating?: number;
  }): Observable<Course[]> {
    let url = this.apiUrl;
    const params: string[] = [];
    
    if (filters.category) params.push(`category=${filters.category}`);
    if (filters.level) params.push(`level=${filters.level}`);
    if (filters.maxPrice) params.push(`maxPrice=${filters.maxPrice}`);
    if (filters.minRating) params.push(`minRating=${filters.minRating}`);
    
    if (params.length > 0) {
      url += '?' + params.join('&');
    }
    
    return this.http.get<Course[]>(url).pipe(
      catchError(error => {
        console.error('Error filtering courses:', error);
        return of([]);
      })
    );
  }
}
