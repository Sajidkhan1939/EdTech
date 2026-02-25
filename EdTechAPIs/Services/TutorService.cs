using EdTechAPIs.Models;

namespace EdTechAPIs.Services;

public interface ITutorService
{
    Task<List<Tutor>> GetAllTutors();
    Task<Tutor> GetTutorById(string id);
    Task<List<Tutor>> SearchTutors(string searchTerm);
    Task<List<Tutor>> FilterTutors(string specialization, double minRating, double maxRate);
    Task<bool> UpdateTutorAvailability(string tutorId, Availability availability);
    Task<List<Review>> GetTutorReviews(string tutorId);
    Task<Review> AddReview(string tutorId, string studentId, int rating, string comment);
}

public class TutorService : ITutorService
{
    private List<Tutor> _tutors = new();
    private List<Review> _reviews = new();

    public TutorService()
    {
        SeedData();
    }

    private void SeedData()
    {
        _tutors.Add(new Tutor
        {
            Id = "1",
            Name = "Sarah Johnson",
            Email = "sarah@tutorapp.com",
            Password = "password123",
            Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
            Bio = "Expert Math and Physics tutor with 8 years of teaching experience.",
            Specializations = new List<string> { "Mathematics", "Physics", "Chemistry" },
            Languages = new List<string> { "English", "Spanish" },
            HourlyRate = 50,
            Rating = 4.9,
            TotalSessions = 450,
            StudentsSatisfaction = 98,
            YearsExperience = 8,
            Certificates = new List<string> { "B.Sc Mathematics", "M.Sc Physics" },
            Availability = new List<Availability>
            {
                new Availability { DayOfWeek = "Monday", StartTime = "09:00", EndTime = "17:00", IsAvailable = true },
                new Availability { DayOfWeek = "Tuesday", StartTime = "09:00", EndTime = "17:00", IsAvailable = true }
            }
        });

        _tutors.Add(new Tutor
        {
            Id = "2",
            Name = "Michael Chen",
            Email = "michael@tutorapp.com",
            Password = "password123",
            Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
            Bio = "English Language specialist with 10 years of experience in IELTS, TOEFL.",
            Specializations = new List<string> { "English", "Literature", "Writing" },
            Languages = new List<string> { "English", "Mandarin", "Cantonese" },
            HourlyRate = 45,
            Rating = 4.8,
            TotalSessions = 520,
            StudentsSatisfaction = 99,
            YearsExperience = 10,
            Certificates = new List<string> { "BA English", "TEFL Certification" },
            Availability = new List<Availability>
            {
                new Availability { DayOfWeek = "Monday", StartTime = "14:00", EndTime = "22:00", IsAvailable = true },
                new Availability { DayOfWeek = "Wednesday", StartTime = "14:00", EndTime = "22:00", IsAvailable = true }
            }
        });

        _tutors.Add(new Tutor
        {
            Id = "3",
            Name = "Emma Rodriguez",
            Email = "emma@tutorapp.com",
            Password = "password123",
            Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
            Bio = "Science tutor passionate about making complex concepts understandable.",
            Specializations = new List<string> { "Biology", "Environmental Science", "General Science" },
            Languages = new List<string> { "English", "Spanish", "Portuguese" },
            HourlyRate = 48,
            Rating = 4.7,
            TotalSessions = 380,
            StudentsSatisfaction = 97,
            YearsExperience = 7,
            Certificates = new List<string> { "B.Sc Biology" },
            Availability = new List<Availability>
            {
                new Availability { DayOfWeek = "Tuesday", StartTime = "10:00", EndTime = "18:00", IsAvailable = true },
                new Availability { DayOfWeek = "Thursday", StartTime = "10:00", EndTime = "18:00", IsAvailable = true }
            }
        });
    }

    public async Task<List<Tutor>> GetAllTutors()
    {
        return await Task.FromResult(_tutors.OrderByDescending(t => t.Rating).ToList());
    }

    public async Task<Tutor> GetTutorById(string id)
    {
        return await Task.FromResult(_tutors.FirstOrDefault(t => t.Id == id));
    }

    public async Task<List<Tutor>> SearchTutors(string searchTerm)
    {
        var results = _tutors.Where(t =>
            t.Name.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
            t.Specializations.Any(s => s.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
        ).ToList();

        return await Task.FromResult(results);
    }

    public async Task<List<Tutor>> FilterTutors(string specialization, double minRating, double maxRate)
    {
        var results = _tutors.Where(t =>
            (string.IsNullOrEmpty(specialization) || t.Specializations.Contains(specialization)) &&
            t.Rating >= minRating &&
            t.HourlyRate <= maxRate
        ).OrderByDescending(t => t.Rating).ToList();

        return await Task.FromResult(results);
    }

    public async Task<bool> UpdateTutorAvailability(string tutorId, Availability availability)
    {
        var tutor = _tutors.FirstOrDefault(t => t.Id == tutorId);
        if (tutor == null) return await Task.FromResult(false);

        var existingAvailability = tutor.Availability.FirstOrDefault(a => a.DayOfWeek == availability.DayOfWeek);
        if (existingAvailability != null)
        {
            tutor.Availability.Remove(existingAvailability);
        }

        tutor.Availability.Add(availability);
        return await Task.FromResult(true);
    }

    public async Task<List<Review>> GetTutorReviews(string tutorId)
    {
        return await Task.FromResult(_reviews.Where(r => r.TutorId == tutorId).OrderByDescending(r => r.Date).ToList());
    }

    public async Task<Review> AddReview(string tutorId, string studentId, int rating, string comment)
    {
        var review = new Review
        {
            TutorId = tutorId,
            StudentId = studentId,
            Rating = rating,
            Comment = comment,
            Verified = true
        };
        _reviews.Add(review);
        return await Task.FromResult(review);
    }
}
