export interface QuestionItem {
  id: string;
  question: string;
  options: string[];
  answer: number; // 0, 1, 2, or 3
  explanation: string;
  subject: string; // 'Mathematics' | 'Electrical Engineering' | 'Electronics' | 'Mechanics' | 'Computer Science' | 'Civil Engineering';
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'OJEE' | 'Diploma' | 'B.Tech';
  isSample?: boolean;
}

export const QUESTION_DATABASE: QuestionItem[] = [
  // ==========================================
  // MATHEMATICS QUESTIONS (12 Questions)
  // ==========================================
  {
    id: 'm-1',
    question: 'Sample/Demo Question: What is the value of the determinant of a 3x3 identity matrix?',
    options: ['0', '1', '3', '-1'],
    answer: 1,
    explanation: 'The determinant of any identity matrix In of any order is always equal to 1.',
    subject: 'Mathematics',
    topic: 'Matrices and Determinants',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'm-2',
    question: 'Sample/Demo Question: If A is a square matrix of order n, then |kA| is equal to:',
    options: ['k |A|', 'k^n |A|', 'n^k |A|', '|A| / k'],
    answer: 1,
    explanation: 'For an n x n matrix A, multiplying A by a scalar k multiplies each of the n rows by k, so det(kA) = k^n det(A).',
    subject: 'Mathematics',
    topic: 'Matrices and Determinants',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'm-3',
    question: 'Sample/Demo Question: What is the derivative of f(x) = x^3 · sin(x) with respect to x?',
    options: ['3x^2 cos(x)', '3x^2 sin(x) + x^3 cos(x)', '3x^2 sin(x) - x^3 cos(x)', 'x^3 cos(x)'],
    answer: 1,
    explanation: 'Using Product Rule d/dx [u·v] = u\'v + uv\': d/dx [x^3 sin(x)] = (3x^2) sin(x) + (x^3) cos(x).',
    subject: 'Mathematics',
    topic: 'Calculus',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'm-4',
    question: 'Sample/Demo Question: The value of integral ∫ (0 to π/2) sin(x) dx is:',
    options: ['0', '1', '2', 'π/2'],
    answer: 1,
    explanation: '∫ sin(x) dx = -cos(x). Evaluating from 0 to π/2: -cos(π/2) - (-cos(0)) = 0 - (-1) = 1.',
    subject: 'Mathematics',
    topic: 'Calculus',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'm-5',
    question: 'Sample/Demo Question: If z = 3 + 4i, what is the modulus |z| of the complex number?',
    options: ['5', '7', '12', '25'],
    answer: 0,
    explanation: 'Modulus |z| = √(a^2 + b^2) = √(3^2 + 4^2) = √(9 + 16) = √25 = 5.',
    subject: 'Mathematics',
    topic: 'Complex Numbers',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'm-6',
    question: 'Sample/Demo Question: What is the general solution of dy/dx + y = 0?',
    options: ['y = C e^x', 'y = C e^(-x)', 'y = C x', 'y = e^(-x) + x'],
    answer: 1,
    explanation: 'Separating variables: dy/y = -dx => ln|y| = -x + C => y = e^(-x + C) = C e^(-x).',
    subject: 'Mathematics',
    topic: 'Calculus',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'm-7',
    question: 'Sample/Demo Question: Two fair dice are thrown simultaneously. What is the probability of getting a total sum of 7?',
    options: ['1/36', '1/6', '5/36', '1/12'],
    answer: 1,
    explanation: 'Total outcomes = 36. Favorable outcomes for sum = 7 are (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6. Probability = 6/36 = 1/6.',
    subject: 'Mathematics',
    topic: 'Probability',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'm-8',
    question: 'Sample/Demo Question: What is the angle between vectors A = i + j and B = i - j?',
    options: ['0°', '45°', '90°', '180°'],
    answer: 2,
    explanation: 'Dot product A·B = (1)(1) + (1)(-1) = 1 - 1 = 0. Since A·B = 0 and neither is zero, the vectors are perpendicular (90°).',
    subject: 'Mathematics',
    topic: 'Vector Algebra',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'm-9',
    question: 'Sample/Demo Question: What is sin(90° + θ) in trigonometry?',
    options: ['sin(θ)', 'cos(θ)', '-cos(θ)', '-sin(θ)'],
    answer: 1,
    explanation: 'In the second quadrant, sine is positive and co-ratio changes: sin(90° + θ) = cos(θ).',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'm-10',
    question: 'Sample/Demo Question: The sum of the roots of quadratic equation 2x^2 - 8x + 6 = 0 is:',
    options: ['2', '3', '4', '8'],
    answer: 2,
    explanation: 'For ax^2 + bx + c = 0, sum of roots = -b/a = -(-8)/2 = 8/2 = 4.',
    subject: 'Mathematics',
    topic: 'Algebra',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'm-11',
    question: 'Sample/Demo Question: In coordinate geometry, the distance between points (1, 2) and (4, 6) is:',
    options: ['3', '4', '5', '7'],
    answer: 2,
    explanation: 'Distance = √[(x2 - x1)^2 + (y2 - y1)^2] = √[(4 - 1)^2 + (6 - 2)^2] = √[3^2 + 4^2] = √[9 + 16] = 5.',
    subject: 'Mathematics',
    topic: 'Coordinate Geometry',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'm-12',
    question: 'Sample/Demo Question: The arithmetic mean of the numbers 4, 8, 12, 16, 20 is:',
    options: ['10', '12', '14', '16'],
    answer: 1,
    explanation: 'Mean = (4 + 8 + 12 + 16 + 20) / 5 = 60 / 5 = 12.',
    subject: 'Mathematics',
    topic: 'Statistics',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },

  // ==========================================
  // ELECTRICAL ENGINEERING QUESTIONS (12 Questions)
  // ==========================================
  {
    id: 'e-1',
    question: 'Sample/Demo Question: According to Ohm’s Law, electric current I is directly proportional to:',
    options: ['Resistance R', 'Voltage V', 'Power P', 'Capacitance C'],
    answer: 1,
    explanation: 'Ohm’s Law states V = I · R, so current I = V / R is directly proportional to applied voltage V across a conductor at constant temperature.',
    subject: 'Electrical Engineering',
    topic: 'DC Circuits',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'e-2',
    question: 'Sample/Demo Question: Kirchhoff’s Current Law (KCL) is based on the law of conservation of:',
    options: ['Energy', 'Charge', 'Momentum', 'Mass'],
    answer: 1,
    explanation: 'KCL states that the algebraic sum of currents entering a junction is zero, expressing conservation of electric charge.',
    subject: 'Electrical Engineering',
    topic: 'Basic Electrical Engineering',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'e-3',
    question: 'Sample/Demo Question: The frequency of standard AC power supply in India is:',
    options: ['25 Hz', '50 Hz', '60 Hz', '120 Hz'],
    answer: 1,
    explanation: 'India operates its national electrical power grid at a standard frequency of 50 Hz.',
    subject: 'Electrical Engineering',
    topic: 'AC Circuits',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'e-4',
    question: 'Sample/Demo Question: A transformer transfers electrical power from one circuit to another without changing:',
    options: ['Voltage', 'Current', 'Frequency', 'Power factor'],
    answer: 2,
    explanation: 'A transformer works on electromagnetic induction and changes voltage and current levels while maintaining constant power frequency.',
    subject: 'Electrical Engineering',
    topic: 'Transformers',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'e-5',
    question: 'Sample/Demo Question: What is the core loss in a transformer primarily dependent on?',
    options: ['Load current only', 'Voltage and frequency', 'Winding resistance', 'Ambient temperature'],
    answer: 1,
    explanation: 'Core losses (hysteresis and eddy current losses) depend on maximum flux density (proportional to V/f) and frequency, remaining almost constant from no-load to full-load.',
    subject: 'Electrical Engineering',
    topic: 'Transformers',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'e-6',
    question: 'Sample/Demo Question: The form factor of a purely sinusoidal AC wave is:',
    options: ['1.00', '1.11', '1.414', '0.707'],
    answer: 1,
    explanation: 'Form factor = RMS value / Average value = (Vm / √2) / (2 Vm / π) = (π / 2√2) ≈ 1.11.',
    subject: 'Electrical Engineering',
    topic: 'AC Circuits',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'e-7',
    question: 'Sample/Demo Question: An instrument used to measure electrical insulation resistance is:',
    options: ['Voltmeter', 'Ammeter', 'Megger', 'Wattmeter'],
    answer: 2,
    explanation: 'A Megger is a high-range ohmmeter specifically designed to test insulation resistance of cables and motor windings in mega-ohms.',
    subject: 'Electrical Engineering',
    topic: 'Electrical Measurements',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'e-8',
    question: 'Sample/Demo Question: What type of motor is widely used in ceiling fans?',
    options: ['DC Series Motor', 'Single-phase Permanent Capacitor Motor', '3-Phase Synchronous Motor', 'Universal Motor'],
    answer: 1,
    explanation: 'Ceiling fans use single-phase permanent-split capacitor induction motors for high starting torque and continuous smooth operation.',
    subject: 'Electrical Engineering',
    topic: 'Motors',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'e-9',
    question: 'Sample/Demo Question: Back EMF in a DC motor opposes:',
    options: ['Field flux', 'Applied armature voltage', 'Rotor speed', 'Armature resistance'],
    answer: 1,
    explanation: 'By Lenz’s Law, the induced back EMF Eb opposes the applied armature supply voltage V that drives the current.',
    subject: 'Electrical Engineering',
    topic: 'Electrical Machines',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'e-10',
    question: 'Sample/Demo Question: Three resistors of 6 Ω each are connected in parallel. Their equivalent resistance is:',
    options: ['18 Ω', '6 Ω', '2 Ω', '1 Ω'],
    answer: 2,
    explanation: 'For n identical resistors R in parallel, Req = R / n = 6 / 3 = 2 Ω.',
    subject: 'Electrical Engineering',
    topic: 'DC Circuits',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'e-11',
    question: 'Sample/Demo Question: Which device is used for overcurrent and short-circuit protection in household installations?',
    options: ['Transformer', 'MCB (Miniature Circuit Breaker)', 'Rheostat', 'Inductor'],
    answer: 1,
    explanation: 'An MCB automatically switches off electrical circuits during overloads and short circuits to ensure electrical safety.',
    subject: 'Electrical Engineering',
    topic: 'Electrical Safety',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'e-12',
    question: 'Sample/Demo Question: In a 3-phase star (Y) connected system, line voltage VL is equal to:',
    options: ['Vphase', '√3 · Vphase', 'Vphase / √3', '3 · Vphase'],
    answer: 1,
    explanation: 'In a star connection, Line Voltage VL = √3 · Phase Voltage Vph, while Line Current IL = Phase Current Iph.',
    subject: 'Electrical Engineering',
    topic: 'Basic Power Systems',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },

  // ==========================================
  // ELECTRONICS QUESTIONS (12 Questions)
  // ==========================================
  {
    id: 'el-1',
    question: 'Sample/Demo Question: An N-type semiconductor is obtained by doping pure Silicon with:',
    options: ['Trivalent impurity (Boron)', 'Pentavalent impurity (Phosphorus)', 'Tetravalent impurity', 'Divalent impurity'],
    answer: 1,
    explanation: 'Pentavalent elements (Phosphorus, Arsenic) donate extra free electrons, producing an N-type semiconductor.',
    subject: 'Electronics',
    topic: 'Semiconductor Basics',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'el-2',
    question: 'Sample/Demo Question: The depletion region of a PN junction diode under forward bias:',
    options: ['Widens', 'Narrows/Decreases', 'Remains unchanged', 'Becomes infinite'],
    answer: 1,
    explanation: 'Forward bias opposes the built-in potential, pushing majority carriers across the junction and narrowing the depletion width.',
    subject: 'Electronics',
    topic: 'Diodes',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'el-3',
    question: 'Sample/Demo Question: What is the maximum rectification efficiency of a half-wave rectifier?',
    options: ['40.6%', '81.2%', '50%', '100%'],
    answer: 0,
    explanation: 'The maximum theoretical efficiency of a half-wave rectifier is η = 40.6%, whereas a full-wave rectifier is 81.2%.',
    subject: 'Electronics',
    topic: 'Rectifiers',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'el-4',
    question: 'Sample/Demo Question: Which logic gate produces an output HIGH (1) only when all its inputs are LOW (0)?',
    options: ['AND Gate', 'OR Gate', 'NOR Gate', 'NAND Gate'],
    answer: 2,
    explanation: 'NOR gate output is NOT(A OR B). When both inputs A=0, B=0, A OR B = 0, so NOT(0) = 1.',
    subject: 'Electronics',
    topic: 'Logic Gates',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'el-5',
    question: 'Sample/Demo Question: According to De Morgan’s First Law, (A + B)’ is equal to:',
    options: ['A’ + B’', 'A’ · B’', 'A · B', '(A · B)’'],
    answer: 1,
    explanation: 'De Morgan’s first theorem states that the complement of a sum equals the product of individual complements: (A + B)’ = A’ · B’.',
    subject: 'Electronics',
    topic: 'Boolean Algebra',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'el-6',
    question: 'Sample/Demo Question: In a Bipolar Junction Transistor (BJT), the current relation is:',
    options: ['IE = IB + IC', 'IC = IE + IB', 'IB = IE + IC', 'IE = IC - IB'],
    answer: 0,
    explanation: 'The emitter current IE is the total current entering/leaving the transistor, equal to base current IB plus collector current IC.',
    subject: 'Electronics',
    topic: 'Transistors',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'el-7',
    question: 'Sample/Demo Question: A Zener diode is operated primarily in:',
    options: ['Forward bias region', 'Reverse breakdown region', 'Cut-off region', 'Saturation region'],
    answer: 1,
    explanation: 'Zener diodes maintain a constant breakdown voltage across their terminals when operated in reverse breakdown, making them voltage regulators.',
    subject: 'Electronics',
    topic: 'Diodes',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'el-8',
    question: 'Sample/Demo Question: An ideal operational amplifier (Op-Amp) has an input impedance of:',
    options: ['Zero', '100 Ω', 'Infinite', '1 kΩ'],
    answer: 2,
    explanation: 'An ideal op-amp draws zero input current, which implies an infinite input impedance (Rin = ∞).',
    subject: 'Electronics',
    topic: 'Amplifiers',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'el-9',
    question: 'Sample/Demo Question: Which flip-flop eliminates the undefined/race-around condition present in SR flip-flops?',
    options: ['D Flip-Flop', 'JK Flip-Flop', 'T Flip-Flop', 'Master-Slave Flip-Flop'],
    answer: 1,
    explanation: 'The JK flip-flop sets output to toggle when J=1 and K=1, resolving the invalid state condition of SR flip-flops.',
    subject: 'Electronics',
    topic: 'Flip-Flops',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'el-10',
    question: 'Sample/Demo Question: In Amplitude Modulation (AM), what parameter of the high-frequency carrier wave is varied?',
    options: ['Frequency', 'Phase', 'Amplitude', 'Wavelength'],
    answer: 2,
    explanation: 'In AM, the amplitude of the carrier wave is varied in accordance with the instantaneous amplitude of the modulating signal.',
    subject: 'Electronics',
    topic: 'Communication Basics',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'el-11',
    question: 'Sample/Demo Question: The binary equivalent of decimal number 13 is:',
    options: ['1011', '1100', '1101', '1110'],
    answer: 2,
    explanation: '13 = 8 + 4 + 0 + 1 = 2^3 + 2^2 + 0 + 2^0 = 1101 in binary.',
    subject: 'Electronics',
    topic: 'Digital Electronics',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'el-12',
    question: 'Sample/Demo Question: Negative feedback in an amplifier improves:',
    options: ['Voltage gain', 'Gain stability and Bandwidth', 'Noise level', 'Distortion'],
    answer: 1,
    explanation: 'Negative feedback decreases gain but significantly increases gain stability, bandwidth, and linearity while reducing distortion.',
    subject: 'Electronics',
    topic: 'Amplifiers',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },

  // ==========================================
  // MECHANICS QUESTIONS (12 Questions)
  // ==========================================
  {
    id: 'mc-1',
    question: 'Sample/Demo Question: What is the SI unit of Force?',
    options: ['Joule', 'Pascal', 'Newton', 'Watt'],
    answer: 2,
    explanation: 'The SI unit of force is the Newton (N), defined as 1 kg·m/s^2.',
    subject: 'Mechanics',
    topic: 'Units and Measurements',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'mc-2',
    question: 'Sample/Demo Question: According to Newton’s Second Law of Motion, Force F is equal to:',
    options: ['Mass × Velocity', 'Mass × Acceleration', 'Work / Time', 'Momentum × Distance'],
    answer: 1,
    explanation: 'Newton’s Second Law states that F = m · a (rate of change of momentum = mass × acceleration).',
    subject: 'Mechanics',
    topic: 'Laws of Motion',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'mc-3',
    question: 'Sample/Demo Question: Work done by a force F acting over displacement S at an angle θ is given by:',
    options: ['F · S · sin(θ)', 'F · S · cos(θ)', 'F · S · tan(θ)', 'F · S'],
    answer: 1,
    explanation: 'Work is a scalar product: W = F · S = F · S · cos(θ).',
    subject: 'Mechanics',
    topic: 'Work, Energy and Power',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'mc-4',
    question: 'Sample/Demo Question: The kinetic energy KE of an object of mass m moving with velocity v is:',
    options: ['m · v', '1/2 · m · v^2', 'm · v^2', '2 · m · v'],
    answer: 1,
    explanation: 'Kinetic energy formula is KE = (1/2) m v^2.',
    subject: 'Mechanics',
    topic: 'Work, Energy and Power',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'mc-5',
    question: 'Sample/Demo Question: The principle of conservation of linear momentum applies in collisions when:',
    options: ['Gravity is present', 'No external unbalanced force acts on the system', 'Kinetic energy is conserved', 'Friction is maximum'],
    answer: 1,
    explanation: 'If total external force Fext = 0, the total momentum of the system remains constant before and after collision.',
    subject: 'Mechanics',
    topic: 'Momentum',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'mc-6',
    question: 'Sample/Demo Question: The centripetal force required for an object of mass m in circular motion of radius r with speed v is:',
    options: ['m v / r', 'm v^2 / r', 'm v r^2', 'm^2 v / r'],
    answer: 1,
    explanation: 'Centripetal acceleration is ac = v^2 / r, so required centripetal force Fc = m v^2 / r.',
    subject: 'Mechanics',
    topic: 'Circular Motion',
    difficulty: 'Medium',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'mc-7',
    question: 'Sample/Demo Question: The value of acceleration due to gravity g at the Earth’s surface is approximately:',
    options: ['8.8 m/s^2', '9.81 m/s^2', '10.8 m/s^2', '11.2 m/s^2'],
    answer: 1,
    explanation: 'The standard Earth gravitational acceleration at sea level is approximately 9.81 m/s^2.',
    subject: 'Mechanics',
    topic: 'Gravitation',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'mc-8',
    question: 'Sample/Demo Question: Friction force Fs always acts in a direction:',
    options: ['Parallel to motion direction', 'Opposite to relative motion tendency', 'Perpendicular to surface', 'Towards center of Earth'],
    answer: 1,
    explanation: 'Friction is a resistive contact force that opposes relative sliding motion between contacting surfaces.',
    subject: 'Mechanics',
    topic: 'Friction',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'mc-9',
    question: 'Sample/Demo Question: Mechanical Advantage (MA) of a simple machine is defined as:',
    options: ['Effort / Load', 'Load / Effort', 'Distance moved by effort / Distance moved by load', 'Efficiency × Velocity Ratio'],
    answer: 1,
    explanation: 'Mechanical Advantage MA = Load / Effort.',
    subject: 'Mechanics',
    topic: 'Simple Machines',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'mc-10',
    question: 'Sample/Demo Question: Hooke’s Law states that within elastic limit, Stress is directly proportional to:',
    options: ['Force', 'Strain', 'Area', 'Volume'],
    answer: 1,
    explanation: 'Hooke’s Law states that within the elastic limit of a material, Stress ∝ Strain (Stress = E · Strain).',
    subject: 'Mechanics',
    topic: 'Properties of Matter',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'mc-11',
    question: 'Sample/Demo Question: A car starts from rest and accelerates uniformly at 2 m/s^2 for 5 seconds. Its final velocity is:',
    options: ['5 m/s', '10 m/s', '15 m/s', '25 m/s'],
    answer: 1,
    explanation: 'Using v = u + a t: u = 0, a = 2, t = 5 => v = 0 + (2)(5) = 10 m/s.',
    subject: 'Mechanics',
    topic: 'Motion',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },
  {
    id: 'mc-12',
    question: 'Sample/Demo Question: What is the efficiency of an ideal frictionless simple machine?',
    options: ['50%', '80%', '100%', 'Infinity'],
    answer: 2,
    explanation: 'An ideal machine has zero energy loss to friction, so Work Output = Work Input and Efficiency = 100%.',
    subject: 'Mechanics',
    topic: 'Simple Machines',
    difficulty: 'Easy',
    category: 'OJEE',
    isSample: true
  },

  // ==========================================
  // DIPLOMA & B.TECH ADDITIONAL TOPIC QUESTIONS (8 Questions)
  // ==========================================
  {
    id: 'cs-1',
    question: 'Sample/Demo Question: Which data structure is used in Breadth-First Search (BFS) graph traversal?',
    options: ['Stack', 'Queue', 'Array', 'Heap'],
    answer: 1,
    explanation: 'BFS uses a FIFO Queue to visit neighbor nodes level by level.',
    subject: 'Computer Science',
    topic: 'Data Structures',
    difficulty: 'Medium',
    category: 'Diploma',
    isSample: true
  },
  {
    id: 'cs-2',
    question: 'Sample/Demo Question: In C++, which keyword is used to derive a class with private access mode?',
    options: ['protected', 'private', 'public', 'virtual'],
    answer: 1,
    explanation: 'class Derived : private Base declares private inheritance in C++.',
    subject: 'Computer Science',
    topic: 'OOPs',
    difficulty: 'Easy',
    category: 'Diploma',
    isSample: true
  },
  {
    id: 'db-1',
    question: 'Sample/Demo Question: Which SQL constraint uniquely identifies each row in a database table?',
    options: ['FOREIGN KEY', 'CHECK', 'PRIMARY KEY', 'DEFAULT'],
    answer: 2,
    explanation: 'PRIMARY KEY uniquely identifies each record in a database table and cannot contain NULL values.',
    subject: 'Computer Science',
    topic: 'DBMS',
    difficulty: 'Easy',
    category: 'B.Tech',
    isSample: true
  },
  {
    id: 'db-2',
    question: 'Sample/Demo Question: What condition leads to a Deadlock in Operating Systems?',
    options: ['High CPU utilization', 'Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait', 'Paging fault', 'System reboot'],
    answer: 1,
    explanation: 'Coffman’s four necessary conditions for deadlock are Mutual Exclusion, Hold & Wait, No Preemption, and Circular Wait.',
    subject: 'Computer Science',
    topic: 'Operating Systems',
    difficulty: 'Medium',
    category: 'B.Tech',
    isSample: true
  }
];
