namespace EdTechAPIs.DTOs;

// Auth DTOs
public class LoginRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string UserType { get; set; }
}

public class RegisterRequest
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string UserType { get; set; }
}

public class AuthResponse
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public UserDto User { get; set; }
}

public class UserDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Avatar { get; set; }
    public string UserType { get; set; }
}

public class StudentDto : UserDto
{
    public string Grade { get; set; }
    public List<string> Subjects { get; set; }
    public double Rating { get; set; }
}

public class TutorDto : UserDto
{
    public string Bio { get; set; }
    public List<string> Specializations { get; set; }
    public List<string> Languages { get; set; }
    public double HourlyRate { get; set; }
    public double Rating { get; set; }
    public int TotalSessions { get; set; }
    public double StudentsSatisfaction { get; set; }
    public List<string> Certificates { get; set; }
    public int YearsExperience { get; set; }
}
