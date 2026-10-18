
function getUser() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, name: "Ali" });
        }, 1000);
    });
}

function getMarks() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ marks: 85 });
        }, 1000);
    });
}

function getDetails() {
    return new Promise((resolve, reject) => {
        Promise.all([getUser(), getMarks()])
            .then(([user, result]) => {
                if (user.id && user.name && result.marks >= 0 && result.marks <= 100) {
                    resolve({ user, result });
                } else {
                    reject(new Error("Invalid details"));
                }
            })
            .catch(error => reject(error));
    });
}

getDetails()
    .then(details => {
        console.log("Details:", details);
    })
    .catch(error => {
        console.log("Error:", error.message);
    });
