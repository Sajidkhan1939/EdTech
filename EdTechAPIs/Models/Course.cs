namespace EdTechAPIs.Models;

public class Course
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string Level { get; set; }
    public string TutorId { get; set; }
    public double Price { get; set; }
    public int Duration { get; set; }
    public double Rating { get; set; }
    public int StudentCount { get; set; }
    public string Image { get; set; }
    public List<Lesson> Content { get; set; } = new();
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}

public class Lesson
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; }
    public string Description { get; set; }
    public string VideoUrl { get; set; }
    public List<Material> Materials { get; set; } = new();
    public int Duration { get; set; }
    public int Order { get; set; }
}

public class Material
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string Type { get; set; }
    public string Url { get; set; }
    public long Size { get; set; }
}
