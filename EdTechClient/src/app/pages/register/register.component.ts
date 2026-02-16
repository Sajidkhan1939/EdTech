import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <h1>Join EdTech Today</h1>
          <p>Create an account and start learning from world-class tutors</p>
        </div>

        <form (ngSubmit)="register()" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName"
                [(ngModel)]="formData.firstName"
                name="firstName"
                placeholder="John"
                class="form-input"
                required
              >
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName"
                [(ngModel)]="formData.lastName"
                name="lastName"
                placeholder="Doe"
                class="form-input"
                required
              >
            </div>
          </div>

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
              placeholder="Create a strong password"
              class="form-input"
              required
            >
            <p class="hint">At least 8 characters with uppercase, lowercase, and numbers</p>
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

          <div *ngIf="formData.userType === 'student'" class="form-group">
            <label for="grade">Grade/Level</label>
            <select 
              id="grade"
              [(ngModel)]="formData.grade"
              name="grade"
              class="form-select"
            >
              <option value="">Select Grade</option>
              <option value="Elementary">Elementary School</option>
              <option value="Middle">Middle School</option>
              <option value="High">High School</option>
              <option value="College">College/University</option>
              <option value="Professional">Professional</option>
            </select>
          </div>

          <div class="checkbox-group">
            <label>
              <input type="checkbox" class="checkbox" required> I agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <button type="submit" class="btn btn-primary btn-block btn-large">
            Create Account
          </button>
        </form>

        <div class="login-link">
          Already have an account? <a routerLink="/login">Sign in</a>
        </div>
      </div>

      <div class="register-image">
        <div class="image-content">
          <h2>Why Join EdTech?</h2>
          <ul class="benefits">
            <li><span class="checkmark">✓</span> 415+ Expert Tutors</li>
            <li><span class="checkmark">✓</span> 100K+ Classes Completed</li>
            <li><span class="checkmark">✓</span> 99.5% Satisfaction Rate</li>
            <li><span class="checkmark">✓</span> 24/7 Student Support</li>
            <li><span class="checkmark">✓</span> Flexible Scheduling</li>
            <li><span class="checkmark">✓</span> Money-Back Guarantee</li>
          </ul>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .register-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      max-width: 1200px;
      margin: 4rem auto;
      padding: 0 2rem;
      align-items: center;
      min-height: calc(100vh - 300px);
    }

    .register-card {
      background: white;
      padding: 3rem;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      order: 2;
    }

    .register-header {
      margin-bottom: 2rem;
    }

    .register-header h1 {
      font-size: 2rem;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .register-header p {
      color: #6b7280;
      font-size: 1rem;
    }

    .register-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
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

    .hint {
      font-size: 0.8rem;
      color: #9ca3af;
      margin: 0.5rem 0 0 0;
    }

    .checkbox-group {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: #6b7280;
    }

    .checkbox {
      margin-top: 0.25rem;
      cursor: pointer;
    }

    .btn-block {
      width: 100%;
    }

    .btn-large {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }

    .login-link {
      text-align: center;
      color: #6b7280;
      margin-top: 1.5rem;
    }

    .login-link a {
      color: #667eea;
      font-weight: 600;
      text-decoration: none;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    .register-image {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      order: 1;
    }

    .image-content {
      text-align: center;
    }

    .image-content h2 {
      font-size: 2rem;
      color: #1f2937;
      margin-bottom: 2rem;
    }

    .benefits {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .benefits li {
      font-size: 1.05rem;
      color: #1f2937;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .checkmark {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .register-container {
        grid-template-columns: 1fr;
        gap: 2rem;
        margin: 2rem auto;
      }

      .register-image {
        display: none;
      }

      .register-card {
        order: 1;
        padding: 2rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RegisterComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 'student',
    grade: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register(): void {
    if (this.formData.email && this.formData.password && this.formData.firstName && this.formData.lastName) {
      this.authService.register(
        {
          name: `${this.formData.firstName} ${this.formData.lastName}`,
          email: this.formData.email,
          grade: this.formData.grade || 'Beginner'
        },
        this.formData.userType as 'student' | 'tutor'
      ).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
