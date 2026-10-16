const students = [
    { id: 101, name: "Ali", prerequisites: ["CS301"], registeredCourses: [] }
];

const courses = [
    { code: "CS401", prerequisites: ["CS301"], seats: 1 }
];

function loadStudent(id, callback) {
    setTimeout(() => {
        const student = students.find(s => s.id === id);

        if (!student) {
            return callback(new Error("Student does not exist"));
        }

        callback(null, student);
    }, 500);
}

function checkPrerequisites(student, course, callback) {
    setTimeout(() => {
        const completed = course.prerequisites.every(p =>
            student.prerequisites.includes(p)
        );

        if (!completed) {
            return callback(new Error("Prerequisite not completed"));
        }

        callback(null, { student, course });
    }, 500);
}

function checkSeats(student, course, callback) {
    setTimeout(() => {
        if (course.seats <= 0) {
            return callback(new Error("Course is full"));
        }

        if (student.registeredCourses.includes(course.code)) {
            return callback(new Error("Student already registered"));
        }

        callback(null, { student, course });
    }, 500);
}

function registerCourse(student, course, callback) {
    setTimeout(() => {
        student.registeredCourses.push(course.code);
        course.seats--;

        callback(null, {
            studentId: student.id,
            course: course.code,
            status: "REGISTERED"
        });
    }, 500);
}

loadStudent(101, (error, student) => {
    if (error) {
        return console.log(error.message);
    }

    const course = courses.find(c => c.code === "CS401");

    if (!course) {
        return console.log("Course does not exist");
    }

    checkPrerequisites(student, course, (error, data) => {
        if (error) {
            return console.log(error.message);
        }

        checkSeats(data.student, data.course, (error, data) => {
            if (error) {
                return console.log(error.message);
            }

            registerCourse(data.student, data.course, (error, result) => {
                if (error) {
                    return console.log(error.message);
                }

                console.log(result);
            });
        });
    });
});