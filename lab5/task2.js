const results = [
    { id: 1, name: 'Ali', department: 'CS', course: 'FSWD', marks: 82 },
    { id: 2, name: 'Sara', department: 'CS', course: 'FSWD', marks: 91 },
    { id: 3, name: 'Usman', department: 'SE', course: 'FSWD', marks: 47 },
    { id: 4, name: 'Hina', department: 'AI', course: 'FSWD', marks: 73 },
    { id: 5, name: 'Ahmed', department: 'SE', course: 'FSWD', marks: 64 },
    { id: 6, name: 'Zoya', department: 'AI', course: 'FSWD', marks: 91 }
];

const processedResults = results.map(student => {
    let grade;
    let gradePoints;

    if (student.marks >= 85) {
        grade = "A";
        gradePoints = 4.0;
    } else if (student.marks >= 80) {
        grade = "A-";
        gradePoints = 3.7;
    } else if (student.marks >= 75) {
        grade = "B+";
        gradePoints = 3.3;
    } else if (student.marks >= 70) {
        grade = "B";
        gradePoints = 3.0;
    } else if (student.marks >= 65) {
        grade = "B-";
        gradePoints = 2.7;
    } else if (student.marks >= 60) {
        grade = "C+";
        gradePoints = 2.3;
    } else if (student.marks >= 50) {
        grade = "C";
        gradePoints = 2.0;
    } else {
        grade = "F";
        gradePoints = 0.0;
    }

    return {
        ...student,
        grade: grade,
        status: student.marks >= 50 ? "Pass" : "Fail",
        gradePoints: gradePoints
    };
});

console.log(processedResults);

const rankedList = [...results].sort((a, b) => {
    if (b.marks !== a.marks) {
        return b.marks - a.marks;
    }

    return a.name.localeCompare(b.name);
});

console.log(rankedList);


const departmentStats = results.reduce((stats, student) => {
    if (!stats[student.department]) {
        stats[student.department] = {
            students: 0,
            total: 0,
            average: 0,
            highest: 0,
            passed: 0
        };
    }

    const department = stats[student.department];

    department.students++;
    department.total += student.marks;
    department.average = department.total / department.students;
    department.highest = Math.max(department.highest, student.marks);

    if (student.marks >= 50) {
        department.passed++;
    }

    return stats;
}, {});

console.log(departmentStats);

const average = results.reduce((sum, student) => sum + student.marks, 0) / results.length;

const firstAbove85 = results.find(student => student.marks > 85);

const firstFailedIndex = results.findIndex(student => student.marks < 50);

const hasFailed = results.some(student => student.marks < 50);

const allMarksValid = results.every(student => student.marks >= 0 && student.marks <= 100);

const aboveAverage = results.filter(student => student.marks > average);

const topThree = [...results].sort((a, b) => b.marks - a.marks).slice(0, 3);

console.log(firstAbove85);
console.log(firstFailedIndex);
console.log(hasFailed);
console.log(allMarksValid);
console.log(aboveAverage);
console.log(topThree);