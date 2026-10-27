const fs = require('fs');
const path = require('path');

const existingData = require('../src/main/resources/static/data/cse_syllabus_details.json');

const additionalCourses = {
  "CSE-3641": {
    "courseCode": "CSE-3641",
    "courseTitle": "Computer Networks",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-3631 (Operating Systems)",
    "coRequisite": "CSE-3642 (Computer Networks Lab)",
    "courseRationale": "Provides a comprehensive study of computer networks principles, protocol layering (OSI & TCP/IP), network architecture, packet switching, routing algorithms, transport layer congestion control, and application layer protocols.",
    "objectives": [
      "Understand layered network architectures and protocol models (OSI 7-layer and TCP/IP).",
      "Analyze data communication mechanisms, framing, error control, and medium access protocols.",
      "Evaluate routing algorithms, IP addressing (IPv4/IPv6), subnetting, TCP/UDP mechanisms, and congestion management."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Explain foundational network models, protocol hierarchies, transmission media, and switching techniques.", "weightage": "25%"},
      {"clo": "CLO2", "description": "Analyze data link layer framing, error detection/correction, and MAC sublayer protocols (Ethernet, CSMA/CD, CSMA/CA).", "weightage": "25%"},
      {"clo": "CLO3", "description": "Design network subnets (CIDR, VLSM) and configure routing algorithms (Dijkstra, Bellman-Ford, OSPF, BGP).", "weightage": "30%"},
      {"clo": "CLO4", "description": "Evaluate transport layer protocols (TCP flow/congestion control, UDP) and network application protocols (DNS, HTTP, SMTP).", "weightage": "20%"}
    ],
    "midtermContent": [
      {"topic": "Introduction: Network types (LAN, MAN, WAN), network topologies, reference models (OSI and TCP/IP protocol suites).", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Physical Layer: Transmission media (guided/unguided), digital transmission, multiplexing (FDM, TDM, WDM), packet switching vs circuit switching.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Data Link Layer: Framing, error detection and correction (Parity, Checksum, CRC, Hamming codes), Flow and Error control (Stop-and-Wait, Go-Back-N, Selective Repeat).", "duration": "2 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Medium Access Control (MAC): Random access protocols (ALOHA, CSMA, CSMA/CD, CSMA/CA), Ethernet standards, token ring, wireless LAN (IEEE 802.11).", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Group-A", "topic": "Network Layer: Logical addressing (IPv4 classes, CIDR, subnetting, supernetting, IPv6), Address resolution (ARP, RARP), DHCP, ICMP, NAT.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Routing Principles & Algorithms: Unicast routing, Link State (OSPF), Distance Vector (RIP), Path Vector (BGP), hierarchical routing.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Transport Layer: Process-to-process delivery, UDP, TCP three-way handshake, flow control (sliding window), congestion control algorithms (Slow Start, Congestion Avoidance).", "duration": "2 weeks", "clos": "CLO4"},
      {"group": "Group-B", "topic": "Application Layer: Domain Name System (DNS), HTTP/HTTPS, FTP, Email protocols (SMTP, POP3, IMAP), network security fundamentals.", "duration": "1 week", "clos": "CLO4"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Andrew S. Tanenbaum, David J. Wetherall", "title": "Computer Networks", "edition": "5th Edition", "publisher": "Pearson", "year": "2013", "isbn": "978-0132126953"},
      {"authors": "Behrouz A. Forouzan", "title": "Data Communications and Networking", "edition": "5th Edition", "publisher": "McGraw-Hill", "year": "2012", "isbn": "978-0073376226"}
    ],
    "referenceBooks": [
      {"authors": "James F. Kurose, Keith W. Ross", "title": "Computer Networking: A Top-Down Approach", "edition": "7th Edition", "publisher": "Pearson", "year": "2016"}
    ]
  },

  "CSE-3642": {
    "courseCode": "CSE-3642",
    "courseTitle": "Computer Networks Lab",
    "creditHours": 1.0,
    "contactHours": 2,
    "type": "Core, Engineering",
    "prerequisite": "None",
    "coRequisite": "CSE-3641 (Computer Networks)",
    "courseRationale": "Hands-on implementation of networking protocols, packet analysis with Wireshark, socket programming in C/Python/Java, and Cisco Packet Tracer network topologies design.",
    "objectives": [
      "Configure network topologies and simulate LAN/WAN routing using Cisco Packet Tracer.",
      "Analyze network packets and protocol headers using Wireshark.",
      "Implement client-server network applications using socket programming."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Configure routers, switches, subnets, and VLANs in simulation software.", "weightage": "40%"},
      {"clo": "CLO2", "description": "Capture and inspect TCP/IP packet traffic using protocol analyzers.", "weightage": "30%"},
      {"clo": "CLO3", "description": "Develop multi-threaded socket communication programs (TCP/UDP).", "weightage": "30%"}
    ],
    "midtermContent": [
      {"topic": "Crimping RJ-45 cables (Straight-through, Crossover); IP configuration, ping, traceroute, netstat.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Cisco Packet Tracer basics: Peer-to-peer network, Star topology with switches and routers.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Subnetting implementation (VLSM) and Static Routing configuration on Cisco routers.", "duration": "2 weeks", "clos": "CLO1"}
    ],
    "finalContent": [
      {"group": "Final", "topic": "Dynamic Routing: Configuring RIP and OSPF on multi-router topologies.", "duration": "2 weeks", "clos": "CLO1"},
      {"group": "Final", "topic": "VLAN and Inter-VLAN Routing (Router-on-a-Stick) configuration.", "duration": "2 weeks", "clos": "CLO1"},
      {"group": "Final", "topic": "Wireshark packet sniffing: HTTP, DNS, TCP Handshake, ARP analysis.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Final", "topic": "Socket Programming: Implementing TCP Echo Server and UDP Chat Application.", "duration": "2 weeks", "clos": "CLO3"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "labAssignments": 20, "midtermLab": 20},
      "see": {"finalLabExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Behrouz A. Forouzan", "title": "Data Communications and Networking Lab Manual", "edition": "5th Edition", "publisher": "McGraw-Hill", "year": "2012"}
    ],
    "referenceBooks": []
  },

  "CSE-4741": {
    "courseCode": "CSE-4741",
    "courseTitle": "Compiler Design",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-3532 (Theory of Computation)",
    "coRequisite": "CSE-4742 (Compiler Design Lab)",
    "courseRationale": "Covers the theoretical foundations and engineering implementation of modern compilers and interpreters: lexical analysis, syntax analysis, syntax-directed translation, intermediate code generation, code optimization, and target machine code generation.",
    "objectives": [
      "Understand compiler architecture and the phases of translation from source to target code.",
      "Master parsing algorithms (LL(1), LR(0), SLR(1), LALR(1), LR(1)).",
      "Apply intermediate code generation, semantic analysis, and machine-independent optimizations."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Formulate regular expressions, finite automata, and construct lexical analyzers using automated tools (Lex/Flex).", "weightage": "25%"},
      {"clo": "CLO2", "description": "Construct top-down and bottom-up parsing tables for Context-Free Grammars (LL, LR, LALR).", "weightage": "35%"},
      {"clo": "CLO3", "description": "Perform type checking, syntax-directed translation, and generate three-address code representations.", "weightage": "20%"},
      {"clo": "CLO4", "description": "Apply control-flow analysis, data-flow optimization, loop optimization, and register allocation techniques.", "weightage": "20%"}
    ],
    "midtermContent": [
      {"topic": "Compiler overview: Phases of compiler, cousin tools (interpreters, linkers, loaders), cross-compilers.", "duration": "1 week", "clos": "CLO1"},
      {"topic": "Lexical Analysis: Role of lexical analyzer, tokens, patterns, lexemes; Regular expressions, Thompson's construction NFA, Subset construction DFA, DFA minimization.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Syntax Analysis: Context-Free Grammars (CFG), ambiguity, left recursion removal, left factoring; Top-Down Parsing: Recursive descent, First and Follow sets, Predictive LL(1) parsing table construction.", "duration": "3 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Bottom-Up Parsing: Shift-reduce parsing, handles, viable prefixes; LR(0) items, SLR(1) parsing table construction and conflict resolution.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Group-A", "topic": "Canonical LR(1) and LALR(1) parsing tables, error recovery in parsers, parser generators (Yacc/Bison).", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Group-B", "topic": "Syntax-Directed Translation (SDT): Synthesized and inherited attributes, S-attributed and L-attributed definitions; Symbol table organization and type checking.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Intermediate Code Generation: Three-address code (quadruples, triples, indirect triples), translation of boolean expressions, control flow backpatching.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Code Optimization & Generation: Basic blocks, flow graphs, DAG representation, peephole optimization, loop optimization, register allocation and code generation.", "duration": "2 weeks", "clos": "CLO4"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Alfred V. Aho, Monica S. Lam, Ravi Sethi, Jeffrey D. Ullman", "title": "Compilers: Principles, Techniques, and Tools (Dragon Book)", "edition": "2nd Edition", "publisher": "Pearson Addison-Wesley", "year": "2006", "isbn": "978-0321486813"}
    ],
    "referenceBooks": [
      {"authors": "Kenneth C. Louden", "title": "Compiler Construction: Principles and Practice", "edition": "1st Edition", "publisher": "Course Technology", "year": "1997"}
    ]
  },

  "CSE-4742": {
    "courseCode": "CSE-4742",
    "courseTitle": "Compiler Design Lab",
    "creditHours": 1.0,
    "contactHours": 2,
    "type": "Core, Engineering",
    "prerequisite": "None",
    "coRequisite": "CSE-4741 (Compiler Design)",
    "courseRationale": "Practical engineering of compiler components using C/C++, Flex (Lexical Analyzer Generator), and Bison/Yacc (Parser Generator).",
    "objectives": [
      "Implement custom lexical analyzers and syntax checkers from scratch in C/C++.",
      "Develop complete scanner and parser front-ends using Flex and Bison.",
      "Generate intermediate code and construct simple code generator back-ends."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Build regular expression tokenizers and symbol tables in C/C++.", "weightage": "30%"},
      {"clo": "CLO2", "description": "Construct grammar rules, precedence definitions, and abstract syntax trees with Bison.", "weightage": "40%"},
      {"clo": "CLO3", "description": "Generate three-address code and implement simple execution engines for custom programming languages.", "weightage": "30%"}
    ],
    "midtermContent": [
      {"topic": "Building a custom scanner in C: whitespace stripping, identifier recognition, keyword lookup.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Introduction to Flex: Writing lex specification files (.l), rules, actions, and regular expressions.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Simulating DFA state transitions and symbol table management.", "duration": "2 weeks", "clos": "CLO1"}
    ],
    "finalContent": [
      {"group": "Final", "topic": "Introduction to Bison/Yacc: Grammar rules (.y), tokens integration with Flex.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Final", "topic": "Building an arithmetic expression calculator with precedence and associativity in Bison.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Final", "topic": "AST (Abstract Syntax Tree) node generation, type checking, and error reporting.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Final", "topic": "Capstone Mini-Compiler: Translating a C-subset language into Three-Address Code or assembly.", "duration": "2 weeks", "clos": "CLO3"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "labAssignments": 20, "midtermLab": 20},
      "see": {"finalLabExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "John Levine", "title": "flex & bison", "edition": "1st Edition", "publisher": "O'Reilly Media", "year": "2009", "isbn": "978-0596155971"}
    ],
    "referenceBooks": []
  },

  "CSE-4871": {
    "courseCode": "CSE-4871",
    "courseTitle": "Computer Graphics",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "MATH-1207 (Linear Algebra and Vector Analysis)",
    "coRequisite": "CSE-4872 (Computer Graphics Lab)",
    "courseRationale": "Introduces hardware, mathematical foundations, and software algorithms for rendering 2D and 3D computer graphics: scan conversion, 2D/3D geometric transformations, viewing pipelines, clipping, illumination models, shading, and visible surface determination.",
    "objectives": [
      "Master mathematical foundations of affine transformations (scaling, rotation, translation, shearing).",
      "Understand rasterization algorithms: line drawing, circle drawing, polygon filling.",
      "Explore 3D projection, hidden surface removal, Phong illumination, and ray tracing."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Implement scan conversion algorithms for fundamental raster primitives (Bresenham, Midpoint).", "weightage": "25%"},
      {"clo": "CLO2", "description": "Apply 2D/3D affine transformations using homogeneous coordinates and composite matrix multiplications.", "weightage": "30%"},
      {"clo": "CLO3", "description": "Apply line and polygon clipping algorithms (Cohen-Sutherland, Liang-Barsky, Sutherland-Hodgman).", "weightage": "25%"},
      {"clo": "CLO4", "description": "Evaluate 3D viewing, parallel/perspective projections, lighting, shading (Gouraud/Phong), and visible surface algorithms.", "weightage": "20%"}
    ],
    "midtermContent": [
      {"topic": "Introduction: Graphics architectures, raster display systems, frame buffers, CRT and modern OLED displays.", "duration": "1 week", "clos": "CLO1"},
      {"topic": "Scan Conversion: DDA algorithm, Bresenham's line algorithm, Midpoint circle drawing algorithm, Ellipse generation.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "2D Geometric Transformations: Translation, rotation, scaling, reflection, shear; Homogeneous coordinates and composite transformation matrices.", "duration": "3 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "2D Viewing & Clipping: Window-to-Viewport transformation; Line clipping (Cohen-Sutherland, Liang-Barsky), Polygon clipping (Sutherland-Hodgman), curve clipping.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-A", "topic": "3D Concepts & Transformations: 3D coordinates, 3D affine transformations, rotation about arbitrary axes.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Group-B", "topic": "3D Viewing Pipeline: Parallel projection (orthographic, oblique), Perspective projection (vanishing points, perspective anomalies).", "duration": "2 weeks", "clos": "CLO4"},
      {"group": "Group-B", "topic": "Visible Surface Detection: Object-space vs image-space methods; Back-face culling, Depth-Buffer (Z-buffer) algorithm, A-buffer, Warnock algorithm.", "duration": "2 weeks", "clos": "CLO4"},
      {"group": "Group-B", "topic": "Illumination & Shading: Ambient, diffuse, specular reflection (Phong model); Flat shading, Gouraud shading, Phong shading; Introduction to Ray Tracing and OpenGL.", "duration": "2 weeks", "clos": "CLO4"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Donald Hearn, M. Pauline Baker, Warren Carithers", "title": "Computer Graphics with OpenGL", "edition": "4th Edition", "publisher": "Pearson", "year": "2010", "isbn": "978-0136053583"}
    ],
    "referenceBooks": [
      {"authors": "Edward Angel, Dave Shreiner", "title": "Interactive Computer Graphics: A Top-Down Approach with WebGL", "edition": "7th Edition", "publisher": "Pearson", "year": "2014"}
    ]
  },

  "CSE-4872": {
    "courseCode": "CSE-4872",
    "courseTitle": "Computer Graphics Lab",
    "creditHours": 1.0,
    "contactHours": 2,
    "type": "Core, Engineering",
    "prerequisite": "None",
    "coRequisite": "CSE-4871 (Computer Graphics)",
    "courseRationale": "Practical programming of 2D and 3D graphics applications using C++/OpenGL/GLUT.",
    "objectives": [
      "Implement graphics algorithms (Bresenham, transformations, clipping) in C++.",
      "Use modern OpenGL shader pipelines and GLUT libraries for interactive 3D rendering.",
      "Develop interactive 2D/3D games or graphic simulations."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Implement raster line, circle, and polygon drawing algorithms.", "weightage": "30%"},
      {"clo": "CLO2", "description": "Apply matrix transformations and user interaction in OpenGL.", "weightage": "35%"},
      {"clo": "CLO3", "description": "Design textured, illuminated 3D scenes with camera controls.", "weightage": "35%"}
    ],
    "midtermContent": [
      {"topic": "Setting up OpenGL and GLUT environment; drawing basic 2D primitives (points, lines, quads, polygons).", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Implementing Bresenham's line and Midpoint circle drawing algorithms without OpenGL built-in functions.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "2D transformations implementation: Moving, rotating, and scaling geometric objects using keyboard/mouse callbacks.", "duration": "2 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Final", "topic": "Cohen-Sutherland line clipping algorithm visualization.", "duration": "2 weeks", "clos": "CLO1"},
      {"group": "Final", "topic": "3D geometric modeling: rendering 3D cubes, pyramids, spheres with gluPerspective.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Final", "topic": "Lighting, material properties, and camera navigation in OpenGL.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Final", "topic": "Term Project: 2D/3D Interactive game or simulation with collision detection.", "duration": "2 weeks", "clos": "CLO3"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "labAssignments": 20, "midtermLab": 20},
      "see": {"finalLabExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Dave Shreiner, Graham Sellers", "title": "OpenGL Programming Guide (The Red Book)", "edition": "9th Edition", "publisher": "Addison-Wesley", "year": "2016"}
    ],
    "referenceBooks": []
  },

  "CSE-4875": {
    "courseCode": "CSE-4875",
    "courseTitle": "Digital Image Processing",
    "creditHours": 3.0,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-2421 (Algorithms)",
    "coRequisite": "CSE-4876 (Digital Image Processing Lab)",
    "courseRationale": "Covers digital representation, enhancement, restoration, segmentation, and feature extraction of image data in spatial and frequency domains.",
    "objectives": [
      "Understand sampling, quantization, pixel relationships, and spatial filtering.",
      "Master Fourier transform applications in 2D image filtering and restoration.",
      "Apply morphological operations, image thresholding, edge detection, and segmentation."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Explain fundamental steps in digital image processing, sampling, quantization, and spatial intensity transformations.", "weightage": "20%"},
      {"clo": "CLO2", "description": "Design spatial and frequency domain filters for image enhancement, noise smoothing, and sharpening.", "weightage": "30%"},
      {"clo": "CLO3", "description": "Formulate image restoration degradation models, inverse filtering, and Wiener filtering.", "weightage": "20%"},
      {"clo": "CLO4", "description": "Apply morphological operations (dilation, erosion, opening, closing) and edge/threshold segmentation algorithms.", "weightage": "30%"}
    ],
    "midtermContent": [
      {"topic": "Introduction: Steps in DIP, image acquisition, sampling, quantization, resolution, pixel adjacency and connectivity.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Spatial Intensity Transformations: Image negatives, log transforms, power-law (gamma) transformations, piecewise-linear functions, histogram equalization and matching.", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"topic": "Spatial Filtering: Spatial correlation and convolution; Smoothing linear and non-linear filters (order-statistic, median); Sharpening filters (Laplacian, Unsharp masking).", "duration": "2 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Frequency Domain Filtering: 2D Discrete Fourier Transform (DFT), Fast Fourier Transform (FFT), Ideal, Butterworth, and Gaussian lowpass and highpass filters.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Group-A", "topic": "Image Restoration & Reconstruction: Noise models (Gaussian, Rayleigh, salt-and-pepper), restoration in spatial/frequency domains, Inverse and Wiener filtering.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Color Image Processing: RGB, CMYK, HSI color models, pseudocolor processing, full-color image smoothing and sharpening.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Group-B", "topic": "Morphological Image Processing: Structuring elements, erosion, dilation, opening, closing, hit-or-miss transform, boundary extraction, hole filling.", "duration": "2 weeks", "clos": "CLO4"},
      {"group": "Group-B", "topic": "Image Segmentation: Detection of discontinuities (Sobel, Prewitt, Canny edge detectors), thresholding (Otsu's method), region-based segmentation, watershed algorithm.", "duration": "2 weeks", "clos": "CLO4"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Rafael C. Gonzalez, Richard E. Woods", "title": "Digital Image Processing", "edition": "4th Edition", "publisher": "Pearson", "year": "2018", "isbn": "978-0133356724"}
    ],
    "referenceBooks": [
      {"authors": "William K. Pratt", "title": "Digital Image Processing: PIKS Scientific Inside", "edition": "4th Edition", "publisher": "John Wiley & Sons", "year": "2007"}
    ]
  },

  "CSE-2430": {
    "courseCode": "CSE-2430",
    "courseTitle": "Web Programming",
    "creditHours": 1.5,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-1121 (Computer Programming I)",
    "coRequisite": "None",
    "courseRationale": "Full-stack web application development: semantic HTML5, modern CSS3 layout systems (Flexbox, Grid), JavaScript (ES6+), DOM manipulation, asynchronous programming (Fetch/AJAX), and backend server development with RESTful APIs.",
    "objectives": [
      "Build responsive and accessible web interfaces adhering to modern web standards.",
      "Develop interactive clients using vanilla JavaScript and DOM APIs.",
      "Build RESTful backend APIs and integrate with databases."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Create responsive, accessible user interfaces using semantic HTML5 and modern CSS3.", "weightage": "30%"},
      {"clo": "CLO2", "description": "Implement interactive client-side logic using modern JavaScript, event listeners, and async APIs.", "weightage": "35%"},
      {"clo": "CLO3", "description": "Construct RESTful API services connecting backend servers to databases with authentication.", "weightage": "35%"}
    ],
    "midtermContent": [
      {"topic": "Web architecture, HTTP protocol, HTML5 semantic elements, forms, accessibility (ARIA).", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Modern CSS3: Box model, Flexbox, CSS Grid layout, responsive media queries, CSS variables, dark mode.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "JavaScript Essentials: Data structures, arrow functions, DOM querying, event handling, local storage.", "duration": "2 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Final", "topic": "Asynchronous JavaScript: Promises, async/await, Fetch API, consuming JSON REST services.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Final", "topic": "Server-side programming with Node.js/Express or Spring Boot REST APIs.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Final", "topic": "Database connectivity (CRUD operations, SQL/NoSQL), session management, JWT authentication.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Final", "topic": "Capstone Full-Stack Project: End-to-end responsive web application deployment.", "duration": "2 weeks", "clos": "CLO3"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "labAssignments": 20, "midtermLab": 20},
      "see": {"finalLabExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Jon Duckett", "title": "HTML and CSS: Design and Build Websites", "edition": "1st Edition", "publisher": "John Wiley & Sons", "year": "2011"},
      {"authors": "David Flanagan", "title": "JavaScript: The Definitive Guide", "edition": "7th Edition", "publisher": "O'Reilly Media", "year": "2020"}
    ],
    "referenceBooks": []
  },

  "CSE-3529": {
    "courseCode": "CSE-3529",
    "courseTitle": "Mobile Application Development",
    "creditHours": 1.5,
    "contactHours": 3,
    "type": "Core, Engineering",
    "prerequisite": "CSE-2423 (Object Oriented Programming)",
    "coRequisite": "None",
    "courseRationale": "Covers native and cross-platform mobile application design, lifecycle management, UI layout, local persistence (Room/SQLite), REST integration, background services, and hardware sensors.",
    "objectives": [
      "Understand mobile OS architectures, activity lifecycles, and fragment management.",
      "Design user interfaces adhering to Material Design principles.",
      "Implement background tasks, offline caching, and REST API integration."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Construct mobile layouts using modern UI components, ConstraintLayout, and Material Design.", "weightage": "30%"},
      {"clo": "CLO2", "description": "Manage activity/fragment lifecycles, intents, navigation, and state preservation.", "weightage": "35%"},
      {"clo": "CLO3", "description": "Integrate local storage, background workers, notifications, and network API consumption.", "weightage": "35%"}
    ],
    "midtermContent": [
      {"topic": "Mobile platforms overview, Android Studio setup, project structure, Activity lifecycle.", "duration": "2 weeks", "clos": "CLO1, CLO2"},
      {"topic": "UI Design: Layouts (Linear, Relative, Constraint), Views, RecyclerView, adapters, event listeners.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Inter-component communication: Explicit and implicit intents, passing data with Bundles, Fragment transactions.", "duration": "2 weeks", "clos": "CLO2"}
    ],
    "finalContent": [
      {"group": "Final", "topic": "Data persistence: SharedPreferences, Room database / SQLite ORM, LiveData, ViewModel.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Final", "topic": "Networking: Retrofit/Volley, JSON parsing, asynchronous background threading (Coroutines/Threads).", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Final", "topic": "Sensors, GPS location services, Google Maps API, push notifications with Firebase.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Final", "topic": "Capstone Mobile App: Architecture design, testing, building APK, deployment.", "duration": "2 weeks", "clos": "CLO3"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "labAssignments": 20, "midtermLab": 20},
      "see": {"finalLabExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "Bill Phillips, Chris Stewart, Kristin Marsicano", "title": "Android Programming: The Big Nerd Ranch Guide", "edition": "4th Edition", "publisher": "Big Nerd Ranch Guides", "year": "2019"}
    ],
    "referenceBooks": []
  },

  "MDP-3505": {
    "courseCode": "MDP-3505",
    "courseTitle": "Concepts on Moral Development-1",
    "creditHours": 1.0,
    "contactHours": 1,
    "type": "General, Moral Development",
    "prerequisite": "None",
    "coRequisite": "None",
    "courseRationale": "Equips students with foundational ethics, ethical paradigms, personal integrity, social responsibility, professional work ethics, and Islamic moral values for holistic character development.",
    "objectives": [
      "Understand the philosophical foundations of morality, ethics, and character building.",
      "Cultivate personal integrity, honesty, empathy, and social accountability.",
      "Apply moral values in university life, professional engineering contexts, and society."
    ],
    "clos": [
      {"clo": "CLO1", "description": "Explain fundamental concepts of morality, conscience, values, and universal moral principles.", "weightage": "40%"},
      {"clo": "CLO2", "description": "Analyze contemporary moral dilemmas, professional ethics, academic honesty, and social justice.", "weightage": "40%"},
      {"clo": "CLO3", "description": "Formulate personal and professional codes of conduct rooted in moral development.", "weightage": "20%"}
    ],
    "midtermContent": [
      {"topic": "Introduction: Definition of Morals, Ethics, Character, and Human Nature; The source of values.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Personal Integrity: Truthfulness, trustworthiness (Amanah), self-discipline, and fulfillment of covenants.", "duration": "2 weeks", "clos": "CLO1"},
      {"topic": "Academic Honesty: Ethics of learning, intellectual property, avoiding plagiarism, and respectful peer interactions.", "duration": "2 weeks", "clos": "CLO1, CLO2"}
    ],
    "finalContent": [
      {"group": "Group-A", "topic": "Interpersonal Ethics: Empathy, kindness to parents, relatives, neighbors, and elder respect.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Group-A", "topic": "Social Responsibility: Environmental stewardship, public welfare, combating corruption and injustice.", "duration": "2 weeks", "clos": "CLO2"},
      {"group": "Group-B", "topic": "Professional Ethics: Workplace accountability, ethical computing, confidentiality, and engineering responsibility.", "duration": "2 weeks", "clos": "CLO3"},
      {"group": "Group-B", "topic": "Character Synthesis: Living a purpose-driven life, moral consistency, and continuous spiritual development.", "duration": "2 weeks", "clos": "CLO3"}
    ],
    "marksDistribution": {
      "cie": {"attendance": 10, "classTestAssignment": 10, "midterm": 30, "total": 50},
      "see": {"writtenExam": 50, "total": 50}
    },
    "textbooks": [
      {"authors": "IIUC Center for Moral and Spiritual Development", "title": "Foundations of Moral Character and Professional Ethics", "edition": "Revised Edition", "publisher": "IIUC Publications", "year": "2022"}
    ],
    "referenceBooks": []
  }
};

const mergedData = { ...existingData, ...additionalCourses };

const outPaths = [
  path.join(__dirname, '..', 'src', 'main', 'resources', 'static', 'data', 'cse_syllabus_details.json'),
  path.join(__dirname, '..', 'api', '_data', 'cse_syllabus_details.json')
];

outPaths.forEach(p => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(mergedData, null, 2), 'utf-8');
  console.log(`Updated ${p} with ${Object.keys(mergedData).length} courses.`);
});
