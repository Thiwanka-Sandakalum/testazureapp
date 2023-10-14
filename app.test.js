const request = require('supertest');
const app = require('./app');
const { db } = require('./db'); // Adjust the import based on your actual file structure
const { createStudent, createCourse, getAllStudents, updateStudent, deleteStudent } = require('./service');

beforeAll(async () => {
  await db.sync({ force: true });
  // Add any necessary initialization code here
});

afterAll(async () => {
  await db.close();
});

// Test creating a student
test('POST /students', async () => {
  const response = await request(app)
    .post('/students')
    .send({ name: 'Test Student', age: 22 });

  expect(response.status).toBe(200);
  expect(response.text).toBe('Student created successfully!');
});

// Test creating a course
test('POST /courses', async () => {
  const response = await request(app)
    .post('/courses')
    .send({ title: 'Test Course' });

  expect(response.status).toBe(200);
  expect(response.text).toBe('Course created successfully!');
});

// Test getting all students
test('GET /students', async () => {
  // Assuming there is a student created before running this test
  await createStudent('Test Student', 22);

  const response = await request(app).get('/students');

  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(1);
});

// Test updating a student
test('PUT /students/:id', async () => {
  // Assuming there is a student created before running this test
  const { id } = await createStudent('Test Student', 22);

  const response = await request(app)
    .put(`/students/${id}`)
    .send({ name: 'Updated Test Student', age: 25 });

  expect(response.status).toBe(200);
  expect(response.text).toBe('Student updated successfully!');
});

// Test deleting a student
test('DELETE /students/:id', async () => {
  // Assuming there is a student created before running this test
  const { id } = await createStudent('Test Student', 22);

  const response = await request(app).delete(`/students/${id}`);

  expect(response.status).toBe(200);
  expect(response.text).toBe('Student deleted successfully!');
});
