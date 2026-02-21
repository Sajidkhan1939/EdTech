using Microsoft.AspNetCore.Mvc;
using EdTechAPIs.Services;
using EdTechAPIs.DTOs;
using EdTechAPIs.Models;

namespace EdTechAPIs.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await _authService.Login(request.Email, request.Password);
        if (user == null)
            return Unauthorized(new { message = "Invalid email or password" });

        var userDto = MapToUserDto(user);
        return Ok(new AuthResponse
        {
            Success = true,
            Message = "Login successful",
            User = userDto
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var existingUser = _authService.GetUserByEmail(request.Email);
        if (existingUser != null)
            return Conflict(new { message = "Email already exists" });

        User newUser;
        if (request.UserType == "student")
        {
            newUser = await _authService.RegisterStudent(request.Name, request.Email, request.Password);
        }
        else if (request.UserType == "tutor")
        {
            newUser = await _authService.RegisterTutor(request.Name, request.Email, request.Password);
        }
        else
        {
            return BadRequest(new { message = "Invalid user type" });
        }

        var userDto = MapToUserDto(newUser);
        return Ok(new AuthResponse
        {
            Success = true,
            Message = "Registration successful",
            User = userDto
        });
    }

    [HttpGet("user/{id}")]
    public async Task<IActionResult> GetUser(string id)
    {
        var student = await _authService.GetStudent(id);
        if (student != null)
        {
            return Ok(student);
        }

        var tutor = await _authService.GetTutor(id);
        if (tutor != null)
        {
            return Ok(tutor);
        }

        return NotFound(new { message = "User not found" });
    }

    private UserDto MapToUserDto(User user)
    {
        if (user is Student student)
        {
            return new StudentDto
            {
                Id = student.Id,
                Name = student.Name,
                Email = student.Email,
                Avatar = student.Avatar,
                UserType = "student",
                Grade = student.Grade,
                Subjects = student.Subjects,
                Rating = student.Rating
            };
        }

        if (user is Tutor tutor)
        {
            return new TutorDto
            {
                Id = tutor.Id,
                Name = tutor.Name,
                Email = tutor.Email,
                Avatar = tutor.Avatar,
                UserType = "tutor",
                Bio = tutor.Bio,
                Specializations = tutor.Specializations,
                Languages = tutor.Languages,
                HourlyRate = tutor.HourlyRate,
                Rating = tutor.Rating,
                TotalSessions = tutor.TotalSessions,
                StudentsSatisfaction = tutor.StudentsSatisfaction,
                Certificates = tutor.Certificates,
                YearsExperience = tutor.YearsExperience
            };
        }

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Avatar = user.Avatar
        };
    }
}
