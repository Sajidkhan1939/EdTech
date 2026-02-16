import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="dashboard-container">
      <div class="dashboard-header">
        <div class="header-content">
          <h1>Dashboard</h1>
          <p>Welcome back, {{ currentUser?.name }}!</p>
        </div>
      </div>

      <div class="dashboard-content">
        <!-- Statistics Section -->
        <section class="stats-section">
          <h2>Your Learning Journey</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📚</div>
              <h3>Total Classes</h3>
              <p class="stat-value">{{ stats.totalClasses }}</p>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <h3>Hours Learned</h3>
              <p class="stat-value">{{ stats.hoursLearned }}</p>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🎓</div>
              <h3>Courses Completed</h3>
              <p class="stat-value">{{ stats.coursesCompleted }}</p>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⭐</div>
              <h3>Average Rating</h3>
              <p class="stat-value">{{ stats.averageRating }}</p>
            </div>
          </div>
        </section>

        <div class="dashboard-grid">
          <!-- Main Content -->
          <main class="dashboard-main">
            <!-- Upcoming Sessions -->
            <section class="upcoming-section">
              <div class="section-header">
                <h2>Upcoming Sessions</h2>
                <a routerLink="/booking" class="btn btn-primary">Book New Session</a>
              </div>

              <div *ngIf="upcomingSessions.length > 0" class="sessions-list">
                <div *ngFor="let session of upcomingSessions" class="session-card">
                  <div class="session-date">
                    <span class="date-day">{{ session.sessionDate | date: 'dd' }}</span>
                    <span class="date-month">{{ session.sessionDate | date: 'MMM' }}</span>
                  </div>
                  <div class="session-info">
                    <h4>Session with {{ session.tutorId }}</h4>
                    <p class="session-time">{{ session.sessionTime }}</p>
                    <p class="session-status" [ngClass]="'status-' + session.status">
                      {{ session.status | uppercase }}
                    </p>
                  </div>
                  <div class="session-actions">
                    <button class="btn btn-secondary btn-sm">Reschedule</button>
                    <button class="btn btn-secondary btn-sm">Cancel</button>
                  </div>
                </div>
              </div>

              <div *ngIf="upcomingSessions.length === 0" class="empty-state">
                <p>No upcoming sessions. <a routerLink="/booking">Book your first session</a></p>
              </div>
            </section>

            <!-- Quick Actions -->
            <section class="quick-actions">
              <h2>Quick Actions</h2>
              <div class="actions-grid">
                <button routerLink="/tutors" class="action-card">
                  <span class="action-icon">👨‍🏫</span>
                  <span class="action-label">Find a Tutor</span>
                </button>
                <button routerLink="/courses" class="action-card">
                  <span class="action-icon">📚</span>
                  <span class="action-label">Browse Courses</span>
                </button>
                <button routerLink="/sessions" class="action-card">
                  <span class="action-icon">📋</span>
                  <span class="action-label">Session History</span>
                </button>
                <button routerLink="/messages" class="action-card">
                  <span class="action-icon">💬</span>
                  <span class="action-label">Messages</span>
                </button>
              </div>
            </section>
          </main>

          <!-- Sidebar -->
          <aside class="dashboard-sidebar">
            <!-- User Info Card -->
            <div class="user-card">
              <img [src]="currentUser?.avatar" [alt]="currentUser?.name" class="user-avatar">
              <h3>{{ currentUser?.name }}</h3>
              <p class="user-role">{{ userType === 'student' ? 'Student' : 'Tutor' }}</p>
              <button routerLink="/profile" class="btn btn-secondary btn-block">Edit Profile</button>
            </div>

            <!-- Recent Notifications -->
            <div class="notifications-card">
              <h3>Notifications</h3>
              <div class="notifications-list">
                <div class="notification">
                  <span class="notif-icon">🎉</span>
                  <div class="notif-content">
                    <p class="notif-title">Session Completed!</p>
                    <p class="notif-time">2 hours ago</p>
                  </div>
                </div>
                <div class="notification">
                  <span class="notif-icon">💬</span>
                  <div class="notif-content">
                    <p class="notif-title">New message from Sarah</p>
                    <p class="notif-time">4 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="quick-stats-card">
              <h3>This Month</h3>
              <div class="quick-stat">
                <span class="label">Classes</span>
                <span class="value">8</span>
              </div>
              <div class="quick-stat">
                <span class="label">Hours</span>
                <span class="value">16</span>
              </div>
              <div class="quick-stat">
                <span class="label">Spent</span>
                <span class="value">\$320</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .dashboard-container {
      background: #f9fafb;
      min-height: 100vh;
    }

    .dashboard-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 3rem 2rem;
      margin-bottom: 2rem;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .dashboard-header p {
      font-size: 1.1rem;
      opacity: 0.95;
    }

    .dashboard-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .stats-section {
      margin-bottom: 3rem;
    }

    .stats-section h2 {
      font-size: 1.5rem;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    }

    .stat-icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
      display: block;
    }

    .stat-card h3 {
      font-size: 0.95rem;
      color: #6b7280;
      text-transform: uppercase;
      margin: 0 0 0.75rem 0;
      font-weight: 500;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 800;
      color: #667eea;
      margin: 0;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .dashboard-main {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .upcoming-section,
    .quick-actions {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e5e7eb;
    }

    .section-header h2 {
      font-size: 1.3rem;
      color: #1f2937;
      margin: 0;
    }

    .sessions-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .session-card {
      display: grid;
      grid-template-columns: 80px 1fr auto;
      gap: 1.5rem;
      padding: 1.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      align-items: center;
      transition: all 0.3s;
    }

    .session-card:hover {
      border-color: #667eea;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
    }

    .session-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
    }

    .date-day {
      font-size: 1.8rem;
      font-weight: 700;
    }

    .date-month {
      font-size: 0.85rem;
      text-transform: uppercase;
    }

    .session-info {
      flex: 1;
    }

    .session-info h4 {
      color: #1f2937;
      margin: 0 0 0.5rem 0;
    }

    .session-time {
      color: #6b7280;
      font-size: 0.9rem;
      margin: 0 0 0.5rem 0;
    }

    .session-status {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      margin: 0;
    }

    .status-confirmed {
      background: #d1fae5;
      color: #065f46;
    }

    .status-pending {
      background: #fef3c7;
      color: #92400e;
    }

    .session-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-sm {
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
    }

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
    }

    .empty-state a {
      color: #667eea;
      font-weight: 600;
      text-decoration: none;
    }

    .quick-actions h2 {
      font-size: 1.3rem;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .action-card {
      padding: 1.5rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .action-card:hover {
      border-color: #667eea;
      background: #f3f4f6;
      transform: translateY(-2px);
    }

    .action-icon {
      font-size: 2rem;
    }

    .action-label {
      font-weight: 600;
      color: #1f2937;
    }

    .dashboard-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .user-card,
    .notifications-card,
    .quick-stats-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .user-card {
      text-align: center;
    }

    .user-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #667eea;
      margin-bottom: 1rem;
    }

    .user-card h3 {
      font-size: 1.2rem;
      color: #1f2937;
      margin: 0 0 0.25rem 0;
    }

    .user-role {
      color: #667eea;
      font-size: 0.9rem;
      margin: 0 0 1rem 0;
    }

    .btn-block {
      width: 100%;
    }

    .notifications-card h3,
    .quick-stats-card h3 {
      font-size: 1rem;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .notifications-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .notification {
      display: flex;
      gap: 0.75rem;
      padding: 0.75rem;
      background: #f9fafb;
      border-radius: 6px;
    }

    .notif-icon {
      font-size: 1.3rem;
      flex-shrink: 0;
    }

    .notif-content {
      flex: 1;
    }

    .notif-title {
      font-weight: 600;
      color: #1f2937;
      font-size: 0.9rem;
      margin: 0;
    }

    .notif-time {
      color: #9ca3af;
      font-size: 0.8rem;
      margin: 0;
    }

    .quick-stat {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .quick-stat:last-child {
      border-bottom: none;
    }

    .quick-stat .label {
      color: #6b7280;
    }

    .quick-stat .value {
      font-weight: 700;
      color: #667eea;
    }

    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }

      .session-card {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }

      .section-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  userType: string | null = null;
  upcomingSessions: any[] = [];
  stats = {
    totalClasses: 12,
    hoursLearned: 24,
    coursesCompleted: 2,
    averageRating: 4.8
  };

  constructor(
    private authService: AuthService,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.userType = this.authService.getUserType();

    if (this.currentUser) {
      this.bookingService.getUpcomingBookings(this.currentUser.id).subscribe(bookings => {
        this.upcomingSessions = bookings.slice(0, 3);
      });
    }
  }
}
