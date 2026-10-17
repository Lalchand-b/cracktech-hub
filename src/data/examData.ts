import { ExamInfo, SyllabusItem, CalendarEvent, QuestionPaper, MockTest, FAQItem, SearchResult } from '../types';

export const EXAM_INFO_DATA: Record<'OJEE' | 'Diploma' | 'B.Tech', ExamInfo> = {
  OJEE: {
    id: 'ojee',
    title: 'Odisha Joint Entrance Examination (OJEE)',
    category: 'OJEE',
    shortDesc: 'State-level entrance exam for admission into Lateral Entry B.Tech, B.Pharm, MCA, MBA, M.Tech, M.Pharm, and Integrated courses in Odisha colleges.',
    fullOverview: 'Odisha Joint Entrance Examination (OJEE) is a state-government controlled centralized test for admission to various undergraduate, postgraduate, and lateral entry professional courses offered by government and private institutions across Odisha. Administered by the OJEE Committee under Skill Development and Technical Education Department, it serves as the primary entrance channel for Diploma holders seeking Lateral Entry into 2nd year B.Tech programs, as well as aspirants for Pharmacy and Management streams.',
    eligibility: {
      qualification: 'Diploma in Engineering/Technology from SCTE&VT or recognized university for Lateral Entry B.Tech. 10+2 with Physics, Chemistry & Math/Biology for B.Pharm.',
      minMarks: 'Minimum 45% aggregate marks (40% for Reserved Categories - SC/ST/PwD) in relevant qualification.',
      ageLimit: 'No upper age limit for Lateral Entry B.Tech / B.Pharm. Minimum age 17 years for B.Pharm as on Dec 31 of admission year.',
      domicile: 'State Domicile required for Government institution seats and 85% seats in Private institutes.',
      otherCriteria: [
        'Candidates appearing in the final semester diploma/degree exams are eligible to apply provisionally.',
        'Must possess a valid Domicile Certificate of Odisha for state quota reservation.',
        'B.Sc graduates with Mathematics at 10+2 level are also eligible for B.Tech Lateral Entry.'
      ]
    },
    courses: [
      'B.Tech (Lateral Entry for Diploma Holders)',
      'B.Tech (Lateral Entry for B.Sc Graduates)',
      'B.Pharm (4-Year Degree & Lateral Entry)',
      'MCA (Master of Computer Applications)',
      'MBA (Master of Business Administration)',
      'M.Tech / M.Arch / M.Plan (Postgraduate Engineering)',
      'Integrated M.Sc (Cell & Molecular Biology)'
    ],
    branches: [
      'Computer Science & Engineering',
      'Electrical & Electronics Engineering',
      'Mechanical Engineering',
      'Civil Engineering',
      'Electronics & Telecommunication',
      'Chemical Engineering'
    ],
    examPattern: {
      mode: 'Computer Based Test (CBT)',
      duration: '2 Hours (120 Minutes)',
      totalQuestions: 120,
      questionType: 'Multiple Choice Questions (MCQs)',
      markingScheme: '+4 Marks for Correct Answer, -1 Mark for Wrong Answer',
      sections: [
        { name: 'Engineering Mathematics', questions: 40, marks: 160 },
        { name: 'Engineering Mechanics', questions: 40, marks: 160 },
        { name: 'Basic Electrical & Electronics', questions: 40, marks: 160 }
      ]
    },
    counsellingInfo: {
      authority: 'OJEE Committee & SDTE Department, Odisha',
      steps: [
        'Online Registration on official OJEE portal',
        'Payment of non-refundable Counselling Fee',
        'Choice Filling & Locking of Colleges and Branches',
        'Mock Seat Allotment for rank analysis',
        'Final Seat Allotment Result (Round 1 & 2)',
        'Acceptance Fee Payment & Document Verification at Nodal Center',
        'Final Reporting at Allotted Institute'
      ],
      documentsRequired: [
        'OJEE Rank Card & Admit Card',
        'Diploma / 10+2 Pass Certificate & Marksheet',
        '10th Class Board Certificate (Age Proof)',
        'Odisha Resident / Domicile Certificate',
        'Category Certificate (SC/ST/Green Card/PwD if applicable)',
        'Income Certificate for TFW (Tuition Fee Waiver) Candidates',
        'Passport Size Photographs (4 Copies)'
      ]
    },
    officialLinks: [
      {
        title: 'OJEE Official Portal',
        url: 'https://ojee.nic.in',
        description: 'Official candidate portal for application forms, admit card, rank card and seat allotment.'
      },
      {
        title: 'Skill Development & Tech Ed Dept',
        url: 'https://sdte.odisha.gov.in',
        description: 'Odisha Government department overseeing technical education and joint entrance examinations.'
      },
      {
        title: 'OJEE Candidate Activity Board',
        url: 'https://odishajee.com',
        description: 'Secondary information portal for notifications, fee payments, and seat matrices.'
      }
    ]
  },

  Diploma: {
    id: 'diploma',
    title: 'Diploma Engineering (SCTE&VT Odisha)',
    category: 'Diploma',
    shortDesc: '3-Year Polytechnic Diploma and 2-Year Lateral Entry programs under State Council for Technical Education & Vocational Training, Odisha.',
    fullOverview: 'Diploma in Engineering (Polytechnic) programs in Odisha are governed by the State Council for Technical Education & Vocational Training (SCTE&VT) and Directorate of Technical Education & Training (DTET). The curriculum is crafted to equip students with practical skills, workshop training, and fundamental engineering principles. Diploma graduates can directly enter the workforce as Junior Engineers or pursue higher education via Lateral Entry B.Tech.',
    eligibility: {
      qualification: 'Pass in 10th Standard / HSC Examination from BSE Odisha or equivalent recognized board for 3-Year Diploma. 10+2 Science (Vocational / ITI 2-Year) for 2-Year Lateral Entry.',
      minMarks: 'Minimum 35% aggregate marks in 10th standard exam with Mathematics, Science, and English.',
      ageLimit: 'Minimum 14 years age limit for engineering branches. No upper age limit.',
      domicile: 'Odisha Domicile required for Government Polytechnic seats.',
      otherCriteria: [
        'Physical fitness certificate from registered medical practitioner.',
        'Special eligibility for Mining Engineering: Minimum 16 years age constraint due to DGMS regulations.',
        'Reservation rules applicable as per Odisha State Government norms.'
      ]
    },
    courses: [
      '3-Year Regular Diploma in Engineering',
      '2-Year Lateral Entry Diploma (for ITI / 10+2 Vocational passed)',
      '1-Year Post Diploma in Industrial Safety'
    ],
    branches: [
      'Civil Engineering',
      'Mechanical Engineering',
      'Electrical Engineering',
      'Computer Science & Engineering',
      'Electronics & Telecommunication',
      'Mining Engineering',
      'Chemical Engineering',
      'Automobile Engineering'
    ],
    examPattern: {
      mode: 'Pen and Paper (Offline Semester Exams)',
      duration: '3 Hours per Theory Paper',
      totalQuestions: 10,
      questionType: 'Descriptive + Short Answers + Numerical Problems',
      markingScheme: 'Total 100 Marks per Subject (80 Marks End-Sem Board Exam + 20 Marks Internal Assessment)',
      sections: [
        { name: 'Part A: Short Conceptual Questions', questions: 10, marks: 20 },
        { name: 'Part B: Medium Analytical Questions', questions: 5, marks: 30 },
        { name: 'Part C: Long Subjective & Design Problems', questions: 3, marks: 30 }
      ]
    },
    counsellingInfo: {
      authority: 'Directorate of Technical Education & Training (DTET) Odisha',
      steps: [
        'Centralized Online Application via SAMS Odisha (Diploma portal)',
        'Verification of marks and certificates at Nodal Nodal Verification Centers (NC)',
        'Publication of Merit List based on 10th / ITI marks',
        'Choice Filling for Government & Private Polytechnics',
        'Phase-wise Allotment of Seats',
        'Online Admission Fee payment and reporting to institution'
      ],
      documentsRequired: [
        'HSC (10th) Marksheet and Board Certificate',
        'SLC / School Leaving Certificate',
        'Conduct Certificate from last attended school',
        'Caste Certificate (SC/ST/OBC if applicable)',
        'Resident / Domicile Certificate',
        'Income Certificate for TFW scheme aspirants'
      ]
    },
    officialLinks: [
      {
        title: 'SCTE&VT Odisha Official Website',
        url: 'https://sctevtodisha.nic.in',
        description: 'State Council portal for syllabus, academic calendar, semester exam results, and notifications.'
      },
      {
        title: 'SAMS Odisha Polytechnic Portal',
        url: 'https://samsodisha.gov.in',
        description: 'Student Academic Management System for centralized Diploma e-admission.'
      },
      {
        title: 'DTET Odisha',
        url: 'http://dtetodisha.gov.in',
        description: 'Directorate governing all government and private polytechnic institutions in Odisha.'
      }
    ]
  },

  'B.Tech': {
    id: 'btech',
    title: 'Bachelor of Technology (B.Tech / BPUT Odisha)',
    category: 'B.Tech',
    shortDesc: '4-Year undergraduate engineering program affiliated with Biju Patnaik University of Technology (BPUT) and premier autonomous institutes.',
    fullOverview: 'Bachelor of Technology (B.Tech) is a 4-year (8 semesters) professional undergraduate engineering degree program in Odisha. Most state engineering colleges, government autonomous colleges (like OUTR, VSSUT, IGIT), and affiliated private institutions follow the curriculum laid down by Biju Patnaik University of Technology (BPUT) or their academic councils. Admission is primarily conducted through JEE Main ranks via OJEE counselling for 1st year, and OJEE Lateral Entry ranks for Diploma holders entering 2nd year.',
    eligibility: {
      qualification: '10+2 / 12th Standard from CHSE Odisha, CBSE, CISCE with Physics and Mathematics as compulsory subjects along with Chemistry/Biology/Computer Science. OR 3-Year Diploma for Lateral Entry.',
      minMarks: 'Minimum 45% aggregate marks in 10+2 PCM (40% for SC/ST category). For Lateral Entry, 45% in Diploma.',
      ageLimit: 'No age limit for B.Tech admission as per AICTE guidelines.',
      domicile: 'Odisha State Domicile for 85% seats in private institutes and 100% seats in state government colleges.',
      otherCriteria: [
        'Must possess a valid NTA JEE Main Rank Card (for 1st Year B.Tech admission).',
        'Must possess OJEE Rank Card (for Lateral Entry B.Tech or Vacant Seat filling rounds).',
        'Medical fitness standard prescribed by state admission committee.'
      ]
    },
    courses: [
      '4-Year B.Tech (Regular 8 Semesters)',
      '3-Year B.Tech (Lateral Entry 6 Semesters)',
      '5-Year Dual Degree (B.Tech + M.Tech / MBA)'
    ],
    branches: [
      'Computer Science & Engineering (CSE)',
      'Artificial Intelligence & Data Science',
      'Electrical Engineering (EE)',
      'Electronics & Communication Engineering (ECE)',
      'Mechanical Engineering (ME)',
      'Civil Engineering (CE)',
      'Information Technology (IT)',
      'Electrical & Electronics Engineering (EEE)'
    ],
    examPattern: {
      mode: 'Semester System (Internal Evaluation + End-Semester University Exams)',
      duration: '3 Hours per End-Sem Paper',
      totalQuestions: 8,
      questionType: 'Theoretical, Mathematical, Analytical & Algorithmic Problems',
      markingScheme: '100 Marks per Subject (70 Marks End-Sem University Exam + 30 Marks Internal/Mid-Sem)',
      sections: [
        { name: 'Mid-Sem Internal Exam', questions: 4, marks: 20 },
        { name: 'Teacher Assessment / Assignment', questions: 2, marks: 10 },
        { name: 'End-Sem University Exam', questions: 8, marks: 70 }
      ]
    },
    counsellingInfo: {
      authority: 'OJEE Committee in coordination with BPUT and State Autonomous Colleges',
      steps: [
        'JEE Main / OJEE Rank publication',
        'OJEE B.Tech Online Counselling Registration',
        'Choice filling of desired branch and government/private engineering college',
        'Seat Allotment (Round 1, 2, 3 and Special OJEE Spot round)',
        'Document Verification at Nodal Center & Seat Acceptance Fee payment',
        'Physical Reporting at College & Registration with BPUT portal'
      ],
      documentsRequired: [
        'JEE Main Rank Card / OJEE Lateral Entry Rank Card',
        '10th Certificate & Marksheet (Date of birth proof)',
        '12th / +2 Science Marksheet & Pass Certificate (or Diploma Certificate)',
        'Odisha Resident / Domicile Certificate',
        'Category Certificate (SC/ST/Green Card/PwD/TFW)',
        'College Leaving Certificate (CLC) & Migration Certificate'
      ]
    },
    officialLinks: [
      {
        title: 'BPUT Official Portal',
        url: 'http://www.bput.ac.in',
        description: 'Biju Patnaik University of Technology portal for syllabus, academic calendar, exam schedules & results.'
      },
      {
        title: 'OJEE B.Tech Counselling',
        url: 'https://ojee.nic.in',
        description: 'Centralized counselling portal for JEE Main rank holders & Lateral Entry B.Tech candidates.'
      },
      {
        title: 'JEE Main NTA Portal',
        url: 'https://jeemain.nta.nic.in',
        description: 'National Testing Agency portal for JEE Main registration, admit card and scorecard.'
      }
    ]
  }
};

export const SYLLABUS_DATA: SyllabusItem[] = [
  {
    id: 'syl-ojee-maths',
    examCategory: 'OJEE',
    subjectOrBranch: 'Engineering Mathematics (Lateral Entry)',
    semesterOrLevel: 'Entrance Exam Syllabus',
    topics: [
      {
        unitName: 'Unit 1: Ordinary Differential Equations',
        weightage: '25%',
        subtopics: [
          'First order linear differential equations',
          'Bernoulli equations and exact equations',
          'Second order linear differential equations with constant coefficients',
          'Method of variation of parameters',
          'Applications to electrical circuits and mechanical vibrations'
        ]
      },
      {
        unitName: 'Unit 2: Matrices & Determinants',
        weightage: '25%',
        subtopics: [
          'Rank of a matrix, elementary row operations',
          'System of linear equations & Consistency (Cramer rule, Gauss elimination)',
          'Eigenvalues and Eigenvectors',
          'Cayley-Hamilton Theorem and inverse matrix'
        ]
      },
      {
        unitName: 'Unit 3: Integral Calculus & Vector Calculus',
        weightage: '25%',
        subtopics: [
          'Definite integrals and applications (Area, Volume of revolution)',
          'Multiple integrals (Double and Triple integrals)',
          'Gradient, Divergence, and Curl of vectors',
          'Line integrals and Green Theorem statement'
        ]
      },
      {
        unitName: 'Unit 4: Laplace Transforms & Fourier Series',
        weightage: '25%',
        subtopics: [
          'Laplace transform of standard functions and properties',
          'Inverse Laplace transform and convolution theorem',
          'Solving differential equations using Laplace transform',
          'Fourier series expansion of periodic functions'
        ]
      }
    ],
    referenceBooks: [
      'Higher Engineering Mathematics by B.S. Grewal',
      'Advanced Engineering Mathematics by Erwin Kreyszig',
      'Engineering Mathematics for OJEE Lateral Entry by A.K. Sharma'
    ]
  },
  {
    id: 'syl-ojee-mech',
    examCategory: 'OJEE',
    subjectOrBranch: 'Engineering Mechanics (Lateral Entry)',
    semesterOrLevel: 'Entrance Exam Syllabus',
    topics: [
      {
        unitName: 'Unit 1: Statics & Force Systems',
        weightage: '30%',
        subtopics: [
          'Coplanar force systems, resultant of forces',
          'Free body diagrams and equations of equilibrium',
          'Friction: Laws of dry friction, ladder and wedge friction',
          'Trusses: Analysis of simple pin-jointed plane trusses by method of joints'
        ]
      },
      {
        unitName: 'Unit 2: Center of Gravity & Moment of Inertia',
        weightage: '20%',
        subtopics: [
          'Centroid of plane composite figures',
          'Area Moment of Inertia and Parallel/Perpendicular axis theorems',
          'Mass Moment of Inertia of cylinder, sphere, and cone'
        ]
      },
      {
        unitName: 'Unit 3: Dynamics & Kinematics',
        weightage: '30%',
        subtopics: [
          'Kinematics of particles: Rectilinear and curvilinear motion',
          'Newton Second Law of Motion and Work-Energy Principle',
          'Impulse and Momentum principle, Direct central impact'
        ]
      },
      {
        unitName: 'Unit 4: Simple Machines & Rotation',
        weightage: '20%',
        subtopics: [
          'Mechanical advantage, velocity ratio, and efficiency of simple machines',
          'Rotation of rigid bodies about fixed axis',
          'Simple Harmonic Motion and pendulum dynamics'
        ]
      }
    ],
    referenceBooks: [
      'Engineering Mechanics by S. Timoshenko and D.H. Young',
      'A Textbook of Engineering Mechanics by R.S. Khurmi',
      'Engineering Mechanics Statics & Dynamics by I.H. Shames'
    ]
  },
  {
    id: 'syl-diploma-cse-3rd',
    examCategory: 'Diploma',
    subjectOrBranch: 'Computer Science & Engineering',
    semesterOrLevel: '3rd Semester (SCTE&VT)',
    topics: [
      {
        unitName: 'Data Structures using C',
        weightage: 'Core Subject',
        subtopics: [
          'Arrays, Pointers, and Memory Allocation',
          'Stack operations and Evaluation of Expressions (Infix to Postfix)',
          'Queues: Linear Queue, Circular Queue, Priority Queue',
          'Linked List: Singly, Doubly and Circular Linked List',
          'Trees: Binary Tree, Binary Search Tree (BST) Traversals',
          'Sorting & Searching: Bubble, Insertion, Quick, Merge, Binary Search'
        ]
      },
      {
        unitName: 'Object Oriented Programming in C++',
        weightage: 'Core Subject',
        subtopics: [
          'OOP Concepts: Encapsulation, Inheritance, Polymorphism, Abstraction',
          'Classes, Objects, Constructors and Destructors',
          'Function Overloading and Operator Overloading',
          'Derived Classes, Virtual Functions and Abstract Classes',
          'File Handling and Exception Handling'
        ]
      },
      {
        unitName: 'Digital Electronics & Logic Design',
        weightage: 'Core Subject',
        subtopics: [
          'Number Systems (Binary, Octal, Hexadecimal) and Codes',
          'Logic Gates and Boolean Algebra Simplification (K-Map)',
          'Combinational Circuits: Multiplexer, Demultiplexer, Encoder, Decoder, Adders',
          'Sequential Circuits: Flip-Flops (SR, JK, D, T), Counters and Registers'
        ]
      }
    ],
    referenceBooks: [
      'Data Structures using C by Reema Thareja',
      'Object Oriented Programming with C++ by E. Balagurusamy',
      'Digital Logic and Computer Design by M. Morris Mano'
    ]
  },
  {
    id: 'syl-diploma-electrical-4th',
    examCategory: 'Diploma',
    subjectOrBranch: 'Electrical Engineering',
    semesterOrLevel: '4th Semester (SCTE&VT)',
    topics: [
      {
        unitName: 'Electrical Machines - I',
        weightage: 'Core Subject',
        subtopics: [
          'DC Generators: Principle, Construction, EMF Equation, Types and Characteristics',
          'DC Motors: Working principle, Back EMF, Torque Equation, Speed Control Methods',
          'Single Phase Transformers: Construction, Equivalent Circuit, Losses and Efficiency',
          'Auto-Transformers and 3-Phase Transformers connections'
        ]
      },
      {
        unitName: 'Electrical Power Transmission & Distribution',
        weightage: 'Core Subject',
        subtopics: [
          'Layout of Power System and Voltage levels',
          'Transmission Line Parameters: Resistance, Inductance, Capacitance',
          'Performance of Transmission Lines: Efficiency and Voltage Regulation',
          'Insulators, Underground Cables and Substation Layouts'
        ]
      }
    ],
    referenceBooks: [
      'Electrical Machinery by P.S. Bimbhra',
      'Principles of Power System by V.K. Mehta & Rohit Mehta'
    ]
  },
  {
    id: 'syl-btech-cse-5th',
    examCategory: 'B.Tech',
    subjectOrBranch: 'Computer Science & Engineering',
    semesterOrLevel: '5th Semester (BPUT)',
    topics: [
      {
        unitName: 'Database Management Systems (DBMS)',
        weightage: 'Core Course (4 Credits)',
        subtopics: [
          'ER Modeling, Relational Data Model, Relational Algebra',
          'SQL Queries: Joins, Subqueries, Constraints, Views and Triggers',
          'Normalization: 1NF, 2NF, 3NF, BCNF, Functional Dependencies',
          'Transaction Management: ACID Properties, Concurrency Control (Locking, Timestamp)',
          'Indexing, B-Trees, B+ Trees and Crash Recovery'
        ]
      },
      {
        unitName: 'Operating Systems',
        weightage: 'Core Course (4 Credits)',
        subtopics: [
          'Process Management: Process States, Threads, CPU Scheduling Algorithms',
          'Process Synchronization: Critical Section Problem, Semaphores, Monitors, Deadlocks',
          'Memory Management: Paging, Segmentation, Virtual Memory, Page Replacement',
          'File Systems & Disk Scheduling Algorithms'
        ]
      },
      {
        unitName: 'Design & Analysis of Algorithms',
        weightage: 'Core Course (4 Credits)',
        subtopics: [
          'Asymptotic Notations (Big-O, Omega, Theta) & Recurrence Relations',
          'Divide & Conquer: Merge Sort, Quick Sort, Binary Search Analysis',
          'Greedy Strategy: Knapsack, Prim, Kruskal, Dijkstra algorithm',
          'Dynamic Programming: Matrix Chain Multiplication, LCS, 0/1 Knapsack',
          'NP-Completeness: P, NP, NP-Complete, NP-Hard concepts'
        ]
      }
    ],
    referenceBooks: [
      'Database System Concepts by Silberschatz, Korth, Sudarshan',
      'Operating System Concepts by Silberschatz, Galvin, Gagne',
      'Introduction to Algorithms by Thomas H. Cormen (CLRS)'
    ]
  }
];

export const CALENDAR_EVENTS_DATA: CalendarEvent[] = [
  {
    id: 'cal-1',
    title: 'OJEE 2026 Online Application Form Release',
    category: 'OJEE',
    eventType: 'Registration',
    date: '2026-01-25',
    formattedDate: 'Jan 25, 2026',
    isDemo: true,
    status: 'Completed',
    description: 'Release of OJEE online application portal for Lateral Entry B.Tech, B.Pharm, MBA, MCA aspirants.',
    officialPortalUrl: 'https://ojee.nic.in'
  },
  {
    id: 'cal-2',
    title: 'OJEE 2026 Last Date to Submit Online Application',
    category: 'OJEE',
    eventType: 'Registration',
    date: '2026-03-31',
    formattedDate: 'Mar 31, 2026',
    isDemo: true,
    status: 'Completed',
    description: 'Deadline to submit online application form and pay application fee on OJEE portal.',
    officialPortalUrl: 'https://ojee.nic.in'
  },
  {
    id: 'cal-3',
    title: 'OJEE 2026 Admit Card Downloading Window',
    category: 'OJEE',
    eventType: 'Admit Card',
    date: '2026-04-25',
    formattedDate: 'Apr 25, 2026',
    isDemo: true,
    status: 'Completed',
    description: 'Candidates can download OJEE admit cards with exam center details.',
    officialPortalUrl: 'https://ojee.nic.in'
  },
  {
    id: 'cal-4',
    title: 'OJEE 2026 State Entrance Examination Dates',
    category: 'OJEE',
    eventType: 'Exam Date',
    date: '2026-05-08',
    formattedDate: 'May 08 - May 12, 2026',
    isDemo: true,
    status: 'Completed',
    description: 'Computer-Based Test (CBT) across various exam centers in Odisha and neighboring states.',
    officialPortalUrl: 'https://ojee.nic.in'
  },
  {
    id: 'cal-5',
    title: 'SCTE&VT Diploma Summer Semester Examinations',
    category: 'Diploma',
    eventType: 'Exam Date',
    date: '2026-06-15',
    formattedDate: 'Jun 15 - Jul 05, 2026',
    isDemo: true,
    status: 'Completed',
    description: 'Offline theory semester examination for 2nd, 4th, and 6th semester polytechnic students.',
    officialPortalUrl: 'https://sctevtodisha.nic.in'
  },
  {
    id: 'cal-6',
    title: 'OJEE 2026 Rank Card & Result Declaration',
    category: 'OJEE',
    eventType: 'Result',
    date: '2026-06-02',
    formattedDate: 'Jun 02, 2026',
    isDemo: true,
    status: 'Completed',
    description: 'Publication of merit lists and scorecards for all streams on official website.',
    officialPortalUrl: 'https://ojee.nic.in'
  },
  {
    id: 'cal-7',
    title: 'BPUT Even Semester End-Term Examinations',
    category: 'B.Tech',
    eventType: 'Exam Date',
    date: '2026-07-10',
    formattedDate: 'Jul 10 - Jul 30, 2026',
    isDemo: true,
    status: 'Completed',
    description: 'End semester examinations for 2nd, 4th, 6th, and 8th semester B.Tech students under BPUT.',
    officialPortalUrl: 'http://www.bput.ac.in'
  },
  {
    id: 'cal-8',
    title: 'OJEE B.Tech & Lateral Entry Counselling Round 1 Choice Filling',
    category: 'OJEE',
    eventType: 'Counselling',
    date: '2026-08-15',
    formattedDate: 'Aug 15 - Aug 22, 2026',
    isDemo: true,
    status: 'Upcoming',
    description: 'Online registration and choice locking for JEE Main rank holders & Lateral Entry B.Tech candidates.',
    officialPortalUrl: 'https://ojee.nic.in'
  },
  {
    id: 'cal-9',
    title: 'OJEE Round 1 Seat Allotment Result',
    category: 'OJEE',
    eventType: 'Counselling',
    date: '2026-08-26',
    formattedDate: 'Aug 26, 2026',
    isDemo: true,
    status: 'Upcoming',
    description: 'First phase college and branch seat allotment results publication.',
    officialPortalUrl: 'https://ojee.nic.in'
  },
  {
    id: 'cal-10',
    title: 'SCTE&VT Winter Semester Academic Calendar Commencement',
    category: 'Diploma',
    eventType: 'Registration',
    date: '2026-09-01',
    formattedDate: 'Sep 01, 2026',
    isDemo: true,
    status: 'Upcoming',
    description: 'Start of classes for 1st, 3rd, and 5th semester polytechnic diploma courses across Odisha.',
    officialPortalUrl: 'https://sctevtodisha.nic.in'
  },
  {
    id: 'cal-11',
    title: 'BPUT Odd Semester Registration & Academic Session Start',
    category: 'B.Tech',
    eventType: 'Registration',
    date: '2026-09-10',
    formattedDate: 'Sep 10, 2026',
    isDemo: true,
    status: 'Upcoming',
    description: 'Subject registration for 3rd, 5th, and 7th semester B.Tech engineering students.',
    officialPortalUrl: 'http://www.bput.ac.in'
  }
];

export const QUESTION_PAPERS_DATA: QuestionPaper[] = [
  {
    id: 'qp-1',
    title: 'OJEE Lateral Entry B.Tech Previous Question Paper',
    category: 'OJEE',
    branchOrCourse: 'Diploma LE B.Tech',
    year: 2024,
    subject: 'Engg. Mathematics, Mechanics & Electrical',
    fileSize: '3.4 MB',
    downloadUrl: '#',
    hasAnswerKey: true
  },
  {
    id: 'qp-2',
    title: 'OJEE Lateral Entry B.Tech Previous Question Paper',
    category: 'OJEE',
    branchOrCourse: 'Diploma LE B.Tech',
    year: 2023,
    subject: 'Engg. Mathematics, Mechanics & Electrical',
    fileSize: '3.1 MB',
    downloadUrl: '#',
    hasAnswerKey: true
  },
  {
    id: 'qp-3',
    title: 'SCTE&VT Diploma 3rd Sem Data Structures Question Paper',
    category: 'Diploma',
    branchOrCourse: 'Computer Science',
    year: 2024,
    subject: 'Data Structures using C',
    fileSize: '1.8 MB',
    downloadUrl: '#',
    hasAnswerKey: true
  },
  {
    id: 'qp-4',
    title: 'SCTE&VT Diploma 4th Sem Electrical Machines-I Paper',
    category: 'Diploma',
    branchOrCourse: 'Electrical Engg.',
    year: 2023,
    subject: 'Electrical Machines-I',
    fileSize: '2.2 MB',
    downloadUrl: '#',
    hasAnswerKey: false
  },
  {
    id: 'qp-5',
    title: 'BPUT 5th Sem Database Management Systems (DBMS) End-Sem Paper',
    category: 'B.Tech',
    branchOrCourse: 'CSE / IT',
    year: 2024,
    subject: 'Database Management Systems',
    fileSize: '2.5 MB',
    downloadUrl: '#',
    hasAnswerKey: true
  },
  {
    id: 'qp-6',
    title: 'BPUT 5th Sem Design & Analysis of Algorithms Paper',
    category: 'B.Tech',
    branchOrCourse: 'CSE / IT',
    year: 2023,
    subject: 'Design & Analysis of Algorithms',
    fileSize: '2.1 MB',
    downloadUrl: '#',
    hasAnswerKey: true
  }
];

export const MOCK_TESTS_DATA: MockTest[] = [
  {
    id: 'mt-ojee-math',
    title: 'OJEE LE B.Tech Mock Test: Engineering Mathematics',
    category: 'OJEE',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    subject: 'Engineering Mathematics',
    questions: [
      {
        id: 1,
        question: 'What is the rank of a 3x3 identity matrix I3?',
        options: ['0', '1', '2', '3'],
        correctAnswer: 3,
        explanation: 'The rank of an n x n identity matrix In is always n because all n rows/columns are linearly independent.',
        subject: 'Mathematics'
      },
      {
        id: 2,
        question: 'The solution of differential equation dy/dx + y = e^(-x) is:',
        options: ['y = (x + C) e^(-x)', 'y = (x + C) e^x', 'y = x e^(-x) + C', 'y = e^x + C'],
        correctAnswer: 0,
        explanation: 'Integrating factor IF = e^(∫dx) = e^x. Thus, y e^x = ∫ e^x e^(-x) dx = ∫ 1 dx = x + C. Hence, y = (x + C) e^(-x).',
        subject: 'Mathematics'
      },
      {
        id: 3,
        question: 'Laplace transform of L{t^n} for positive integer n is given by:',
        options: ['n! / s^n', 'n! / s^(n+1)', '1 / s^(n+1)', 's^(n+1) / n!'],
        correctAnswer: 1,
        explanation: 'The standard Laplace transform formula for t^n is L{t^n} = n! / s^(n+1) for s > 0.',
        subject: 'Mathematics'
      },
      {
        id: 4,
        question: 'Eigenvalues of a real symmetric matrix are always:',
        options: ['Purely imaginary', 'Real numbers', 'Complex numbers with zero real part', 'Negative integers'],
        correctAnswer: 1,
        explanation: 'A fundamental theorem in linear algebra states that all eigenvalues of a real symmetric matrix are real.',
        subject: 'Mathematics'
      },
      {
        id: 5,
        question: 'The value of line integral ∫(F · dr) for a conservative force field over a closed loop is:',
        options: ['Maximum', 'Zero', 'Depends on loop path', 'Infinite'],
        correctAnswer: 1,
        explanation: 'For a conservative force field (curl F = 0), the work done around any closed loop is zero.',
        subject: 'Mathematics'
      }
    ]
  },
  {
    id: 'mt-diploma-ds',
    title: 'Diploma Polytechnic CSE Practice Test: Data Structures',
    category: 'Diploma',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    subject: 'Data Structures',
    questions: [
      {
        id: 1,
        question: 'Which data structure follows the Last-In, First-Out (LIFO) principle?',
        options: ['Queue', 'Stack', 'Array', 'Tree'],
        correctAnswer: 1,
        explanation: 'Stack works on LIFO principle where the element inserted last is removed first.',
        subject: 'Computer Science'
      },
      {
        id: 2,
        question: 'What is the time complexity of searching an element in a balanced Binary Search Tree (BST)?',
        options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
        correctAnswer: 2,
        explanation: 'In a balanced BST, tree height is log2(N), so search/insert time complexity is O(log N).',
        subject: 'Computer Science'
      },
      {
        id: 3,
        question: 'In a Circular Queue with size N, when is the queue full?',
        options: ['front == rear', '(rear + 1) % N == front', 'rear == N', 'front == 0'],
        correctAnswer: 1,
        explanation: 'A circular queue is full when the next position after rear equals front, i.e., (rear + 1) % N == front.',
        subject: 'Computer Science'
      },
      {
        id: 4,
        question: 'Which traversal of Binary Search Tree outputs elements in sorted ascending order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
        correctAnswer: 1,
        explanation: 'In-order traversal (Left, Root, Right) of a BST visits nodes in strictly sorted ascending order.',
        subject: 'Computer Science'
      },
      {
        id: 5,
        question: 'Infix expression A + B * C converted to Postfix expression is:',
        options: ['A B C * +', 'A B + C *', '+ A * B C', 'A B C + *'],
        correctAnswer: 0,
        explanation: 'Multiplication * has higher precedence than +. B * C becomes BC*. Then A + BC* becomes ABC*+.',
        subject: 'Computer Science'
      }
    ]
  },
  {
    id: 'mt-btech-dbms',
    title: 'B.Tech Core Practice Quiz: Database Systems (DBMS)',
    category: 'B.Tech',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    subject: 'Database Systems',
    questions: [
      {
        id: 1,
        question: 'Which normal form eliminates partial functional dependencies?',
        options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'BCNF'],
        correctAnswer: 1,
        explanation: '2NF requires the relation to be in 1NF and no non-prime attribute should depend on a proper subset of any candidate key (eliminates partial dependency).',
        subject: 'DBMS'
      },
      {
        id: 2,
        question: 'In ACID properties of Database Transactions, "A" stands for:',
        options: ['Availability', 'Atomicity', 'Accuracy', 'Authentication'],
        correctAnswer: 1,
        explanation: 'Atomicity ensures that all operations within a work unit are completed successfully or none are executed.',
        subject: 'DBMS'
      },
      {
        id: 3,
        question: 'Which SQL command is classified under Data Definition Language (DDL)?',
        options: ['SELECT', 'INSERT', 'CREATE', 'UPDATE'],
        correctAnswer: 2,
        explanation: 'CREATE, ALTER, DROP, and TRUNCATE commands are part of DDL used to define database structures.',
        subject: 'DBMS'
      },
      {
        id: 4,
        question: 'What is the primary advantage of a B+ Tree over a standard B-Tree for indexing?',
        options: [
          'Data records are stored in internal nodes',
          'All data pointers/records are stored in leaf nodes which are linked sequentially',
          'It uses less disk space',
          'Search complexity is O(1)'
        ],
        correctAnswer: 1,
        explanation: 'In a B+ Tree, leaf nodes hold all key-data pointers and are linked sequentially, making range queries extremely fast and efficient.',
        subject: 'DBMS'
      },
      {
        id: 5,
        question: 'Which schedule guarantees strict conflict serializability without deadlock?',
        options: ['Two-Phase Locking (Strict 2PL)', 'Basic 2PL', 'Timestamp Ordering', 'Multiversion Concurrency'],
        correctAnswer: 0,
        explanation: 'Strict 2PL prevents cascading rollbacks and guarantees conflict serializability by holding exclusive locks until the transaction commits.',
        subject: 'DBMS'
      }
    ]
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is OJEE Lateral Entry B.Tech and who is eligible?',
    answer: 'OJEE Lateral Entry B.Tech is a state-level entrance examination in Odisha allowing Diploma in Engineering/Technology holders and B.Sc graduates with Mathematics to directly enter into the 2nd year (3rd semester) of 4-year B.Tech programs in government and private colleges across Odisha.',
    category: 'Eligibility',
    relatedPage: 'ojee'
  },
  {
    id: 'faq-2',
    question: 'Is 10th standard mark considered for Diploma Polytechnic admission in Odisha?',
    answer: 'Yes! Centralized Polytechnic e-admission in Odisha (via SAMS Odisha) is purely merit-based using marks obtained in 10th HSC / Board examination. There is no separate written entrance exam for regular 3-year Diploma admission.',
    category: 'Admission',
    relatedPage: 'diploma'
  },
  {
    id: 'faq-3',
    question: 'Can I get B.Tech admission in Odisha through JEE Main?',
    answer: 'Yes. 1st year B.Tech seats in government and private colleges of Odisha are filled primarily through JEE Main ranks via OJEE Centralized Online Counselling. Candidates must register on the OJEE counselling portal with their JEE Main roll number and rank.',
    category: 'Admission',
    relatedPage: 'btech'
  },
  {
    id: 'faq-4',
    question: 'Are the exam dates listed on CrackTech Hub official?',
    answer: 'Exam dates and academic schedules tagged with "Demo / Tentative" on CrackTech Hub are sample notifications provided for structure and illustration. Students are strongly advised to verify final official dates on the respective official portals (ojee.nic.in, sctevtodisha.nic.in, or bput.ac.in).',
    category: 'Examination',
    relatedPage: 'calendar'
  },
  {
    id: 'faq-5',
    question: 'What is the syllabus for OJEE LE B.Tech entrance exam?',
    answer: 'The OJEE Lateral Entry B.Tech paper consists of 120 MCQs divided into 3 equal sections: (1) Engineering Mathematics, (2) Engineering Mechanics, and (3) Basic Electrical & Electronics Engineering. Detailed unit-wise syllabus is available in the OJEE section of CrackTech Hub.',
    category: 'Syllabus',
    relatedPage: 'ojee'
  },
  {
    id: 'faq-6',
    question: 'What is Tuition Fee Waiver (TFW) scheme in Odisha engineering colleges?',
    answer: 'TFW is a government initiative where meritorious students with family income less than ₹8 Lakh per annum receive 100% tuition fee waiver in government and approved private engineering and polytechnic colleges.',
    category: 'Application',
    relatedPage: 'faq'
  },
  {
    id: 'faq-7',
    question: 'How can I download previous year question papers on CrackTech Hub?',
    answer: 'Navigate to the "Preparation Hub" or individual exam pages, filter by subject or year, and click the "Download / View Paper" button. You can view paper structures, marking schemes, and answer keys.',
    category: 'Syllabus',
    relatedPage: 'preparation'
  }
];

export const SEARCH_INDEX: SearchResult[] = [
  {
    id: 'sr-1',
    title: 'OJEE Overview & Lateral Entry',
    snippet: 'Odisha Joint Entrance Examination details for Diploma Lateral Entry B.Tech and B.Pharm.',
    category: 'OJEE',
    targetPage: 'ojee',
    targetTab: 'overview'
  },
  {
    id: 'sr-2',
    title: 'OJEE Eligibility Criteria',
    snippet: '45% aggregate marks in Diploma or 10+2 PCM, Odisha domicile requirements, reservation rules.',
    category: 'OJEE',
    targetPage: 'ojee',
    targetTab: 'eligibility'
  },
  {
    id: 'sr-3',
    title: 'OJEE Entrance Exam Syllabus',
    snippet: 'Engineering Mathematics, Mechanics, Electrical Engineering subtopics and reference books.',
    category: 'OJEE',
    targetPage: 'ojee',
    targetTab: 'syllabus'
  },
  {
    id: 'sr-4',
    title: 'Diploma SCTE&VT Polytechnic Overview',
    snippet: '3-year polytechnic diploma courses, SCTE&VT curriculum, grading rules and branches.',
    category: 'Diploma',
    targetPage: 'diploma',
    targetTab: 'overview'
  },
  {
    id: 'sr-5',
    title: 'Diploma Branches (Civil, Mech, Electrical, CSE)',
    snippet: 'Complete list of engineering branches, syllabus topics, and lab subjects.',
    category: 'Diploma',
    targetPage: 'diploma',
    targetTab: 'branches'
  },
  {
    id: 'sr-6',
    title: 'B.Tech Admission Pathways & JEE Main',
    snippet: 'JEE Main rank counselling, lateral entry pathways, autonomous colleges, BPUT university.',
    category: 'B.Tech',
    targetPage: 'btech',
    targetTab: 'pathways'
  },
  {
    id: 'sr-7',
    title: 'B.Tech Semester Syllabus (BPUT)',
    snippet: 'Semester 1 to 8 syllabus for CSE, ECE, EE, Mechanical, Civil engineering.',
    category: 'B.Tech',
    targetPage: 'btech',
    targetTab: 'syllabus'
  },
  {
    id: 'sr-8',
    title: 'Exam Calendar & Key Dates',
    snippet: 'Upcoming registration deadlines, admit card releases, exam dates and result announcements.',
    category: 'Resource',
    targetPage: 'calendar'
  },
  {
    id: 'sr-9',
    title: 'Interactive Mock Test Simulator',
    snippet: 'Timed online practice tests for OJEE Math, Diploma Data Structures, and B.Tech DBMS with instant evaluation.',
    category: 'Resource',
    targetPage: 'preparation',
    targetTab: 'mocktest'
  },
  {
    id: 'sr-10',
    title: 'Custom Study Plan Builder',
    snippet: 'Generate personalized weekly study schedules tailored to your target exam and daily available study hours.',
    category: 'Resource',
    targetPage: 'preparation',
    targetTab: 'studyplan'
  },
  {
    id: 'sr-11',
    title: 'Previous Year Question Paper Bank',
    snippet: 'Downloadable question papers with answer keys for OJEE, Diploma, and BPUT end-sem exams.',
    category: 'Resource',
    targetPage: 'preparation',
    targetTab: 'papers'
  },
  {
    id: 'sr-12',
    title: 'Frequently Asked Questions (FAQs)',
    snippet: 'Clear answers on eligibility, application procedure, TFW seats, and counselling steps.',
    category: 'Resource',
    targetPage: 'faq'
  },
  {
    id: 'sr-13',
    title: 'About CrackTech Hub Project',
    snippet: 'Mission, architecture, target student audience, problem statement, and developer feedback.',
    category: 'Resource',
    targetPage: 'about'
  }
];
