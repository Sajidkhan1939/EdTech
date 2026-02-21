# EdTech APIs Implementation

## Overview
Complete REST API implementation for the EdTech platform built with ASP.NET Core 9.0. The API provides endpoints for authentication, course management, tutor profiles, bookings, payments, and messaging.

## Getting Started

### Prerequisites
- .NET 9.0 SDK or later
- Visual Studio Code or Visual Studio 2022

### Running the API

1. Navigate to the EdTechAPIs directory:
```bash
cd EdTechAPIs
```

2. Restore dependencies and run:
```bash
dotnet run
```

3. The API will start on `http://localhost:5237`

### Testing the API
You can test the API using the provided `EdTechAPIs.http` file in Visual Studio Code with the REST Client extension, or use tools like Postman.

## API Endpoints

### Authentication (`/api/auth`)

#### Login
- **POST** `/api/auth/login`
- Request:
```json
{
  "email": "user@example.com",
  "password": "password",
  "userType": "student" or "tutor"
}
```
- Response: User object with authentication details

#### Register
- **POST** `/api/auth/register`
- Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password",
  "userType": "student" or "tutor"
}
```
- Response: Created user object

#### Get User
- **GET** `/api/auth/user/{id}`
- Response: User details

### Courses (`/api/courses`)

#### Get All Courses
- **GET** `/api/courses`
- Response: Array of course objects

#### Get Course by ID
- **GET** `/api/courses/{id}`
- Response: Course details with tutor information

#### Search Courses
- **GET** `/api/courses/search?q={searchTerm}`
- Response: Array of matching courses

#### Create Course (Tutor only)
- **POST** `/api/courses`
- Request:
```json
{
  "title": "Course Title",
  "description": "Course Description",
  "category": "Mathematics",
  "level": "High School",
  "price": 499,
  "duration": 40,
  "image": "image_url"
}
```

### Tutors (`/api/tutors`)

#### Get All Tutors
- **GET** `/api/tutors`
- Response: Array of tutor profiles

#### Get Tutor by ID
- **GET** `/api/tutors/{id}`
- Response: Tutor profile with specializations and availability

#### Search Tutors
- **GET** `/api/tutors/search?q={searchTerm}`
- Response: Array of matching tutors

#### Filter Tutors
- **GET** `/api/tutors/filter?specialization={spec}&minRating={rating}&maxRate={rate}`
- Response: Filtered list of tutors

#### Update Tutor Availability
- **PUT** `/api/tutors/{id}/availability`
- Request:
```json
{
  "dayOfWeek": "Monday",
  "startTime": "09:00",
  "endTime": "17:00",
  "isAvailable": true
}
```

#### Get Tutor Reviews
- **GET** `/api/tutors/{id}/reviews`
- Response: Array of reviews

#### Add Review
- **POST** `/api/tutors/{id}/reviews`
- Request:
```json
{
  "studentId": "student_id",
  "rating": 5,
  "comment": "Great tutor!"
}
```

### Bookings (`/api/bookings`)

#### Create Booking
- **POST** `/api/bookings`
- Request:
```json
{
  "studentId": "student_id",
  "tutorId": "tutor_id",
  "courseId": "course_id",
  "sessionDate": "2024-02-25T10:00:00Z",
  "sessionTime": "10:00",
  "duration": 60,
  "amount": 50,
  "notes": "Additional notes"
}
```

#### Get Bookings by Student
- **GET** `/api/bookings/student/{studentId}`
- Response: Array of student bookings

#### Get Bookings by Tutor
- **GET** `/api/bookings/tutor/{tutorId}`
- Response: Array of tutor bookings

#### Get Upcoming Bookings
- **GET** `/api/bookings/student/{studentId}/upcoming`
- Response: Array of upcoming sessions

#### Get Completed Bookings
- **GET** `/api/bookings/student/{studentId}/completed`
- Response: Array of completed sessions

#### Update Booking Status
- **PUT** `/api/bookings/{id}/status`
- Request: `{ "status": "confirmed|completed|cancelled" }`

#### Cancel Booking
- **DELETE** `/api/bookings/{id}`
- Response: Cancellation confirmation

### Payments (`/api/payments`)

#### Process Payment
- **POST** `/api/payments`
- Request:
```json
{
  "studentId": "student_id",
  "bookingId": "booking_id",
  "amount": 50,
  "paymentMethod": "credit_card|paypal|etc"
}
```

#### Get Payment
- **GET** `/api/payments/{id}`
- Response: Payment details with transaction info

#### Get Student Payments
- **GET** `/api/payments/student/{studentId}`
- Response: Payment history

#### Update Payment Status
- **PUT** `/api/payments/{id}/status`
- Request: `{ "status": "pending|completed|failed" }`

### Messages (`/api/messages`)

#### Send Message
- **POST** `/api/messages`
- Request:
```json
{
  "senderId": "sender_id",
  "receiverId": "receiver_id",
  "content": "Message content"
}
```

#### Get Conversation
- **GET** `/api/messages/conversation?user1={id1}&user2={id2}`
- Response: Array of messages between two users

#### Get User Messages
- **GET** `/api/messages/user/{userId}`
- Response: All messages for a user

#### Mark Message as Read
- **PUT** `/api/messages/{id}/read`
- Response: Confirmation

## Project Structure

```
EdTechAPIs/
├── Controllers/          # API endpoints
│   ├── AuthController.cs
│   ├── CoursesController.cs
│   ├── TutorsController.cs
│   ├── BookingsController.cs
│   ├── PaymentsController.cs
│   └── MessagesController.cs
├── Models/              # Data models
│   ├── User.cs
│   ├── Course.cs
│   ├── Booking.cs
│   ├── Payment.cs
│   ├── Review.cs
│   └── Message.cs
├── Services/            # Business logic
│   ├── IAuthService.cs & AuthService.cs
│   ├── ICourseService.cs & CourseService.cs
│   ├── ITutorService.cs & TutorService.cs
│   ├── IBookingService.cs & BookingService.cs
│   ├── IPaymentService.cs & PaymentService.cs
│   └── IMessageService.cs & MessageService.cs
├── DTOs/               # Data Transfer Objects
│   ├── AuthDtos.cs
│   ├── CourseDtos.cs
│   ├── BookingDtos.cs
│   ├── PaymentDtos.cs
│   └── MessageDtos.cs
├── Program.cs          # Application entry point
├── appsettings.json    # Configuration
└── EdTechAPIs.csproj   # Project file
```

## Features

### Authentication & Authorization
- Student and Tutor user types
- Secure login/registration
- User profile management

### Course Management
- Browse and search courses
- Filter by category, level, price
- Tutor course creation
- Lesson and material management

### Tutor Profiles
- Detailed tutor information
- Availability management
- Rating and review system
- Specializations and languages

### Booking System
- Schedule sessions with tutors
- Multiple booking statuses (pending, confirmed, completed, cancelled)
- Upcoming and completed session tracking
- Payment tracking per booking

### Payment Processing
- Payment recording
- Transaction tracking
- Invoice generation
- Payment status management

### Messaging
- Direct messaging between users
- Conversation history
- Read/unread status tracking

## Data Storage

Currently, all data is stored in-memory collections. For production:

1. **Add Entity Framework Core** for database support:
```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

2. **Create a DbContext** to replace in-memory storage

3. **Apply migrations** to set up the database schema

## Security Considerations

For production deployment, implement:
- JWT authentication tokens
- Password hashing (bcrypt/Argon2)
- HTTPS/TLS encryption
- CORS policy refinement (currently allows all origins)
- Input validation and sanitization
- Rate limiting
- API key or OAuth2 authentication

## Future Enhancements

1. **Database Integration**: Replace in-memory storage with SQL Server/PostgreSQL
2. **Authentication**: Implement JWT tokens and refresh tokens
3. **Real-time Chat**: Add SignalR for real-time messaging
4. **Video Integration**: Integrate with video conferencing platforms
5. **Payment Gateway**: Integrate with Stripe or PayPal
6. **Notifications**: Email and push notifications
7. **Analytics**: Track user behavior and engagement
8. **Admin Dashboard**: System administration endpoints

## Testing

Run unit tests:
```bash
dotnet test
```

The API is currently designed with mock data for easy testing and development.

## API Documentation

OpenAPI/Swagger documentation is available at:
```
http://localhost:5237/openapi/v1.json
```

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.
