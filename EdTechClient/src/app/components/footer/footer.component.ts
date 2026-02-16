import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>EdTech</h3>
          <p>Transform your education with expert tutoring from world-class educators.</p>
          <div class="social-links">
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">Instagram</a>
            <a href="#" class="social-link">LinkedIn</a>
          </div>
        </div>

        <div class="footer-section">
          <h4>For Students</h4>
          <ul>
            <li><a href="#">Find a Tutor</a></li>
            <li><a href="#">Browse Courses</a></li>
            <li><a href="#">My Classes</a></li>
            <li><a href="#">How It Works</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>For Tutors</h4>
          <ul>
            <li><a href="#">Become a Tutor</a></li>
            <li><a href="#">Teaching Tools</a></li>
            <li><a href="#">Earnings</a></li>
            <li><a href="#">Resources</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 EdTech. All rights reserved. Inspired by YourCloudCampus.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1f2937;
      color: #e5e7eb;
      padding: 4rem 2rem 2rem;
      margin-top: 4rem;
    }

    .footer-content {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-section h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
      margin-bottom: 1rem;
    }

    .footer-section h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: white;
      margin-bottom: 1rem;
    }

    .footer-section p {
      margin-bottom: 1rem;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section ul li {
      margin-bottom: 0.75rem;
    }

    .footer-section a {
      color: #d1d5db;
      text-decoration: none;
      transition: color 0.3s;
    }

    .footer-section a:hover {
      color: #667eea;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .social-link {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 50%;
      text-indent: -9999px;
      transition: background 0.3s;
    }

    .social-link:hover {
      background: #667eea;
    }

    .footer-bottom {
      border-top: 1px solid #374151;
      padding-top: 2rem;
      text-align: center;
      color: #9ca3af;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent { }
