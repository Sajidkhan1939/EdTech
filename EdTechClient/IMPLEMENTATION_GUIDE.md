# EdTech - Online Tutoring Platform

A modern, responsive, and feature-rich online tutoring platform inspired by YourCloudCampus. Built with Angular 18 and standalone components for maximum flexibility and performance.

## 🎯 Features Implemented

### Core Features

#### 1. **Authentication & Authorization**
- Login and Registration for both Students and Tutors
- Role-based access (Student/Tutor)
- Persistent user sessions with localStorage
- Mock authentication service ready for backend integration

#### 2. **Home & Landing Page**
- Eye-catching hero section with call-to-action buttons
- Key statistics showcase (82K+ students, 415 tutors, 100K+ classes, 99.5% satisfaction)
- Feature highlights section
- Featured tutors and courses section
- How it works step-by-step guide
- Social proof testimonials section

#### 3. **Tutor Discovery & Marketplace**
- Browse all tutors with detailed filtering
- Advanced search and filter capabilities
  - Filter by specialization
  - Filter by language
  - Filter by hourly rate
  - Filter by minimum rating
- Sort by rating, price, or experience
- Individual tutor profile pages with:
  - Detailed bio and specializations
  - Ratings and reviews
  - Certificates and education
  - Availability schedule
  - Performance statistics
  - Customer reviews and testimonials

#### 4. **Course Marketplace**
- Browse and filter courses
- Filter by category, level, price, and rating
- Course detail pages with:
  - Complete course curriculum
  - Course content breakdown
  - Instructor information
  - Course highlights
  - Requirements
  - Student reviews

#### 5. **Booking & Scheduling**
- Easy booking interface
- Select tutor, date, time, and duration
- Add notes for the tutor
- Real-time price calculation
- Booking summary and confirmation

#### 6. **Payment System**
- Secure payment interface
- Multiple payment methods:
  - Credit/Debit card
  - PayPal
  - Wallet balance
- Order summary
- Billing address management
- Money-back guarantee information

#### 7. **Student Dashboard**
- Welcome and personalized greeting
- Learning statistics:
  - Total classes taken
  - Hours learned
  - Courses completed
  - Average rating
- Upcoming sessions display
- Quick action buttons
- Notifications panel
- Monthly spending overview

#### 8. **User Profile Management**
- Profile picture management
- Basic information editing (name, email, phone, location)
- Student-specific information (grade, interests, learning goals)
- Password and security settings
- Communication preferences
- Account status and danger zone

#### 9. **Session History & Management**
- View all completed and upcoming sessions
- Filter by session status
- Detailed session information:
  - Date and time
  - Duration and cost
  - Tutor information
  - Session notes
- Quick actions (review, reschedule, download receipt)
- Statistics on total sessions and hours
- Timeline view of all sessions

#### 10. **Messaging System**
- Real-time chat interface
- Conversation list with unread counters
- Search conversations
- Message history
- Status indicators (online/offline)
- Media attachment ready
- Emoji support
- Timestamps on messages

## 📁 Project Structure

```
EdTechClient/
├── src/
│   ├── app/
│   │   ├── models/
│   │   │   └── index.ts (Data models and interfaces)
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.ts (Authentication logic)
│   │   │   ├── tutor.service.ts (Tutor data management)
│   │   │   ├── course.service.ts (Course data management)
│   │   │   └── booking.service.ts (Booking management)
│   │   │
│   │   ├── components/
│   │   │   ├── navbar/ (Navigation component)
│   │   │   ├── footer/ (Footer component)
│   │   │   ├── tutor-card/ (Tutor card display)
│   │   │   └── course-card/ (Course card display)
│   │   │
│   │   ├── pages/
│   │   │   ├── home/ (Landing page)
│   │   │   ├── tutors/ (Tutor listing)
│   │   │   ├── tutor-detail/ (Tutor profile)
│   │   │   ├── courses/ (Course listing)
│   │   │   ├── course-detail/ (Course details)
│   │   │   ├── dashboard/ (Student dashboard)
│   │   │   ├── booking/ (Booking interface)
│   │   │   ├── payment/ (Payment processing)
│   │   │   ├── login/ (Authentication)
│   │   │   ├── register/ (Registration)
│   │   │   ├── profile/ (User profile)
│   │   │   ├── session-history/ (Session management)
│   │   │   └── chat/ (Messaging)
│   │   │
│   │   ├── app.routes.ts (Routing configuration)
│   │   └── app.component.ts (Root component)
│   │
│   ├── styles.css (Global styles)
│   ├── index.html (HTML entry point)
│   └── main.ts (Bootstrap)
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠 Technologies Used

- **Framework**: Angular 18 (Latest)
- **Language**: TypeScript 5.5+
- **Styling**: CSS3 with modern features
- **State Management**: RxJS with Observables
- **Form Handling**: Reactive Forms with ngModel
- **Routing**: Angular Router with lazy loading ready
- **Architecture**: Standalone Components (Modern Angular approach)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Angular CLI 18

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   ng serve
   ```
   or
   ```bash
   npm start
   ```

3. **Build for production**
   ```bash
   ng build
   ```

4. **Run tests**
   ```bash
   ng test
   ```

## 📱 Responsive Design

All pages are fully responsive and optimized for:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🎨 Design System

### Color Palette
- **Primary Gradient**: #667eea → #764ba2
- **Dark Text**: #1f2937
- **Light Text**: #6b7280
- **Light Background**: #f9fafb
- **Border Color**: #e5e7eb
- **Success**: #10b981
- **Warning**: #fbbf24
- **Error**: #ef4444

### Typography
- **Headings**: 600-800 font weight
- **Body**: 400 font weight
- **Base Font Size**: 16px

## 🔧 Backend Integration

The project is ready for backend integration. The following services are mock-implemented:
- **AuthService** - Replace API calls in login/register methods
- **TutorService** - Connect to real tutor database
- **CourseService** - Connect to real course database
- **BookingService** - Connect to booking management API

### Mock Data
All mock data is defined in respective service files with realistic data structures.

## 🔐 Security Features

- Input validation on all forms
- XSS prevention through Angular's built-in sanitization
- CSRF token ready (to be configured with backend)
- Password strength validation
- Secure payment form validation
- Role-based access control ready

## 📊 Performance Optimizations

- Standalone components for tree-shaking
- Lazy loading ready routing structure
- Efficient change detection strategy
- OnPush change detection ready
- Optimized image loading
- CSS animations with GPU acceleration

## 🧪 Testing & Quality

Ready for implementation of:
- Unit tests with Jasmine
- E2E tests with Cypress
- Component testing
- Service testing
- Integration testing

## 📚 Documentation

### Key Components

#### HomeComponent
- Hero section
- Statistics display
- Feature highlights
- Featured content

#### TutorsComponent
- Tutor listing with grid layout
- Advanced filtering system
- Search functionality
- Sorting options

#### DashboardComponent
- User statistics
- Upcoming sessions
- Quick actions
- Notifications

#### BookingComponent
- Step-by-step booking flow
- Date/time selection
- Price calculation
- Booking summary

#### ChatComponent
- Conversation management
- Real-time messaging
- User presence
- Message history

## 🔄 API Integration Guide

To connect to your .NET backend:

1. **Update AuthService**
   ```typescript
   // Replace mock with actual HTTP calls
   login(email: string, password: string): Observable<any> {
     return this.http.post('/api/auth/login', { email, password });
   }
   ```

2. **Update TutorService**
   ```typescript
   getTutors(): Observable<Tutor[]> {
     return this.http.get<Tutor[]>('/api/tutors');
   }
   ```

3. **Update CourseService**
   ```typescript
   getCourses(): Observable<Course[]> {
     return this.http.get<Course[]>('/api/courses');
   }
   ```

4. **Update BookingService**
   ```typescript
   createBooking(booking: Booking): Observable<Booking> {
     return this.http.post<Booking>('/api/bookings', booking);
   }
   ```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 Future Enhancements

- [ ] Video call integration (WebRTC)
- [ ] Real-time notifications (WebSockets)
- [ ] Advanced payment processing
- [ ] Rating and review system
- [ ] Student progress tracking
- [ ] Certificates generation
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Mobile app (React Native)

## 🤝 Contributing

The project is structured for easy enhancement:
1. Add new components in `pages/` or `components/`
2. Create new services as needed
3. Follow the established pattern for routing and styling
4. Maintain responsive design across all devices

## 📄 License

This project is inspired by YourCloudCampus and created for educational purposes.

## 📞 Support

For implementation issues or questions about backend integration, refer to the service implementations and model definitions in the project.

---

**Status**: ✅ Complete Frontend Implementation
**Version**: 1.0.0
**Created**: February 2026
**Framework**: Angular 18

