using EdTechAPIs.Models;

namespace EdTechAPIs.Services;

public interface IMessageService
{
    Task<Message> SendMessage(Message message);
    Task<List<Message>> GetConversation(string userId1, string userId2);
    Task<List<Message>> GetUserMessages(string userId);
    Task<bool> MarkAsRead(string messageId);
}

public class MessageService : IMessageService
{
    private List<Message> _messages = new();

    public Task<Message> SendMessage(Message message)
    {
        _messages.Add(message);
        return Task.FromResult(message);
    }

    public Task<List<Message>> GetConversation(string userId1, string userId2)
    {
        return Task.FromResult(_messages
            .Where(m =>
                (m.SenderId == userId1 && m.ReceiverId == userId2) ||
                (m.SenderId == userId2 && m.ReceiverId == userId1)
            )
            .OrderBy(m => m.Timestamp)
            .ToList());
    }

    public Task<List<Message>> GetUserMessages(string userId)
    {
        return Task.FromResult(_messages
            .Where(m => m.SenderId == userId || m.ReceiverId == userId)
            .OrderByDescending(m => m.Timestamp)
            .ToList());
    }

    public Task<bool> MarkAsRead(string messageId)
    {
        var message = _messages.FirstOrDefault(m => m.Id == messageId);
        if (message == null) return Task.FromResult(false);

        message.Read = true;
        return Task.FromResult(true);
    }
}
