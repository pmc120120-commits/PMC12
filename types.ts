
export enum ViewState {
  DASHBOARD = 'dashboard',
  COURSES = 'courses',
  TUTOR = 'tutor',
  QUIZ = 'quiz',
  DOCUMENTS = 'documents',
  SETTINGS = 'settings'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StudyStat {
  day: string;
  hours: number;
  quizzes: number;
}

export interface Course {
  id: string;
  name: string;
  category: 'Science' | 'Agro' | 'Tech' | 'Langue' | 'Autre';
  icon: string;
}
