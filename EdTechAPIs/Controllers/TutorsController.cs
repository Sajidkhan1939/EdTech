using Microsoft.AspNetCore.Mvc;
using EdTechAPIs.Services;
using EdTechAPIs.DTOs;

namespace EdTechAPIs.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TutorsController : ControllerBase
{
    private readonly ITutorService _tutorService;

    public TutorsController(ITutorService tutorService)
    {
        _tutorService = tutorService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTutors()
    {
        var tutors = await _tutorService.GetAllTutors();
        var tutorDtos = tutors.Select(MapToTutorDto).ToList();
        return Ok(tutorDtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTutorById(string id)
    {
        var tutor = await _tutorService.GetTutorById(id);
        if (tutor == null)
            return NotFound(new { message = "Tutor not found" });

        return Ok(MapToTutorDto(tutor));
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchTutors([FromQuery] string q)
    {
        if (string.IsNullOrEmpty(q))
            return BadRequest(new { message = "Search term is required" });

        var tutors = await _tutorService.SearchTutors(q);
        var tutorDtos = tutors.Select(MapToTutorDto).ToList();
        return Ok(tutorDtos);
    }

    [HttpGet("filter")]
    public async Task<IActionResult> FilterTutors(
        [FromQuery] string specialization,
        [FromQuery] double minRating = 0,
        [FromQuery] double maxRate = 1000)
    {
        var tutors = await _tutorService.FilterTutors(specialization, minRating, maxRate);
        var tutorDtos = tutors.Select(MapToTutorDto).ToList();
        return Ok(tutorDtos);
    }

    [HttpPut("{id}/availability")]
    public async Task<IActionResult> UpdateAvailability(string id, [FromBody] EdTechAPIs.Models.Availability availability)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _tutorService.UpdateTutorAvailability(id, availability);
        if (!result)
            return NotFound(new { message = "Tutor not found" });

        return Ok(new { message = "Availability updated" });
    }

    [HttpGet("{id}/reviews")]
    public async Task<IActionResult> GetReviews(string id)
    {
        var reviews = await _tutorService.GetTutorReviews(id);
        return Ok(reviews);
    }

    [HttpPost("{id}/reviews")]
    public async Task<IActionResult> AddReview(string id, [FromBody] ReviewRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var review = await _tutorService.AddReview(id, request.StudentId, request.Rating, request.Comment);
        return Created($"api/tutors/{id}/reviews/{review.Id}", review);
    }

    private TutorDto MapToTutorDto(EdTechAPIs.Models.Tutor tutor)
    {
        return new TutorDto
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
    }
}

public class ReviewRequest
{
    public string StudentId { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
}
