async function getJSON(url, fetchImplementation) {
    const response = await fetchImplementation(url);

    if (!response.ok) {
        throw new Error("HTTP Error: " + response.status);
    }

    return await response.json();
}

function fakeFetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        const delay = url.includes("slow") ? 2000 : 300;

        const timer = setTimeout(() => {
            if (url.includes("network")) {
                return reject(new Error("Network failure"));
            }

            if (url.includes("404")) {
                return resolve({
                    ok: false,
                    status: 404,
                    json: async () => ({})
                });
            }

            if (url.includes("500")) {
                return resolve({
                    ok: false,
                    status: 500,
                    json: async () => ({})
                });
            }

            if (url.includes("invalid")) {
                return resolve({
                    ok: true,
                    status: 200,
                    json: async () => {
                        throw new SyntaxError("Invalid JSON");
                    }
                });
            }

            let data;

            if (url.includes("users")) {
                data = [
                    { id: 1, name: "Ali", department: "CS" },
                    { id: 2, name: "Sara", department: "CS" },
                    { id: 3, name: "Usman", department: "SE" }
                ];
            } else if (url.includes("courses")) {
                data = [
                    { id: 1, name: "FSWD" },
                    { id: 2, name: "DSA" }
                ];
            } else if (url.includes("results")) {
                data = [
                    { name: "Ali", department: "CS", marks: 82 },
                    { name: "Sara", department: "CS", marks: 91 },
                    { name: "Usman", department: "SE", marks: 47 }
                ];
            } else {
                return resolve({
                    ok: false,
                    status: 404,
                    json: async () => ({})
                });
            }

            resolve({
                ok: true,
                status: 200,
                json: async () => data
            });
        }, delay);

        if (options.signal) {
            if (options.signal.aborted) {
                clearTimeout(timer);
                reject(new Error("Request aborted"));
            } else {
                options.signal.addEventListener("abort", () => {
                    clearTimeout(timer);
                    reject(new Error("Request aborted"));
                }, { once: true });
            }
        }
    });
}

async function loadDashboard() {
    const [users, courses, results] = await Promise.all([
        getJSON("/users", fakeFetch),
        getJSON("/courses", fakeFetch),
        getJSON("/results", fakeFetch)
    ]);

    const average = results.reduce((sum, student) => sum + student.marks, 0)
        / results.length;

    const highest = results.reduce((a, b) =>
        a.marks > b.marks ? a : b
    );

    const departments = results.reduce((stats, student) => {
        if (!stats[student.department]) {
            stats[student.department] = {
                students: 0,
                totalMarks: 0,
                average: 0,
                passed: 0
            };
        }

        const department = stats[student.department];

        department.students++;
        department.totalMarks += student.marks;
        department.average = department.totalMarks / department.students;

        if (student.marks >= 50) {
            department.passed++;
        }

        return stats;
    }, {});

    console.log({
        totalStudents: users.length,
        totalCourses: courses.length,
        averageMarks: average,
        highestStudent: highest,
        failedStudents: results.filter(s => s.marks < 50).length,
        departments: departments
    });
}

async function fetchWithTimeout(url, milliseconds) {
    const controller = new AbortController();

    const timer = setTimeout(() => {
        controller.abort();
    }, milliseconds);

    try {
        return await getJSON(url, (url) =>
            fakeFetch(url, { signal: controller.signal })
        );
    } catch (error) {
        if (controller.signal.aborted) {
            throw new Error("Request timed out");
        }

        throw error;
    } finally {
        clearTimeout(timer);
    }
}

loadDashboard().catch(error => {
    console.log("Dashboard error:", error.message);
});

fetchWithTimeout("/slow/users", 500)
    .then(data => console.log(data))
    .catch(error => console.log("Timeout test:", error.message));