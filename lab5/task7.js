function getStudent(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 101) {
                resolve({ id: 101, name: "Ali", completed: ["CS301"] });
            } else {
                reject(new Error("Student not found"));
            }
        }, 300);
    });
}

function getCourse(code) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (code === "CS401") {
                resolve({ code: "CS401", prerequisites: ["CS301"], seats: 2 });
            } else {
                reject(new Error("Course not found"));
            }
        }, 300);
    });
}

function checkPrerequisites(data) {
    return new Promise((resolve, reject) => {
        const completed = data.course.prerequisites.every(
            item => data.student.completed.includes(item)
        );

        if (completed) {
            resolve(data);
        } else {
            reject(new Error("Prerequisite not completed"));
        }
    });
}

function checkSeats(data) {
    return new Promise((resolve, reject) => {
        if (data.course.seats > 0) {
            resolve(data);
        } else {
            reject(new Error("Course is full"));
        }
    });
}

function registerStudent(data) {
    return new Promise(resolve => {
        resolve({
            studentId: data.student.id,
            course: data.course.code,
            status: "REGISTERED"
        });
    });
}

function sendEmail() {
    return new Promise(resolve => setTimeout(() => resolve("Email sent"), 300));
}

function sendSMS() {
    return new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error("SMS failed")), 200)
    );
}

function writeAuditLog() {
    return new Promise(resolve => setTimeout(() => resolve("Audit saved"), 100));
}

function getCourseFromServer1() {
    return new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error("Server 1 failed")), 200)
    );
}

function getCourseFromServer2() {
    return new Promise(resolve =>
        setTimeout(() => resolve({ code: "CS401" }), 400)
    );
}

getStudent(101)
    .then(student => {
        return getCourse("CS401").then(course => ({ student, course }));
    })
    .then(checkPrerequisites)
    .then(checkSeats)
    .then(registerStudent)
    .then(result => {
        console.log("Registration:", result);

        return Promise.allSettled([
            sendEmail(),
            sendSMS(),
            writeAuditLog()
        ]);
    })
    .then(results => {
        const report = results.map((result, index) => ({
            service: ["Email", "SMS", "Audit"][index],
            status: result.status
        }));

        console.log("Service Report:", report);
    })
    .catch(error => {
        console.log("Error:", error.message);
    })
    .finally(() => {
        console.log("Registration process completed");
    });

Promise.any([
    getCourseFromServer1(),
    getCourseFromServer2()
])
    .then(course => console.log("First successful course:", course))
    .catch(error => console.log(error.message));