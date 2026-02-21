namespace EdTechAPIs.DTOs;

public class PaymentDto
{
    public string Id { get; set; }
    public string StudentId { get; set; }
    public string TutorId { get; set; }
    public string BookingId { get; set; }
    public double Amount { get; set; }
    public string PaymentMethod { get; set; }
    public string Status { get; set; }
    public string TransactionId { get; set; }
    public DateTime Date { get; set; }
    public string InvoiceNumber { get; set; }
}

public class CreatePaymentRequest
{
    public string StudentId { get; set; }
    public string BookingId { get; set; }
    public double Amount { get; set; }
    public string PaymentMethod { get; set; }
}
