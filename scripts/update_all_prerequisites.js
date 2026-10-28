const fs = require('fs');
const path = require('path');

// Official Prerequisites dictionary directly from the 414-page syllabus
const officialPrerequisites = {
  "CSE-1121": "",
  "CSE-1122": "",
  "CSE-1221": "CSE-1121",
  "CSE-1222": "CSE-1122",
  "CSE-1223": "",
  "CSE-1230": "CSE-1122",
  "CSE-2321": "CSE-1121",
  "CSE-2322": "CSE-1122",
  "CSE-2323": "EEE-1221",
  "CSE-2324": "EEE-1222",
  "CSE-2340": "CSE-1222",
  "CSE-2421": "CSE-2321",
  "CSE-2422": "CSE-2322",
  "CSE-2423": "CSE-1221",
  "CSE-2424": "CSE-1222",
  "CSE-2427": "CSE-1223",
  "CSE-2430": "CSE-1230",
  "CSE-3521": "CSE-2323",
  "CSE-3523": "CSE-2323",
  "CSE-3524": "CSE-2324",
  "CSE-3527": "CSE-2427",
  "CSE-3528": "CSE-2322",
  "CSE-3529": "",
  "CSE-3532": "CSE-2340",
  "CSE-3525": "",
  "CSE-3631": "CSE-3521",
  "CSE-3632": "CSE-3521",
  "CSE-3633": "CSE-3525",
  "CSE-3634": "CSE-3525",
  "CSE-3635": "CSE-2421",
  "CSE-3636": "CSE-2422",
  "CSE-3641": "CSE-3529",
  "CSE-3642": "CSE-3532",
  "CSE-3644": "CSE-3532",
  "CSE-4741": "MATH-2307",
  "CSE-4742": "CSE-2322",
  "CSE-4743": "CSE-3633",
  "CSE-4744": "CSE-3634",
  "CSE-4745": "CSE-1121",
  "CSE-4746": "CSE-1122",
  "CSE-4747": "STAT-2311",
  "CSE-4750": "",
  "CSE-4708": "",
  "CSE-4800": "Completion of core courses in Computer Science and Engineering",
  "CSE-4805": "",
  "CSE-4822": "Completion of all core courses",
  "CSE-4845": "CSE-2423",
  "CSE-4846": "CSE-2424",
  "CSE-4871": "CSE-3635",
  "CSE-4872": "CSE-3635",
  "CSE-4875": "CSE-4741",
  "CSE-4876": "CSE-4742",
  "CSE-4877": "CSE-3635",
  "CSE-4878": "CSE-3636",
  "EEE-1121": "",
  "EEE-1122": "",
  "EEE-1221": "EEE-1121",
  "EEE-1222": "EEE-1122",
  "EEE-2421": "EEE-1221",
  "EEE-2422": "EEE-1222",
  "MATH-1107": "",
  "MATH-1207": "MATH-1107",
  "MATH-2307": "MATH-1207",
  "MATH-2407": "MATH-2307",
  "PHY-1101": "",
  "PHY-1201": "PHY-1101",
  "PHY-1204": "PHY-1101",
  "STAT-2311": "",
  "ME-2412": "",
  "ACC-2401": "",
  "GEBL-2401": "",
  "GEEL-1106": "",
  "GEEM-1101": "",
  "GEED-1201": "",
  "MDP-1101": "",
  "MDP-1202": "",
  "MDP-2303": "",
  "MDP-3505": "",
  "MDP-3606": "",
  "MGT-3601": "",
  "ECON-3501": ""
};

// 1. Update courses.json
const coursesPaths = [
  path.join(__dirname, '..', 'src', 'main', 'resources', 'static', 'data', 'courses.json'),
  path.join(__dirname, '..', 'api', '_data', 'courses.json')
];

coursesPaths.forEach(p => {
  if (fs.existsSync(p)) {
    const courses = JSON.parse(fs.readFileSync(p, 'utf8'));
    let updatedCount = 0;
    courses.forEach(c => {
      const code = (c.courseCode || '').toUpperCase().trim();
      if (officialPrerequisites.hasOwnProperty(code)) {
        if (c.prerequisite !== officialPrerequisites[code]) {
          c.prerequisite = officialPrerequisites[code];
          updatedCount++;
        }
      }
    });
    fs.writeFileSync(p, JSON.stringify(courses, null, 2), 'utf8');
    console.log(`Updated ${updatedCount} course prerequisites in ${p}`);
  }
});

// 2. Update cse_syllabus_details.json
const syllabusPaths = [
  path.join(__dirname, '..', 'src', 'main', 'resources', 'static', 'data', 'cse_syllabus_details.json'),
  path.join(__dirname, '..', 'api', '_data', 'cse_syllabus_details.json')
];

// Rich prerequisite display strings with course titles
const richPrereqs = {
  "CSE-1121": "None",
  "CSE-1122": "None",
  "CSE-1221": "CSE-1121 (Computer Programming 1)",
  "CSE-1222": "CSE-1122 (Computer Programming 1 Lab)",
  "CSE-1223": "None",
  "CSE-1230": "CSE-1122 (Computer Programming 1 Lab)",
  "CSE-2321": "CSE-1121 (Computer Programming 1)",
  "CSE-2322": "CSE-1122 (Computer Programming 1 Lab)",
  "CSE-2323": "EEE-1221 (Electronics)",
  "CSE-2324": "EEE-1222 (Electronics Lab)",
  "CSE-2340": "CSE-1222 (Computer Programming 2 Lab)",
  "CSE-2421": "CSE-2321 (Data Structures)",
  "CSE-2422": "CSE-2322 (Data Structures Lab)",
  "CSE-2423": "CSE-1221 (Computer Programming 2)",
  "CSE-2424": "CSE-1222 (Computer Programming 2 Lab)",
  "CSE-2427": "CSE-1223 (Discrete Mathematics)",
  "CSE-2430": "CSE-1230 (Competitive Programming 1)",
  "CSE-3521": "CSE-2323 (Digital Logic Design)",
  "CSE-3523": "CSE-2323 (Digital Logic Design)",
  "CSE-3524": "CSE-2324 (Digital Logic Design Lab)",
  "CSE-3527": "CSE-2427 (Theory of Computation)",
  "CSE-3528": "CSE-2322 (Data Structures Lab)",
  "CSE-3529": "None",
  "CSE-3532": "CSE-2340 (Software Development 1)",
  "CSE-3525": "None",
  "CSE-3631": "CSE-3521 (Computer Architecture)",
  "CSE-3632": "CSE-3521 (Computer Architecture)",
  "CSE-3633": "CSE-3525 (Data Communication)",
  "CSE-3634": "CSE-3525 (Data Communication)",
  "CSE-3635": "CSE-2421 (Computer Algorithms)",
  "CSE-3636": "CSE-2422 (Computer Algorithms Lab)",
  "CSE-3641": "CSE-3529 (Systems Analysis and Design)",
  "CSE-3642": "CSE-3532 (Tools and Technologies for Internet Programming)",
  "CSE-3644": "CSE-3532 (Tools and Technologies for Internet Programming)",
  "CSE-4741": "MATH-2307 (Mathematics III)",
  "CSE-4742": "CSE-2322 (Data Structures Lab)",
  "CSE-4743": "CSE-3633 (Computer Networks)",
  "CSE-4744": "CSE-3634 (Computer Networks Lab)",
  "CSE-4745": "CSE-1121 (Computer Programming 1)",
  "CSE-4746": "CSE-1122 (Computer Programming 1 Lab)",
  "CSE-4747": "STAT-2311 (Probability and Statistics)",
  "CSE-4750": "None",
  "CSE-4708": "None",
  "CSE-4800": "Completion of core courses in Computer Science and Engineering",
  "CSE-4805": "None",
  "CSE-4822": "Completion of all core courses",
  "CSE-4845": "CSE-2423 (Database Management Systems)",
  "CSE-4846": "CSE-2424 (Database Management Systems Lab)",
  "CSE-4871": "CSE-3635 (Artificial Intelligence)",
  "CSE-4872": "CSE-3635 (Artificial Intelligence)",
  "CSE-4875": "CSE-4741 (Computer Graphics)",
  "CSE-4876": "CSE-4742 (Computer Graphics Lab)",
  "CSE-4877": "CSE-3635 (Artificial Intelligence)",
  "CSE-4878": "CSE-3636 (Artificial Intelligence Lab)",
  "MDP-3505": "None"
};

syllabusPaths.forEach(p => {
  if (fs.existsSync(p)) {
    const syl = JSON.parse(fs.readFileSync(p, 'utf8'));
    let updatedCount = 0;
    Object.keys(syl).forEach(code => {
      if (richPrereqs.hasOwnProperty(code)) {
        if (syl[code].prerequisite !== richPrereqs[code]) {
          syl[code].prerequisite = richPrereqs[code];
          updatedCount++;
        }
      }
    });
    fs.writeFileSync(p, JSON.stringify(syl, null, 2), 'utf8');
    console.log(`Updated ${updatedCount} syllabus prerequisites in ${p}`);
  }
});
