import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <a routerLink="/" class="navbar-brand">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#6366f1"/>
            <path d="M8 20h16M8 16h16M8 12h8" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>EdTech</span>
        </a>

        <div class="navbar-menu">
          <a routerLink="/tutors" class="nav-link">Find Tutors</a>
          <a routerLink="/courses" class="nav-link">Courses</a>
          <a href="#" class="nav-link">How It Works</a>
          <a href="#" class="nav-link">About</a>
        </div>

        <div class="navbar-actions">
          <button *ngIf="!(isLoggedIn$ | async)" routerLink="/login" class="btn btn-secondary">
            Login
          </button>
          <button *ngIf="!(isLoggedIn$ | async)" routerLink="/register" class="btn btn-primary">
            Sign Up
          </button>

          <div *ngIf="isLoggedIn$ | async" class="user-menu">
            <a routerLink="/dashboard" class="nav-link">Dashboard</a>
            <a routerLink="/messages" class="nav-link">Messages</a>
            <a routerLink="/profile" class="nav-link">
              <img [src]="(currentUser$ | async)?.avatar" alt="Profile" class="user-avatar">
            </a>
            <button (click)="logout()" class="btn btn-secondary">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .navbar-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: white;
      font-weight: 700;
      font-size: 1.5rem;
      text-decoration: none;
      transition: opacity 0.3s;
    }

    .navbar-brand:hover {
      opacity: 0.9;
    }

    .navbar-menu {
      display: flex;
      gap: 2rem;
    }

    .nav-link {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-link:hover {
      color: white;
    }

    .navbar-actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid white;
    }

    @media (max-width: 768px) {
      .navbar-menu {
        display: none;
      }

      .navbar-container {
        padding: 0 1rem;
      }
    }
  `]
})
export class NavbarComponent {
  isLoggedIn$: Observable<boolean>;
  currentUser$: Observable<any>;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUser$ = this.authService.currentUser$;
  }

  logout(): void {
    this.authService.logout();
  }
}
