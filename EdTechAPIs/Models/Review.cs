namespace EdTechAPIs.Models;

public class Review
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string StudentId { get; set; }
    public string TutorId { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public bool Verified { get; set; }
}
