const { Student, Course } = require('./db'); 

// Create a new student
const createStudent = async (name, age) => {
  try {
    const student = await Student.create({ name, age });
    console.log('Student created:', student.toJSON());
  } catch (error) {
    console.error('Error creating student:', error);
  }
};

// Create a new course
const createCourse = async (title) => {
  try {
    const course = await Course.create({ title });
    console.log('Course created:', course.toJSON());
  } catch (error) {
    console.error('Error creating course:', error);
  }
};

// Get all students
const getAllStudents = async () => {
  try {
    const students = await Student.findAll();
    console.log('All Students:', students.map(student => student.toJSON()));
    return students
  } catch (error) {
    console.error('Error getting all students:', error);
  }
};

// Update student by ID
const updateStudent = async (id, newName, newAge) => {
  try {
    const student = await Student.findByPk(id);
    if (student) {
      await student.update({ name: newName, age: newAge });
      console.log('Student updated:', student.toJSON());
      return student
    } else {
      console.log('Student not found.');
    }
  } catch (error) {
    console.error('Error updating student:', error);
  }
};

// Delete student by ID
const deleteStudent = async (id) => {
  try {
    const student = await Student.findByPk(id);
    if (student) {
      await student.destroy();
      console.log('Student deleted successfully.');
    } else {
      console.log('Student not found.');
    }
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};

// Example usage
// Uncomment and modify as needed

// createStudent('John Doe', 20);
// createCourse('Math 101');
// getAllStudents();
// updateStudent(1, 'Updated John Doe', 25);
// deleteStudent(1);

module.exports = {
  createStudent,
  createCourse,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
