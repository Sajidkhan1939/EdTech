import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tutor-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="tutor-card">
      <div class="tutor-header">
        <img [src]="tutor.avatar" [alt]="tutor.name" class="tutor-avatar">
        <div class="rating-badge">
          <span class="stars">★</span>
          <span class="rating">{{ tutor.rating }}</span>
        </div>
      </div>

      <div class="tutor-body">
        <h3>{{ tutor.name }}</h3>
        <p class="specializations">
          {{ tutor.specializations.slice(0, 2).join(', ') }}
        </p>
        <p class="bio">{{ tutor.bio }}</p>

        <div class="stats">
          <div class="stat">
            <span class="stat-value">{{ tutor.totalSessions }}</span>
            <span class="stat-label">Classes</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ tutor.studentsSatisfaction }}%</span>
            <span class="stat-label">Satisfaction</span>
          </div>
        </div>

        <div class="price-section">
          <span class="price">\${{ tutor.hourlyRate }}/hr</span>
        </div>

        <button [routerLink]="['/tutors', tutor.id]" class="btn btn-primary btn-block">
          View Profile
        </button>
      </div>
    </div>
  `,
  styles: [`
    .tutor-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .tutor-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .tutor-header {
      position: relative;
      height: 200px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .tutor-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid white;
      object-fit: cover;
    }

    .rating-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: #fbbf24;
      padding: 6px 12px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 600;
      color: #1f2937;
    }

    .stars {
      font-size: 1.1rem;
    }

    .tutor-body {
      padding: 1.5rem;
    }

    .tutor-body h3 {
      font-size: 1.3rem;
      margin: 0 0 0.5rem 0;
      color: #1f2937;
    }

    .specializations {
      color: #667eea;
      font-weight: 500;
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }

    .bio {
      color: #6b7280;
      font-size: 0.9rem;
      margin: 0.75rem 0;
      line-height: 1.5;
    }

    .stats {
      display: flex;
      gap: 1rem;
      margin: 1.25rem 0;
      padding: 1rem 0;
      border-top: 1px solid #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
    }

    .stat {
      flex: 1;
      text-align: center;
    }

    .stat-value {
      display: block;
      font-weight: 700;
      color: #667eea;
      font-size: 1.1rem;
    }

    .stat-label {
      display: block;
      color: #6b7280;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }

    .price-section {
      margin: 1rem 0;
    }

    .price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #667eea;
    }

    .btn-block {
      width: 100%;
      margin-top: 1rem;
    }
  `]
})
export class TutorCardComponent {
  @Input() tutor: any;
}
