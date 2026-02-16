import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="course-card" [routerLink]="['/courses', course.id]">
      <div class="course-image">
        <img [src]="course.image" [alt]="course.title" class="image">
        <div class="course-level">{{ course.level }}</div>
        <div class="course-rating">
          <span class="stars">★</span>
          <span>{{ course.rating }}</span>
        </div>
      </div>

      <div class="course-content">
        <div class="course-category">{{ course.category }}</div>
        <h3>{{ course.title }}</h3>
        <p class="course-description">{{ course.description }}</p>

        <div class="course-tutor">
          <img [src]="course.tutor.avatar" [alt]="course.tutor.name" class="tutor-avatar">
          <div>
            <p class="tutor-name">{{ course.tutor.name }}</p>
            <p class="tutor-role">Expert Instructor</p>
          </div>
        </div>

        <div class="course-meta">
          <span class="students">{{ course.students }} students</span>
          <span class="duration">{{ course.duration }} hours</span>
        </div>

        <div class="course-footer">
          <span class="price">\${{ course.price }}</span>
          <button class="btn btn-primary">Enroll Now</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .course-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;
      display: flex;
      flex-direction: column;
    }

    .course-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }

    .course-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    .course-card:hover .image {
      transform: scale(1.05);
    }

    .course-level {
      position: absolute;
      top: 12px;
      left: 12px;
      background: #667eea;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .course-rating {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(251, 191, 36, 0.95);
      color: #1f2937;
      padding: 6px 10px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .stars {
      font-size: 1rem;
    }

    .course-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .course-category {
      color: #667eea;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    .course-content h3 {
      font-size: 1.2rem;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 0.75rem 0;
      line-height: 1.4;
    }

    .course-description {
      color: #6b7280;
      font-size: 0.9rem;
      margin-bottom: 1rem;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .course-tutor {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin: 1rem 0;
      padding: 0.75rem 0;
      border-top: 1px solid #e5e7eb;
    }

    .tutor-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .tutor-name {
      font-weight: 600;
      color: #1f2937;
      margin: 0;
      font-size: 0.95rem;
    }

    .tutor-role {
      color: #9ca3af;
      font-size: 0.8rem;
      margin: 0;
    }

    .course-meta {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
      font-size: 0.85rem;
      color: #6b7280;
    }

    .course-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding-top: 1rem;
    }

    .price {
      font-size: 1.4rem;
      font-weight: 700;
      color: #667eea;
    }

    .btn {
      flex: 1;
      margin-left: 1rem;
    }
  `]
})
export class CourseCardComponent {
  @Input() course: any;
}
