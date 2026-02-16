import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access your personalized learning experience</p>
        </div>

        <form (ngSubmit)="login()" class="login-form">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              [(ngModel)]="formData.email"
              name="email"
              placeholder="you@example.com"
              class="form-input"
              required
            >
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password"
              [(ngModel)]="formData.password"
              name="password"
              placeholder="Enter your password"
              class="form-input"
              required
            >
          </div>

          <div class="form-group">
            <label for="userType">I am a</label>
            <select 
              id="userType"
              [(ngModel)]="formData.userType"
              name="userType"
              class="form-select"
            >
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
            </select>
          </div>

          <div class="remember-forgot">
            <label>
              <input type="checkbox" class="checkbox"> Remember me
            </label>
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" class="btn btn-primary btn-block btn-large">
            Sign In
          </button>

          <div class="divider">or continue with</div>

          <button type="button" class="btn btn-secondary btn-block">
            <span class="social-icon">G</span> Google
          </button>
        </form>

        <div class="signup-link">
          Don't have an account? <a routerLink="/register">Create one</a>
        </div>
      </div>

      <div class="login-image">
        <div class="image-content">
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.1" />
                <stop offset="100%" style="stop-color:#764ba2;stop-opacity:0.1" />
              </linearGradient>
            </defs>
            <rect x="50" y="50" width="300" height="300" fill="url(#grad)" rx="20"/>
          </svg>
          <h2>Learn with Expert Tutors</h2>
          <p>Join thousands of students improving their skills every day</p>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .login-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      max-width: 1200px;
      margin: 4rem auto;
      padding: 0 2rem;
      align-items: center;
      min-height: calc(100vh - 300px);
    }

    .login-card {
      background: white;
      padding: 3rem;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .login-header {
      margin-bottom: 2rem;
    }

    .login-header h1 {
      font-size: 2rem;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .login-header p {
      color: #6b7280;
      font-size: 1rem;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    .form-input,
    .form-select {
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: all 0.3s;
    }

    .form-input:focus,
    .form-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .remember-forgot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
    }

    .checkbox {
      margin-right: 0.5rem;
    }

    .forgot-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .forgot-link:hover {
      text-decoration: underline;
    }

    .btn-block {
      width: 100%;
    }

    .btn-large {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }

    .divider {
      text-align: center;
      color: #9ca3af;
      font-size: 0.85rem;
      position: relative;
      margin: 1rem 0;
    }

    .divider:before,
    .divider:after {
      content: '';
      position: absolute;
      top: 50%;
      width: 45%;
      height: 1px;
      background: #e5e7eb;
    }

    .divider:before {
      left: 0;
    }

    .divider:after {
      right: 0;
    }

    .social-icon {
      margin-right: 0.5rem;
      font-weight: 700;
    }

    .signup-link {
      text-align: center;
      color: #6b7280;
      margin-top: 1.5rem;
    }

    .signup-link a {
      color: #667eea;
      font-weight: 600;
      text-decoration: none;
    }

    .signup-link a:hover {
      text-decoration: underline;
    }

    .login-image {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .image-content {
      text-align: center;
    }

    .image-content svg {
      width: 100%;
      max-width: 400px;
      margin-bottom: 2rem;
    }

    .image-content h2 {
      font-size: 2rem;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .image-content p {
      color: #6b7280;
      font-size: 1.05rem;
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      .login-container {
        grid-template-columns: 1fr;
        gap: 2rem;
        margin: 2rem auto;
      }

      .login-image {
        display: none;
      }

      .login-card {
        padding: 2rem;
      }
    }
  `]
})
export class LoginComponent {
  formData = {
    email: '',
    password: '',
    userType: 'student'
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(): void {
    if (this.formData.email && this.formData.password) {
      this.authService.login(
        this.formData.email,
        this.formData.password,
        this.formData.userType as 'student' | 'tutor'
      ).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
