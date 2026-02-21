import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student, Tutor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5237/api/auth';
  private currentUserSubject = new BehaviorSubject<Student | Tutor | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userTypeSubject = new BehaviorSubject<'student' | 'tutor' | null>(null);
  public userType$ = this.userTypeSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('currentUser');
    const userType = localStorage.getItem('userType');
    if (user && userType) {
      this.currentUserSubject.next(JSON.parse(user));
      this.userTypeSubject.next(userType as 'student' | 'tutor');
      this.isLoggedInSubject.next(true);
    }
  }

  login(email: string, password: string, userType: 'student' | 'tutor'): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/login`, { email, password, userType })
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.currentUserSubject.next(response.user);
              this.userTypeSubject.next(userType);
              this.isLoggedInSubject.next(true);
              localStorage.setItem('currentUser', JSON.stringify(response.user));
              localStorage.setItem('userType', userType);
              observer.next({ success: true, user: response.user });
            }
            observer.complete();
          },
          error: (error) => {
            observer.error(error);
          }
        });
    });
  }

  register(userData: any, userType: 'student' | 'tutor'): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/register`, { 
        ...userData,
        userType
      }).subscribe({
        next: (response) => {
          if (response.success) {
            this.currentUserSubject.next(response.user);
            this.userTypeSubject.next(userType);
            this.isLoggedInSubject.next(true);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            localStorage.setItem('userType', userType);
            observer.next({ success: true, user: response.user });
          }
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.userTypeSubject.next(null);
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
  }

  getCurrentUser(): Student | Tutor | null {
    return this.currentUserSubject.value;
  }

  getUserType(): 'student' | 'tutor' | null {
    return this.userTypeSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}
