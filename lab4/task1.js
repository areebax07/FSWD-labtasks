var name = "Areeba Zafar";
var age = 19;
var isStudent = true;
var university = "Air University";

console.log("Name: " + name);
console.log("Age: " + age);
console.log("Student: " + isStudent);
console.log("University: " + university);

var biography = {
    name: name,
    age: age,
    university: university,
    address: {
        city: "Islamabad",
        country: "Pakistan"
    },
    degreeProgram: {
        degree: "BSCS",
        semester: 4
    }
};

console.log(biography.name);
console.log(biography.age);
console.log(biography.university);
console.log(biography.address.city);
console.log(biography.degreeProgram.degree);