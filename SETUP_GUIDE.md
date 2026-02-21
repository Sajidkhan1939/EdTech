# EdTech Full Stack Setup Guide

## Project Structure

```
EdTech/
├── EdTechAPIs/          # ASP.NET Core backend API
└── EdTechClient/        # Angular frontend
```

## Prerequisites
- .NET 9.0 SDK or later
- Node.js 18+ with npm
- Visual Studio Code or your preferred IDE

## Backend Setup (EdTechAPIs)

### 1. Navigate to backend directory
```bash
cd EdTechAPIs
```

### 2. Restore dependencies
```bash
dotnet restore
```

### 3. Run the API server
```bash
dotnet run
```

The API will start on: **http://localhost:5237**

### Available Endpoints
- `GET /api/courses` - Get all courses
- `GET /api/tutors` - Get all tutors
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/bookings` - Create booking
- `POST /api/payments` - Process payment
- `POST /api/messages` - Send message

See `API_DOCUMENTATION.md` for complete API reference.

## Frontend Setup (EdTechClient)

### 1. Navigate to frontend directory
```bash
cd EdTechClient
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm start
```

The frontend will be available at: **http://localhost:4200**

### Key Features
- Student & Tutor login/registration
- Browse and search courses
- Find and filter tutors
- Book sessions with tutors
- Process payments
- Real-time messaging
- View booking history

## Integration Points

The frontend services are already configured to call the backend API at `http://localhost:5237`:

### Services Updated
- `auth.service.ts` - Authentication endpoints
- `course.service.ts` - Course endpoints
- `tutor.service.ts` - Tutor endpoints
- `booking.service.ts` - Booking endpoints

## Mock Data

The backend includes seed data with:
- **3 Pre-registered Tutors**: Sarah Johnson, Michael Chen, Emma Rodriguez
- **3 Sample Courses**: Mathematics, English, Biology
- **Test Users**: Can register new students and tutors

### Test Credentials
Try these for testing:
- Email: `sarah@tutorapp.com`
- Password: `password123`
- User Type: `tutor`

Or create new accounts during registration.

## Development Workflow

### Terminal 1: Start Backend
```bash
cd EdTechAPIs
dotnet run
```

### Terminal 2: Start Frontend
```bash
cd EdTechClient
npm start
```

### Access the Application
Open browser to: **http://localhost:4200**

## Troubleshooting

### Port Already in Use
If port 5237 is in use:
```bash
# Find and kill process using port 5237
lsof -i :5237
kill -9 <PID>
```

### CORS Issues
The API is configured with CORS to allow requests from any origin. If you still see CORS errors:
1. Check browser console for detailed error messages
2. Ensure both servers are running
3. Check `Program.cs` CORS configuration

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force
rm -rf node_modules
npm install
```

## Building for Production

### Backend
```bash
cd EdTechAPIs
dotnet build -c Release
dotnet publish -c Release -o ./publish
```

### Frontend
```bash
cd EdTechClient
npm run build
```

## Environment Configuration

### Frontend API URL
If deploying to different environment, update API URL in services:
- `src/app/services/auth.service.ts`
- `src/app/services/course.service.ts`
- `src/app/services/tutor.service.ts`
- `src/app/services/booking.service.ts`

Change: `private apiUrl = 'http://localhost:5237/api/...';`

### Backend Configuration
Edit `appsettings.json` for production settings:
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

## Next Steps

1. **Database Integration**: Replace in-memory storage with SQL Server/PostgreSQL
2. **Authentication**: Implement JWT tokens
3. **Deployment**: Deploy to Azure, AWS, or DigitalOcean
4. **Real-time Features**: Add WebSocket for live chat
5. **Payment Integration**: Connect Stripe/PayPal
6. **Video Conferencing**: Integrate Zoom/Google Meet

## Support

For detailed API documentation, see `EdTechAPIs/API_DOCUMENTATION.md`
For frontend setup, see `EdTechClient/README.md`
