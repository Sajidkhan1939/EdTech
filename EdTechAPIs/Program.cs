using EdTechAPIs.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Register Application Services
builder.Services.AddSingleton<IAuthService, AuthService>();
builder.Services.AddSingleton<ICourseService, CourseService>();
builder.Services.AddSingleton<ITutorService, TutorService>();
builder.Services.AddSingleton<IBookingService, BookingService>();
builder.Services.AddSingleton<IPaymentService, PaymentService>();
builder.Services.AddSingleton<IMessageService, MessageService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularApp");
app.MapControllers();

app.Run();
