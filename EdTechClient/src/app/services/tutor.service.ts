import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tutor, Course, Review } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private mockTutors: Tutor[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@tutorapp.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      bio: 'Expert Math and Physics tutor with 8 years of teaching experience. Specializing in high school and college-level courses.',
      specializations: ['Mathematics', 'Physics', 'Chemistry'],
      languages: ['English', 'Spanish'],
      hourlyRate: 50,
      rating: 4.9,
      reviews: [],
      availability: [
        { id: '1', dayOfWeek: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { id: '2', dayOfWeek: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { id: '3', dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true }
      ],
      totalSessions: 450,
      studentsSatisfaction: 98,
      certificates: ['B.Sc Mathematics', 'M.Sc Physics', 'Teaching Certification'],
      yearsExperience: 8
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael@tutorapp.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      bio: 'English Language specialist with 10 years of experience in IELTS, TOEFL, and general English teaching.',
      specializations: ['English', 'Literature', 'Writing'],
      languages: ['English', 'Mandarin', 'Cantonese'],
      hourlyRate: 45,
      rating: 4.8,
      reviews: [],
      availability: [
        { id: '4', dayOfWeek: 'Monday', startTime: '14:00', endTime: '22:00', isAvailable: true },
        { id: '5', dayOfWeek: 'Wednesday', startTime: '14:00', endTime: '22:00', isAvailable: true },
        { id: '6', dayOfWeek: 'Friday', startTime: '14:00', endTime: '22:00', isAvailable: true }
      ],
      totalSessions: 520,
      studentsSatisfaction: 99,
      certificates: ['BA English', 'TEFL Certification', 'IELTS Preparation'],
      yearsExperience: 10
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      email: 'emma@tutorapp.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      bio: 'Science tutor passionate about making complex concepts understandable. Biology and General Science expert.',
      specializations: ['Biology', 'Environmental Science', 'General Science'],
      languages: ['English', 'Spanish', 'Portuguese'],
      hourlyRate: 48,
      rating: 4.7,
      reviews: [],
      availability: [
        { id: '7', dayOfWeek: 'Tuesday', startTime: '10:00', endTime: '18:00', isAvailable: true },
        { id: '8', dayOfWeek: 'Thursday', startTime: '10:00', endTime: '18:00', isAvailable: true },
        { id: '9', dayOfWeek: 'Saturday', startTime: '10:00', endTime: '16:00', isAvailable: true }
      ],
      totalSessions: 380,
      studentsSatisfaction: 97,
      certificates: ['B.Sc Biology', 'M.Sc Environmental Science', 'Science Education Diploma'],
      yearsExperience: 7
    },
    {
      id: '4',
      name: 'David Kumar',
      email: 'david@tutorapp.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      bio: 'Computer Science and Programming expert. Teaching Python, JavaScript, and Web Development.',
      specializations: ['Programming', 'Web Development', 'Computer Science'],
      languages: ['English', 'Hindi'],
      hourlyRate: 55,
      rating: 4.9,
      reviews: [],
      availability: [
        { id: '10', dayOfWeek: 'Monday', startTime: '16:00', endTime: '23:00', isAvailable: true },
        { id: '11', dayOfWeek: 'Wednesday', startTime: '16:00', endTime: '23:00', isAvailable: true },
        { id: '12', dayOfWeek: 'Friday', startTime: '16:00', endTime: '23:00', isAvailable: true }
      ],
      totalSessions: 290,
      studentsSatisfaction: 99.5,
      certificates: ['B.Tech Computer Science', 'AWS Developer', 'Web Development Bootcamp'],
      yearsExperience: 6
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      email: 'lisa@tutorapp.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
      bio: 'History and Social Studies educator with expertise in standardized test preparation.',
      specializations: ['History', 'Social Studies', 'Geography'],
      languages: ['English', 'French'],
      hourlyRate: 42,
      rating: 4.6,
      reviews: [],
      availability: [
        { id: '13', dayOfWeek: 'Tuesday', startTime: '15:00', endTime: '20:00', isAvailable: true },
        { id: '14', dayOfWeek: 'Thursday', startTime: '15:00', endTime: '20:00', isAvailable: true },
        { id: '15', dayOfWeek: 'Saturday', startTime: '14:00', endTime: '19:00', isAvailable: true }
      ],
      totalSessions: 410,
      studentsSatisfaction: 96,
      certificates: ['MA History', 'High School Teaching License', 'Curriculum Development'],
      yearsExperience: 9
    }
  ];

  constructor() { }

  getTutors(): Observable<Tutor[]> {
    return of(this.mockTutors);
  }

  getTutorById(id: string): Observable<Tutor | undefined> {
    return of(this.mockTutors.find(tutor => tutor.id === id));
  }

  getTutorsBySpecialization(specialization: string): Observable<Tutor[]> {
    return of(this.mockTutors.filter(tutor =>
      tutor.specializations.some(spec =>
        spec.toLowerCase().includes(specialization.toLowerCase())
      )
    ));
  }

  searchTutors(query: string): Observable<Tutor[]> {
    const filtered = this.mockTutors.filter(tutor =>
      tutor.name.toLowerCase().includes(query.toLowerCase()) ||
      tutor.specializations.some(spec => spec.toLowerCase().includes(query.toLowerCase()))
    );
    return of(filtered);
  }

  getTutorReviews(tutorId: string): Observable<Review[]> {
    // Mock reviews - will be replaced with actual API call
    return of([
      {
        id: '1',
        studentId: 'student1',
        tutorId: tutorId,
        rating: 5,
        comment: 'Excellent tutor! Very patient and explains concepts clearly.',
        date: new Date('2024-01-15'),
        verified: true
      },
      {
        id: '2',
        studentId: 'student2',
        tutorId: tutorId,
        rating: 4,
        comment: 'Great teaching style. Would recommend!',
        date: new Date('2024-02-10'),
        verified: true
      }
    ]);
  }

  filterTutors(filters: {
    specialization?: string;
    maxPrice?: number;
    minRating?: number;
    language?: string;
  }): Observable<Tutor[]> {
    let result = this.mockTutors;

    if (filters.specialization) {
      result = result.filter(tutor =>
        tutor.specializations.some(spec =>
          spec.toLowerCase().includes(filters.specialization!.toLowerCase())
        )
      );
    }

    if (filters.maxPrice) {
      result = result.filter(tutor => tutor.hourlyRate <= filters.maxPrice!);
    }

    if (filters.minRating) {
      result = result.filter(tutor => tutor.rating >= filters.minRating!);
    }

    if (filters.language) {
      result = result.filter(tutor =>
        tutor.languages.some(lang =>
          lang.toLowerCase().includes(filters.language!.toLowerCase())
        )
      );
    }

    return of(result);
  }
}
