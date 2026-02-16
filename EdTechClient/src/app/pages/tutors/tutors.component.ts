import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TutorCardComponent } from '../../components/tutor-card/tutor-card.component';
import { TutorService } from '../../services/tutor.service';

@Component({
  selector: 'app-tutors',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent, FooterComponent, TutorCardComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="page-header">
      <h1>Find Your Perfect Tutor</h1>
      <p>Choose from 415+ expert tutors in various subjects</p>
    </div>

    <div class="tutors-page">
      <aside class="filters-sidebar">
        <h3>Filters</h3>

        <div class="filter-group">
          <label for="specialization">Specialization</label>
          <input 
            type="text" 
            id="specialization"
            [(ngModel)]="filters.specialization"
            (ngModelChange)="applyFilters()"
            placeholder="Search subjects..."
            class="form-input"
          >
        </div>

        <div class="filter-group">
          <label for="language">Language</label>
          <select 
            id="language"
            [(ngModel)]="filters.language"
            (ngModelChange)="applyFilters()"
            class="form-select"
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="Mandarin">Mandarin</option>
            <option value="French">French</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="maxPrice">Max Hourly Rate</label>
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

      <main class="tutors-main">
        <div class="tutors-header">
          <div class="result-count">
            Found {{ filteredTutors.length }} tutors
          </div>
          <div class="sort-options">
            <select [(ngModel)]="sortBy" (ngModelChange)="applySorting()" class="form-select">
              <option value="rating">Top Rated</option>
              <option value="price">Price: Low to High</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>
        </div>

        <div class="tutors-grid">
          <app-tutor-card *ngFor="let tutor of filteredTutors" [tutor]="tutor"></app-tutor-card>
        </div>

        <div *ngIf="filteredTutors.length === 0" class="no-results">
          <p>No tutors found matching your criteria. Try adjusting your filters.</p>
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

    .tutors-page {
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

    .tutors-main {
      display: flex;
      flex-direction: column;
    }

    .tutors-header {
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

    .tutors-grid {
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
      .tutors-page {
        grid-template-columns: 1fr;
      }

      .filters-sidebar {
        position: static;
      }

      .tutors-header {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }

      .sort-options {
        width: 100%;
      }

      .tutors-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class TutorsComponent implements OnInit {
  allTutors: any[] = [];
  filteredTutors: any[] = [];
  sortBy = 'rating';
  filters = {
    specialization: '',
    language: '',
    maxPrice: null as any,
    minRating: null as any
  };

  constructor(private tutorService: TutorService) { }

  ngOnInit(): void {
    this.loadTutors();
  }

  private loadTutors(): void {
    this.tutorService.getTutors().subscribe(tutors => {
      this.allTutors = tutors;
      this.filteredTutors = tutors;
    });
  }

  applyFilters(): void {
    this.tutorService.filterTutors(this.filters).subscribe(tutors => {
      this.filteredTutors = tutors;
      this.applySorting();
    });
  }

  applySorting(): void {
    if (this.sortBy === 'rating') {
      this.filteredTutors.sort((a, b) => b.rating - a.rating);
    } else if (this.sortBy === 'price') {
      this.filteredTutors.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (this.sortBy === 'experience') {
      this.filteredTutors.sort((a, b) => b.yearsExperience - a.yearsExperience);
    }
  }

  resetFilters(): void {
    this.filters = {
      specialization: '',
      language: '',
      maxPrice: null,
      minRating: null
    };
    this.sortBy = 'rating';
    this.loadTutors();
  }
}
