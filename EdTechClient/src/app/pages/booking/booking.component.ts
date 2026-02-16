import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TutorService } from '../../services/tutor.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="booking-container">
      <div class="booking-header">
        <h1>Book a Session</h1>
        <p>Schedule your personalized learning session</p>
      </div>

      <div class="booking-content">
        <div class="booking-main">
          <form (ngSubmit)="submitBooking()" class="booking-form">
            <!-- Select Tutor -->
            <section class="form-section">
              <h2>Step 1: Select Tutor</h2>
              <div class="tutor-selection">
                <div *ngIf="tutor" class="selected-tutor">
                  <img [src]="tutor.avatar" [alt]="tutor.name" class="tutor-avatar">
                  <div class="tutor-details">
                    <h3>{{ tutor.name }}</h3>
                    <p class="specializations">{{ tutor.specializations.join(', ') }}</p>
                    <p class="rate">\${{ tutor.hourlyRate }}/hour</p>
                  </div>
                  <button type="button" (click)="changeTutor()" class="btn btn-secondary">Change</button>
                </div>
                <div *ngIf="!tutor" class="select-tutor-prompt">
                  <p>No tutor selected. <a href="/tutors">Browse tutors</a></p>
                </div>
              </div>
            </section>

            <!-- Select Date & Time -->
            <section class="form-section">
              <h2>Step 2: Choose Date & Time</h2>
              <div class="form-row">
                <div class="form-group">
                  <label for="date">Date</label>
                  <input 
                    type="date" 
                    id="date"
                    [(ngModel)]="bookingData.date"
                    name="date"
                    class="form-input"
                    required
                  >
                </div>
                <div class="form-group">
                  <label for="time">Time</label>
                  <input 
                    type="time" 
                    id="time"
                    [(ngModel)]="bookingData.time"
                    name="time"
                    class="form-input"
                    required
                  >
                </div>
                <div class="form-group">
                  <label for="duration">Duration (hours)</label>
                  <select 
                    id="duration"
                    [(ngModel)]="bookingData.duration"
                    name="duration"
                    class="form-select"
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                  </select>
                </div>
              </div>
            </section>

            <!-- Select Subject & Notes -->
            <section class="form-section">
              <h2>Step 3: Class Details</h2>
              <div class="form-group">
                <label for="subject">Subject/Topic</label>
                <input 
                  type="text" 
                  id="subject"
                  [(ngModel)]="bookingData.subject"
                  name="subject"
                  placeholder="e.g., Calculus, English Literature"
                  class="form-input"
                  required
                >
              </div>
              <div class="form-group">
                <label for="notes">Notes for Tutor (Optional)</label>
                <textarea 
                  id="notes"
                  [(ngModel)]="bookingData.notes"
                  name="notes"
                  placeholder="Tell the tutor about your learning goals..."
                  class="form-textarea"
                  rows="4"
                ></textarea>
              </div>
            </section>

            <!-- Session Summary -->
            <section class="form-section summary-section">
              <h2>Booking Summary</h2>
              <div class="summary-item">
                <span>Tutor</span>
                <span>{{ tutor?.name || 'Not selected' }}</span>
              </div>
              <div class="summary-item">
                <span>Date & Time</span>
                <span>{{ bookingData.date }} at {{ bookingData.time }}</span>
              </div>
              <div class="summary-item">
                <span>Duration</span>
                <span>{{ bookingData.duration }} hour(s)</span>
              </div>
              <div class="summary-item">
                <span>Hourly Rate</span>
                <span>\${{ tutor?.hourlyRate || 0 }}/hour</span>
              </div>
              <div class="summary-total">
                <span>Total</span>
                <span>\${{ calculateTotal() }}</span>
              </div>
            </section>

            <button type="submit" class="btn btn-primary btn-large">Proceed to Payment</button>
          </form>
        </div>

        <!-- Info Sidebar -->
        <aside class="booking-sidebar">
          <div class="info-card">
            <h3>About This Session</h3>
            <ul>
              <li>✓ One-on-one personalized learning</li>
              <li>✓ Interactive video session</li>
              <li>✓ Screen sharing capability</li>
              <li>✓ Session recording available</li>
              <li>✓ Lifetime access to materials</li>
            </ul>
          </div>

          <div class="info-card">
            <h3>Cancellation Policy</h3>
            <p>Cancel up to 24 hours before your session for a full refund. Cancellations within 24 hours may incur a fee.</p>
          </div>

          <div class="info-card">
            <h3>Need Help?</h3>
            <p>Contact our support team at support&#64;edtech.com or call us 24/7</p>
            <button class="btn btn-secondary btn-block">Contact Support</button>
          </div>
        </aside>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .booking-container {
      background: #f9fafb;
      min-height: 100vh;
    }

    .booking-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
      margin-bottom: 2rem;
    }

    .booking-header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .booking-header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .booking-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem 3rem;
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
    }

    .booking-main {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .form-section {
      margin-bottom: 2.5rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .form-section:last-of-type {
      border-bottom: none;
    }

    .form-section h2 {
      font-size: 1.3rem;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .tutor-selection {
      padding: 1.5rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
    }

    .selected-tutor {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .tutor-avatar {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      object-fit: cover;
    }

    .tutor-details {
      flex: 1;
    }

    .tutor-details h3 {
      margin: 0 0 0.25rem 0;
      color: #1f2937;
    }

    .specializations {
      color: #667eea;
      font-size: 0.9rem;
      margin: 0.25rem 0;
    }

    .rate {
      color: #6b7280;
      font-size: 0.95rem;
      font-weight: 600;
      margin: 0;
    }

    .select-tutor-prompt {
      color: #6b7280;
    }

    .select-tutor-prompt a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
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

    .summary-section {
      background: #f9fafb;
      padding: 1.5rem;
      border-radius: 8px;
      border: none;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;
      color: #6b7280;
    }

    .summary-item:last-of-type {
      border-bottom: none;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      padding: 1rem 0 0;
      margin-top: 0.75rem;
      border-top: 2px solid #667eea;
      font-weight: 700;
      color: #667eea;
      font-size: 1.1rem;
    }

    .btn-large {
      width: 100%;
      padding: 1rem 1.5rem;
      font-size: 1rem;
      margin-top: 1rem;
    }

    .booking-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .info-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .info-card h3 {
      font-size: 1.05rem;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .info-card ul {
      list-style: none;
      padding: 0;
    }

    .info-card li {
      padding: 0.5rem 0;
      color: #6b7280;
      font-size: 0.9rem;
    }

    .info-card p {
      color: #6b7280;
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0 0 1rem 0;
    }

    .btn-block {
      width: 100%;
    }

    @media (max-width: 768px) {
      .booking-content {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .selected-tutor {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class BookingComponent implements OnInit {
  tutor: any = null;
  bookingData = {
    date: '',
    time: '10:00',
    duration: '1',
    subject: '',
    notes: ''
  };
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private tutorService: TutorService,
    private bookingService: BookingService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    // Get tutor ID from route params if available
    this.route.params.subscribe(params => {
      if (params['tutorId']) {
        this.tutorService.getTutorById(params['tutorId']).subscribe(tutor => {
          this.tutor = tutor;
        });
      }
    });

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    this.bookingData.date = today;
  }

  calculateTotal(): number {
    if (this.tutor) {
      return this.tutor.hourlyRate * parseInt(this.bookingData.duration);
    }
    return 0;
  }

  changeTutor(): void {
    this.router.navigate(['/tutors']);
  }

  submitBooking(): void {
    if (!this.tutor || !this.bookingData.date || !this.bookingData.time) {
      alert('Please fill in all required fields');
      return;
    }

    const booking: any = {
      id: '',
      studentId: this.currentUser?.id,
      tutorId: this.tutor.id,
      sessionDate: new Date(this.bookingData.date),
      sessionTime: this.bookingData.time,
      duration: parseInt(this.bookingData.duration),
      status: 'pending' as const,
      paymentStatus: 'pending',
      amount: this.calculateTotal(),
      notes: this.bookingData.notes
    };

    this.bookingService.createBooking(booking).subscribe((result) => {
      this.router.navigate(['/payment', result.id]);
    });
  }
}
