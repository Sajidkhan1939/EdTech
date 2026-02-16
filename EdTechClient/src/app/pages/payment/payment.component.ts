import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="payment-container">
      <div class="payment-header">
        <h1>Secure Payment</h1>
        <p>Complete your booking with our secure payment system</p>
      </div>

      <div class="payment-content">
        <main class="payment-main">
          <!-- Order Summary -->
          <section class="summary-section">
            <h2>Order Summary</h2>
            <div class="summary-card">
              <div class="summary-item">
                <span>Booking Details</span>
              </div>
              <div class="summary-detail">
                <p>Session Date: {{ booking?.sessionDate | date: 'MMM dd, yyyy' }}</p>
                <p>Session Time: {{ booking?.sessionTime }}</p>
                <p>Duration: {{ booking?.duration }} hour(s)</p>
                <p>Rate: \${{ hourlyRate }}/hour</p>
              </div>
              <div class="summary-total">
                <span>Total Amount</span>
                <span>\${{ booking?.amount || 0 }}</span>
              </div>
            </div>
          </section>

          <!-- Payment Method -->
          <section class="payment-method-section">
            <h2>Payment Method</h2>
            
            <div class="payment-options">
              <label class="payment-option">
                <input type="radio" name="paymentMethod" value="card" [(ngModel)]="paymentData.method" class="radio">
                <span class="option-label">Credit/Debit Card</span>
              </label>
              <label class="payment-option">
                <input type="radio" name="paymentMethod" value="paypal" [(ngModel)]="paymentData.method" class="radio">
                <span class="option-label">PayPal</span>
              </label>
              <label class="payment-option">
                <input type="radio" name="paymentMethod" value="wallet" [(ngModel)]="paymentData.method" class="radio">
                <span class="option-label">Wallet Balance</span>
              </label>
            </div>

            <!-- Card Payment Form -->
            <div *ngIf="paymentData.method === 'card'" class="card-form">
              <div class="form-group">
                <label for="cardName">Cardholder Name</label>
                <input 
                  type="text" 
                  id="cardName"
                  [(ngModel)]="paymentData.cardName"
                  name="cardName"
                  placeholder="John Doe"
                  class="form-input"
                >
              </div>

              <div class="form-group">
                <label for="cardNumber">Card Number</label>
                <input 
                  type="text" 
                  id="cardNumber"
                  [(ngModel)]="paymentData.cardNumber"
                  name="cardNumber"
                  placeholder="4532 1234 5678 9101"
                  class="form-input"
                  (keyup)="formatCardNumber($event)"
                >
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="expiry">Expiration Date</label>
                  <input 
                    type="text" 
                    id="expiry"
                    [(ngModel)]="paymentData.expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    class="form-input"
                  >
                </div>
                <div class="form-group">
                  <label for="cvv">CVV</label>
                  <input 
                    type="text" 
                    id="cvv"
                    [(ngModel)]="paymentData.cvv"
                    name="cvv"
                    placeholder="123"
                    class="form-input"
                    maxlength="3"
                  >
                </div>
              </div>
            </div>
          </section>

          <!-- Billing Address -->
          <section class="billing-section">
            <h2>Billing Address</h2>
            <div class="form-group">
              <label for="address">Street Address</label>
              <input 
                type="text" 
                id="address"
                [(ngModel)]="paymentData.address"
                name="address"
                placeholder="123 Main Street"
                class="form-input"
              >
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="city">City</label>
                <input 
                  type="text" 
                  id="city"
                  [(ngModel)]="paymentData.city"
                  name="city"
                  placeholder="New York"
                  class="form-input"
                >
              </div>
              <div class="form-group">
                <label for="zip">ZIP Code</label>
                <input 
                  type="text" 
                  id="zip"
                  [(ngModel)]="paymentData.zip"
                  name="zip"
                  placeholder="10001"
                  class="form-input"
                >
              </div>
            </div>
          </section>

          <!-- Terms -->
          <section class="terms-section">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="paymentData.agreedToTerms" name="terms" class="checkbox">
              I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </label>
          </section>

          <button (click)="processPayment()" class="btn btn-primary btn-large">Complete Payment</button>
        </main>

        <!-- Security Info Sidebar -->
        <aside class="payment-sidebar">
          <div class="security-card">
            <h3>🔒 Secure Payment</h3>
            <p>Your payment information is encrypted and secure. We use industry-standard SSL encryption.</p>
          </div>

          <div class="guarantee-card">
            <h3>✓ Money-Back Guarantee</h3>
            <p>Not satisfied? Get a full refund within 30 days of your first session.</p>
          </div>

          <div class="support-card">
            <h3>📞 Need Help?</h3>
            <p>Our support team is available 24/7 to assist you with any payment questions.</p>
            <button class="btn btn-secondary btn-block">Chat Support</button>
          </div>

          <div class="payment-partners">
            <h4>Trusted Payment Partners</h4>
            <div class="partners-list">
              <span class="partner">Stripe</span>
              <span class="partner">PayPal</span>
              <span class="partner">Visa</span>
              <span class="partner">Mastercard</span>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .payment-container {
      background: #f9fafb;
      min-height: 100vh;
    }

    .payment-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 3rem 2rem;
      text-align: center;
      margin-bottom: 2rem;
    }

    .payment-header h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }

    .payment-header p {
      font-size: 1.1rem;
      opacity: 0.9;
    }

    .payment-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem 3rem;
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 2rem;
    }

    .payment-main {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    section {
      margin-bottom: 2.5rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #e5e7eb;
    }

    section:last-of-type {
      border-bottom: none;
    }

    h2 {
      font-size: 1.3rem;
      color: #1f2937;
      margin-bottom: 1.5rem;
    }

    .summary-card {
      padding: 1.5rem;
      background: #f9fafb;
      border-radius: 8px;
    }

    .summary-item {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .summary-detail {
      padding: 1rem 0;
      border-bottom: 1px solid #e5e7eb;
      margin-bottom: 1rem;
    }

    .summary-detail p {
      color: #6b7280;
      font-size: 0.9rem;
      margin: 0.5rem 0;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      color: #667eea;
      font-size: 1.2rem;
    }

    .payment-options {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .payment-option {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .payment-option:hover {
      border-color: #667eea;
      background: #f9fafb;
    }

    .radio {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }

    .option-label {
      flex: 1;
      font-weight: 500;
      color: #1f2937;
      cursor: pointer;
    }

    .card-form {
      padding: 1.5rem;
      background: #f9fafb;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1.5rem;
    }

    .form-group label {
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
      font-size: 0.95rem;
    }

    .form-input {
      padding: 0.75rem;
      border: 2px solid #e5e7eb;
      border-radius: 6px;
      font-size: 0.95rem;
      transition: border-color 0.3s;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .terms-section {
      border: none;
      padding: 1rem;
      background: #f9fafb;
      border-radius: 8px;
      margin-bottom: 1.5rem;
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      color: #6b7280;
      font-size: 0.9rem;
      cursor: pointer;
    }

    .checkbox {
      margin-top: 0.25rem;
      cursor: pointer;
      width: 18px;
      height: 18px;
    }

    .checkbox-label a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .checkbox-label a:hover {
      text-decoration: underline;
    }

    .btn-large {
      width: 100%;
      padding: 1rem 1.5rem;
      font-size: 1rem;
    }

    .payment-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .security-card,
    .guarantee-card,
    .support-card,
    .payment-partners {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .security-card h3,
    .guarantee-card h3,
    .support-card h3 {
      font-size: 1.05rem;
      color: #1f2937;
      margin-bottom: 0.75rem;
    }

    .security-card p,
    .guarantee-card p,
    .support-card p {
      color: #6b7280;
      font-size: 0.9rem;
      line-height: 1.6;
      margin: 0 0 1rem 0;
    }

    .btn-block {
      width: 100%;
    }

    .payment-partners h4 {
      font-size: 0.95rem;
      color: #1f2937;
      margin-bottom: 1rem;
    }

    .partners-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .partner {
      display: inline-block;
      padding: 0.5rem 0.75rem;
      background: #f3f4f6;
      border-radius: 4px;
      color: #6b7280;
      font-size: 0.85rem;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .payment-content {
        grid-template-columns: 1fr;
      }

      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PaymentComponent implements OnInit {
  booking: any = null;
  hourlyRate = 0;
  paymentData = {
    method: 'card',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
    city: '',
    zip: '',
    agreedToTerms: false
  };

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const bookingId = params['bookingId'];
      if (bookingId) {
        this.bookingService.getBookingById(bookingId).subscribe(booking => {
          this.booking = booking;
        });
      }
    });
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\\s/g, '');
    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    this.paymentData.cardNumber = formatted;
  }

  processPayment(): void {
    if (!this.paymentData.agreedToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    if (this.paymentData.method === 'card' && (!this.paymentData.cardNumber || !this.paymentData.cvv)) {
      alert('Please enter valid card details');
      return;
    }

    // Simulate payment processing
    alert('Payment processed successfully! Your booking is confirmed.');
    this.router.navigate(['/dashboard']);
  }
}
