const fs = require('fs');
const path = require('path');

const syllabusData = {
  "CSE-1121": {
    "courseCode": "CSE-1121",
    "courseTitle": "Computer Programming 1",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "None",
    "coRequisite": "CSE-1122 (Computer Programming 1 Lab)",
    "courseRationale": "The purpose of this course is to introduce students to computer programming using structured programming language (C). Students will enhance analyzing and problem-solving skills and develop structured programs.",
    "objectives": [
      "Familiarize with basic terminologies used in computer programming.",
      "Proficiently transform designs of problem solutions into standard programming language.",
      "Proficiently use fundamental programming elements: variables, data types, structures, loops, functions, I/O for console and text files."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Demonstrate an understanding of basic computer organization, software types, operators, I/O operations, and principles of structured programming in C.", "weightage": "30%"},
      {"clo": "CLO2", "description": "Develop C programs using conditional statements, loops, arrays, functions, and strings to solve structured computational problems.", "weightage": "40%"},
      {"clo": "CLO3", "description": "Apply pointers, structures, file operations, and dynamic memory allocation in C to manage data efficiently.", "weightage": "20%"},
      {"clo": "CLO4", "description": "Identify and correct syntax, logical, and runtime errors in C programs using systematic debugging strategies.", "weightage": "10%"}
    ],
    "midtermContent": [
      {"topic": "Basic computer organization, software classification; Flowcharts; C history, Identifiers, keywords, data types, constants, variables.", "duration": "2 weeks", "clos": "CLO1, CLO3"},
      {"topic": "Operators: arithmetic, relational, logical, assignment, bitwise; Precedence; I/O operations: scanf, printf, getchar, puts, formatted I/O.", "duration": "2 weeks", "clos": "CLO1, CLO3"},
      {"topic": "Control statements: Branching (if, if-else, nested if, switch); Looping (while, do-while, for loops).", "duration": "2 weeks", "clos": "CLO2, CLO3, CLO4"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Nested Looping, break, continue, goto statements; Functions: Prototypes, arguments, recursion, storage classes.", "duration": "4 weeks", "clos": "CLO2, CLO3, CLO4"},
      {"group": "Group-B", "topic": "Arrays & Strings: Multidimensional arrays, string operations, string library functions, array of strings.", "duration": "1 week", "clos": "CLO2, CLO3, CLO4"},
      {"group": "Group-B", "topic": "Pointers & Structures: Pointer declarations, dynamic memory allocation (malloc, calloc, free), structure, union, passing structures to functions.", "duration": "2 weeks", "clos": "CLO1, CLO3"},
      {"group": "Group-B", "topic": "Files: File handling (opening, reading, writing, closing), low-level bitwise operations, macros and preprocessors.", "duration": "2 weeks", "clos": "CLO1"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Byron S. Gottfried", "title": "Programming with C", "edition": "3rd Edition", "publisher": "McGraw-Hill", "year": "2011", "isbn": "0-07-014590-3"}
    ],
    "referenceBooks": [
      {"authors": "Herbert Schildt", "title": "Teach Yourself C", "edition": "3rd Edition", "publisher": "Osborne McGraw-Hill", "year": "1997"},
      {"authors": "E. Balagurusamy", "title": "Programming in ANSI C", "edition": "7th Edition", "publisher": "Tata McGraw-Hill", "year": "2016"},
      {"authors": "B.W. Kernighan & D.M. Ritchie", "title": "The C Programming Language", "edition": "2nd Edition", "publisher": "Prentice-Hall", "year": "1994"},
      {"authors": "Yashavant Kanetkar", "title": "Let us C", "edition": "16th Edition", "publisher": "BPB Publications", "year": "2017"}
    ]
  },

  "CSE-1122": {
    "courseCode": "CSE-1122",
    "courseTitle": "Computer Programming 1 Lab",
    "creditHours": 1.5,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "None",
    "coRequisite": "CSE-1121 (Computer Programming 1)",
    "courseRationale": "Hands-on implementation and practical application of concepts taught in CSE-1121 structured C programming.",
    "objectives": [
      "Use IDEs (Code::Blocks, VS Code) to write, compile, and execute C programs.",
      "Apply debugging techniques to locate and resolve errors.",
      "Implement simple information management system using arrays, structures, and files."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Use integrated programming environments to write, compile, execute, and debug C programs.", "weightage": "10%"},
      {"clo": "CLO2", "description": "Apply variables, data structures, control structures, functions, pointers, and file manipulation to solve problems.", "weightage": "60%"},
      {"clo": "CLO3", "description": "Implement a console-based information management system using structures, functions, and file processing.", "weightage": "30%"}
    ],
    "midtermContent": [
      {"topic": "Familiarization with C compiler, simple I/O, operators, data types, and library functions.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Decision-making techniques: if, if-else, nested if, switch statement problems.", "duration": "2 weeks", "clos": "CLO2"},
      {"topic": "Looping mechanisms: while, do-while, for loops, nested loops problem solving.", "duration": "2 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Final", "topic": "Functions and recursion: User-defined functions, recursion tree implementation.", "duration": "1 week", "clos": "CLO2"},
      {"group": "Final", "topic": "1D and 2D Arrays, String manipulation and related algorithmic problem solving.", "duration": "3 weeks", "clos": "CLO2"},
      {"group": "Final", "topic": "Pointers, dynamic memory allocation, and structures.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Final", "topic": "File handling and bitwise operations.", "duration": "1 week", "clos": "CLO2"},
      {"group": "Final", "topic": "Console-based capstone project design and implementation.", "duration": "2 weeks", "clos": "CLO3"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "labAssignmentsQuizzes": 40, "project": 10, "midterm": 30},
      "see": {"finalExam": 40, "total": 50}
    },
    "textbooks": [
      {"authors": "Byron S. Gottfried", "title": "Theory and Problems of Programming with C", "edition": "3rd Edition", "publisher": "McGraw-Hill", "year": "2011", "isbn": "0-07-014590-3"}
    ],
    "referenceBooks": [
      {"authors": "Herbert Schildt", "title": "Teach Yourself C", "edition": "3rd Edition", "publisher": "Osborne", "year": "1997"}
    ]
  },

  "CSE-1221": {
    "courseCode": "CSE-1221",
    "courseTitle": "Computer Programming 2",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-1121 (Computer Programming 1)",
    "coRequisite": "CSE-1222 (Computer Programming 2 Lab)",
    "courseRationale": "Object Oriented Programming (OOP) using C++. Equips students with in-depth knowledge of OOP paradigm: classes, objects, inheritance, polymorphism, and STL.",
    "objectives": [
      "Design, compile, and execute C++ programs to solve complex problems.",
      "Master Object-Oriented principles: encapsulation, abstraction, inheritance, polymorphism.",
      "Understand generic programming with templates and Standard Template Library (STL)."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Demonstrate understanding of basic OOP concepts (abstraction, encapsulation, inheritance, polymorphism).", "weightage": "10%"},
      {"clo": "CLO2", "description": "Apply OOP features (polymorphism, inheritance, operator overloading) for problem solving.", "weightage": "70%"},
      {"clo": "CLO3", "description": "Demonstrate proficiency in advanced C++ concepts (templates, STL containers, exception handling, stream I/O).", "weightage": "20%"}
    ],
    "midtermContent": [
      {"topic": "Introduction to OOP vs POP, C++ Console I/O, classes and objects, access specifiers, constructors and destructors.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Object pointers, inline functions, friend functions, static member functions, arrays of objects, this pointer, new/delete.", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"topic": "Function overloading, constructor overloading, copy constructor, default arguments.", "duration": "2 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Operator overloading: Unary and binary operator overloading, friend operator functions.", "duration": "1 week", "clos": "CLO2"},
      {"group": "Group-A", "topic": "Inheritance: Single, multiple, multilevel, hierarchical, virtual base classes, constructors in derived classes.", "duration": "3 weeks", "clos": "CLO2"},
      {"group": "Group-B", "topic": "Virtual functions: Polymorphism, pure virtual functions, abstract classes, early and late binding.", "duration": "1 week", "clos": "CLO2"},
      {"group": "Group-B", "topic": "Templates & STL: Generic functions, class templates, exception handling, STL containers (vector, list, map), iterators.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "C++ I/O Stream system: Formatted and unformatted I/O, file streams, binary file operations.", "duration": "2 weeks", "clos": "CLO3"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "E. Balagurusamy", "title": "Object-Oriented Programming with C++", "edition": "4th Edition", "publisher": "McGraw-Hill", "year": "2008", "isbn": "0-07-066907-4"},
      {"authors": "D. Irvine", "title": "C++ Object-Oriented Programming", "edition": "1st Edition", "publisher": "Prentice Hall", "year": "1996"}
    ],
    "referenceBooks": [
      {"authors": "Bruce Eckel", "title": "Thinking in C++", "edition": "2nd Edition", "publisher": "MindView", "year": "2000"},
      {"authors": "Robert Lafore", "title": "Object-Oriented Programming in C++", "edition": "4th Edition", "publisher": "Sams Publishing", "year": "2002"}
    ]
  },

  "CSE-1223": {
    "courseCode": "CSE-1223",
    "courseTitle": "Discrete Mathematics",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "None",
    "coRequisite": "None",
    "courseRationale": "Develops logical thinking and mathematical foundations essential for algorithm design, computer theory, and cryptography.",
    "objectives": [
      "Obtain comprehensive knowledge in discrete structures and algebraic systems.",
      "Understand methods of mathematical proofs and induction.",
      "Acquire insights into applications such as coding, graphs, and tree structures."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Apply and understand propositional and predicate logic, truth tables, and mathematical reasoning.", "weightage": "40%"},
      {"clo": "CLO2", "description": "Apply number theory, modular arithmetic, induction, recursion, and combinatorics.", "weightage": "40%"},
      {"clo": "CLO3", "description": "Master graph theory and tree structures and use them to model and solve computational problems.", "weightage": "20%"}
    ],
    "midtermContent": [
      {"topic": "Set Theory: Set operations, representations, algebraic properties, computer representation of sets.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Logic: Propositional calculus, equivalences, predicates, quantifiers, rule of inference.", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"topic": "Functions & Relations: Types of functions, Big-O notation, relations, equivalence relations, partitions, closures.", "duration": "2 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Number Theory: Modular arithmetic, GCD, LCM, prime numbers, congruence, Chinese Remainder Theorem.", "duration": "1 week", "clos": "CLO2"},
      {"group": "Group-A", "topic": "Mathematical Reasoning: Proof techniques, mathematical induction, recursive definitions.", "duration": "3 weeks", "clos": "CLO2"},
      {"group": "Group-B", "topic": "Counting & Combinatorics: Pigeonhole principle, permutations, combinations, binomial coefficients, recurrence relations.", "duration": "1 week", "clos": "CLO2"},
      {"group": "Group-B", "topic": "Graphs: Terminology, representations, isomorphism, connectivity, Euler/Hamilton paths, shortest paths, graph coloring.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Trees: Binary trees, tree traversals, spanning trees, minimal spanning trees, expression trees.", "duration": "2 weeks", "clos": "CLO3"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Kenneth H. Rosen", "title": "Discrete Mathematics and Its Applications", "edition": "7th Edition", "publisher": "McGraw-Hill", "year": "2012", "isbn": "978-0073383095"}
    ],
    "referenceBooks": [
      {"authors": "Seymour Lipschutz", "title": "Schaum's Outline of Discrete Mathematics", "edition": "2nd Edition", "publisher": "McGraw-Hill", "year": "1997"}
    ]
  },

  "CSE-2321": {
    "courseCode": "CSE-2321",
    "courseTitle": "Data Structures",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-1121 (Computer Programming 1)",
    "coRequisite": "CSE-2322 (Data Structures Lab)",
    "courseRationale": "Core foundational course in computing. Covers linear and non-linear data structures, memory representations, time-space efficiency, and selection of optimal structures for real-world problems.",
    "objectives": [
      "Understand linear structures: linked lists, arrays, stacks, queues and applications.",
      "Understand non-linear structures: trees, heaps, graphs and traversal algorithms.",
      "Familiarize with sorting, searching, hashing, and performance tradeoffs."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Describe operations of linear and non-linear data structures along with time and space complexity.", "weightage": "50%"},
      {"clo": "CLO2", "description": "Apply appropriate data structures to solve computational engineering problems.", "weightage": "30%"},
      {"clo": "CLO3", "description": "Analyze performance tradeoffs of algorithms and data structures.", "weightage": "20%"}
    ],
    "midtermContent": [
      {"topic": "Introduction: Elementary data organization, data structure operations, time-space tradeoffs, Big-O notation, pattern matching.", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"topic": "Arrays: Linear arrays, 2D arrays, sparse matrices, bubble sort, linear and binary search.", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"topic": "Linked Lists: Singly linked lists, doubly linked lists, circular lists, header lists, operations.", "duration": "2 weeks", "clos": "CLO1, CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Stacks: Array and pointer representation, push/pop, infix to postfix conversion, postfix expression evaluation.", "duration": "1 week", "clos": "CLO1, CLO2"},
      {"group": "Group-A", "topic": "Queues: Linear queue, circular queue, priority queues, deques, recursion and Tower of Hanoi.", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"group": "Group-B", "topic": "Algorithm Complexity & Sorting: Quick sort, merge sort, insertion sort, selection sort, hashing and collision resolution.", "duration": "2 weeks", "clos": "CLO2, CLO3"},
      {"group": "Group-B", "topic": "Trees: Binary search trees (BST), insertion, deletion, AVL trees, heaps, heapsort, B-trees.", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"group": "Group-B", "topic": "Graphs: Graph representations (adjacency matrix, adjacency list), BFS, DFS traversal algorithms.", "duration": "2 weeks", "clos": "CLO1, CLO2"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Seymour Lipschutz", "title": "Data Structures", "edition": "Special Indian Edition", "publisher": "Tata McGraw-Hill", "year": "2018", "isbn": "978-0-07-070198-4"}
    ],
    "referenceBooks": [
      {"authors": "Y. Langsam, M. Augenstein, A.M. Tanenbaum", "title": "Data Structures Using C and C++", "edition": "2nd Edition", "publisher": "Prentice Hall", "year": "2014"},
      {"authors": "Robert Sedgewick", "title": "Algorithms in C", "edition": "3rd Edition", "publisher": "Pearson", "year": "2001"}
    ]
  },

  "CSE-2421": {
    "courseCode": "CSE-2421",
    "courseTitle": "Computer Algorithms",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-2321 (Data Structures)",
    "coRequisite": "CSE-2422 (Computer Algorithms Lab)",
    "courseRationale": "Introduces general tools, design paradigms, and analytical techniques for algorithms: divide-and-conquer, greedy, dynamic programming, and complexity classes.",
    "objectives": [
      "Demonstrate familiarity with major algorithms and data structures.",
      "Analyze algorithms for deriving mathematical proofs of correctness and asymptotic performance.",
      "Synthesize efficient algorithms using standard design paradigms."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Demonstrate familiarity with algorithm design paradigms, sorting, searching, and tree/graph algorithms.", "weightage": "30%"},
      {"clo": "CLO2", "description": "Analyze time and space complexity, asymptotic notations, and construct rigorous correctness proofs.", "weightage": "10%"},
      {"clo": "CLO3", "description": "Apply graph algorithms to model and solve engineering problems.", "weightage": "30%"},
      {"clo": "CLO4", "description": "Design and implement efficient algorithms using divide-and-conquer, greedy, dynamic programming, and backtracking.", "weightage": "30%"}
    ],
    "midtermContent": [
      {"topic": "Algorithm analysis: Growth of functions, asymptotic notations, solving recurrences (master theorem, recursion tree, substitution).", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"topic": "Divide and Conquer: Merge sort, quicksort, heap sort, linear-time sorting (counting sort, radix sort).", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"topic": "Dynamic Programming: Elements of DP, memoization, matrix-chain multiplication, Longest Common Subsequence (LCS).", "duration": "2 weeks", "clos": "CLO2, CLO4"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Greedy Algorithms: Activity selection, Huffman codes, fractional knapsack, string matching (Naive, Rabin-Karp).", "duration": "2 weeks", "clos": "CLO2, CLO4"},
      {"group": "Group-A", "topic": "Graph Algorithms: BFS, DFS, Minimum Spanning Trees (Kruskal, Prim), topological sort.", "duration": "2 weeks", "clos": "CLO2, CLO3"},
      {"group": "Group-B", "topic": "Shortest Paths: Dijkstra's algorithm, Bellman-Ford algorithm, Floyd-Warshall all-pairs shortest path.", "duration": "2 weeks", "clos": "CLO2, CLO3"},
      {"group": "Group-B", "topic": "Computational Geometry & Number Theory: Convex hull (Graham scan), GCD, modular arithmetic, prime numbers.", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"group": "Group-B", "topic": "NP-Completeness: Classes P, NP, NP-Complete, Cook-Levin theorem, backtracking (N-Queen), branch and bound.", "duration": "1 week", "clos": "CLO2, CLO4"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "T.H. Cormen, C.E. Leiserson, R.L. Rivest, C. Stein", "title": "Introduction to Algorithms", "edition": "3rd Edition", "publisher": "MIT Press", "year": "2009", "isbn": "978-0262033848"},
      {"authors": "Ellis Horowitz, Sartaj Sahni, S. Rajasekaran", "title": "Fundamentals of Computer Algorithms", "edition": "1st Edition", "publisher": "Orient Black Swan", "year": "2008"}
    ],
    "referenceBooks": [
      {"authors": "Steve Skiena", "title": "The Algorithm Design Manual", "edition": "2nd Edition", "publisher": "Springer", "year": "2008"},
      {"authors": "Robert Sedgewick", "title": "Algorithms", "edition": "4th Edition", "publisher": "Addison-Wesley", "year": "2011"}
    ]
  },

  "CSE-2423": {
    "courseCode": "CSE-2423",
    "courseTitle": "Database Management Systems",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-1221 (Computer Programming 2)",
    "coRequisite": "CSE-2424 (Database Management Systems Lab)",
    "courseRationale": "Provides foundational principles to design, implement, and manage relational databases: ER modeling, relational algebra, SQL, normalization, transactions, and concurrency.",
    "objectives": [
      "Familiarize with relational databases, data modeling, storage, and transaction management.",
      "Apply relational algebra, SQL queries, optimization, security, and normalization techniques.",
      "Design an enterprise data model conforming to business constraints."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Understand relational databases, database architectures, storage, querying, and transactions.", "weightage": "40%"},
      {"clo": "CLO2", "description": "Apply relational algebra, SQL, normalization (1NF-BCNF), and ACID properties.", "weightage": "20%"},
      {"clo": "CLO3", "description": "Create an enterprise entity-relationship data model reflecting organizational business rules.", "weightage": "40%"}
    ],
    "midtermContent": [
      {"topic": "Introduction: Database vs file systems, data models, database architecture, storage manager.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Entity-Relationship (ER) Model: Entities, relationships, mapping cardinalities, keys, ER diagrams, specialization, generalization.", "duration": "6 weeks", "clos": "CLO3"},
      {"topic": "Relational Algebra and SQL: Select, project, union, join, division, aggregate functions, nested subqueries, views.", "duration": "4 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Integrity & Security: Constraints, assertions, triggers, authorization, encryption, security roles.", "duration": "4 weeks", "clos": "CLO2"},
      {"group": "Group-A", "topic": "Functional Dependencies & Normalization: 1NF, 2NF, 3NF, BCNF, closure of attributes.", "duration": "4 weeks", "clos": "CLO2"},
      {"group": "Group-B", "topic": "Indexing & Hashing: B+ tree index files, hash functions, static and dynamic hashing.", "duration": "4 weeks", "clos": "CLO2"},
      {"group": "Group-B", "topic": "Transactions: ACID properties, serializability, recoverability, shadow copy, cascadeless schedules.", "duration": "4 weeks", "clos": "CLO2"},
      {"group": "Group-B", "topic": "Concurrency Control & Recovery: Two-phase locking, deadlock detection, timestamp protocols, checkpoints.", "duration": "2 weeks", "clos": "CLO2"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "A. Silberschatz, H.F. Korth, S. Sudarshan", "title": "Database System Concepts", "edition": "7th Edition", "publisher": "McGraw-Hill", "year": "2013", "isbn": "978-0-07-352332-3"},
      {"authors": "Ramez Elmasri, Shamkant B. Navathe", "title": "Fundamentals of Database Systems", "edition": "6th Edition", "publisher": "Pearson", "year": "2011"}
    ],
    "referenceBooks": [
      {"authors": "Hector Garcia-Molina, Jeff Ullman, Jennifer Widom", "title": "Database Systems: The Complete Book", "edition": "3rd Edition", "publisher": "Pearson", "year": "2008"}
    ]
  },

  "CSE-3521": {
    "courseCode": "CSE-3521",
    "courseTitle": "Computer Architecture",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-2323 (Digital Logic Design)",
    "coRequisite": "None",
    "courseRationale": "Covers design, structure, and performance of computer hardware: datapath, control unit, pipelining, memory hierarchy, cache organization, and I/O interfacing.",
    "objectives": [
      "Understand CPU architecture, memory hierarchy, and peripherals.",
      "Analyze MIPS instruction formats, addressing modes, and single/multi-cycle datapaths.",
      "Master pipelining, hazards, and branch prediction mechanisms."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Understand basic organization of computers, instruction formats, addressing modes, and processor architectures.", "weightage": "25%"},
      {"clo": "CLO2", "description": "Analyze performance metrics, memory hierarchy, I/O transfer modes, DMA, and interrupts.", "weightage": "45%"},
      {"clo": "CLO3", "description": "Illustrate CPU working, datapath, and control signals during instruction execution.", "weightage": "30%"}
    ],
    "midtermContent": [
      {"topic": "Computer architecture basics, MIPS performance evaluation, CPU execution time, MIPS as performance measure.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Instruction set principles: MIPS 32-bit addressing, instruction formats (R-type, I-type, J-type), operands.", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"topic": "Arithmetic & Logic: ALU design, signed/unsigned arithmetic, floating-point hardware representation.", "duration": "2 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Control Unit: Single-cycle datapath, control signal generation, multi-cycle implementation.", "duration": "4 weeks", "clos": "CLO2"},
      {"group": "Group-B", "topic": "Pipelining: Pipelining overview, data hazards, structural hazards, control hazards, pipeline control.", "duration": "1 week", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Memory Organization: Memory hierarchy, cache memory, cache hits/misses, placement policies, virtual memory.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "I/O Systems: Direct Memory Access (DMA), interrupts, buses, RAID configurations.", "duration": "2 weeks", "clos": "CLO3"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "John L. Hennessy, David A. Patterson", "title": "Computer Organization and Design", "edition": "3rd Edition", "publisher": "Morgan Kaufmann", "year": "2005", "isbn": "1-55860-604-1"},
      {"authors": "William Stallings", "title": "Computer Organization and Architecture", "edition": "8th Edition", "publisher": "Pearson", "year": "2010"}
    ],
    "referenceBooks": []
  },

  "CSE-3631": {
    "courseCode": "CSE-3631",
    "courseTitle": "Operating Systems",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-3521 (Computer Architecture)",
    "coRequisite": "CSE-3632 (Operating Systems Lab)",
    "courseRationale": "Operating systems mediate hardware and software interactions. Covers process management, CPU scheduling, synchronization, deadlocks, memory management, and file systems.",
    "objectives": [
      "Understand OS services, system calls, and kernel architectures.",
      "Analyze process scheduling, concurrency, synchronization, and deadlock prevention.",
      "Examine paging, segmentation, virtual memory, and disk scheduling algorithms."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Explain fundamental principles and core services provided by an operating system.", "weightage": "20%"},
      {"clo": "CLO2", "description": "Analyze and evaluate scheduling algorithms, synchronization mechanisms, and deadlock management.", "weightage": "40%"},
      {"clo": "CLO3", "description": "Evaluate memory management, paging, virtual memory, and file/disk structures.", "weightage": "40%"}
    ],
    "midtermContent": [
      {"topic": "OS overview: Services, system calls, system programs, OS design and architecture, virtual machines.", "duration": "1 week", "clos": "CLO1"},
      {"topic": "Process Management: Process states, PCB, process scheduling, CPU scheduling algorithms, threads, IPC.", "duration": "3 weeks", "clos": "CLO2"},
      {"topic": "Process Synchronization: Critical section problem, race condition, mutex locks, semaphores, monitors.", "duration": "1 week", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Deadlock: Characterization, prevention, avoidance (Banker's algorithm), detection and recovery.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Group-A", "topic": "Memory Management: Logical vs physical address, MMU, continuous allocation, paging, segmentation, swapping.", "duration": "3 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Virtual Memory: Demand paging, page replacement algorithms (FIFO, LRU, Optimal), thrashing.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "File Systems: Access methods, directory structure, file-system mounting, allocation methods.", "duration": "1 week", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Protection & Security: Domain of protection, access matrix, access control lists, system threats.", "duration": "1 week", "clos": "CLO2"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Abraham Silberschatz, Peter B. Galvin, Greg Gagne", "title": "Operating System Concepts", "edition": "10th Edition", "publisher": "Wiley", "year": "2018", "isbn": "978-0471417439"}
    ],
    "referenceBooks": [
      {"authors": "Andrew S. Tanenbaum", "title": "Modern Operating Systems", "edition": "Latest Edition", "publisher": "Prentice Hall", "year": "2015"},
      {"authors": "Paul S. Wang", "title": "Mastering LINUX", "edition": "1st Edition", "publisher": "Chapman and Hall", "year": "2010"}
    ]
  },

  "CSE-3633": {
    "courseCode": "CSE-3633",
    "courseTitle": "Computer Networks",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-3525 (Data Communication)",
    "coRequisite": "CSE-3634 (Computer Networks Lab)",
    "courseRationale": "Comprehensive study of layered network protocols (OSI and TCP/IP). Covers network layer routing, IPv4/IPv6, transport layer protocols (TCP/UDP), and modern application protocols.",
    "objectives": [
      "Understand network architecture, switching, and routing protocols.",
      "Master IP addressing, CIDR, VLSM, subnetting, and network address translation (NAT).",
      "Examine TCP flow/congestion control and application layer services (HTTP, DNS, TLS)."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Understand and analyze network architectures, link-layer protocols, and network layers.", "weightage": "20%"},
      {"clo": "CLO2", "description": "Evaluate performance of transport and routing protocols.", "weightage": "30%"},
      {"clo": "CLO3", "description": "Demonstrate familiarity with network routing, flow control, and security protocols.", "weightage": "30%"},
      {"clo": "CLO4", "description": "Apply network solutions to real-world communication systems.", "weightage": "20%"}
    ],
    "midtermContent": [
      {"topic": "Network models: OSI and TCP/IP architecture, Link layer protocols, Pure ALOHA, Slotted ALOHA.", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"topic": "CSMA, CSMA/CD, CSMA/CA, hidden/exposed node problems, wireless networks (IEEE 802.11, Bluetooth, WSN).", "duration": "1 week", "clos": "CLO2"},
      {"topic": "Network Layer: Packet switching, IPv4 addressing, subnetting, CIDR, VLSM, NAT.", "duration": "2 weeks", "clos": "CLO1, CLO4"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "IPv6 representation, routing algorithms (Link State, Distance Vector).", "duration": "2 weeks", "clos": "CLO3, CLO4"},
      {"group": "Group-A", "topic": "Congestion control, QoS, routing protocols (RIP, OSPF, BGP), ICMP, ARP.", "duration": "1 week", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Transport Layer: Port addresses, connection establishment/release, multiplexing.", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"group": "Group-B", "topic": "TCP: Connection lifecycle, sliding window, flow control, congestion control, UDP datagrams.", "duration": "3 weeks", "clos": "CLO2, CLO3"},
      {"group": "Group-B", "topic": "Application Layer: Client-server paradigm, HTTP, DNS, SMTP, CDN, Peer-to-Peer networks.", "duration": "3 weeks", "clos": "CLO1, CLO4"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "A.S. Tanenbaum, D.J. Wetherall", "title": "Computer Networks", "edition": "5th Edition", "publisher": "Prentice Hall", "year": "2011", "isbn": "978-0-13-212695-3"},
      {"authors": "Behrouz A. Forouzan", "title": "Data Communications and Networking", "edition": "5th Edition", "publisher": "McGraw-Hill", "year": "2012"}
    ],
    "referenceBooks": [
      {"authors": "James Kurose, Keith Ross", "title": "Computer Networking: A Top-Down Approach", "edition": "6th Edition", "publisher": "Pearson", "year": "2013"}
    ]
  },

  "CSE-3635": {
    "courseCode": "CSE-3635",
    "courseTitle": "Artificial Intelligence",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-2421 (Computer Algorithms)",
    "coRequisite": "CSE-3636 (Artificial Intelligence Lab)",
    "courseRationale": "Explores foundational and modern AI principles: intelligent agents, heuristic search, game playing, logic inference, probabilistic reasoning, and machine learning.",
    "objectives": [
      "Understand foundations of AI and agent architectures.",
      "Apply heuristic search (A*, Hill Climbing, Genetic Algorithms) and adversarial game search.",
      "Understand knowledge representation, first-order logic, and machine learning basics."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Identify key components of AI agents and environmental interactions.", "weightage": "15%"},
      {"clo": "CLO2", "description": "Demonstrate informed and heuristic search algorithms, game playing, and constraint satisfaction.", "weightage": "25%"},
      {"clo": "CLO3", "description": "Apply AI techniques for knowledge representation, first-order logic, and probabilistic reasoning.", "weightage": "30%"},
      {"clo": "CLO4", "description": "Analyze decision-making, expert systems, and machine learning methods.", "weightage": "30%"}
    ],
    "midtermContent": [
      {"topic": "Introduction to AI, history, state-of-the-art, problem formulation, problem-solving agents.", "duration": "1 week", "clos": "CLO1"},
      {"topic": "Searching Techniques: Informed search, A* search, greedy search, Hill Climbing, Simulated Annealing, Genetic Algorithms.", "duration": "3 weeks", "clos": "CLO2"},
      {"topic": "Game Playing & CSP: Alpha-Beta pruning, Constraint Satisfaction Problems (TSP, graph coloring).", "duration": "1 week", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Propositional & First-Order Logic: Inference rules, resolution, forward/backward chaining.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Group-A", "topic": "Probabilistic Reasoning: Bayes rule, Bayesian networks, certainty factors, fuzzy logic.", "duration": "4 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Expert Systems: Knowledge representation, rule-based systems, expert system shells.", "duration": "1 week", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Learning: Inductive learning, decision trees, neural network learning.", "duration": "2 weeks", "clos": "CLO4"},
      {"group": "Group-B", "topic": "Natural Language Processing: Syntactic processing, semantic analysis, discourse processing.", "duration": "1 week", "clos": "CLO4"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Stuart Russell, Peter Norvig", "title": "Artificial Intelligence: A Modern Approach", "edition": "3rd Edition", "publisher": "Pearson Education", "year": "2008", "isbn": "978-0070087705"}
    ],
    "referenceBooks": [
      {"authors": "Elaine Rich, Kevin Knight", "title": "Artificial Intelligence", "edition": "2nd Edition", "publisher": "Tata McGraw-Hill", "year": "1991"}
    ]
  },

  "CSE-4877": {
    "courseCode": "CSE-4877",
    "courseTitle": "Machine Learning and Data Mining",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-3635 (Artificial Intelligence)",
    "coRequisite": "CSE-4878 (Machine Learning and Data Mining Lab)",
    "courseRationale": "Broad introduction to machine learning and data mining: data preprocessing, classification (decision trees, SVM, neural networks), clustering (K-means, DBSCAN), and evaluation.",
    "objectives": [
      "Critically evaluate technical and algorithmic issues of building ML applications.",
      "Apply state-of-the-art tools and techniques to solve real-world predictive modeling problems."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Remember statistical data analysis techniques and data mining functionality.", "weightage": "15%"},
      {"clo": "CLO2", "description": "Understand and apply data preprocessing, cleaning, transformation, and feature reduction.", "weightage": "15%"},
      {"clo": "CLO3", "description": "Apply machine learning algorithms for classification and clustering.", "weightage": "50%"},
      {"clo": "CLO4", "description": "Analyze and evaluate different ML and DM algorithms, ensemble methods, and outliers.", "weightage": "20%"}
    ],
    "midtermContent": [
      {"topic": "Introduction: Data mining functionality, classification of DM systems, top-10 algorithms.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Data Objects, attribute types, statistical descriptions, measuring similarity and distance.", "duration": "2 weeks", "clos": "CLO2"},
      {"topic": "Data Preprocessing: Data cleaning, integration, reduction, transformation, frequent itemset mining.", "duration": "2 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Data Warehouse Modeling: Data cubes, OLAP operations, linear regression.", "duration": "1 week", "clos": "CLO2"},
      {"group": "Group-A", "topic": "Classification: Decision tree induction, Naive Bayes, model evaluation metrics (ROC, F1-score).", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Advanced Classification: Ensemble methods (Random Forest, Boosting), Backpropagation, SVM.", "duration": "2 weeks", "clos": "CLO4"},
      {"group": "Group-B", "topic": "Cluster Analysis: Partitioning (K-means, K-medoids), hierarchical methods, density-based (DBSCAN).", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Outlier Detection: Contextual, collective, and density-based anomaly detection.", "duration": "2 weeks", "clos": "CLO4"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Jiawei Han, Micheline Kamber, Jian Pei", "title": "Data Mining: Concepts and Techniques", "edition": "3rd Edition", "publisher": "Elsevier", "year": "2012", "isbn": "978-0-12-381479-1"}
    ],
    "referenceBooks": [
      {"authors": "Gareth James, Daniela Witten, Trevor Hastie, Robert Tibshirani", "title": "An Introduction to Statistical Learning", "edition": "2nd Edition", "publisher": "Springer", "year": "2013"},
      {"authors": "John D. Kelleher, Brian Mac Namee, Aoife D'Arcy", "title": "Fundamentals of Machine Learning for Predictive Data Analytics", "edition": "1st Edition", "publisher": "MIT Press", "year": "2015"}
    ]
  }
};

const outputPaths = [
  path.join(__dirname, '..', 'src', 'main', 'resources', 'static', 'data', 'cse_syllabus_details.json'),
  path.join(__dirname, '..', 'api', '_data', 'cse_syllabus_details.json')
];

outputPaths.forEach(outPath => {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(syllabusData, null, 2), 'utf-8');
  console.log('Saved syllabus details to:', outPath);
});
