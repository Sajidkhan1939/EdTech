import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student, Tutor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Student | Tutor | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private userTypeSubject = new BehaviorSubject<'student' | 'tutor' | null>(null);
  public userType$ = this.userTypeSubject.asObservable();

  constructor() {
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
    // Mock login - will be replaced with actual API call
    return new Observable(observer => {
      setTimeout(() => {
        const mockUser: any = {
          id: '123',
          name: 'John Doe',
          email: email,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
          [userType === 'student' ? 'grade' : 'bio']: userType === 'student' ? '10th' : 'Professional Tutor',
          [userType === 'student' ? 'subjects' : 'specializations']: ['Math', 'English', 'Science']
        };
        this.currentUserSubject.next(mockUser);
        this.userTypeSubject.next(userType);
        this.isLoggedInSubject.next(true);
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        localStorage.setItem('userType', userType);
        observer.next({ success: true, user: mockUser });
        observer.complete();
      }, 1000);
    });
  }

  register(userData: any, userType: 'student' | 'tutor'): Observable<any> {
    // Mock register - will be replaced with actual API call
    return new Observable(observer => {
      setTimeout(() => {
        const mockUser = {
          id: Math.random().toString(36).substr(2, 9),
          ...userData,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + userData.email
        };
        this.currentUserSubject.next(mockUser);
        this.userTypeSubject.next(userType);
        this.isLoggedInSubject.next(true);
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        localStorage.setItem('userType', userType);
        observer.next({ success: true, user: mockUser });
        observer.complete();
      }, 1000);
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
