// User Models
export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  grade: string;
  subjects: string[];
  enrolledCourses: Course[];
  bookings: Booking[];
  ratings: number;
  joinDate: Date;
}

export interface Tutor {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  specializations: string[];
  languages: string[];
  hourlyRate: number;
  rating: number;
  reviews: Review[];
  availability: Availability[];
  totalSessions: number;
  studentsSatisfaction: number;
  certificates: string[];
  yearsExperience: number;
}

// Course Models
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  tutor: Tutor;
  price: number;
  duration: number;
  rating: number;
  students: number;
  image: string;
  content: Lesson[];
  createdDate: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  materials: Material[];
  duration: number;
  order: number;
}

export interface Material {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
}

// Booking Models
export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  courseId?: string;
  sessionDate: Date;
  sessionTime: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  amount: number;
  notes: string;
}

// Review Models
export interface Review {
  id: string;
  studentId: string;
  tutorId: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
}

// Availability Models
export interface Availability {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Payment Models
export interface Payment {
  id: string;
  studentId: string;
  tutorId: string;
  bookingId: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
  date: Date;
  invoiceNumber: string;
}

// Message Models
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

// Dashboard Statistics
export interface DashboardStats {
  totalClasses: number;
  hoursLearned: number;
  coursesCompleted: number;
  averageRating: number;
  upcomingSessions: number;
}
