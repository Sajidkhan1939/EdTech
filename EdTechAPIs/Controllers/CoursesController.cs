using Microsoft.AspNetCore.Mvc;
using EdTechAPIs.Services;
using EdTechAPIs.DTOs;

namespace EdTechAPIs.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly ICourseService _courseService;
    private readonly ITutorService _tutorService;

    public CoursesController(ICourseService courseService, ITutorService tutorService)
    {
        _courseService = courseService;
        _tutorService = tutorService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCourses()
    {
        var courses = await _courseService.GetAllCourses();
        var courseDtos = new List<CourseDto>();

        foreach (var course in courses)
        {
            var tutor = await _tutorService.GetTutorById(course.TutorId);
            courseDtos.Add(MapToCourseDto(course, tutor));
        }

        return Ok(courseDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCourseById(string id)
    {
        var course = await _courseService.GetCourseById(id);
        if (course == null)
            return NotFound(new { message = "Course not found" });

        var tutor = await _tutorService.GetTutorById(course.TutorId);
        return Ok(MapToCourseDto(course, tutor));
    }

    [HttpGet("tutor/{tutorId}")]
    public async Task<IActionResult> GetCoursesByTutor(string tutorId)
    {
        var courses = await _courseService.GetCoursesByTutor(tutorId);
        var tutor = await _tutorService.GetTutorById(tutorId);

        var courseDtos = courses.Select(c => MapToCourseDto(c, tutor)).ToList();
        return Ok(courseDtos);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse([FromBody] CreateCourseRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var course = await _courseService.CreateCourse(
            "1", request.Title, request.Description, request.Category,
            request.Level, request.Price, request.Duration, request.Image
        );

        return Created($"api/courses/{course.Id}", course);
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchCourses([FromQuery] string q)
    {
        if (string.IsNullOrEmpty(q))
            return BadRequest(new { message = "Search term is required" });

        var courses = await _courseService.SearchCourses(q);
        var courseDtos = new List<CourseDto>();

        foreach (var course in courses)
        {
            var tutor = await _tutorService.GetTutorById(course.TutorId);
            courseDtos.Add(MapToCourseDto(course, tutor));
        }

        return Ok(courseDtos);
    }

    private CourseDto MapToCourseDto(EdTechAPIs.Models.Course course, EdTechAPIs.Models.Tutor tutor)
    {
        var tutorDto = new TutorDto
        {
            Id = tutor.Id,
            Name = tutor.Name,
            Email = tutor.Email,
            Avatar = tutor.Avatar,
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

        return new CourseDto
        {
            Id = course.Id,
            Title = course.Title,
            Description = course.Description,
            Category = course.Category,
            Level = course.Level,
            Tutor = tutorDto,
            Price = course.Price,
            Duration = course.Duration,
            Rating = course.Rating,
            Students = course.StudentCount,
            Image = course.Image,
            Content = course.Content.Select(l => new LessonDto
            {
                Id = l.Id,
                Title = l.Title,
                Description = l.Description,
                VideoUrl = l.VideoUrl,
                Duration = l.Duration,
                Order = l.Order,
                Materials = l.Materials.Select(m => new MaterialDto
                {
                    Id = m.Id,
                    Name = m.Name,
                    Type = m.Type,
                    Url = m.Url,
                    Size = m.Size
                }).ToList()
            }).ToList()
        };
    }
}
