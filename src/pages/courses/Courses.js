import React, { useState } from 'react';
import './Courses.css';

// Import course icons
import introProgrammingIcon from '../../assets/course-icons/intro-programming.svg';
import webDevIcon from '../../assets/course-icons/web-dev.svg';
import uiuxDesignIcon from '../../assets/course-icons/uiux-design.svg';
import dataScienceIcon from '../../assets/course-icons/data-science.svg';
import mobileDevIcon from '../../assets/course-icons/mobile-dev.svg';
import digitalMarketingIcon from '../../assets/course-icons/digital-marketing.svg';
import cloudIcon from '../../assets/course-icons/cloud.svg';
import devopsIcon from '../../assets/course-icons/devops.svg';
import securityIcon from '../../assets/course-icons/security.svg';
import mlIcon from '../../assets/course-icons/ml.svg';
import blockchainIcon from '../../assets/course-icons/blockchain.svg';
import iotIcon from '../../assets/course-icons/iot.svg';

const LevelIcon = ({ level }) => {
  switch (level) {
    case 'Beginner':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 19h20L12 2zm0 3.8L18.5 17H5.5L12 5.8z"/>
        </svg>
      );
    case 'Intermediate':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 19h20L12 2zm0 3.8L18.5 17H5.5L12 5.8zm0 4.2l4.5 8H7.5l4.5-8z"/>
        </svg>
      );
    case 'Advanced':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 19h20L12 2zm0 3.8L18.5 17H5.5L12 5.8zm0 4.2l4.5 8H7.5l4.5-8zm0 4l2.5 4h-5l2.5-4z"/>
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 19h20L12 2zm0 3.8L18.5 17H5.5L12 5.8z"/>
          <circle cx="12" cy="14" r="3"/>
        </svg>
      );
  }
};

const courses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the fundamentals of programming with Python. Perfect for beginners starting their coding journey.',
    duration: '8 weeks',
    level: 'Beginner',
    students: 156,
    rating: '4.8/5',
    price: 'Free',
    image: introProgrammingIcon,
    courseLink: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/'
  },
  {
    id: 2,
    title: 'Web Development Bootcamp',
    description: 'Master HTML, CSS, JavaScript, and modern frameworks. Build real-world projects and launch your web dev career.',
    duration: '12 weeks',
    level: 'Intermediate',
    students: 234,
    rating: '4.9/5',
    price: 'Free',
    image: webDevIcon,
    courseLink: 'https://www.theodinproject.com/'
  },
  {
    id: 3,
    title: 'UI/UX Design Essentials',
    description: 'Learn to create beautiful and functional user interfaces. Master design principles and industry-standard tools.',
    duration: '10 weeks',
    level: 'All Levels',
    students: 189,
    rating: '4.7/5',
    price: 'Free',
    image: uiuxDesignIcon,
    courseLink: 'https://www.freecodecamp.org/learn/responsive-web-design/'
  },
  {
    id: 4,
    title: 'Data Science Fundamentals',
    description: 'Dive into data analysis, machine learning, and statistics. Learn Python, Pandas, and NumPy.',
    duration: '14 weeks',
    level: 'Intermediate',
    students: 145,
    rating: '4.8/5',
    price: 'Free',
    image: dataScienceIcon,
    courseLink: 'https://www.freecodecamp.org/learn/data-analysis-with-python/'
  },
  {
    id: 5,
    title: 'Mobile App Development',
    description: 'Build iOS and Android apps with React Native. Learn once, deploy everywhere.',
    duration: '16 weeks',
    level: 'Advanced',
    students: 167,
    rating: '4.9/5',
    price: 'Free',
    image: mobileDevIcon,
    courseLink: 'https://www.freecodecamp.org/learn/responsive-web-design/'
  },
  {
    id: 6,
    title: 'Digital Marketing',
    description: 'Master SEO, social media, and content marketing. Grow your online presence effectively.',
    duration: '8 weeks',
    level: 'Beginner',
    students: 213,
    rating: '4.6/5',
    price: 'Free',
    image: digitalMarketingIcon,
    courseLink: 'https://www.freecodecamp.org/learn/responsive-web-design/'
  },
  {
    id: 7,
    title: 'Cloud Computing Basics',
    description: 'Learn AWS, Azure, and Google Cloud fundamentals. Master cloud architecture and deployment.',
    duration: '10 weeks',
    level: 'Intermediate',
    students: 178,
    rating: '4.7/5',
    price: 'Free',
    image: cloudIcon,
    courseLink: 'https://aws.amazon.com/training/learn-about-cloud-computing/'
  },
  {
    id: 8,
    title: 'DevOps Fundamentals',
    description: 'Master CI/CD, Docker, Kubernetes, and infrastructure as code. Learn modern DevOps practices.',
    duration: '12 weeks',
    level: 'Intermediate',
    students: 145,
    rating: '4.8/5',
    price: 'Free',
    image: devopsIcon,
    courseLink: 'https://www.freecodecamp.org/learn/responsive-web-design/'
  },
  {
    id: 9,
    title: 'Cybersecurity Essentials',
    description: 'Learn network security, ethical hacking, and security best practices. Protect systems and data.',
    duration: '14 weeks',
    level: 'Advanced',
    students: 167,
    rating: '4.9/5',
    price: 'Free',
    image: securityIcon,
    courseLink: 'https://www.freecodecamp.org/learn/information-security/'
  },
  {
    id: 10,
    title: 'Machine Learning Basics',
    description: 'Master ML algorithms, neural networks, and deep learning. Build intelligent applications.',
    duration: '16 weeks',
    level: 'Advanced',
    students: 189,
    rating: '4.8/5',
    price: 'Free',
    image: mlIcon,
    courseLink: 'https://www.freecodecamp.org/learn/machine-learning-with-python/'
  },
  {
    id: 11,
    title: 'Blockchain Development',
    description: 'Learn blockchain fundamentals, smart contracts, and decentralized applications.',
    duration: '12 weeks',
    level: 'Advanced',
    students: 134,
    rating: '4.7/5',
    price: 'Free',
    image: blockchainIcon,
    courseLink: 'https://www.freecodecamp.org/learn/responsive-web-design/'
  },
  {
    id: 12,
    title: 'Internet of Things (IoT)',
    description: 'Master IoT concepts, sensors, and connected devices. Build smart home and industrial solutions.',
    duration: '10 weeks',
    level: 'Intermediate',
    students: 156,
    rating: '4.6/5',
    price: 'Free',
    image: iotIcon,
    courseLink: 'https://www.freecodecamp.org/learn/responsive-web-design/'
  }
];

function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleCourseClick = (courseLink) => {
    try {
      window.open(courseLink, '_blank');
    } catch (error) {
      console.error('Error opening course link:', error);
      alert('Sorry, the course link is currently unavailable. Please try again later.');
    }
  };

  return (
    <div className="courses">
      <div className="courses-header">
        <h1>Available Courses</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search courses..."
            className="search-input"
            value={searchQuery}
            onChange={handleSearch}
          />
          <select
            className="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All Categories">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Web Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Data Science">Data Science</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card" onClick={() => handleCourseClick(course.courseLink)}>
            <div className="course-content">
              <div className="course-icon">
                <img src={course.image} alt={course.title} />
              </div>
              <h2 className="course-title">{course.title}</h2>
              <p className="course-description">{course.description}</p>
              
              <div className="duration">
                <span className="duration-icon">⏱️</span>
                {course.duration}
              </div>

              <div className="course-meta">
                <div className="meta-item">
                  <div className="meta-value">{course.students}</div>
                  <div className="meta-label">Students</div>
                </div>
                <div className="meta-item">
                  <div className="meta-value">{course.rating}</div>
                  <div className="meta-label">Rating</div>
                </div>
              </div>

              <div className="course-footer">
                <span className={`course-price ${course.price === 'Free' ? 'free' : ''}`}>
                  {course.price}
                </span>
                <span className={`course-level ${course.level.split(' ')[0]}`}>
                  <LevelIcon level={course.level} />
                  {course.level}
                </span>
              </div>

              <button className="enroll-button">Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
