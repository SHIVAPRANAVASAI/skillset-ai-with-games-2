import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FiClock, FiBook, FiAward, FiDollarSign, FiUser } from 'react-icons/fi';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import './CourseDetail.css';

// Mock course data
const COURSES_DATA = {
  'web-dev-101': {
    id: 'web-dev-101',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of web development including HTML, CSS, and JavaScript.',
    instructor: 'John Smith',
    duration: '8 weeks',
    level: 'Beginner',
    price: '$49.99',
    modules: [
      {
        title: 'HTML Basics',
        lessons: [
          { title: 'Introduction to HTML', duration: '30 min' },
          { title: 'HTML Elements & Tags', duration: '45 min' },
          { title: 'Forms and Input Elements', duration: '1 hour' }
        ]
      },
      {
        title: 'CSS Fundamentals',
        lessons: [
          { title: 'CSS Selectors', duration: '45 min' },
          { title: 'Box Model & Layout', duration: '1 hour' },
          { title: 'Flexbox & Grid', duration: '1.5 hours' }
        ]
      }
    ],
    learningObjectives: [
      'Understand HTML structure and semantics',
      'Master CSS styling and layouts',
      'Build responsive web pages',
      'Create interactive user interfaces'
    ],
    requirements: [
      'Basic computer skills',
      'Text editor (VS Code recommended)',
      'Internet connection'
    ]
  },
  'js-advanced': {
    id: 'js-advanced',
    title: 'Advanced JavaScript',
    description: 'Deep dive into advanced JavaScript concepts and modern development practices.',
    instructor: 'Sarah Johnson',
    duration: '10 weeks',
    level: 'Advanced',
    price: '$79.99',
    modules: [
      {
        title: 'ES6+ Features',
        lessons: [
          { title: 'Arrow Functions & Template Literals', duration: '45 min' },
          { title: 'Destructuring & Spread Operator', duration: '1 hour' },
          { title: 'Async/Await & Promises', duration: '1.5 hours' }
        ]
      },
      {
        title: 'Design Patterns',
        lessons: [
          { title: 'Singleton & Factory Patterns', duration: '1 hour' },
          { title: 'Observer Pattern', duration: '45 min' },
          { title: 'Module Pattern & AMD', duration: '1 hour' }
        ]
      }
    ],
    learningObjectives: [
      'Master modern JavaScript features',
      'Implement common design patterns',
      'Write clean, maintainable code',
      'Build scalable applications'
    ],
    requirements: [
      'Intermediate JavaScript knowledge',
      'Understanding of ES6 basics',
      'Experience with web development'
    ]
  }
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseDoc = await getDoc(doc(db, 'courses', id));
        if (courseDoc.exists()) {
          setCourse({ id: courseDoc.id, ...courseDoc.data() });
        } else {
          setError('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to load course details');
      } finally {
      setLoading(false);
      }
    };

    fetchCourse();
  }, [id, db]);

  const handleEnroll = async () => {
    if (!auth.currentUser) {
      navigate('/login', { state: { from: `/courses/${id}` } });
      return;
    }

    try {
      setEnrolling(true);
      
      // Update user's enrolled courses
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        enrolledCourses: arrayUnion({
          courseId: id,
          enrolledAt: new Date().toISOString(),
          progress: 0,
          status: 'active'
        })
      });

      // Update course enrollment count
      const courseRef = doc(db, 'courses', id);
      await updateDoc(courseRef, {
        enrollmentCount: (course.enrollmentCount || 0) + 1
      });

      navigate(`/dashboard/courses/${id}`);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      setError('Failed to enroll in course. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!course) {
    return <ErrorMessage message="Course not found" />;
  }

  return (
    <div className="course-detail">
      <div className="course-header">
        <h1>{course.title}</h1>
        <p className="course-description">{course.description}</p>
        <div className="course-meta">
          <div className="meta-item">
            <FiUser className="meta-icon" />
            <span>Instructor: {course.instructorName}</span>
          </div>
          <div className="meta-item">
            <FiClock className="meta-icon" />
            <span>Duration: {course.duration}</span>
          </div>
          <div className="meta-item">
            <FiAward className="meta-icon" />
            <span>Level: {course.grade}</span>
          </div>
          <div className="meta-item">
            <FiBook className="meta-icon" />
            <span>Modules: {course.modules?.length || 0}</span>
          </div>
          <div className="meta-item">
            <FiDollarSign className="meta-icon" />
            <span>Price: ${course.price || 0}</span>
          </div>
        </div>
      </div>

      <div className="course-content">
        <h2>Course Content</h2>
        {course.modules?.length > 0 ? (
        <div className="modules">
          {course.modules.map((module, index) => (
            <div key={index} className="module">
                <h3>
                  <span className="module-number">Module {index + 1}</span>
                  {module.title}
                </h3>
                {module.lessons?.length > 0 ? (
              <ul>
                {module.lessons.map((lesson, lessonIndex) => (
                  <li key={lessonIndex}>
                    <span className="lesson-title">{lesson.title}</span>
                    <span className="lesson-duration">{lesson.duration}</span>
                  </li>
                ))}
              </ul>
                ) : (
                  <p className="no-content">No lessons available for this module</p>
                )}
            </div>
          ))}
        </div>
        ) : (
          <p className="no-content">No modules available for this course</p>
        )}
      </div>

      <div className="course-features">
        <h2>What You'll Learn</h2>
        {course.learningObjectives?.length > 0 ? (
          <ul className="objectives-list">
          {course.learningObjectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
        ) : (
          <p className="no-content">No learning objectives specified</p>
        )}
      </div>

      <div className="course-requirements">
        <h2>Requirements</h2>
        {course.requirements?.length > 0 ? (
          <ul className="requirements-list">
          {course.requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
        ) : (
          <p className="no-content">No specific requirements for this course</p>
        )}
      </div>

      <div className="enroll-section">
        <div className="price-tag">${course.price || 0}</div>
        <button 
          className={`enroll-button ${enrolling ? 'loading' : ''}`}
          onClick={handleEnroll}
          disabled={enrolling}
        >
          {enrolling ? 'Enrolling...' : 'Enroll Now'}
        </button>
        {course.enrollmentCount > 0 && (
          <div className="enrollment-count">
            {course.enrollmentCount} student{course.enrollmentCount !== 1 ? 's' : ''} enrolled
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
