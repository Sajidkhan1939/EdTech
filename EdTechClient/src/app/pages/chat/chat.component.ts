import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="chat-container">
      <div class="chat-header">
        <h1>Messages</h1>
        <p>Chat with your tutors</p>
      </div>

      <div class="chat-content">
        <!-- Conversations List -->
        <aside class="conversations-sidebar">
          <div class="conversations-header">
            <h2>Conversations</h2>
            <input type="text" placeholder="Search..." class="search-input">
          </div>

          <div class="conversations-list">
            <div *ngFor="let conv of conversations" [class.active]="selectedConversation?.id === conv.id" 
                 (click)="selectConversation(conv)" class="conversation-item">
              <img [src]="conv.avatar" [alt]="conv.name" class="conv-avatar">
              <div class="conv-info">
                <h4>{{ conv.name }}</h4>
                <p class="conv-preview">{{ conv.lastMessage }}</p>
              </div>
              <span *ngIf="conv.unread" class="unread-badge">{{ conv.unread }}</span>
            </div>

            <div *ngIf="conversations.length === 0" class="empty-convs">
              <p>No conversations yet</p>
            </div>
          </div>
        </aside>

        <!-- Chat Area -->
        <main class="chat-main">
          <div *ngIf="selectedConversation" class="chat-view">
            <!-- Chat Header -->
            <div class="chat-header-bar">
              <div class="header-info">
                <img [src]="selectedConversation.avatar" [alt]="selectedConversation.name" class="header-avatar">
                <div>
                  <h3>{{ selectedConversation.name }}</h3>
                  <p class="status">Online</p>
                </div>
              </div>
              <div class="header-actions">
                <button class="icon-btn">📞</button>
                <button class="icon-btn">📹</button>
                <button class="icon-btn">ℹ️</button>
              </div>
            </div>

            <!-- Messages -->
            <div class="messages-area">
              <div *ngFor="let msg of messages" [class.own-message]="msg.isSent" class="message-item">
                <div class="message-bubble">
                  <p>{{ msg.text }}</p>
                  <span class="msg-time">{{ msg.time }}</span>
                </div>
              </div>

              <div *ngIf="messages.length === 0" class="no-messages">
                <p>No messages yet. Start the conversation!</p>
              </div>
            </div>

            <!-- Input Area -->
            <div class="message-input-area">
              <div class="input-wrapper">
                <button class="attach-btn">📎</button>
                <input 
                  type="text" 
                  [(ngModel)]="messageInput"
                  (keyup.enter)="sendMessage()"
                  placeholder="Type a message..."
                  class="message-input"
                >
                <button class="emoji-btn">😊</button>
              </div>
              <button (click)="sendMessage()" class="send-btn">Send</button>
            </div>
          </div>

          <div *ngIf="!selectedConversation" class="no-conversation">
            <div class="no-conv-content">
              <span class="emoji">💬</span>
              <h3>Select a conversation to start messaging</h3>
              <p>Choose a chat from the list or start a new conversation</p>
            </div>
          </div>
        </main>
      </div>
    </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .chat-container {
      background: #f9fafb;
      display: flex;
      flex-direction: column;
      height: calc(100vh - 80px);
    }

    .chat-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      text-align: center;
    }

    .chat-header h1 {
      font-size: 2rem;
      margin-bottom: 0.25rem;
    }

    .chat-header p {
      font-size: 1rem;
      opacity: 0.9;
    }

    .chat-content {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 0;
      flex: 1;
      overflow: hidden;
    }

    .conversations-sidebar {
      background: white;
      border-right: 1px solid #e5e7eb;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .conversations-header {
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .conversations-header h2 {
      font-size: 1.2rem;
      color: #1f2937;
      margin: 0 0 0.75rem 0;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      font-size: 0.9rem;
    }

    .conversations-list {
      flex: 1;
      overflow-y: auto;
    }

    .conversation-item {
      display: grid;
      grid-template-columns: 50px 1fr auto;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid #f3f4f6;
      cursor: pointer;
      transition: background 0.2s;
      align-items: center;
    }

    .conversation-item:hover {
      background: #f9fafb;
    }

    .conversation-item.active {
      background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
      border-left: 4px solid #667eea;
    }

    .conv-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }

    .conv-info {
      min-width: 0;
    }

    .conv-info h4 {
      color: #1f2937;
      margin: 0 0 0.25rem 0;
      font-size: 0.95rem;
      font-weight: 600;
    }

    .conv-preview {
      color: #9ca3af;
      font-size: 0.85rem;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .unread-badge {
      background: #667eea;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 700;
    }

    .empty-convs {
      text-align: center;
      padding: 2rem 1rem;
      color: #9ca3af;
    }

    .chat-main {
      display: flex;
      flex-direction: column;
      background: white;
      overflow: hidden;
    }

    .chat-view {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .chat-header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #e5e7eb;
      background: white;
    }

    .header-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .header-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .header-info h3 {
      color: #1f2937;
      margin: 0;
      font-size: 1rem;
    }

    .status {
      color: #10b981;
      font-size: 0.8rem;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 0.5rem;
    }

    .icon-btn {
      background: none;
      border: none;
      font-size: 1.3rem;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .icon-btn:hover {
      transform: scale(1.1);
    }

    .messages-area {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .message-item {
      display: flex;
      justify-content: flex-start;
    }

    .message-item.own-message {
      justify-content: flex-end;
    }

    .message-bubble {
      background: #f3f4f6;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      max-width: 70%;
      word-wrap: break-word;
    }

    .message-item.own-message .message-bubble {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .message-bubble p {
      margin: 0 0 0.25rem 0;
      color: #1f2937;
    }

    .message-item.own-message .message-bubble p {
      color: white;
    }

    .msg-time {
      font-size: 0.75rem;
      color: #9ca3af;
    }

    .message-item.own-message .msg-time {
      color: rgba(255, 255, 255, 0.7);
    }

    .no-messages {
      text-align: center;
      color: #9ca3af;
      padding: 2rem;
    }

    .message-input-area {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      border-top: 1px solid #e5e7eb;
      background: white;
    }

    .input-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid #e5e7eb;
      border-radius: 20px;
      padding: 0 1rem;
    }

    .attach-btn,
    .emoji-btn {
      background: none;
      border: none;
      font-size: 1.1rem;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .attach-btn:hover,
    .emoji-btn:hover {
      transform: scale(1.1);
    }

    .message-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 0.95rem;
      padding: 0.5rem 0;
    }

    .send-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 20px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .send-btn:hover {
      transform: scale(1.05);
    }

    .no-conversation {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .no-conv-content {
      text-align: center;
      color: #9ca3af;
    }

    .emoji {
      font-size: 4rem;
      display: block;
      margin-bottom: 1rem;
    }

    .no-conv-content h3 {
      color: #1f2937;
      margin: 0 0 0.5rem 0;
    }

    @media (max-width: 768px) {
      .chat-content {
        grid-template-columns: 1fr;
      }

      .conversations-sidebar {
        display: none;
      }

      .message-bubble {
        max-width: 100%;
      }
    }
  `]
})
export class ChatComponent implements OnInit {
  currentUser: any;
  selectedConversation: any = null;
  messageInput = '';
  
  conversations = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      lastMessage: 'Great session today! See you next week.',
      unread: 0
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      lastMessage: 'Can we reschedule to tomorrow?',
      unread: 2
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      lastMessage: 'Thanks for the materials!',
      unread: 0
    }
  ];

  messages = [
    { text: 'Hi Sarah! Thanks for the great lesson yesterday.', isSent: true, time: '2:30 PM' },
    { text: 'You\'re welcome! You did great on the practice problems.', isSent: false, time: '2:35 PM' },
    { text: 'Should I focus on any specific topics before next session?', isSent: true, time: '2:40 PM' },
    { text: 'Yes, let\'s review derivatives. Make sure you understand the chain rule.', isSent: false, time: '2:42 PM' }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.conversations.length > 0) {
      this.selectedConversation = this.conversations[0];
    }
  }

  selectConversation(conv: any): void {
    this.selectedConversation = conv;
    conv.unread = 0;
  }

  sendMessage(): void {
    if (this.messageInput.trim()) {
      const newMessage = {
        text: this.messageInput,
        isSent: true,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      this.messages.push(newMessage);
      this.messageInput = '';

      // Simulate reply
      setTimeout(() => {
        this.messages.push({
          text: 'Thanks for the message!',
          isSent: false,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        });
      }, 1000);
    }
  }
}
