export type PageType = 
  | 'home' 
  | 'ojee' 
  | 'diploma' 
  | 'btech' 
  | 'practice'
  | 'mocktest'
  | 'preparation' 
  | 'calendar' 
  | 'dashboard'
  | 'faq' 
  | 'about';

export type ExamCategory = 'OJEE' | 'Diploma' | 'B.Tech' | 'General';

export interface ExamInfo {
  id: string;
  title: string;
  category: ExamCategory;
  shortDesc: string;
  fullOverview: string;
  eligibility: {
    qualification: string;
    minMarks: string;
    ageLimit?: string;
    domicile?: string;
    otherCriteria: string[];
  };
  courses: string[];
  branches?: string[];
  examPattern: {
    mode: string;
    duration: string;
    totalQuestions: number;
    questionType: string;
    markingScheme: string;
    sections: { name: string; questions: number; marks: number }[];
  };
  counsellingInfo: {
    authority: string;
    steps: string[];
    documentsRequired: string[];
  };
  officialLinks: { title: string; url: string; description: string }[];
}

export interface SyllabusItem {
  id: string;
  examCategory: ExamCategory;
  subjectOrBranch: string;
  semesterOrLevel?: string;
  topics: {
    unitName: string;
    weightage?: string;
    subtopics: string[];
  }[];
  referenceBooks: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  category: ExamCategory;
  eventType: 'Registration' | 'Admit Card' | 'Exam Date' | 'Result' | 'Counselling';
  date: string; // YYYY-MM-DD
  formattedDate: string;
  isDemo: boolean;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  description: string;
  officialPortalUrl?: string;
}

export interface QuestionPaper {
  id: string;
  title: string;
  category: ExamCategory;
  branchOrCourse: string;
  year: number;
  subject: string;
  fileSize: string;
  downloadUrl: string;
  hasAnswerKey: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
}

export interface MockTest {
  id: string;
  title: string;
  category: ExamCategory;
  timeLimitMinutes: number;
  totalQuestions: number;
  subject: string;
  questions: QuizQuestion[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Eligibility' | 'Application' | 'Syllabus' | 'Examination' | 'Admission';
  relatedPage?: PageType;
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  category: ExamCategory | 'Page' | 'Resource';
  targetPage: PageType;
  targetTab?: string;
}
