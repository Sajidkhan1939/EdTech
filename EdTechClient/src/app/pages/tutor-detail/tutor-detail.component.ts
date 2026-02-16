import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TutorService } from '../../services/tutor.service';

@Component({
  selector: 'app-tutor-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="tutor-detail" *ngIf="tutor">
      <!-- Profile Header -->
      <section class="profile-header">
        <div class="header-content">
          <img [src]="tutor.avatar" [alt]="tutor.name" class="avatar">
          <div class="header-info">
            <h1>{{ tutor.name }}</h1>
            <div class="rating">
              <span class="stars">★★★★★</span>
              <span class="rating-text">{{ tutor.rating }} (from {{ tutor.reviews.length }} reviews)</span>
            </div>
            <p class="bio">{{ tutor.bio }}</p>
            <div class="header-stats">
              <div class="stat">
                <span class="label">Total Classes</span>
                <span class="value">{{ tutor.totalSessions }}</span>
              </div>
              <div class="stat">
                <span class="label">Satisfaction</span>
                <span class="value">{{ tutor.studentsSatisfaction }}%</span>
              </div>
              <div class="stat">
                <span class="label">Experience</span>
                <span class="value">{{ tutor.yearsExperience }} years</span>
              </div>
            </div>
          </div>
          <div class="price-box">
            <div class="price">\${{ tutor.hourlyRate }}/hour</div>
            <button routerLink="['/booking', tutor.id]" class="btn btn-primary btn-large">Book Now</button>
          </div>
        </div>
      </section>

      <!-- Main Content -->
      <div class="detail-container">
        <main class="detail-main">
          <!-- About Section -->
          <section class="about-section">
            <h2>About {{ tutor.name }}</h2>
            <p>{{ tutor.bio }}</p>
          </section>

          <!-- Specializations -->
          <section class="specializations-section">
            <h2>Specializations</h2>
            <div class="badges">
              <span *ngFor="let spec of tutor.specializations" class="badge">{{ spec }}</span>
            </div>
          </section>

          <!-- Languages -->
          <section class="languages-section">
            <h2>Languages</h2>
            <div class="badges">
              <span *ngFor="let lang of tutor.languages" class="badge">{{ lang }}</span>
            </div>
          </section>

          <!-- Certificates -->
          <section class="certificates-section">
            <h2>Certificates & Education</h2>
            <ul class="certificate-list">
              <li *ngFor="let cert of tutor.certificates">
                <span class="cert-icon">📜</span>
                {{ cert }}
              </li>
            </ul>
          </section>

          <!-- Reviews Section -->
          <section class="reviews-section">
            <h2>Student Reviews ({{ tutor.reviews.length }})</h2>
            <div class="reviews-list">
              <div *ngFor="let review of tutor.reviews" class="review-card">
                <div class="review-header">
                  <div class="review-rating">
                    <span class="stars-small">★★★★★</span>
                    <span>{{ review.rating }}/5</span>
                  </div>
                  <span class="review-date">{{ review.date | date: 'short' }}</span>
                </div>
                <p class="review-comment">{{ review.comment }}</p>
                <span *ngIf="review.verified" class="verified-badge">✓ Verified</span>
              </div>

              <div *ngIf="tutor.reviews.length === 0" class="no-reviews">
                <p>No reviews yet. Be the first to review this tutor!</p>
              </div>
            </div>
          </section>
        </main>

        <!-- Sidebar -->
        <aside class="detail-sidebar">
          <!-- Availability -->
          <div class="availability-card">
            <h3>Availability</h3>
            <div class="availability-list">
              <div *ngFor="let avail of tutor.availability" class="availability-item">
                <span class="day">{{ avail.dayOfWeek }}</span>
                <span class="time">{{ avail.startTime }} - {{ avail.endTime }}</span>
                <span *ngIf="avail.isAvailable" class="available">Available</span>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="stats-card">
            <h3>Quick Stats</h3>
            <div class="stat-item">
              <span class="stat-label">Teaching Since</span>
              <span class="stat-value">{{ 2024 - tutor.yearsExperience }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Response Time</span>
              <span class="stat-value">Within 1 hour</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Cancellation Rate</span>
              <span class="stat-value">&lt; 1%</span>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="contact-card">
            <h3>Get In Touch</h3>
            <p>Have questions? Contact this tutor directly.</p>
            <button class="btn btn-secondary btn-block">Send Message</button>
          </div>
        </aside>
      </div>
    </div>

    <div *ngIf="!tutor" class="loading">
      <p>Loading tutor profile...</p>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .tutor-detail {
      background: #f9fafb;
      min-height: 100vh;
    }

    .profile-header {
      background: white;
      border-bottom: 2px solid #e5e7eb;
      padding: 3rem 2rem;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 3rem;
      align-items: start;
    }

    .avatar {
      width: 180px;
      height: 180px;
      border-radius: 12px;
      object-fit: cover;
      border: 4px solid #667eea;
    }

    .header-info h1 {
      font-size: 2.5rem;
      color: #1f2937;
      margin: 0 0 1rem 0;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .stars {
      color: #fbbf24;
      font-size: 1.2rem;
    }

    .rating-text {
      color: #6b7280;
    }

    .bio {
      color: #6b7280;
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .header-stats {
      display: flex;
      gap: 2rem;
    }

    .stat {
      display: flex;
      flex-direction: column;
    }

    .stat .label {
      color: #9ca3af;
      font-size: 0.85rem;
      text-transform: uppercase;
    }

    .stat .value {
      color: #667eea;
      font-weight: 700;
      font-size: 1.3rem;
    }

    .price-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
    }

    .price {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
    }

    .detail-container {
      max-width: 1400px;
      margin: 2rem auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
    }

    .detail-main {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    section {
      margin-bottom: 3rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #e5e7eb;
    }

    section:last-child {
      border-bottom: none;
    }

    h2 {
      font-size: 1.5rem;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    .badge {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.6rem 1.2rem;
      border-radius: 20px;
      font-weight: 500;
      font-size: 0.95rem;
    }

    .certificate-list {
      list-style: none;
      padding: 0;
    }

    .certificate-list li {
      padding: 1rem;
      background: #f3f4f6;
      border-radius: 8px;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #1f2937;
    }

    .cert-icon {
      font-size: 1.3rem;
    }

    .reviews-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .review-card {
      padding: 1.5rem;
      background: #f9fafb;
      border-left: 4px solid #667eea;
      border-radius: 8px;
    }

    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .review-rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .stars-small {
      color: #fbbf24;
      font-size: 0.9rem;
    }

    .review-date {
      color: #9ca3af;
      font-size: 0.85rem;
    }

    .review-comment {
      color: #4b5563;
      line-height: 1.6;
      margin: 0;
    }

    .verified-badge {
      display: inline-block;
      background: #d1fae5;
      color: #065f46;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.8rem;
      margin-top: 0.75rem;
    }

    .no-reviews {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
    }

    .detail-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .availability-card,
    .stats-card,
    .contact-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .availability-card h3,
    .stats-card h3,
    .contact-card h3 {
      font-size: 1.1rem;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .availability-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .availability-item {
      padding: 0.75rem;
      background: #f3f4f6;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
    }

    .day {
      font-weight: 600;
      color: #1f2937;
    }

    .time {
      color: #6b7280;
    }

    .available {
      background: #d1fae5;
      color: #065f46;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .stat-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .stat-item:last-child {
      border-bottom: none;
    }

    .stat-label {
      color: #6b7280;
      font-size: 0.9rem;
    }

    .stat-value {
      color: #667eea;
      font-weight: 600;
    }

    .contact-card p {
      color: #6b7280;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .btn-block {
      width: 100%;
    }

    .btn-large {
      width: 100%;
      padding: 1rem 1.5rem;
      font-size: 1.05rem;
    }

    .loading {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .header-content {
        grid-template-columns: 1fr;
      }

      .detail-container {
        grid-template-columns: 1fr;
      }

      .header-stats {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `]
})
export class TutorDetailComponent implements OnInit {
  tutor: any;

  constructor(
    private route: ActivatedRoute,
    private tutorService: TutorService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.tutorService.getTutorById(id).subscribe(tutor => {
        this.tutor = tutor;
        if (tutor) {
          // Load reviews
          this.tutorService.getTutorReviews(id).subscribe(reviews => {
            this.tutor.reviews = reviews;
          });
        }
      });
    });
  }
}
