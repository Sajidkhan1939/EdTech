import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private mockCourses: Course[] = [
    {
      id: '1',
      title: 'Advanced Mathematics for High School',
      description: 'Master algebra, geometry, and trigonometry with expert guidance.',
      category: 'Mathematics',
      level: 'High School',
      tutor: {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@tutorapp.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        bio: 'Math expert',
        specializations: ['Mathematics'],
        languages: ['English'],
        hourlyRate: 50,
        rating: 4.9,
        reviews: [],
        availability: [],
        totalSessions: 450,
        studentsSatisfaction: 98,
        certificates: [],
        yearsExperience: 8
      },
      price: 499,
      duration: 40,
      rating: 4.9,
      students: 850,
      image: 'https://images.unsplash.com/photo-1434582881033-aaf713f37338?w=500&h=300&fit=crop',
      content: [],
      createdDate: new Date('2024-01-01')
    },
    {
      id: '2',
      title: 'English Language Mastery: IELTS Preparation',
      description: 'Prepare for IELTS exam with comprehensive training from expert instructors.',
      category: 'English',
      level: 'Intermediate',
      tutor: {
        id: '2',
        name: 'Michael Chen',
        email: 'michael@tutorapp.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
        bio: 'English expert',
        specializations: ['English'],
        languages: ['English'],
        hourlyRate: 45,
        rating: 4.8,
        reviews: [],
        availability: [],
        totalSessions: 520,
        studentsSatisfaction: 99,
        certificates: [],
        yearsExperience: 10
      },
      price: 399,
      duration: 50,
      rating: 4.8,
      students: 1200,
      image: 'https://images.unsplash.com/photo-1516534775068-bb57c960ba1a?w=500&h=300&fit=crop',
      content: [],
      createdDate: new Date('2024-01-05')
    },
    {
      id: '3',
      title: 'Biology Fundamentals: From Cells to Organisms',
      description: 'Understand the fundamentals of biology through interactive lessons and experiments.',
      category: 'Science',
      level: 'High School',
      tutor: {
        id: '3',
        name: 'Emma Rodriguez',
        email: 'emma@tutorapp.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
        bio: 'Science expert',
        specializations: ['Biology'],
        languages: ['English'],
        hourlyRate: 48,
        rating: 4.7,
        reviews: [],
        availability: [],
        totalSessions: 380,
        studentsSatisfaction: 97,
        certificates: [],
        yearsExperience: 7
      },
      price: 449,
      duration: 45,
      rating: 4.7,
      students: 680,
      image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&h=300&fit=crop',
      content: [],
      createdDate: new Date('2024-01-10')
    },
    {
      id: '4',
      title: 'Web Development Bootcamp: Build Real Projects',
      description: 'Learn HTML, CSS, JavaScript, and React by building real-world web applications.',
      category: 'Technology',
      level: 'Beginner',
      tutor: {
        id: '4',
        name: 'David Kumar',
        email: 'david@tutorapp.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
        bio: 'Tech expert',
        specializations: ['Programming'],
        languages: ['English'],
        hourlyRate: 55,
        rating: 4.9,
        reviews: [],
        availability: [],
        totalSessions: 290,
        studentsSatisfaction: 99.5,
        certificates: [],
        yearsExperience: 6
      },
      price: 599,
      duration: 60,
      rating: 4.9,
      students: 950,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      content: [],
      createdDate: new Date('2024-01-15')
    },
    {
      id: '5',
      title: 'World History: Ancient Civilizations to Modern Times',
      description: 'Explore the fascinating journey of human civilization across continents and centuries.',
      category: 'History',
      level: 'Intermediate',
      tutor: {
        id: '5',
        name: 'Lisa Anderson',
        email: 'lisa@tutorapp.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
        bio: 'History expert',
        specializations: ['History'],
        languages: ['English'],
        hourlyRate: 42,
        rating: 4.6,
        reviews: [],
        availability: [],
        totalSessions: 410,
        studentsSatisfaction: 96,
        certificates: [],
        yearsExperience: 9
      },
      price: 379,
      duration: 55,
      rating: 4.6,
      students: 750,
      image: 'https://images.unsplash.com/photo-1507842217343-583f7270bfba?w=500&h=300&fit=crop',
      content: [],
      createdDate: new Date('2024-01-20')
    }
  ];

  constructor() { }

  getCourses(): Observable<Course[]> {
    return of(this.mockCourses);
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return of(this.mockCourses.find(course => course.id === id));
  }

  getCoursesByCategory(category: string): Observable<Course[]> {
    return of(this.mockCourses.filter(course =>
      course.category.toLowerCase().includes(category.toLowerCase())
    ));
  }

  searchCourses(query: string): Observable<Course[]> {
    const filtered = this.mockCourses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered);
  }

  filterCourses(filters: {
    category?: string;
    level?: string;
    maxPrice?: number;
    minRating?: number;
  }): Observable<Course[]> {
    let result = this.mockCourses;

    if (filters.category) {
      result = result.filter(course =>
        course.category.toLowerCase().includes(filters.category!.toLowerCase())
      );
    }

    if (filters.level) {
      result = result.filter(course =>
        course.level.toLowerCase().includes(filters.level!.toLowerCase())
      );
    }

    if (filters.maxPrice) {
      result = result.filter(course => course.price <= filters.maxPrice!);
    }

    if (filters.minRating) {
      result = result.filter(course => course.rating >= filters.minRating!);
    }

    return of(result);
  }
}
