import React, { useState, useEffect } from 'react';
import './Community.css';

function Community() {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [communityStats, setCommunityStats] = useState({
    members: 5200,
    topics: 1800,
    replies: 4500,
    online: 128,
    activeUsers: 450,
    newMembers: 25
  });
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: []
  });
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    interests: []
  });
  const [user, setUser] = useState({
    name: '',
    email: '',
    college: '',
    phone: '',
    isLoggedIn: false
  });

  // Mock data for trending topics
  const trendingTopics = [
    {
      id: 1,
      title: "Best Practices for Java Spring Boot",
      author: "Rahul Sharma",
      authorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
      replies: 45,
      views: 1200,
      lastActivity: "2 hours ago",
      tags: ["java", "spring-boot", "backend"],
      isPinned: true,
      content: "Let's discuss the best practices for building scalable Spring Boot applications. Topics include dependency injection, security, and performance optimization.",
      likes: 120,
      shares: 45
    },
    {
      id: 2,
      title: "Dynamic Programming Patterns",
      author: "Priya Patel",
      authorAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
      replies: 32,
      views: 980,
      lastActivity: "4 hours ago",
      tags: ["dsa", "algorithms", "programming"],
      isPinned: true,
      content: "Understanding common DP patterns and when to use them. We'll cover knapsack, LCS, and matrix chain multiplication problems with detailed examples.",
      likes: 98,
      shares: 32
    },
    {
      id: 3,
      title: "Machine Learning Model Deployment",
      author: "Amit Kumar",
      authorAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
      replies: 28,
      views: 850,
      lastActivity: "5 hours ago",
      tags: ["ai-ml", "deployment", "python"],
      isPinned: false,
      content: "A comprehensive guide to deploying ML models in production using Flask and Docker. Includes best practices for model versioning and monitoring.",
      likes: 75,
      shares: 28
    },
    {
      id: 4,
      title: "Python Async Programming",
      author: "Neha Gupta",
      authorAvatar: "https://randomuser.me/api/portraits/women/4.jpg",
      replies: 15,
      views: 450,
      lastActivity: "1 hour ago",
      tags: ["python", "async", "programming"],
      isPinned: false,
      content: "Deep dive into Python's asyncio library and how to write efficient asynchronous code. We'll cover coroutines, tasks, and event loops.",
      likes: 45,
      shares: 15
    }
  ];

  // Mock data for recent discussions
  const recentDiscussions = [
    {
      id: 5,
      title: "Java Stream API Best Practices",
      author: "Suresh Reddy",
      authorAvatar: "https://randomuser.me/api/portraits/men/5.jpg",
      replies: 18,
      views: 320,
      lastActivity: "30 minutes ago",
      tags: ["java", "streams", "functional-programming"],
      content: "Exploring the power of Java Stream API with practical examples. Learn how to write clean and efficient functional code.",
      likes: 25,
      shares: 8
    },
    {
      id: 6,
      title: "Data Structures for Competitive Programming",
      author: "Ananya Singh",
      authorAvatar: "https://randomuser.me/api/portraits/women/6.jpg",
      replies: 22,
      views: 410,
      lastActivity: "2 hours ago",
      tags: ["dsa", "competitive-programming", "algorithms"],
      content: "Essential data structures every competitive programmer should know. We'll cover implementation details and common use cases.",
      likes: 35,
      shares: 12
    },
    {
      id: 7,
      title: "Deep Learning with PyTorch",
      author: "Rohan Mehta",
      authorAvatar: "https://randomuser.me/api/portraits/men/7.jpg",
      replies: 15,
      views: 280,
      lastActivity: "3 hours ago",
      tags: ["ai-ml", "deep-learning", "pytorch"],
      content: "Building neural networks using PyTorch. From basic concepts to advanced architectures like CNNs and RNNs.",
      likes: 20,
      shares: 7
    },
    {
      id: 8,
      title: "Python Type Hints and Static Analysis",
      author: "Divya Sharma",
      authorAvatar: "https://randomuser.me/api/portraits/women/8.jpg",
      replies: 12,
      views: 190,
      lastActivity: "4 hours ago",
      tags: ["python", "type-hints", "static-analysis"],
      content: "Using Python type hints effectively with mypy for better code quality and maintainability.",
      likes: 15,
      shares: 5
    }
  ];

  const popularTags = [
    { name: "java", count: 120, icon: "💻" },
    { name: "dsa", count: 95, icon: "📊" },
    { name: "ai-ml", count: 78, icon: "🤖" },
    { name: "python", count: 85, icon: "🐍" },
    { name: "spring-boot", count: 45, icon: "🌱" },
    { name: "algorithms", count: 65, icon: "⚡" },
    { name: "deep-learning", count: 38, icon: "🧠" },
    { name: "competitive-programming", count: 42, icon: "🏆" }
  ];

  useEffect(() => {
    // Load user's posts when "My Posts" tab is active
    if (activeTab === 'my-posts' && user.isLoggedIn) {
      // In a real app, this would fetch from an API
      setPosts([
        {
          id: 4,
          title: "My First Post",
          author: user.name,
          authorAvatar: user.avatar,
          replies: 5,
          views: 100,
          lastActivity: "1 day ago",
          tags: ["introduction"],
          content: "Hello everyone! This is my first post in the community..."
        }
      ]);
    }
  }, [activeTab, user]);

  const handleRegistration = (e) => {
    e.preventDefault();
    // In a real app, this would send to your backend
    console.log('Registration data:', registrationForm);
    setUser({
      ...registrationForm,
      isLoggedIn: true
    });
    setShowRegistrationModal(false);
    setRegistrationForm({
      name: '',
      email: '',
      interests: []
    });
  };

  const handleLogout = () => {
    setUser({
      name: '',
      email: '',
      college: '',
      phone: '',
      isLoggedIn: false
    });
  };

  const handleCreatePost = () => {
    if (!user.isLoggedIn) {
      setShowRegistrationModal(true);
      return;
    }
    setShowCreatePostModal(true);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const newPostData = {
      id: Date.now(),
      title: newPost.title,
      author: user.name,
      authorAvatar: user.avatar,
      replies: 0,
      views: 0,
      lastActivity: "Just now",
      tags: newPost.tags,
      content: newPost.content,
      isPinned: false
    };

    // In a real app, this would send to an API
    setPosts([newPostData, ...posts]);
    setShowCreatePostModal(false);
    setNewPost({ title: '', content: '', tags: [] });
  };

  const handleReply = (topicId) => {
    if (!user.isLoggedIn) {
      setShowRegistrationModal(true);
      return;
    }
    // Directly ask for the user's opinion
    const replyText = prompt('What is your opinion on this topic?');
    if (replyText) {
      // In a real app, this would send to your backend
      console.log('Replying to topic:', topicId, 'with opinion:', replyText);
      // Show a confirmation message
      alert('Thank you for sharing your opinion!');
    }
  };

  const handleShare = (topicId) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this discussion',
        text: 'I found this interesting discussion on Skillset AI',
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = (topicId) => {
    if (!user.isLoggedIn) {
      setShowRegistrationModal(true);
      return;
    }
    // In a real app, this would toggle bookmark status in your backend
    console.log('Bookmarking topic:', topicId);
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

  const getFilteredTopics = () => {
    let topics = activeTab === 'trending' ? trendingTopics : 
                activeTab === 'recent' ? recentDiscussions : 
                posts;

    if (searchQuery) {
      topics = topics.filter(topic => 
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return topics;
  };

  return (
    <div className="community">
      <div className="community-container">
        <div className="community-header">
          <h1>Community</h1>
          {!user.isLoggedIn ? (
            <button 
              className="register-button"
              onClick={() => setShowRegistrationModal(true)}
            >
              Register Now
            </button>
          ) : (
            <div className="user-profile">
              <img src={user.avatar || "https://via.placeholder.com/40"} alt={user.name} className="user-avatar" />
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-college">{user.college}</span>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
        
        <div className="community-sections">
          <div className="locations-section">
            <h2>Tech Communities</h2>
            <div className="location-cards">
              <div className="location-card">
                <h3>DSA Community</h3>
                <p>Join our Data Structures and Algorithms community to enhance your problem-solving skills</p>
                <div className="location-stats">
                  <span>2.5k members</span>
                  <span>15 active meetups</span>
                </div>
                <div className="location-actions">
                  <a 
                    href="https://chat.whatsapp.com/KxG9RcKi3mF5CzU3ALSWlO" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="join-button"
                  >
                    Join WhatsApp Group
                  </a>
                </div>
              </div>

              <div className="location-card">
                <h3>Java Programming</h3>
                <p>Connect with Java developers and learn from industry experts</p>
                <div className="location-stats">
                  <span>3.1k members</span>
                  <span>22 active meetups</span>
                </div>
                <div className="location-actions">
                  <a 
                    href="https://chat.whatsapp.com/InxecNhzi1hJQGp4ecECUn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="join-button"
                  >
                    Join WhatsApp Group
                  </a>
                </div>
              </div>

              <div className="location-card">
                <h3>AI-ML Community</h3>
                <p>Be part of the AI and Machine Learning community to stay updated with latest trends</p>
                <div className="location-stats">
                  <span>1.8k members</span>
                  <span>12 active meetups</span>
                </div>
                <div className="location-actions">
                  <a 
                    href="https://chat.whatsapp.com/H0BB3HOFikNHyFG3Aj0N7q" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="join-button"
                  >
                    Join WhatsApp Group
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="t-hub-section">
            <h2>T-Hub Events</h2>
            <div className="events-list">
              <div className="event-card">
                <div className="event-date">
                  <span className="date">15</span>
                  <span className="month">Jan</span>
                </div>
                <div className="event-details">
                  <h3>Startup Pitch Day</h3>
                  <p>Pitch your innovative ideas to investors</p>
                  <div className="event-meta">
                    <span className="event-time">10:00 AM - 4:00 PM</span>
                    <span className="event-location">T-Hub, Hyderabad</span>
                    <span className="event-type">In-person</span>
                  </div>
                  <button 
                    className="register-button"
                    onClick={() => setShowRegistrationModal(true)}
                  >
                    Register Now
                  </button>
                </div>
              </div>

              <div className="event-card">
                <div className="event-date">
                  <span className="date">22</span>
                  <span className="month">Jan</span>
                </div>
                <div className="event-details">
                  <h3>AI Innovation Summit</h3>
                  <p>Explore the latest in AI and machine learning</p>
                  <div className="event-meta">
                    <span className="event-time">9:00 AM - 6:00 PM</span>
                    <span className="event-location">T-Hub, Hyderabad</span>
                    <span className="event-type">Hybrid</span>
                  </div>
                  <button 
                    className="register-button"
                    onClick={() => setShowRegistrationModal(true)}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="forums-section">
            <div className="forums-header">
              <h2>Discussion Forums</h2>
              <div className="forum-search">
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button 
                  className="create-post-button"
                  onClick={handleCreatePost}
                >
                  Create New Post
                </button>
              </div>
            </div>

            <div className="forum-tabs">
              <button 
                className={`tab-button ${activeTab === 'trending' ? 'active' : ''}`}
                onClick={() => setActiveTab('trending')}
              >
                Trending
              </button>
              <button 
                className={`tab-button ${activeTab === 'recent' ? 'active' : ''}`}
                onClick={() => setActiveTab('recent')}
              >
                Recent
              </button>
              {user.isLoggedIn && (
                <button 
                  className={`tab-button ${activeTab === 'my-posts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('my-posts')}
                >
                  My Posts
                </button>
              )}
            </div>

            <div className="forum-content">
              <div className="topics-list">
                {getFilteredTopics().map(topic => (
                  <div key={topic.id} className={`topic-card ${topic.isPinned ? 'pinned' : ''}`}>
                    {topic.isPinned && <span className="pin-badge">Pinned</span>}
                    <div className="topic-header">
                      <div className="author-info">
                        <img src={topic.authorAvatar} alt={topic.author} className="author-avatar" />
                        <div>
                          <h3>{topic.title}</h3>
                          <span className="author">by {topic.author}</span>
                        </div>
                      </div>
                      <span className="last-activity">{topic.lastActivity}</span>
                    </div>
                    <div className="topic-content">
                      <p>{topic.content}</p>
                    </div>
                    <div className="topic-tags">
                      {topic.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="tag"
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="topic-stats">
                      <span className="replies">{topic.replies} replies</span>
                      <span className="views">{topic.views} views</span>
                    </div>
                    <div className="topic-actions">
                      <button 
                        className="action-button"
                        onClick={() => handleReply(topic.id)}
                      >
                        Reply
                      </button>
                      <button 
                        className="action-button"
                        onClick={() => handleShare(topic.id)}
                      >
                        Share
                      </button>
                      <button 
                        className="action-button"
                        onClick={() => handleBookmark(topic.id)}
                      >
                        Bookmark
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="forum-sidebar">
                <div className="sidebar-section">
                  <h3>Popular Tags</h3>
                  <div className="tags-list">
                    {popularTags.map(tag => (
                      <span 
                        key={tag.name} 
                        className="tag"
                        onClick={() => handleTagClick(tag.name)}
                      >
                        <span className="tag-icon">{tag.icon}</span>
                        {tag.name} <span className="tag-count">({tag.count})</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="sidebar-section">
                  <h3>Community Stats</h3>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-icon">👥</div>
                      <span className="stat-value">{communityStats.members.toLocaleString()}</span>
                      <span className="stat-label">Members</span>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">💬</div>
                      <span className="stat-value">{communityStats.topics.toLocaleString()}</span>
                      <span className="stat-label">Topics</span>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">↩️</div>
                      <span className="stat-value">{communityStats.replies.toLocaleString()}</span>
                      <span className="stat-label">Replies</span>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">🟢</div>
                      <span className="stat-value">{communityStats.online}</span>
                      <span className="stat-label">Online</span>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">🌟</div>
                      <span className="stat-value">{communityStats.activeUsers}</span>
                      <span className="stat-label">Active Users</span>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon">✨</div>
                      <span className="stat-value">+{communityStats.newMembers}</span>
                      <span className="stat-label">New Members</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showRegistrationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Join Our Community</h2>
            <form onSubmit={handleRegistration}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={registrationForm.name}
                  onChange={(e) => setRegistrationForm({...registrationForm, name: e.target.value})}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={registrationForm.email}
                  onChange={(e) => setRegistrationForm({...registrationForm, email: e.target.value})}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label>Interests (Select at least one)</label>
                <div className="interests-grid">
                  {popularTags.map(tag => (
                    <label key={tag.name} className="interest-item">
                      <input
                        type="checkbox"
                        checked={registrationForm.interests.includes(tag.name)}
                        onChange={(e) => {
                          const interests = e.target.checked
                            ? [...registrationForm.interests, tag.name]
                            : registrationForm.interests.filter(i => i !== tag.name);
                          setRegistrationForm({...registrationForm, interests});
                        }}
                      />
                      <span className="interest-label">
                        <span className="interest-icon">{tag.icon}</span>
                        {tag.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowRegistrationModal(false)}>Cancel</button>
                <button type="submit">Join Now</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCreatePostModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Post</h2>
            <form onSubmit={handlePostSubmit}>
              <div className="form-group">
                <label htmlFor="post-title">Title</label>
                <input
                  type="text"
                  id="post-title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  required
                  placeholder="Enter a descriptive title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="post-content">Content</label>
                <textarea
                  id="post-content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  required
                  placeholder="Write your post content here..."
                />
              </div>
              <div className="form-group">
                <label htmlFor="post-tags">Tags (comma separated)</label>
                <input
                  type="text"
                  id="post-tags"
                  value={newPost.tags.join(', ')}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value.split(',').map(tag => tag.trim())})}
                  placeholder="e.g. java, spring-boot, backend"
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreatePostModal(false)}>Cancel</button>
                <button type="submit">Create Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Community;