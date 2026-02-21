using Microsoft.AspNetCore.Mvc;
using EdTechAPIs.Services;
using EdTechAPIs.DTOs;
using EdTechAPIs.Models;

namespace EdTechAPIs.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingsController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateBooking([FromBody] CreateBookingRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var booking = new Booking
        {
            StudentId = request.StudentId,
            TutorId = request.TutorId,
            CourseId = request.CourseId,
            SessionDate = request.SessionDate,
            SessionTime = request.SessionTime,
            Duration = request.Duration,
            Amount = request.Amount,
            Notes = request.Notes,
            Status = "pending",
            PaymentStatus = "pending"
        };

        var createdBooking = await _bookingService.CreateBooking(booking);
        return Created($"api/bookings/{createdBooking.Id}", MapToBookingDto(createdBooking));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBookingById(string id)
    {
        var booking = await _bookingService.GetBookingById(id);
        if (booking == null)
            return NotFound(new { message = "Booking not found" });

        return Ok(MapToBookingDto(booking));
    }

    [HttpGet("student/{studentId}")]
    public async Task<IActionResult> GetStudentBookings(string studentId)
    {
        var bookings = await _bookingService.GetBookingsByStudent(studentId);
        var bookingDtos = bookings.Select(MapToBookingDto).ToList();
        return Ok(bookingDtos);
    }

    [HttpGet("tutor/{tutorId}")]
    public async Task<IActionResult> GetTutorBookings(string tutorId)
    {
        var bookings = await _bookingService.GetBookingsByTutor(tutorId);
        var bookingDtos = bookings.Select(MapToBookingDto).ToList();
        return Ok(bookingDtos);
    }

    [HttpGet("student/{studentId}/upcoming")]
    public async Task<IActionResult> GetUpcomingBookings(string studentId)
    {
        var bookings = await _bookingService.GetUpcomingBookings(studentId);
        var bookingDtos = bookings.Select(MapToBookingDto).ToList();
        return Ok(bookingDtos);
    }

    [HttpGet("student/{studentId}/completed")]
    public async Task<IActionResult> GetCompletedBookings(string studentId)
    {
        var bookings = await _bookingService.GetCompletedBookings(studentId);
        var bookingDtos = bookings.Select(MapToBookingDto).ToList();
        return Ok(bookingDtos);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(string id, [FromBody] UpdateBookingRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var booking = await _bookingService.UpdateBookingStatus(id, request.Status);
        if (booking == null)
            return NotFound(new { message = "Booking not found" });

        return Ok(MapToBookingDto(booking));
    }

    [HttpPut("{id}/payment-status")]
    public async Task<IActionResult> UpdatePaymentStatus(string id, [FromBody] UpdateBookingRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var booking = await _bookingService.UpdateBookingPaymentStatus(id, request.PaymentStatus);
        if (booking == null)
            return NotFound(new { message = "Booking not found" });

        return Ok(MapToBookingDto(booking));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> CancelBooking(string id)
    {
        var result = await _bookingService.CancelBooking(id);
        if (!result)
            return NotFound(new { message = "Booking not found" });

        return Ok(new { message = "Booking cancelled successfully" });
    }

    private BookingDto MapToBookingDto(Booking booking)
    {
        return new BookingDto
        {
            Id = booking.Id,
            StudentId = booking.StudentId,
            TutorId = booking.TutorId,
            CourseId = booking.CourseId,
            SessionDate = booking.SessionDate,
            SessionTime = booking.SessionTime,
            Duration = booking.Duration,
            Status = booking.Status,
            PaymentStatus = booking.PaymentStatus,
            Amount = booking.Amount,
            Notes = booking.Notes
        };
    }
}
