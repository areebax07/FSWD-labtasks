import Student from './student.js';
import { calculateGrade, calculateAverage as getAverage, calculateGPA } from './gradeUtils.js';

export function processTranscript(rawData) {
    let data;

    try {
        data = JSON.parse(rawData);
    } catch {
        throw new SyntaxError("Invalid JSON");
    }

    if (!Array.isArray(data)) {
        throw new TypeError("Transcript must be an array");
    }

    const ids = [];

    const students = data.map(item => {
        if (item.id === undefined || item.id === null) {
            throw new TypeError("Student ID is missing");
        }

        if (ids.includes(item.id)) {
            throw new Error("Duplicate student ID");
        }

        ids.push(item.id);

        if (!Array.isArray(item.courses) || item.courses.length === 0) {
            throw new TypeError("Courses are missing");
        }

        item.courses.forEach(course => {
            if (!course.code) {
                throw new TypeError("Course code is missing");
            }

            if (typeof course.marks !== "number" ||
                !Number.isFinite(course.marks) ||
                course.marks < 0 || course.marks > 100) {
                throw new RangeError("Invalid course marks");
            }
        });

        const marks = item.courses.map(course => course.marks);
        const student = new Student(item.id, item.name, item.courses);

        return {
            ...student,
            courses: item.courses.map(course => ({
                ...course,
                grade: calculateGrade(course.marks)
            })),
            average: getAverage(marks),
            gpa: calculateGPA(marks)
        };
    });

    return { students };
}