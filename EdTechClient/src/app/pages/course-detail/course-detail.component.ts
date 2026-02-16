import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="course-detail" *ngIf="course">
      <!-- Course Header -->
      <section class="course-header">
        <div class="header-content">
          <img [src]="course.image" [alt]="course.title" class="course-image">
          <div class="header-info">
            <span class="breadcrumb">{{ course.category }} > {{ course.level }}</span>
            <h1>{{ course.title }}</h1>
            <p class="description">{{ course.description }}</p>

            <div class="course-meta">
              <div class="meta-item">
                <span class="label">Rating</span>
                <span class="value">
                  <span class="stars">★</span>
                  {{ course.rating }}/5
                </span>
              </div>
              <div class="meta-item">
                <span class="label">Students</span>
                <span class="value">{{ course.students }}+</span>
              </div>
              <div class="meta-item">
                <span class="label">Duration</span>
                <span class="value">{{ course.duration }} hours</span>
              </div>
              <div class="meta-item">
                <span class="label">Level</span>
                <span class="value">{{ course.level }}</span>
              </div>
            </div>

            <div class="tutor-info">
              <img [src]="course.tutor.avatar" [alt]="course.tutor.name" class="tutor-avatar">
              <div>
                <p class="tutor-name">{{ course.tutor.name }}</p>
                <p class="tutor-title">Expert Instructor</p>
              </div>
            </div>
          </div>

          <div class="price-box">
            <div class="price">\${{ course.price }}</div>
            <button class="btn btn-primary btn-large">Enroll Now</button>
            <p class="guarantee">30-day money-back guarantee</p>
          </div>
        </div>
      </section>

      <div class="detail-container">
        <main class="detail-main">
          <!-- What You'll Learn -->
          <section class="learn-section">
            <h2>What You'll Learn</h2>
            <ul class="learning-points">
              <li><span class="check">✓</span> Master fundamental concepts</li>
              <li><span class="check">✓</span> Solve real-world problems</li>
              <li><span class="check">✓</span> Get hands-on practice</li>
              <li><span class="check">✓</span> Build project portfolio</li>
              <li><span class="check">✓</span> Receive personalized feedback</li>
              <li><span class="check">✓</span> Get certified upon completion</li>
            </ul>
          </section>

          <!-- Course Content -->
          <section class="content-section">
            <h2>Course Content</h2>
            <div class="lessons">
              <div class="lesson" *ngFor="let lesson of course.content; let i = index">
                <div class="lesson-header">
                  <span class="lesson-number">{{ i + 1 }}</span>
                  <span class="lesson-title">{{ lesson.title }}</span>
                  <span class="lesson-duration">{{ lesson.duration }} min</span>
                </div>
                <p class="lesson-desc">{{ lesson.description }}</p>
              </div>
            </div>
            <div *ngIf="course.content.length === 0" class="no-content">
              <p>Course content will be updated soon</p>
            </div>
          </section>

          <!-- Course Highlights -->
          <section class="highlights-section">
            <h2>Course Highlights</h2>
            <div class="highlights-grid">
              <div class="highlight">
                <div class="highlight-icon">📖</div>
                <h4>Comprehensive Curriculum</h4>
                <p>Well-structured lessons covering all important topics</p>
              </div>
              <div class="highlight">
                <div class="highlight-icon">🎯</div>
                <h4>Focused Learning</h4>
                <p>Clear learning objectives for each lesson</p>
              </div>
              <div class="highlight">
                <div class="highlight-icon">💪</div>
                <h4>Practical Skills</h4>
                <p>Hands-on exercises and real projects</p>
              </div>
              <div class="highlight">
                <div class="highlight-icon">🏆</div>
                <h4>Certification</h4>
                <p>Earn a recognized certificate upon completion</p>
              </div>
            </div>
          </section>

          <!-- Instructor -->
          <section class="instructor-section">
            <h2>About the Instructor</h2>
            <div class="instructor-card">
              <img [src]="course.tutor.avatar" [alt]="course.tutor.name" class="instructor-avatar">
              <div class="instructor-info">
                <h3>{{ course.tutor.name }}</h3>
                <p class="credentials">{{ course.tutor.yearsExperience }} years of experience</p>
                <p class="bio">{{ course.tutor.bio }}</p>
                <div class="instructor-stats">
                  <div class="inst-stat">
                    <span class="stat-value">{{ course.tutor.totalSessions }}</span>
                    <span class="stat-label">Classes Taught</span>
                  </div>
                  <div class="inst-stat">
                    <span class="stat-value">{{ course.tutor.rating }}</span>
                    <span class="stat-label">Rating</span>
                  </div>
                  <div class="inst-stat">
                    <span class="stat-value">{{ course.tutor.studentsSatisfaction }}%</span>
                    <span class="stat-label">Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <!-- Sidebar -->
        <aside class="detail-sidebar">
          <!-- Quick Facts -->
          <div class="facts-card">
            <h3>Quick Facts</h3>
            <div class="fact-item">
              <span class="fact-label">Instructor</span>
              <span class="fact-value">{{ course.tutor.name }}</span>
            </div>
            <div class="fact-item">
              <span class="fact-label">Category</span>
              <span class="fact-value">{{ course.category }}</span>
            </div>
            <div class="fact-item">
              <span class="fact-label">Level</span>
              <span class="fact-value">{{ course.level }}</span>
            </div>
            <div class="fact-item">
              <span class="fact-label">Duration</span>
              <span class="fact-value">{{ course.duration }} hours</span>
            </div>
          </div>

          <!-- Requirements -->
          <div class="requirements-card">
            <h3>Requirements</h3>
            <ul>
              <li>Basic internet connection</li>
              <li>Computer or mobile device</li>
              <li>Willingness to learn</li>
              <li>Time to practice</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>

    <div *ngIf="!course" class="loading">
      <p>Loading course details...</p>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .course-detail {
      background: #f9fafb;
      min-height: 100vh;
    }

    .course-header {
      background: white;
      border-bottom: 2px solid #e5e7eb;
      padding: 2rem;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 300px 1fr auto;
      gap: 3rem;
      align-items: start;
    }

    .course-image {
      width: 100%;
      height: 200px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid #667eea;
    }

    .breadcrumb {
      color: #667eea;
      font-size: 0.9rem;
      text-transform: uppercase;
      font-weight: 600;
    }

    .header-info h1 {
      font-size: 2rem;
      color: #1f2937;
      margin: 0.5rem 0 1rem 0;
      line-height: 1.3;
    }

    .description {
      color: #6b7280;
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .course-meta {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .meta-item {
      display: flex;
      flex-direction: column;
    }

    .meta-item .label {
      color: #9ca3af;
      font-size: 0.8rem;
      text-transform: uppercase;
    }

    .meta-item .value {
      color: #1f2937;
      font-weight: 600;
      font-size: 1.1rem;
      margin-top: 0.25rem;
    }

    .stars {
      color: #fbbf24;
      margin-right: 0.25rem;
    }

    .tutor-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .tutor-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }

    .tutor-name {
      font-weight: 600;
      color: #1f2937;
      margin: 0;
    }

    .tutor-title {
      color: #6b7280;
      font-size: 0.85rem;
      margin: 0;
    }

    .price-box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
      height: fit-content;
    }

    .price {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
    }

    .guarantee {
      font-size: 0.85rem;
      margin: 1rem 0 0 0;
      opacity: 0.9;
    }

    .detail-container {
      max-width: 1400px;
      margin: 2rem auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 1fr 300px;
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

    .learning-points {
      list-style: none;
      padding: 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .learning-points li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #1f2937;
      padding: 0.75rem 0;
    }

    .check {
      color: #10b981;
      font-weight: 700;
    }

    .lessons {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .lesson {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 1.5rem;
      transition: all 0.3s;
    }

    .lesson:hover {
      border-color: #667eea;
      box-shadow: 0 4px 8px rgba(102, 126, 234, 0.1);
    }

    .lesson-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }

    .lesson-number {
      background: #667eea;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.9rem;
    }

    .lesson-title {
      flex: 1;
      font-weight: 600;
      color: #1f2937;
    }

    .lesson-duration {
      color: #9ca3af;
      font-size: 0.85rem;
    }

    .lesson-desc {
      color: #6b7280;
      font-size: 0.95rem;
      margin: 0;
      padding-left: 3rem;
    }

    .no-content {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
    }

    .highlights-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .highlight {
      padding: 1.5rem;
      background: #f9fafb;
      border-radius: 8px;
      text-align: center;
    }

    .highlight-icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .highlight h4 {
      color: #1f2937;
      margin: 0.5rem 0;
    }

    .highlight p {
      color: #6b7280;
      font-size: 0.9rem;
      margin: 0;
    }

    .instructor-card {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 2rem;
      padding: 2rem;
      background: #f9fafb;
      border-radius: 8px;
    }

    .instructor-avatar {
      width: 150px;
      height: 150px;
      border-radius: 12px;
      object-fit: cover;
    }

    .instructor-info h3 {
      font-size: 1.3rem;
      color: #1f2937;
      margin: 0 0 0.5rem 0;
    }

    .credentials {
      color: #667eea;
      font-weight: 600;
      margin: 0 0 0.75rem 0;
    }

    .bio {
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .instructor-stats {
      display: flex;
      gap: 2rem;
    }

    .inst-stat {
      display: flex;
      flex-direction: column;
    }

    .inst-stat .stat-value {
      color: #667eea;
      font-weight: 700;
      font-size: 1.3rem;
    }

    .inst-stat .stat-label {
      color: #9ca3af;
      font-size: 0.8rem;
      text-transform: uppercase;
    }

    .detail-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .facts-card,
    .requirements-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .facts-card h3,
    .requirements-card h3 {
      font-size: 1.1rem;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .fact-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .fact-item:last-child {
      border-bottom: none;
    }

    .fact-label {
      color: #6b7280;
      font-size: 0.9rem;
    }

    .fact-value {
      color: #1f2937;
      font-weight: 600;
    }

    .requirements-card ul {
      list-style: none;
      padding: 0;
    }

    .requirements-card li {
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
      color: #6b7280;
    }

    .requirements-card li:last-child {
      border-bottom: none;
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

      .learning-points {
        grid-template-columns: 1fr;
      }

      .highlights-grid {
        grid-template-columns: 1fr;
      }

      .instructor-card {
        grid-template-columns: 1fr;
      }

      .course-meta {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CourseDetailComponent implements OnInit {
  course: any;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.courseService.getCourseById(id).subscribe(course => {
        this.course = course;
      });
    });
  }
}
