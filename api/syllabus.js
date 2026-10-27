const syllabusDetails = require('./_data/cse_syllabus_details.json');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { code } = req.query;

  if (code) {
    const courseCode = String(code).toUpperCase().trim();
    const syllabus = syllabusDetails[courseCode];
    if (syllabus) {
      return res.status(200).json(syllabus);
    }
    return res.status(404).json({ error: 'Syllabus not found for course ' + courseCode });
  }

  return res.status(200).json(syllabusDetails);
};
