import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="profile-container">
      <div class="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account information</p>
      </div>

      <div class="profile-content">
        <main class="profile-main">
          <!-- Profile Picture Section -->
          <section class="profile-pic-section">
            <h2>Profile Picture</h2>
            <div class="pic-upload">
              <img [src]="currentUser?.avatar" [alt]="currentUser?.name" class="profile-image">
              <div class="upload-actions">
                <button class="btn btn-secondary">Upload New Photo</button>
                <button class="btn btn-secondary">Remove Photo</button>
              </div>
            </div>
          </section>

          <!-- Basic Information -->
          <section class="form-section">
            <h2>Basic Information</h2>
            <div class="form-row">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  [(ngModel)]="profileData.name"
                  name="name"
                  class="form-input"
                >
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  [(ngModel)]="profileData.email"
                  name="email"
                  class="form-input"
                >
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  [(ngModel)]="profileData.phone"
                  name="phone"
                  class="form-input"
                >
              </div>
              <div class="form-group">
                <label for="location">Location</label>
                <input 
                  type="text" 
                  id="location"
                  [(ngModel)]="profileData.location"
                  name="location"
                  class="form-input"
                >
              </div>
            </div>
          </section>

          <!-- Student/Tutor Specific -->
          <section class="form-section" *ngIf="userType === 'student'">
            <h2>Student Information</h2>
            <div class="form-row">
              <div class="form-group">
                <label for="grade">Grade/Level</label>
                <select id="grade" [(ngModel)]="profileData.grade" name="grade" class="form-select">
                  <option value="">Select Grade</option>
                  <option value="Elementary">Elementary School</option>
                  <option value="Middle">Middle School</option>
                  <option value="High">High School</option>
                  <option value="College">College/University</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
              <div class="form-group">
                <label for="interests">Areas of Interest</label>
                <input 
                  type="text" 
                  id="interests"
                  [(ngModel)]="profileData.interests"
                  name="interests"
                  placeholder="e.g., Math, Science, English"
                  class="form-input"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="goals">Learning Goals</label>
              <textarea 
                id="goals"
                [(ngModel)]="profileData.goals"
                name="goals"
                placeholder="Tell us about your learning objectives"
                class="form-textarea"
                rows="4"
              ></textarea>
            </div>
          </section>

          <!-- Security Section -->
          <section class="form-section">
            <h2>Security & Password</h2>
            <div class="form-group">
              <label for="currentPassword">Current Password</label>
              <input 
                type="password" 
                id="currentPassword"
                [(ngModel)]="passwordData.currentPassword"
                name="currentPassword"
                class="form-input"
              >
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="newPassword">New Password</label>
                <input 
                  type="password" 
                  id="newPassword"
                  [(ngModel)]="passwordData.newPassword"
                  name="newPassword"
                  class="form-input"
                >
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword"
                  [(ngModel)]="passwordData.confirmPassword"
                  name="confirmPassword"
                  class="form-input"
                >
              </div>
            </div>
          </section>

          <!-- Preferences -->
          <section class="form-section">
            <h2>Preferences</h2>
            <div class="checkbox-group">
              <label>
                <input type="checkbox" class="checkbox"> Email notifications for new messages
              </label>
              <label>
                <input type="checkbox" class="checkbox" checked> Class reminders
              </label>
              <label>
                <input type="checkbox" class="checkbox" checked> Newsletter
              </label>
              <label>
                <input type="checkbox" class="checkbox"> Marketing emails
              </label>
            </div>
          </section>

          <div class="form-actions">
            <button (click)="saveProfile()" class="btn btn-primary btn-large">Save Changes</button>
            <button class="btn btn-secondary btn-large">Cancel</button>
          </div>
        </main>

        <!-- Sidebar -->
        <aside class="profile-sidebar">
          <!-- Account Status -->
          <div class="status-card">
            <h3>Account Status</h3>
            <div class="status-item">
              <span class="label">Status</span>
              <span class="value active">Active</span>
            </div>
            <div class="status-item">
              <span class="label">Member Since</span>
              <span class="value">January 2024</span>
            </div>
            <div class="status-item">
              <span class="label">Sessions</span>
              <span class="value">12</span>
            </div>
          </div>

          <!-- Danger Zone -->
          <div class="danger-card">
            <h3>Danger Zone</h3>
            <p>Proceed with caution. These actions cannot be undone.</p>
            <button class="btn btn-danger btn-block">Deactivate Account</button>
            <button class="btn btn-danger btn-block">Delete Account</button>
          </div>

          <!-- Support -->
          <div class="support-card">
            <h3>Need Help?</h3>
            <p>Having trouble? Our support team is here to help.</p>
            <button class="btn btn-secondary btn-block">Contact Support</button>
          </div>
        </aside>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .profile-container {
      background: #f9fafb;
      min-height: 100vh;
    }

    .profile-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
      margin-bottom: 2rem;
    }

    .profile-header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .profile-header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .profile-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem 3rem;
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
    }

    .profile-main {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    section {
      margin-bottom: 2.5rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #e5e7eb;
    }

    section:last-of-type {
      border-bottom: none;
    }

    h2 {
      font-size: 1.3rem;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .profile-pic-section {
      text-align: center;
    }

    .pic-upload {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .profile-image {
      width: 150px;
      height: 150px;
      border-radius: 12px;
      object-fit: cover;
      border: 4px solid #667eea;
    }

    .upload-actions {
      display: flex;
      gap: 1rem;
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
    .form-select,
    .form-textarea {
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 6px;
      font-size: 0.95rem;
      transition: border-color 0.3s;
      font-family: inherit;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #6b7280;
      cursor: pointer;
    }

    .checkbox {
      cursor: pointer;
      width: 18px;
      height: 18px;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn-large {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      flex: 1;
    }

    .profile-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .status-card,
    .danger-card,
    .support-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .status-card h3,
    .danger-card h3,
    .support-card h3 {
      font-size: 1.05rem;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .status-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .status-item:last-child {
      border-bottom: none;
    }

    .status-item .label {
      color: #6b7280;
    }

    .status-item .value {
      font-weight: 600;
      color: #1f2937;
    }

    .value.active {
      color: #10b981;
    }

    .danger-card p {
      color: #6b7280;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .btn-danger {
      background: #ef4444;
      color: white;
    }

    .btn-danger:hover {
      background: #dc2626;
    }

    .support-card p {
      color: #6b7280;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .btn-block {
      width: 100%;
      margin-bottom: 0.75rem;
    }

    .btn-block:last-child {
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      .profile-content {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .upload-actions {
        flex-direction: column;
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userType: string | null = null;
  profileData = {
    name: '',
    email: '',
    phone: '',
    location: '',
    grade: '',
    interests: '',
    goals: ''
  };
  passwordData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.userType = this.authService.getUserType();

    if (this.currentUser) {
      this.profileData.name = this.currentUser.name || '';
      this.profileData.email = this.currentUser.email || '';
    }
  }

  saveProfile(): void {
    alert('Profile updated successfully!');
  }
}
