using EdTechAPIs.Models;

namespace EdTechAPIs.Services;

public interface IBookingService
{
    Task<Booking> CreateBooking(Booking booking);
    Task<List<Booking>> GetBookingsByStudent(string studentId);
    Task<List<Booking>> GetBookingsByTutor(string tutorId);
    Task<Booking> GetBookingById(string id);
    Task<Booking> UpdateBookingStatus(string id, string status);
    Task<Booking> UpdateBookingPaymentStatus(string id, string paymentStatus);
    Task<bool> CancelBooking(string id);
    Task<List<Booking>> GetUpcomingBookings(string studentId);
    Task<List<Booking>> GetCompletedBookings(string studentId);
}

public class BookingService : IBookingService
{
    private List<Booking> _bookings = new();

    public Task<Booking> CreateBooking(Booking booking)
    {
        _bookings.Add(booking);
        return Task.FromResult(booking);
    }

    public Task<List<Booking>> GetBookingsByStudent(string studentId)
    {
        return Task.FromResult(_bookings.Where(b => b.StudentId == studentId).OrderByDescending(b => b.CreatedDate).ToList());
    }

    public Task<List<Booking>> GetBookingsByTutor(string tutorId)
    {
        return Task.FromResult(_bookings.Where(b => b.TutorId == tutorId).OrderByDescending(b => b.CreatedDate).ToList());
    }

    public Task<Booking> GetBookingById(string id)
    {
        return Task.FromResult(_bookings.FirstOrDefault(b => b.Id == id));
    }

    public Task<Booking> UpdateBookingStatus(string id, string status)
    {
        var booking = _bookings.FirstOrDefault(b => b.Id == id);
        if (booking != null)
        {
            booking.Status = status;
        }
        return Task.FromResult(booking);
    }

    public Task<Booking> UpdateBookingPaymentStatus(string id, string paymentStatus)
    {
        var booking = _bookings.FirstOrDefault(b => b.Id == id);
        if (booking != null)
        {
            booking.PaymentStatus = paymentStatus;
        }
        return Task.FromResult(booking);
    }

    public Task<bool> CancelBooking(string id)
    {
        var booking = _bookings.FirstOrDefault(b => b.Id == id);
        if (booking == null) return Task.FromResult(false);

        booking.Status = "cancelled";
        return Task.FromResult(true);
    }

    public Task<List<Booking>> GetUpcomingBookings(string studentId)
    {
        return Task.FromResult(_bookings
            .Where(b =>
                b.StudentId == studentId &&
                b.SessionDate > DateTime.UtcNow &&
                b.Status != "cancelled"
            )
            .OrderBy(b => b.SessionDate)
            .ToList());
    }

    public Task<List<Booking>> GetCompletedBookings(string studentId)
    {
        return Task.FromResult(_bookings
            .Where(b =>
                b.StudentId == studentId &&
                b.Status == "completed"
            )
            .OrderByDescending(b => b.SessionDate)
            .ToList());
    }
}
