namespace EdTechAPIs.Models;

public abstract class User
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Avatar { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}

public class Student : User
{
    public string Grade { get; set; }
    public List<string> Subjects { get; set; } = new();
    public List<string> EnrolledCourseIds { get; set; } = new();
    public List<string> BookingIds { get; set; } = new();
    public double Rating { get; set; }
}

public class Tutor : User
{
    public string Bio { get; set; }
    public List<string> Specializations { get; set; } = new();
    public List<string> Languages { get; set; } = new();
    public double HourlyRate { get; set; }
    public double Rating { get; set; }
    public int TotalSessions { get; set; }
    public double StudentsSatisfaction { get; set; }
    public List<string> Certificates { get; set; } = new();
    public int YearsExperience { get; set; }
    public List<Availability> Availability { get; set; } = new();
    public List<string> CourseIds { get; set; } = new();
}

public class Availability
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string DayOfWeek { get; set; }
    public string StartTime { get; set; }
    public string EndTime { get; set; }
    public bool IsAvailable { get; set; }
}
