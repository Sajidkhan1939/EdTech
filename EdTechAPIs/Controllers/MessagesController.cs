using Microsoft.AspNetCore.Mvc;
using EdTechAPIs.Services;
using EdTechAPIs.DTOs;
using EdTechAPIs.Models;

namespace EdTechAPIs.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private readonly IMessageService _messageService;

    public MessagesController(IMessageService messageService)
    {
        _messageService = messageService;
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage([FromBody] SendMessageRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var message = new Message
        {
            SenderId = request.SenderId,
            ReceiverId = request.ReceiverId,
            Content = request.Content,
            Timestamp = DateTime.UtcNow,
            Read = false
        };

        var sentMessage = await _messageService.SendMessage(message);
        return Created($"api/messages/{sentMessage.Id}", MapToMessageDto(sentMessage));
    }

    [HttpGet("conversation")]
    public async Task<IActionResult> GetConversation([FromQuery] string user1, [FromQuery] string user2)
    {
        if (string.IsNullOrEmpty(user1) || string.IsNullOrEmpty(user2))
            return BadRequest(new { message = "Both user IDs are required" });

        var messages = await _messageService.GetConversation(user1, user2);
        var messageDtos = messages.Select(MapToMessageDto).ToList();
        return Ok(messageDtos);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetUserMessages(string userId)
    {
        var messages = await _messageService.GetUserMessages(userId);
        var messageDtos = messages.Select(MapToMessageDto).ToList();
        return Ok(messageDtos);
    }

    [HttpPut("{id}/read")]
    public async Task<IActionResult> MarkAsRead(string id)
    {
        var result = await _messageService.MarkAsRead(id);
        if (!result)
            return NotFound(new { message = "Message not found" });

        return Ok(new { message = "Message marked as read" });
    }

    private MessageDto MapToMessageDto(Message message)
    {
        return new MessageDto
        {
            Id = message.Id,
            SenderId = message.SenderId,
            ReceiverId = message.ReceiverId,
            Content = message.Content,
            Timestamp = message.Timestamp,
            Read = message.Read,
            Attachments = message.Attachments.Select(a => new AttachmentDto
            {
                Id = a.Id,
                Name = a.Name,
                Url = a.Url,
                Type = a.Type,
                Size = a.Size
            }).ToList()
        };
    }
}
