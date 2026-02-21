using Microsoft.AspNetCore.Mvc;
using EdTechAPIs.Services;
using EdTechAPIs.DTOs;
using EdTechAPIs.Models;

namespace EdTechAPIs.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentsController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [HttpPost]
    public async Task<IActionResult> ProcessPayment([FromBody] CreatePaymentRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var payment = new Payment
        {
            StudentId = request.StudentId,
            BookingId = request.BookingId,
            Amount = request.Amount,
            PaymentMethod = request.PaymentMethod,
            Status = "pending"
        };

        var processedPayment = await _paymentService.ProcessPayment(payment);
        return Created($"api/payments/{processedPayment.Id}", MapToPaymentDto(processedPayment));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPaymentById(string id)
    {
        var payment = await _paymentService.GetPaymentById(id);
        if (payment == null)
            return NotFound(new { message = "Payment not found" });

        return Ok(MapToPaymentDto(payment));
    }

    [HttpGet("student/{studentId}")]
    public async Task<IActionResult> GetStudentPayments(string studentId)
    {
        var payments = await _paymentService.GetPaymentsByStudent(studentId);
        var paymentDtos = payments.Select(MapToPaymentDto).ToList();
        return Ok(paymentDtos);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdatePaymentStatus(string id, [FromBody] UpdatePaymentStatusRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var payment = await _paymentService.UpdatePaymentStatus(id, request.Status);
        if (payment == null)
            return NotFound(new { message = "Payment not found" });

        return Ok(MapToPaymentDto(payment));
    }

    private PaymentDto MapToPaymentDto(Payment payment)
    {
        return new PaymentDto
        {
            Id = payment.Id,
            StudentId = payment.StudentId,
            TutorId = payment.TutorId,
            BookingId = payment.BookingId,
            Amount = payment.Amount,
            PaymentMethod = payment.PaymentMethod,
            Status = payment.Status,
            TransactionId = payment.TransactionId,
            Date = payment.Date,
            InvoiceNumber = payment.InvoiceNumber
        };
    }
}

public class UpdatePaymentStatusRequest
{
    public string Status { get; set; }
}
