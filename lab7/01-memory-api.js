// Lab Task 7 - Task 1: Student Management System (In-Memory API)
// Modules: Students (CRUD), Teachers (CRUD), Attendance (CRUD), Marks (CRUD)
// No authorization/authentication is enforced.

const http = require('node:http');

// In-memory data stores
let students = [];
let teachers = [];
let attendance = [];
let marks = [];

let nextStudentId = 1;
let nextTeacherId = 1;
let nextAttendanceId = 1;
let nextMarksId = 1;

const server = http.createServer(async (req, res) => {
  const send = (status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  };

  const parseBody = async () => {
    let raw = '';
    for await (const chunk of req) {
      raw += chunk;
      if (Buffer.byteLength(raw) > 65536) {
        send(413, { error: 'Too large' });
        return null;
      }
    }
    return JSON.parse(raw);
  };

  const url = req.url;
  const method = req.method;

  //students side
  if (url === '/students' && method === 'GET') {
    return send(200, students);
  }
  if (url === '/students' && method === 'POST') {
    try {
      const body = await parseBody();
      if (!body) return;
      const student = { id: nextStudentId++, ...body };
      students.push(student);
      return send(201, student);
    } catch (error) {
      return send(400, { error: 'Invalid JSON' });
    }
  }

  const studentMatch = /^\/students\/(\d+)$/.exec(url);
  if (studentMatch) {
    const id = parseInt(studentMatch[1], 10);
    const index = students.findIndex(s => s.id === id);
    if (method === 'GET') {
      if (index === -1) return send(404, { error: 'Student not found' });
      return send(200, students[index]);
    }
    if (method === 'PUT') {
      if (index === -1) return send(404, { error: 'Student not found' });
      try {
        const body = await parseBody();
        if (!body) return;
        students[index] = { ...students[index], ...body, id };
        return send(200, students[index]);
      } catch (error) {
        return send(400, { error: 'Invalid JSON' });
      }
    }
    if (method === 'DELETE') {
      if (index === -1) return send(404, { error: 'Student not found' });
      const deleted = students.splice(index, 1)[0];
      return send(200, deleted);
    }
  }

  // teacher side
  if (url === '/teachers' && method === 'GET') {
    return send(200, teachers);
  }
  if (url === '/teachers' && method === 'POST') {
    try {
      const body = await parseBody();
      if (!body) return;
      const teacher = { id: nextTeacherId++, ...body };
      teachers.push(teacher);
      return send(201, teacher);
    } catch (error) {
      return send(400, { error: 'Invalid JSON' });
    }
  }

  const teacherMatch = /^\/teachers\/(\d+)$/.exec(url);
  if (teacherMatch) {
    const id = parseInt(teacherMatch[1], 10);
    const index = teachers.findIndex(t => t.id === id);
    if (method === 'GET') {
      if (index === -1) return send(404, { error: 'Teacher not found' });
      return send(200, teachers[index]);
    }
    if (method === 'PUT') {
      if (index === -1) return send(404, { error: 'Teacher not found' });
      try {
        const body = await parseBody();
        if (!body) return;
        teachers[index] = { ...teachers[index], ...body, id };
        return send(200, teachers[index]);
      } catch (error) {
        return send(400, { error: 'Invalid JSON' });
      }
    }
    if (method === 'DELETE') {
      if (index === -1) return send(404, { error: 'Teacher not found' });
      const deleted = teachers.splice(index, 1)[0];
      return send(200, deleted);
    }
  }

  // attendance
  if (url === '/attendance' && method === 'GET') {
    return send(200, attendance);
  }
  if (url === '/attendance' && method === 'POST') {
    try {
      const body = await parseBody();
      if (!body) return;
      const record = { id: nextAttendanceId++, ...body };
      attendance.push(record);
      return send(201, record);
    } catch (error) {
      return send(400, { error: 'Invalid JSON' });
    }
  }

  const attendanceMatch = /^\/attendance\/(\d+)$/.exec(url);
  if (attendanceMatch) {
    const id = parseInt(attendanceMatch[1], 10);
    const index = attendance.findIndex(a => a.id === id);
    if (method === 'GET') {
      if (index === -1) return send(404, { error: 'Attendance record not found' });
      return send(200, attendance[index]);
    }
    if (method === 'PUT') {
      if (index === -1) return send(404, { error: 'Attendance record not found' });
      try {
        const body = await parseBody();
        if (!body) return;
        attendance[index] = { ...attendance[index], ...body, id };
        return send(200, attendance[index]);
      } catch (error) {
        return send(400, { error: 'Invalid JSON' });
      }
    }
    if (method === 'DELETE') {
      if (index === -1) return send(404, { error: 'Attendance record not found' });
      const deleted = attendance.splice(index, 1)[0];
      return send(200, deleted);
    }
  }

  
  if (url === '/marks' && method === 'GET') {
    return send(200, marks);
  }
  if (url === '/marks' && method === 'POST') {
    try {
      const body = await parseBody();
      if (!body) return;
      const record = { id: nextMarksId++, ...body };
      marks.push(record);
      return send(201, record);
    } catch (error) {
      return send(400, { error: 'Invalid JSON' });
    }
  }

  const marksMatch = /^\/marks\/(\d+)$/.exec(url);
  if (marksMatch) {
    const id = parseInt(marksMatch[1], 10);
    const index = marks.findIndex(m => m.id === id);
    if (method === 'GET') {
      if (index === -1) return send(404, { error: 'Marks record not found' });
      return send(200, marks[index]);
    }
    if (method === 'PUT') {
      if (index === -1) return send(404, { error: 'Marks record not found' });
      try {
        const body = await parseBody();
        if (!body) return;
        marks[index] = { ...marks[index], ...body, id };
        return send(200, marks[index]);
      } catch (error) {
        return send(400, { error: 'Invalid JSON' });
      }
    }
    if (method === 'DELETE') {
      if (index === -1) return send(404, { error: 'Marks record not found' });
      const deleted = marks.splice(index, 1)[0];
      return send(200, deleted);
    }
  }

 
  send(404, { error: 'Not found' });
});

server.listen(3004, () => {
  console.log('Student Management System running at: http://localhost:3004');
  console.log('Endpoints available: /students, /teachers, /attendance, /marks');
});