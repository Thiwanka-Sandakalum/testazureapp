// Import Sequelize and connect to the database
const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize({
  storage: 'database.db', // Fixed typo in the storage option
  dialect: 'sqlite',
});

// Define Student model
const Student = db.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define Course model
const Course = db.define('Course', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define the relationship between Student and Course
const StudentCourse = db.define('StudentCourse', {});

Student.belongsToMany(Course, { through: StudentCourse });
Course.belongsToMany(Student, { through: StudentCourse });

// Sync models with the database
db.sync({ force: true })
  .then(() => {
    console.log('Database and tables created!');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

module.exports = { Student, Course,db };
