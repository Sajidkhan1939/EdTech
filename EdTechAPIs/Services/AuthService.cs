using EdTechAPIs.Models;

namespace EdTechAPIs.Services;

public interface IAuthService
{
    Task<Student> RegisterStudent(string name, string email, string password);
    Task<Tutor> RegisterTutor(string name, string email, string password);
    Task<User> Login(string email, string password);
    Task<Student> GetStudent(string id);
    Task<Tutor> GetTutor(string id);
    User GetUserByEmail(string email);
}

public class AuthService : IAuthService
{
    private List<Student> _students = new();
    private List<Tutor> _tutors = new();

    public AuthService()
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
            Certificates = new List<string> { "B.Sc Mathematics", "M.Sc Physics", "Teaching Certification" }
        });

        _tutors.Add(new Tutor
        {
            Id = "2",
            Name = "Michael Chen",
            Email = "michael@tutorapp.com",
            Password = "password123",
            Avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
            Bio = "English Language specialist with 10 years of experience.",
            Specializations = new List<string> { "English", "Literature", "Writing" },
            Languages = new List<string> { "English", "Mandarin", "Cantonese" },
            HourlyRate = 45,
            Rating = 4.8,
            TotalSessions = 520,
            StudentsSatisfaction = 99,
            YearsExperience = 10,
            Certificates = new List<string> { "BA English", "TEFL Certification" }
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
            Certificates = new List<string> { "B.Sc Biology", "M.Sc Environmental Science" }
        });
    }

    public Task<Student> RegisterStudent(string name, string email, string password)
    {
        var student = new Student
        {
            Name = name,
            Email = email,
            Password = password,
            Avatar = $"https://api.dicebear.com/7.x/avataaars/svg?seed={email}",
            Grade = "10th",
            Subjects = new List<string> { "Math", "English", "Science" }
        };
        _students.Add(student);
        return Task.FromResult(student);
    }

    public Task<Tutor> RegisterTutor(string name, string email, string password)
    {
        var tutor = new Tutor
        {
            Name = name,
            Email = email,
            Password = password,
            Avatar = $"https://api.dicebear.com/7.x/avataaars/svg?seed={email}",
            Bio = "Professional Tutor",
            Specializations = new List<string>(),
            Languages = new List<string> { "English" },
            HourlyRate = 50,
            YearsExperience = 1
        };
        _tutors.Add(tutor);
        return Task.FromResult(tutor);
    }

    public Task<User> Login(string email, string password)
    {
        var student = _students.FirstOrDefault(s => s.Email == email && s.Password == password);
        if (student != null)
            return Task.FromResult<User>(student);

        var tutor = _tutors.FirstOrDefault(t => t.Email == email && t.Password == password);
        if (tutor != null)
            return Task.FromResult<User>(tutor);

        return Task.FromResult<User>(null);
    }

    public Task<Student> GetStudent(string id)
    {
        return Task.FromResult(_students.FirstOrDefault(s => s.Id == id));
    }

    public Task<Tutor> GetTutor(string id)
    {
        return Task.FromResult(_tutors.FirstOrDefault(t => t.Id == id));
    }

    public User GetUserByEmail(string email)
    {
        var user = (User)_students.FirstOrDefault(s => s.Email == email);
        return user ?? _tutors.FirstOrDefault(t => t.Email == email);
    }
}
