using EdTechAPIs.Models;

namespace EdTechAPIs.Services;

public interface ICourseService
{
    Task<List<Course>> GetAllCourses();
    Task<Course> GetCourseById(string id);
    Task<List<Course>> GetCoursesByTutor(string tutorId);
    Task<Course> CreateCourse(string tutorId, string title, string description, string category, string level, double price, int duration, string image);
    Task<Course> UpdateCourse(string id, Course course);
    Task<bool> DeleteCourse(string id);
    Task<List<Course>> SearchCourses(string searchTerm);
}

public class CourseService : ICourseService
{
    private List<Course> _courses = new();

    public CourseService()
    {
        SeedData();
    }

    private void SeedData()
    {
        _courses.Add(new Course
        {
            Id = "1",
            Title = "Advanced Mathematics for High School",
            Description = "Master algebra, geometry, and trigonometry with expert guidance.",
            Category = "Mathematics",
            Level = "High School",
            TutorId = "1",
            Price = 499,
            Duration = 40,
            Rating = 4.9,
            StudentCount = 850,
            Image = "https://images.unsplash.com/photo-1434582881033-aaf713f37338?w=500&h=300&fit=crop"
        });

        _courses.Add(new Course
        {
            Id = "2",
            Title = "English Language Mastery: IELTS Preparation",
            Description = "Prepare for IELTS exam with comprehensive training.",
            Category = "English",
            Level = "Intermediate",
            TutorId = "2",
            Price = 399,
            Duration = 50,
            Rating = 4.8,
            StudentCount = 1200,
            Image = "https://images.unsplash.com/photo-1516534775068-bb57c960ba1a?w=500&h=300&fit=crop"
        });

        _courses.Add(new Course
        {
            Id = "3",
            Title = "Biology Fundamentals: From Cells to Organisms",
            Description = "Understand the fundamentals of biology through interactive lessons.",
            Category = "Science",
            Level = "High School",
            TutorId = "3",
            Price = 449,
            Duration = 45,
            Rating = 4.7,
            StudentCount = 680,
            Image = "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&h=300&fit=crop"
        });
    }

    public async Task<List<Course>> GetAllCourses()
    {
        return await Task.FromResult(_courses.OrderByDescending(c => c.Rating).ToList());
    }

    public async Task<Course> GetCourseById(string id)
    {
        return await Task.FromResult(_courses.FirstOrDefault(c => c.Id == id));
    }

    public async Task<List<Course>> GetCoursesByTutor(string tutorId)
    {
        return await Task.FromResult(_courses.Where(c => c.TutorId == tutorId).ToList());
    }

    public async Task<Course> CreateCourse(string tutorId, string title, string description, string category, string level, double price, int duration, string image)
    {
        var course = new Course
        {
            Title = title,
            Description = description,
            Category = category,
            Level = level,
            TutorId = tutorId,
            Price = price,
            Duration = duration,
            Image = image,
            Rating = 0,
            StudentCount = 0
        };
        _courses.Add(course);
        return await Task.FromResult(course);
    }

    public async Task<Course> UpdateCourse(string id, Course course)
    {
        var existingCourse = _courses.FirstOrDefault(c => c.Id == id);
        if (existingCourse == null) return await Task.FromResult<Course>(null);

        existingCourse.Title = course.Title;
        existingCourse.Description = course.Description;
        existingCourse.Category = course.Category;
        existingCourse.Level = course.Level;
        existingCourse.Price = course.Price;
        existingCourse.Duration = course.Duration;
        existingCourse.Image = course.Image;

        return await Task.FromResult(existingCourse);
    }

    public async Task<bool> DeleteCourse(string id)
    {
        var course = _courses.FirstOrDefault(c => c.Id == id);
        if (course == null) return await Task.FromResult(false);

        _courses.Remove(course);
        return await Task.FromResult(true);
    }

    public async Task<List<Course>> SearchCourses(string searchTerm)
    {
        var results = _courses.Where(c =>
            c.Title.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
            c.Description.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
            c.Category.Contains(searchTerm, StringComparison.OrdinalIgnoreCase)
        ).ToList();

        return await Task.FromResult(results);
    }
}
