using EdTechAPIs.Models;

namespace EdTechAPIs.Services;

public interface IPaymentService
{
    Task<Payment> ProcessPayment(Payment payment);
    Task<Payment> GetPaymentById(string id);
    Task<List<Payment>> GetPaymentsByStudent(string studentId);
    Task<Payment> UpdatePaymentStatus(string id, string status);
}

public class PaymentService : IPaymentService
{
    private List<Payment> _payments = new();

    public Task<Payment> ProcessPayment(Payment payment)
    {
        payment.Status = "completed";
        payment.TransactionId = Guid.NewGuid().ToString();
        payment.InvoiceNumber = $"INV-{DateTime.UtcNow:yyyyMMdd}-{_payments.Count + 1}";
        _payments.Add(payment);
        return Task.FromResult(payment);
    }

    public Task<Payment> GetPaymentById(string id)
    {
        return Task.FromResult(_payments.FirstOrDefault(p => p.Id == id));
    }

    public Task<List<Payment>> GetPaymentsByStudent(string studentId)
    {
        return Task.FromResult(_payments
            .Where(p => p.StudentId == studentId)
            .OrderByDescending(p => p.Date)
            .ToList());
    }

    public Task<Payment> UpdatePaymentStatus(string id, string status)
    {
        var payment = _payments.FirstOrDefault(p => p.Id == id);
        if (payment != null)
        {
            payment.Status = status;
        }
        return Task.FromResult(payment);
    }
}
