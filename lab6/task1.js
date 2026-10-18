
function getUser(success) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve({ id: 1, name: "Ali" });
            } else {
                reject(new Error("Failed to fetch user"));
            }
        }, 1000);
    });
}

getUser(true)
    .then(user => {
        console.log("User:", user);
    })
    .catch(error => {
        console.log("Error:", error.message);
    });
