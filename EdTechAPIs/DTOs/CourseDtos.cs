namespace EdTechAPIs.DTOs;

public class CourseDto
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string Level { get; set; }
    public TutorDto Tutor { get; set; }
    public double Price { get; set; }
    public int Duration { get; set; }
    public double Rating { get; set; }
    public int Students { get; set; }
    public string Image { get; set; }
    public List<LessonDto> Content { get; set; }
}

public class LessonDto
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string VideoUrl { get; set; }
    public List<MaterialDto> Materials { get; set; }
    public int Duration { get; set; }
    public int Order { get; set; }
}

public class MaterialDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public string Url { get; set; }
    public long Size { get; set; }
}

public class CreateCourseRequest
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string Level { get; set; }
    public double Price { get; set; }
    public int Duration { get; set; }
    public string Image { get; set; }
}
