namespace EdTechAPIs.Models;

public class Message
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string SenderId { get; set; }
    public string ReceiverId { get; set; }
    public string Content { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public bool Read { get; set; }
    public List<Attachment> Attachments { get; set; } = new();
}

public class Attachment
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string Url { get; set; }
    public string Type { get; set; }
    public long Size { get; set; }
}
