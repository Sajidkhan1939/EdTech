namespace EdTechAPIs.Models;

public class Booking
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string StudentId { get; set; }
    public string TutorId { get; set; }
    public string CourseId { get; set; }
    public DateTime SessionDate { get; set; }
    public string SessionTime { get; set; }
    public int Duration { get; set; }
    public string Status { get; set; } = "pending";
    public string PaymentStatus { get; set; } = "pending";
    public double Amount { get; set; }
    public string Notes { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}
