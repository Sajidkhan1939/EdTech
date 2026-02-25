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

    public async Task<Booking> CreateBooking(Booking booking)
    {
        _bookings.Add(booking);
        return await Task.FromResult(booking);
    }

    public async Task<List<Booking>> GetBookingsByStudent(string studentId)
    {
        return await Task.FromResult(_bookings.Where(b => b.StudentId == studentId).OrderByDescending(b => b.CreatedDate).ToList());
    }

    public async Task<List<Booking>> GetBookingsByTutor(string tutorId)
    {
        return await Task.FromResult(_bookings.Where(b => b.TutorId == tutorId).OrderByDescending(b => b.CreatedDate).ToList());
    }

    public async Task<Booking> GetBookingById(string id)
    {
        return await Task.FromResult(_bookings.FirstOrDefault(b => b.Id == id));
    }

    public async Task<Booking> UpdateBookingStatus(string id, string status)
    {
        var booking = _bookings.FirstOrDefault(b => b.Id == id);
        if (booking != null)
        {
            booking.Status = status;
        }
        return await Task.FromResult(booking);
    }

    public async Task<Booking> UpdateBookingPaymentStatus(string id, string paymentStatus)
    {
        var booking = _bookings.FirstOrDefault(b => b.Id == id);
        if (booking != null)
        {
            booking.PaymentStatus = paymentStatus;
        }
        return await Task.FromResult(booking);
    }

    public async Task<bool> CancelBooking(string id)
    {
        var booking = _bookings.FirstOrDefault(b => b.Id == id);
        if (booking == null) return await Task.FromResult(false);

        booking.Status = "cancelled";
        return await Task.FromResult(true);
    }

    public async Task<List<Booking>> GetUpcomingBookings(string studentId)
    {
        return await Task.FromResult(_bookings
            .Where(b =>
                b.StudentId == studentId &&
                b.SessionDate > DateTime.UtcNow &&
                b.Status != "cancelled"
            )
            .OrderBy(b => b.SessionDate)
            .ToList());
    }

    public async Task<List<Booking>> GetCompletedBookings(string studentId)
    {
        return await Task.FromResult(_bookings
            .Where(b =>
                b.StudentId == studentId &&
                b.Status == "completed"
            )
            .OrderByDescending(b => b.SessionDate)
            .ToList());
    }
}
