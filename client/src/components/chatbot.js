// components/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faMessage, faXmark, faPaperPlane, faUser, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../css style/chatbot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: "Hello! I'm Abderrahim's assistant. I can tell you about his skills, projects, experience, and more. What would you like to know?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen]);

  const ContactMessage = () => (
    <div className="contact-message">
      <h4>📬 Contact Abderrahim</h4>
      <div className="contact-item">
        <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
        <div>
          <strong>Email:</strong>
          <a href="mailto:benzayedabderrahim@gmail.com">benzayedabderrahim@gmail.com</a>
        </div>
      </div>
      <div className="contact-item">
        <FontAwesomeIcon icon={faLinkedin} className="contact-icon" />
        <div>
          <strong>LinkedIn:</strong>
          <a href="https://www.linkedin.com/in/abderrahim-benzayed-b4694a234/" target="_blank" rel="noopener noreferrer">
            linkedin.com/in/abderrahim-benzayed
          </a>
        </div>
      </div>
      <div className="contact-item">
        <FontAwesomeIcon icon={faGithub} className="contact-icon" />
        <div>
          <strong>GitHub:</strong>
          <a href="https://github.com/benzayedabderrahim" target="_blank" rel="noopener noreferrer">
            github.com/benzayedabderrahim
          </a>
        </div>
      </div>
      <div className="contact-item">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
        <div>
          <strong>Location:</strong>
          <span>Tunisia</span>
        </div>
      </div>
      <div className="contact-note">
        💡 <strong>Pro Tip:</strong> You can also scroll down to the Contact section for direct links!
      </div>
    </div>
  );

  const botResponses = {
    skills: "Abderrahim has expertise in: Frontend (HTML, CSS, JavaScript, React, Angular), Backend (Node.js, Django, Python), Databases (MySQL), and creative skills like Graphic Design and Video Editing.",
    projects: "His main projects include: Re'Vision App (YouTube analytics), Marketplace Platform (agriculture), and Currency Converter. You can view demos and details in the Projects section!",
    experience: "He completed internships at Tunisie Télécom in 2022 and 2023, working with Angular, Node.js, database management, and fiber optics technologies.",
    education: "He holds a Bachelor's Degree in Business Computing from Higher Institute of Management, Gabes (2021-2024) and a Baccalaureate in Economics and Management (2021).",
    contact: <ContactMessage />,
    social: "He's actively involved in CUBERS Club (President 2024-2025), participated in Sm'art Hackathon, and has been a club member since 2021.",
    default: "I can help you with information about: skills, projects, experience, education, contact, or social activities. If you want further information , please contact the owner of this portfolio.",
    greeting: "Nice to meet you! I'm here to help you learn more about Abderrahim's portfolio. What would you like to know?",
    help: "I can provide information about: skills, projects, work experience, education, contact details, social activities, or general information about Abderrahim."
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return botResponses.greeting;
    } else if (message.includes('skill') || message.includes('tech') || message.includes('programming')) {
      return botResponses.skills;
    } else if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
      return botResponses.projects;
    } else if (message.includes('experience') || message.includes('intern') || message.includes('work')) {
      return botResponses.experience;
    } else if (message.includes('education') || message.includes('study') || message.includes('degree')) {
      return botResponses.education;
    } else if (message.includes('contact') || message.includes('email') || message.includes('reach') || 
               message.includes('linkedin') || message.includes('github') || message.includes('phone') ||
               message.includes('number') || message.includes('get in touch') || message.includes('hire')) {
      return botResponses.contact;
    } else if (message.includes('social') || message.includes('club') || message.includes('activity')) {
      return botResponses.social;
    } else if (message.includes('help') || message.includes('what can you do')) {
      return botResponses.help;
    } else {
      return botResponses.default;
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponseContent = getBotResponse(inputMessage);
      const botResponse = {
        id: messages.length + 2,
        text: typeof botResponseContent === 'string' ? botResponseContent : null,
        component: typeof botResponseContent !== 'string' ? botResponseContent : null,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      handleSendMessage(fakeEvent);
    }, 100);
  };

  const quickQuestions = [
    "What are his skills?",
    "Tell me about his projects",
    "Work experience?",
    "Education background?",
    "How to contact him?"
  ];

  return (
    <>
      <button 
        className={`chatbot-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <FontAwesomeIcon icon={faMessage} className="toggle-icon" />
        <span className="notification-dot"></span>
      </button>

      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <FontAwesomeIcon icon={faRobot} className="bot-icon" />
            <div>
              <h3>Abderrahim's Assistant</h3>
              <span className="status">Online</span>
            </div>
          </div>
          <button 
            className="close-chat"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              <div className="message-avatar">
                {message.sender === 'user' ? (
                  <FontAwesomeIcon icon={faUser} />
                ) : (
                  <FontAwesomeIcon icon={faRobot} />
                )}
              </div>
              <div className="message-content">
                {message.text && <p>{message.text}</p>}
                {message.component && message.component}
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot-message typing-indicator">
              <div className="message-avatar">
                <FontAwesomeIcon icon={faRobot} />
              </div>
              <div className="message-content">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 2 && (
          <div className="quick-questions">
            <p>Quick questions:</p>
            <div className="quick-buttons">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-btn"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <form className="chatbot-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me about Abderrahim's career , skills , education , etc..."
            aria-label="Type your message"
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={!inputMessage.trim()}
            aria-label="Send message"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;