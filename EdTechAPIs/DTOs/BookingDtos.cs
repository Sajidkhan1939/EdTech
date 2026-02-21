namespace EdTechAPIs.DTOs;

public class BookingDto
{
    public string Id { get; set; }
    public string StudentId { get; set; }
    public string TutorId { get; set; }
    public string CourseId { get; set; }
    public DateTime SessionDate { get; set; }
    public string SessionTime { get; set; }
    public int Duration { get; set; }
    public string Status { get; set; }
    public string PaymentStatus { get; set; }
    public double Amount { get; set; }
    public string Notes { get; set; }
}

public class CreateBookingRequest
{
    public string StudentId { get; set; }
    public string TutorId { get; set; }
    public string CourseId { get; set; }
    public DateTime SessionDate { get; set; }
    public string SessionTime { get; set; }
    public int Duration { get; set; }
    public double Amount { get; set; }
    public string Notes { get; set; }
}

public class UpdateBookingRequest
{
    public string Status { get; set; }
    public string PaymentStatus { get; set; }
}
