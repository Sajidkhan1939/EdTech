namespace EdTechAPIs.Models;

public class Payment
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string StudentId { get; set; }
    public string TutorId { get; set; }
    public string BookingId { get; set; }
    public double Amount { get; set; }
    public string PaymentMethod { get; set; }
    public string Status { get; set; } = "pending";
    public string TransactionId { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public string InvoiceNumber { get; set; }
}
