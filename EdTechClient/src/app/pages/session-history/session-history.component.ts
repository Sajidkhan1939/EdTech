import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-session-history',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="sessions-container">
      <div class="page-header">
        <h1>Session History</h1>
        <p>View all your completed and upcoming sessions</p>
      </div>

      <div class="sessions-content">
        <aside class="filter-sidebar">
          <h3>Filter</h3>
          <div class="filter-group">
            <label>
              <input type="radio" name="status" [(ngModel)]="filterStatus" (change)="applyFilter()" value="all"> All Sessions
            </label>
          </div>
          <div class="filter-group">
            <label>
              <input type="radio" name="status" [(ngModel)]="filterStatus" (change)="applyFilter()" value="completed"> Completed
            </label>
          </div>
          <div class="filter-group">
            <label>
              <input type="radio" name="status" [(ngModel)]="filterStatus" (change)="applyFilter()" value="upcoming"> Upcoming
            </label>
          </div>
        </aside>

        <main class="sessions-main">
          <!-- Stats -->
          <section class="stats-cards">
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <h4>Total Sessions</h4>
              <p class="stat-value">{{ allSessions.length }}</p>
            </div>
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <h4>Completed</h4>
              <p class="stat-value">{{ completedCount }}</p>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🔔</div>
              <h4>Upcoming</h4>
              <p class="stat-value">{{ upcomingCount }}</p>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <h4>Total Hours</h4>
              <p class="stat-value">{{ totalHours }}</p>
            </div>
          </section>

          <!-- Sessions Timeline -->
          <section class="sessions-list">
            <h2>Your Sessions</h2>

            <div *ngIf="filteredSessions.length > 0" class="sessions-timeline">
              <div *ngFor="let session of filteredSessions" class="session-item">
                <div class="session-date-badge">
                  <span class="month">{{ session.sessionDate | date: 'MMM' }}</span>
                  <span class="day">{{ session.sessionDate | date: 'dd' }}</span>
                </div>

                <div class="session-details">
                  <div class="session-header">
                    <h3>Session with {{ session.tutorId }}</h3>
                    <span [ngClass]="'status-badge ' + 'status-' + session.status">
                      {{ session.status | uppercase }}
                    </span>
                  </div>

                  <div class="session-info-grid">
                    <div class="info-item">
                      <span class="info-label">📅 Date</span>
                      <span class="info-value">{{ session.sessionDate | date: 'MMMM dd, yyyy' }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">🕐 Time</span>
                      <span class="info-value">{{ session.sessionTime }}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">⏳ Duration</span>
                      <span class="info-value">{{ session.duration }} hour(s)</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">💰 Amount</span>
                      <span class="info-value">\${{ session.amount }}</span>
                    </div>
                  </div>

                  <div class="session-notes" *ngIf="session.notes">
                    <p><strong>Notes:</strong> {{ session.notes }}</p>
                  </div>

                  <div class="session-actions">
                    <button class="btn btn-secondary btn-sm" *ngIf="session.status === 'completed'">Leave Review</button>
                    <button class="btn btn-secondary btn-sm">Download Receipt</button>
                    <button class="btn btn-secondary btn-sm" *ngIf="session.status !== 'completed'">Reschedule</button>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="filteredSessions.length === 0" class="empty-state">
              <p>No {{ filterStatus }} sessions found.</p>
            </div>
          </section>
        </main>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .sessions-container {
      background: #f9fafb;
      min-height: 100vh;
    }

    .page-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .page-header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .sessions-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem 3rem;
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 2rem;
    }

    .filter-sidebar {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      height: fit-content;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .filter-sidebar h3 {
      font-size: 1.1rem;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .filter-group {
      margin-bottom: 1rem;
    }

    .filter-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #6b7280;
      cursor: pointer;
    }

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .stat-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }

    .stat-card h4 {
      font-size: 0.85rem;
      color: #6b7280;
      text-transform: uppercase;
      margin: 0.5rem 0;
    }

    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: #667eea;
      margin: 0;
    }

    .sessions-list {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .sessions-list h2 {
      font-size: 1.5rem;
      color: #1f2937;
      margin-bottom: 2rem;
    }

    .sessions-timeline {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .session-item {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 2rem;
      padding: 1.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      transition: all 0.3s;
    }

    .session-item:hover {
      border-color: #667eea;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
    }

    .session-date-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
      text-align: center;
    }

    .month {
      font-size: 0.85rem;
      text-transform: uppercase;
      font-weight: 600;
    }

    .day {
      font-size: 2rem;
      font-weight: 800;
    }

    .session-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .session-details h3 {
      font-size: 1.2rem;
      color: #1f2937;
      margin: 0;
    }

    .status-badge {
      display: inline-block;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-completed {
      background: #d1fae5;
      color: #065f46;
    }

    .status-upcoming {
      background: #bfdbfe;
      color: #1e40af;
    }

    .status-pending {
      background: #fef3c7;
      color: #92400e;
    }

    .session-info-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
    }

    .info-label {
      font-size: 0.8rem;
      color: #9ca3af;
      margin-bottom: 0.25rem;
    }

    .info-value {
      font-weight: 600;
      color: #1f2937;
    }

    .session-notes {
      background: #f9fafb;
      padding: 1rem;
      border-radius: 6px;
      margin-bottom: 1rem;
    }

    .session-notes p {
      color: #6b7280;
      margin: 0;
      font-size: 0.9rem;
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
      padding: 3rem 2rem;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .sessions-content {
        grid-template-columns: 1fr;
      }

      .session-item {
        grid-template-columns: 1fr;
      }

      .session-info-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .session-actions {
        flex-direction: column;
      }

      .stats-cards {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `]
})
export class SessionHistoryComponent implements OnInit {
  allSessions: any[] = [];
  filteredSessions: any[] = [];
  filterStatus = 'all';
  completedCount = 0;
  upcomingCount = 0;
  totalHours = 0;
  currentUser: any;

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    if (this.currentUser) {
      // Load completed sessions
      this.bookingService.getCompletedBookings(this.currentUser.id).subscribe(completed => {
        // Load upcoming sessions
        this.bookingService.getUpcomingBookings(this.currentUser.id).subscribe(upcoming => {
          this.allSessions = [...completed, ...upcoming];
          this.updateStats();
          this.applyFilter();
        });
      });
    }
  }

  updateStats(): void {
    this.completedCount = this.allSessions.filter(s => s.status === 'completed').length;
    this.upcomingCount = this.allSessions.filter(s => s.status !== 'completed').length;
    this.totalHours = this.allSessions.reduce((sum, s) => sum + s.duration, 0);
  }

  applyFilter(): void {
    if (this.filterStatus === 'all') {
      this.filteredSessions = this.allSessions;
    } else if (this.filterStatus === 'completed') {
      this.filteredSessions = this.allSessions.filter(s => s.status === 'completed');
    } else {
      this.filteredSessions = this.allSessions.filter(s => s.status !== 'completed');
    }

    // Sort by date descending
    this.filteredSessions.sort((a, b) =>
      new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime()
    );
  }
}
