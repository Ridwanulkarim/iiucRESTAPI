const courses = require('./courses.json');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    if (id) {
      const course = courses.find(
        (c) => String(c.courseId) === String(id) || c.courseCode.toLowerCase() === String(id).toLowerCase()
      );
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      return res.status(200).json(course);
    }
    return res.status(200).json(courses);
  }

  if (req.method === 'POST') {
    const newCourse = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    newCourse.courseId = Date.now();
    courses.push(newCourse);
    return res.status(201).json(newCourse);
  }

  if (req.method === 'PUT') {
    const courseIndex = courses.findIndex((c) => String(c.courseId) === String(id));
    if (courseIndex === -1) {
      return res.status(404).json({ error: 'Course not found' });
    }
    const updateData = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    courses[courseIndex] = { ...courses[courseIndex], ...updateData, courseId: Number(id) };
    return res.status(200).json(courses[courseIndex]);
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({ success: true, id: id, message: 'Course deleted successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
