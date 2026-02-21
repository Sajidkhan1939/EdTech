namespace EdTechAPIs.DTOs;

public class MessageDto
{
    public string Id { get; set; }
    public string SenderId { get; set; }
    public string ReceiverId { get; set; }
    public string Content { get; set; }
    public DateTime Timestamp { get; set; }
    public bool Read { get; set; }
    public List<AttachmentDto> Attachments { get; set; }
}

public class AttachmentDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Url { get; set; }
    public string Type { get; set; }
    public long Size { get; set; }
}

public class SendMessageRequest
{
    public string SenderId { get; set; }
    public string ReceiverId { get; set; }
    public string Content { get; set; }
}
