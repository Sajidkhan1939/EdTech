import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TutorCardComponent } from '../../components/tutor-card/tutor-card.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { TutorService } from '../../services/tutor.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent, TutorCardComponent, CourseCardComponent],
  template: `
    <app-navbar></app-navbar>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Transform Your Education</h1>
        <p>Connect with world-class tutors and learn at your own pace. Access personalized education from experts in any subject.</p>
        <div class="hero-buttons">
          <button routerLink="/tutors" class="btn btn-primary btn-large">Find a Tutor</button>
          <button routerLink="/courses" class="btn btn-secondary btn-large">Explore Courses</button>
        </div>
      </div>
      <div class="hero-image">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="150" fill="url(#grad)" opacity="0.2"/>
          <circle cx="200" cy="200" r="100" fill="url(#grad)" opacity="0.4"/>
          <circle cx="200" cy="200" r="50" fill="url(#grad)" opacity="0.6"/>
        </svg>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stat-card">
        <div class="stat-number">82K+</div>
        <div class="stat-label">Students Enrolled</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">415</div>
        <div class="stat-label">Expert Tutors</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">100K+</div>
        <div class="stat-label">Classes Completed</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">99.5%</div>
        <div class="stat-label">Satisfaction Rate</div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <h2>Why Choose EdTech?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">👨‍🏫</div>
          <h3>Expert Teachers</h3>
          <p>Highly skilled educators with deep knowledge and proven teaching experience.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📚</div>
          <h3>Flexible Learning</h3>
          <p>Learn at your pace with customizable schedules that fit your lifestyle.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌍</div>
          <h3>Remote Learning</h3>
          <p>Access education from anywhere in the world with reliable online classes.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🏆</div>
          <h3>Proven Results</h3>
          <p>99.5% satisfaction rate with measurable improvement in student performance.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💬</div>
          <h3>24/7 Support</h3>
          <p>Get help whenever you need it with our dedicated support team.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">✨</div>
          <h3>Personalized Path</h3>
          <p>Customized learning paths tailored to your specific goals and pace.</p>
        </div>
      </div>
    </section>

    <!-- Top Tutors Section -->
    <section class="tutors-section">
      <h2>Featured Expert Tutors</h2>
      <div class="tutors-grid">
        <app-tutor-card *ngFor="let tutor of topTutors" [tutor]="tutor"></app-tutor-card>
      </div>
      <div class="section-cta">
        <button routerLink="/tutors" class="btn btn-primary">View All Tutors</button>
      </div>
    </section>

    <!-- Popular Courses Section -->
    <section class="courses-section">
      <h2>Popular Courses</h2>
      <div class="courses-grid">
        <app-course-card *ngFor="let course of popularCourses" [course]="course"></app-course-card>
      </div>
      <div class="section-cta">
        <button routerLink="/courses" class="btn btn-primary">Browse All Courses</button>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <h2>How EdTech Works</h2>
      <div class="steps-grid">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Create Your Profile</h3>
          <p>Sign up and tell us about your learning goals and interests.</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>Find Your Tutor</h3>
          <p>Browse our database of expert tutors and select the one that matches your needs.</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>Schedule Sessions</h3>
          <p>Book classes at a time that suits you with flexible scheduling options.</p>
        </div>
        <div class="step">
          <div class="step-number">4</div>
          <h3>Learn & Grow</h3>
          <p>Attend interactive sessions and track your progress with detailed reports.</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <h2>Ready to Transform Your Learning?</h2>
      <p>Join thousands of students who have already improved their skills with EdTech</p>
      <button routerLink="/register" class="btn btn-primary btn-large">Get Started Today</button>
    </section>

    <app-footer></app-footer>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6rem 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
      max-width: 1400px;
      margin: 0 auto;
    }

    .hero-content h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .hero-content p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      line-height: 1.6;
      opacity: 0.95;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
    }

    .btn-large {
      padding: 1rem 2rem;
      font-size: 1.1rem;
    }

    .hero-image {
      perspective: 1000px;
    }

    .hero-image svg {
      width: 100%;
      animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    .stats-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      max-width: 1400px;
      margin: -3rem auto 4rem;
      padding: 0 2rem;
    }

    .stat-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      transform: translateY(-2rem);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 800;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #6b7280;
      font-size: 1rem;
    }

    .features-section {
      max-width: 1400px;
      margin: 4rem auto;
      padding: 0 2rem;
    }

    .features-section h2 {
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 3rem;
      color: #1f2937;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .feature-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      border: 1px solid #e5e7eb;
      transition: all 0.3s;
    }

    .feature-card:hover {
      border-color: #667eea;
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.15);
      transform: translateY(-4px);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      font-size: 1.3rem;
      color: #1f2937;
      margin-bottom: 0.75rem;
    }

    .feature-card p {
      color: #6b7280;
      line-height: 1.6;
    }

    .tutors-section {
      max-width: 1400px;
      margin: 4rem auto;
      padding: 0 2rem;
    }

    .tutors-section h2 {
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 3rem;
      color: #1f2937;
    }

    .tutors-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .courses-section {
      background: #f9fafb;
      padding: 4rem 2rem;
      margin: 4rem 0;
    }

    .courses-section h2 {
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 3rem;
      color: #1f2937;
      max-width: 1400px;
      margin-left: auto;
      margin-right: auto;
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .section-cta {
      text-align: center;
      margin-top: 3rem;
    }

    .how-it-works {
      max-width: 1400px;
      margin: 4rem auto;
      padding: 0 2rem;
    }

    .how-it-works h2 {
      font-size: 2.5rem;
      text-align: center;
      margin-bottom: 3rem;
      color: #1f2937;
    }

    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .step {
      text-align: center;
      padding: 2rem;
      position: relative;
    }

    .step-number {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      font-size: 1.8rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }

    .step h3 {
      font-size: 1.3rem;
      color: #1f2937;
      margin-bottom: 0.75rem;
    }

    .step p {
      color: #6b7280;
      line-height: 1.6;
    }

    .cta-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
      margin: 4rem 0;
    }

    .cta-section h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .cta-section p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.95;
    }

    @media (max-width: 768px) {
      .hero {
        grid-template-columns: 1fr;
        padding: 3rem 1rem;
      }

      .hero-content h1 {
        font-size: 2rem;
      }

      .hero-content p {
        font-size: 1rem;
      }

      .hero-buttons {
        flex-direction: column;
      }

      .features-grid,
      .tutors-grid,
      .courses-grid,
      .steps-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  topTutors: any[] = [];
  popularCourses: any[] = [];

  constructor(
    private tutorService: TutorService,
    private courseService: CourseService
  ) {
    this.loadData();
  }

  private loadData(): void {
    this.tutorService.getTutors().subscribe(tutors => {
      this.topTutors = tutors.slice(0, 4);
    });

    this.courseService.getCourses().subscribe(courses => {
      this.popularCourses = courses.slice(0, 4);
    });
  }
}
