import Student from './student.js';
import { calculateGrade, calculateAverage as getAverage, calculateGPA } from './gradeUtils.js';
import { processTranscript } from './transcriptService.js';

const rawData = `
[
    {
        "id": 101,
        "name": "Ali",
        "courses": [
            { "code": "CS301", "marks": 81 },
            { "code": "CS302", "marks": 74 }
        ]
    }
]
`;

try {
    const report = processTranscript(rawData);

    console.log(report);
    console.log(JSON.stringify(report, null, 2));

    console.log(calculateGrade(81));
    console.log(getAverage([81, 74]));
    console.log(calculateGPA([81, 74]));

    const student = new Student(102, "Sara", []);
    console.log(student);
} catch (error) {
    console.log(error.name + ": " + error.message);
} finally {
    console.log("Transcript processing completed");
}

try {
    processTranscript("invalid JSON");
} catch (error) {
    console.log(error.name + ": " + error.message);
}