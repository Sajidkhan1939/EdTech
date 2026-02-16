import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent, FooterComponent, CourseCardComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="page-header">
      <h1>Explore Our Courses</h1>
      <p>100K+ classes completed by students worldwide</p>
    </div>

    <div class="courses-page">
      <aside class="filters-sidebar">
        <h3>Filters</h3>

        <div class="filter-group">
          <label for="search">Search Courses</label>
          <input 
            type="text" 
            id="search"
            [(ngModel)]="searchQuery"
            (ngModelChange)="applyFilters()"
            placeholder="Search by title..."
            class="form-input"
          >
        </div>

        <div class="filter-group">
          <label for="category">Category</label>
          <select 
            id="category"
            [(ngModel)]="filters.category"
            (ngModelChange)="applyFilters()"
            class="form-select"
          >
            <option value="">All Categories</option>
            <option value="Mathematics">Mathematics</option>
            <option value="English">English</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="History">History</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="level">Level</label>
          <select 
            id="level"
            [(ngModel)]="filters.level"
            (ngModelChange)="applyFilters()"
            class="form-select"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="High School">High School</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="maxPrice">Max Price</label>
          <input 
            type="number" 
            id="maxPrice"
            [(ngModel)]="filters.maxPrice"
            (ngModelChange)="applyFilters()"
            placeholder="Enter price..."
            class="form-input"
          >
        </div>

        <div class="filter-group">
          <label for="minRating">Min Rating</label>
          <select 
            id="minRating"
            [(ngModel)]="filters.minRating"
            (ngModelChange)="applyFilters()"
            class="form-select"
          >
            <option [value]="null">All Ratings</option>
            <option [value]="4">4+ Stars</option>
            <option [value]="4.5">4.5+ Stars</option>
            <option [value]="4.8">4.8+ Stars</option>
          </select>
        </div>

        <button (click)="resetFilters()" class="btn btn-secondary btn-block">Reset Filters</button>
      </aside>

      <main class="courses-main">
        <div class="courses-header">
          <div class="result-count">
            Found {{ filteredCourses.length }} courses
          </div>
          <div class="sort-options">
            <select [(ngModel)]="sortBy" (ngModelChange)="applySorting()" class="form-select">
              <option value="rating">Top Rated</option>
              <option value="price">Price: Low to High</option>
              <option value="students">Most Popular</option>
            </select>
          </div>
        </div>

        <div class="courses-grid">
          <app-course-card *ngFor="let course of filteredCourses" [course]="course"></app-course-card>
        </div>

        <div *ngIf="filteredCourses.length === 0" class="no-results">
          <p>No courses found matching your criteria. Try adjusting your filters.</p>
        </div>
      </main>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 4rem 2rem;
      text-align: center;
    }

    .page-header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .page-header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .courses-page {
      max-width: 1400px;
      margin: 0 auto;
      padding: 3rem 2rem;
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 3rem;
    }

    .filters-sidebar {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      height: fit-content;
      position: sticky;
      top: 100px;
    }

    .filters-sidebar h3 {
      font-size: 1.3rem;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .filter-group {
      margin-bottom: 1.5rem;
    }

    .filter-group label {
      display: block;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    .form-input,
    .form-select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 0.95rem;
      transition: border-color 0.3s;
    }

    .form-input:focus,
    .form-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .courses-main {
      display: flex;
      flex-direction: column;
    }

    .courses-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid #e5e7eb;
    }

    .result-count {
      font-size: 1rem;
      color: #6b7280;
      font-weight: 500;
    }

    .sort-options {
      min-width: 200px;
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
    }

    .no-results {
      text-align: center;
      padding: 4rem 2rem;
      color: #6b7280;
    }

    .btn-block {
      width: 100%;
      margin-top: 1rem;
    }

    @media (max-width: 768px) {
      .courses-page {
        grid-template-columns: 1fr;
      }

      .filters-sidebar {
        position: static;
      }

      .courses-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }

      .sort-options {
        width: 100%;
      }

      .courses-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CoursesComponent implements OnInit {
  allCourses: any[] = [];
  filteredCourses: any[] = [];
  searchQuery = '';
  sortBy = 'rating';
  filters = {
    category: '',
    level: '',
    maxPrice: null as any,
    minRating: null as any
  };

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.allCourses = courses;
      this.filteredCourses = courses;
    });
  }

  applyFilters(): void {
    let filtered = this.allCourses;

    // Apply search
    if (this.searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply other filters
    if (this.filters.category) {
      filtered = filtered.filter(c => c.category === this.filters.category);
    }
    if (this.filters.level) {
      filtered = filtered.filter(c => c.level === this.filters.level);
    }
    if (this.filters.maxPrice) {
      filtered = filtered.filter(c => c.price <= this.filters.maxPrice);
    }
    if (this.filters.minRating) {
      filtered = filtered.filter(c => c.rating >= this.filters.minRating);
    }

    this.filteredCourses = filtered;
    this.applySorting();
  }

  applySorting(): void {
    if (this.sortBy === 'rating') {
      this.filteredCourses.sort((a, b) => b.rating - a.rating);
    } else if (this.sortBy === 'price') {
      this.filteredCourses.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'students') {
      this.filteredCourses.sort((a, b) => b.students - a.students);
    }
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.filters = {
      category: '',
      level: '',
      maxPrice: null,
      minRating: null
    };
    this.sortBy = 'rating';
    this.loadCourses();
  }
}
